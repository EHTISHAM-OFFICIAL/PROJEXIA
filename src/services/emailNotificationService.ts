import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { COLLECTIONS, db } from '../firebase/firestore';

const settingsRef = doc(db, COLLECTIONS.settings, 'emailNotifications');

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
    if (snapshot.exists()) override = snapshot.data() as Partial<EmailNotificationConfig>;
  } catch {
    // Firestore unreachable — fall through to env defaults.
  }

  const config: EmailNotificationConfig = {
    serviceId: override.serviceId || (import.meta.env.VITE_EMAILJS_SERVICE_ID as string) || '',
    templateId: override.templateId || (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string) || '',
    publicKey: override.publicKey || (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string) || '',
    toEmail: override.toEmail || (import.meta.env.VITE_EMAILJS_TO_EMAIL as string) || '',
  };

  const isConfigured = config.serviceId && config.templateId && config.publicKey && config.toEmail;
  return isConfigured ? config : null;
}

export const emailNotificationService = {
  /**
   * Sends a notification email via EmailJS's REST API, called directly from
   * the browser — no backend, same architecture as imgBB uploads. Silently
   * does nothing if not configured, and never throws: a notification email
   * failing must never block the actual Firestore write that already
   * succeeded, since that write is the source of truth.
   *
   * Your EmailJS template should reference these template variables:
   * {{to_email}}, {{subject}}, {{message}}, {{reply_to}}
   */
  async notify(params: { subject: string; message: string; replyTo?: string; throwOnError?: boolean }): Promise<void> {
    const config = await resolveConfig();
    if (!config) return; // not configured — feature is opt-in

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: config.serviceId.trim(),
          template_id: config.templateId.trim(),
          user_id: config.publicKey.trim(),
          template_params: {
            to_email: config.toEmail.trim(),
            subject: params.subject,
            message: params.message,
            reply_to: params.replyTo?.trim() || config.toEmail.trim(),
          },
        }),
      });

      if (!response.ok) {
        const detail = await response.text().catch(() => '');
        throw new Error(
          `EmailJS rejected the message (${response.status})${detail ? `: ${detail.slice(0, 300)}` : ''}`,
        );
      }
    } catch (error) {
      if (import.meta.env.DEV) console.warn('Email notification failed to send', error);
    }
  },

  async saveConfigOverride(config: Partial<EmailNotificationConfig>): Promise<void> {
    await setDoc(settingsRef, { ...config, updatedAt: serverTimestamp() });
  },

  async getConfigOverride(): Promise<Partial<EmailNotificationConfig>> {
    const snapshot = await getDoc(settingsRef);
    return snapshot.exists() ? (snapshot.data() as Partial<EmailNotificationConfig>) : {};
  },

  async sendTestEmail(): Promise<void> {
    const config = await resolveConfig();
    if (!config) throw new Error('Email notifications are not configured. Enter and save all EmailJS settings first.');

    await this.notify({
      subject: 'MECTEC EmailJS test',
      message: 'This is a test email from the MECTEC admin panel. If you received this message, email notifications are working.',
      replyTo: config.toEmail,
      throwOnError: true,
    });
  },

  isConfiguredViaEnv(): boolean {
    return Boolean(
      import.meta.env.VITE_EMAILJS_SERVICE_ID &&
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY &&
        import.meta.env.VITE_EMAILJS_TO_EMAIL
    );
  },
};
