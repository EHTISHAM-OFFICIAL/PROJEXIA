import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { COLLECTIONS, db } from "../firebase/firestore";

const settingsRef = doc(db, COLLECTIONS.settings, "emailNotifications");

export interface EmailNotificationConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
  toEmail: string;
}

async function resolveConfig(): Promise<EmailNotificationConfig | null> {
  let override: Partial<EmailNotificationConfig> = {};
  try {
    const snapshot = await getDoc(settingsRef);
    if (snapshot.exists())
      override = snapshot.data() as Partial<EmailNotificationConfig>;
  } catch {
    // Firestore unreachable — fall through to env defaults.
  }

  const config: EmailNotificationConfig = {
    serviceId:
      override.serviceId ||
      (import.meta.env.VITE_EMAILJS_SERVICE_ID as string) ||
      "",
    templateId:
      override.templateId ||
      (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string) ||
      "",
    publicKey:
      override.publicKey ||
      (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string) ||
      "",
    toEmail:
      override.toEmail ||
      (import.meta.env.VITE_EMAILJS_TO_EMAIL as string) ||
      "",
  };

  const normalized: EmailNotificationConfig = {
    serviceId: config.serviceId.trim(),
    templateId: config.templateId.trim(),
    publicKey: config.publicKey.trim(),
    toEmail: config.toEmail.trim(),
  };

  const isConfigured =
    Boolean(normalized.serviceId) &&
    Boolean(normalized.templateId) &&
    Boolean(normalized.publicKey) &&
    Boolean(normalized.toEmail);

  return isConfigured ? normalized : null;
}

export const emailNotificationService = {
  /**
   * Send through EmailJS from the browser.
   *
   * Important: request notifications are intentionally awaited by
   * requestService after Firestore succeeds. That prevents the browser from
   * abandoning a fire-and-forget fetch when the user leaves the page.
   *
   * EmailJS documents a 1-request/second rate limit, so transient failures are
   * retried with a short delay.
   */
  async notify(params: {
    subject: string;
    message: string;
    replyTo?: string;
    name?: string;
    email?: string;
    title?: string;
    requestNumber?: string;
    throwOnError?: boolean;
    maxAttempts?: number;
  }): Promise<void> {
    const diagnosticId = `email-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const startedAt = Date.now();

    const config = await resolveConfig();
    const safeConfig = config
      ? {
          serviceId: config.serviceId,
          templateId: config.templateId,
          publicKeyPresent: Boolean(config.publicKey),
          toEmail: config.toEmail,
        }
      : null;

    console.info("[MECTEC email] notification started", {
      diagnosticId,
      startedAt: new Date(startedAt).toISOString(),
      subject: params.subject,
      requestNumber: params.requestNumber ?? null,
      customerEmail: params.email?.trim() || params.replyTo?.trim() || null,
      config: safeConfig,
    });

    if (!config) {
      const error = new Error(
        "Email notifications are not configured. Check the EmailJS settings.",
      );
      console.error("[MECTEC email] configuration failure", {
        diagnosticId,
        error: error.message,
      });
      if (params.throwOnError) throw error;
      return;
    }

    const maxAttempts = Math.max(1, Math.min(params.maxAttempts ?? 3, 5));
    let lastError: unknown = null;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        const requestStartedAt = Date.now();
        const response = await fetch(
          "https://api.emailjs.com/api/v1.0/email/send",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              service_id: config.serviceId,
              template_id: config.templateId,
              user_id: config.publicKey,
              template_params: {
                // Keep the canonical delivery fields explicit. The EmailJS
                // template should use {{to_email}} in its "To Email" field
                // and {{reply_to}} in "Reply To".
                to_email: config.toEmail,
                subject: params.subject,
                message: params.message,
                reply_to: params.replyTo?.trim() || config.toEmail,

                // Also provide common aliases so the same template can be
                // reused without silently rendering empty values.
                name: params.name ?? "MECTEC Website",
                email:
                  params.email?.trim() ||
                  params.replyTo?.trim() ||
                  config.toEmail,
                title: params.title ?? params.subject,
                request_number: params.requestNumber ?? "",
                time: new Date().toLocaleString("en-PK", {
                  timeZone: "Asia/Karachi",
                }),
              },
            }),
          },
        );

        const responseText = await response.text().catch(() => "");
        const requestDurationMs = Date.now() - requestStartedAt;

        console.info("[MECTEC email] EmailJS response received", {
          diagnosticId,
          attempt,
          status: response.status,
          ok: response.ok,
          durationMs: requestDurationMs,
          responseBody: responseText.slice(0, 1000),
        });

        if (!response.ok) {
          throw new Error(
            `EmailJS rejected the message (${response.status})${responseText ? `: ${responseText.slice(0, 500)}` : ""}`,
          );
        }

        console.info("[MECTEC email] notification accepted by EmailJS", {
          diagnosticId,
          attempt,
          totalDurationMs: Date.now() - startedAt,
          requestNumber: params.requestNumber ?? null,
        });
        return;
      } catch (error) {
        lastError = error;

        console.error("[MECTEC email] attempt failed", {
          diagnosticId,
          attempt,
          maxAttempts,
          error:
            error instanceof Error
              ? { name: error.name, message: error.message, stack: error.stack }
              : error,
        });

        if (attempt < maxAttempts) {
          // EmailJS documents a 1 request/second rate limit. Waiting slightly
          // longer also handles short-lived network/provider failures.
          await new Promise((resolve) => setTimeout(resolve, 1200 * attempt));
        }
      }
    }

    console.error("[MECTEC email] notification failed after all attempts", {
      diagnosticId,
      attempts: maxAttempts,
      totalDurationMs: Date.now() - startedAt,
      requestNumber: params.requestNumber ?? null,
      error:
        lastError instanceof Error
          ? { name: lastError.name, message: lastError.message, stack: lastError.stack }
          : lastError,
    });

    if (params.throwOnError) {
      throw lastError instanceof Error
        ? lastError
        : new Error("Email notification could not be sent.");
    }
  },

  async saveConfigOverride(
    config: Partial<EmailNotificationConfig>,
  ): Promise<void> {
    await setDoc(settingsRef, { ...config, updatedAt: serverTimestamp() });
  },

  async getConfigOverride(): Promise<Partial<EmailNotificationConfig>> {
    const snapshot = await getDoc(settingsRef);
    return snapshot.exists()
      ? (snapshot.data() as Partial<EmailNotificationConfig>)
      : {};
  },

  async sendTestEmail(): Promise<void> {
    const config = await resolveConfig();
    if (!config) {
      throw new Error(
        "Email notifications are not configured. Enter and save all EmailJS settings first.",
      );
    }

    await this.notify({
      subject: "MECTEC EmailJS test",
      message:
        "This is a test email from the MECTEC admin panel. If you received this message, the EmailJS API, service, template and recipient configuration are working.",
      replyTo: config.toEmail,
      name: "MECTEC Email Test",
      title: "MECTEC EmailJS test",
      throwOnError: true,
      maxAttempts: 3,
    });
  },

  /**
   * Sends the exact same shape used by a real project request, but with
   * harmless sample data. This is deliberately separate from the tiny
   * connectivity test above so the admin can verify the real request
   * notification path without creating a Firestore request.
   */
  async sendProjectRequestTestEmail(): Promise<void> {
    const config = await resolveConfig();
    if (!config) {
      throw new Error(
        "Email notifications are not configured. Enter and save all EmailJS settings first.",
      );
    }

    await this.notify({
      subject: "New project request — Smart Energy Generator",
      message:
        "MECTEC PROJECT REQUEST TEST\n\n" +
        "Test Customer (test@example.com) submitted a sample request.\n\n" +
        "Reference: MECTEC-TEST-000001\n" +
        "Category: Embedded Systems\n" +
        "Project type: Prototype\n" +
        "Urgency: Normal\n\n" +
        "--- Project ---\n" +
        "Title: Smart Energy Generator\n" +
        "Purpose: Sample notification-path test.\n" +
        "Description:\nThis is a safe test message used to verify the same EmailJS payload structure as a real project request.\n\n" +
        "--- Technical ---\n" +
        "Preferred platform: Arduino\n" +
        "Connectivity: None\n" +
        "Sensors: Voltage sensor\n" +
        "Outputs: Display\n\n" +
        "--- Budget & Timeline ---\n" +
        "Budget range: Not specified\n" +
        "Start date: Not specified\n" +
        "Deadline: Not specified\n" +
        "Timeline flexibility: Flexible\n\n" +
        "--- Scale ---\n" +
        "Complexity: Prototype\n" +
        "Prototype quantity: 1\n" +
        "Estimated quantity: 1",
      replyTo: config.toEmail,
      name: "MECTEC Project Request Test",
      email: config.toEmail,
      title: "Smart Energy Generator",
      requestNumber: "MECTEC-TEST-000001",
      throwOnError: true,
      maxAttempts: 3,
    });
  },

  isConfiguredViaEnv(): boolean {
    return Boolean(
      import.meta.env.VITE_EMAILJS_SERVICE_ID &&
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY &&
      import.meta.env.VITE_EMAILJS_TO_EMAIL,
    );
  },
};
