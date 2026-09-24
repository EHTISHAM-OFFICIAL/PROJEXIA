import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Download, Mail, MessageCircle, Phone, Trash2, Clock3 } from "lucide-react";
import { Seo } from "../../components/ui/Seo";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Alert } from "../../components/ui/Alert";
import { Skeleton } from "../../components/ui/Skeleton";
import { ErrorState } from "../../components/ui/ErrorState";
import { EmptyState } from "../../components/ui/EmptyState";
import { Field } from "../../components/forms/Field";
import { Select, TextArea, TextInput } from "../../components/forms/Inputs";
import { useProjectRequest } from "../../hooks/useProjectRequests";
import { requestService } from "../../services/requestService";
import { requestSettingsService } from "../../services/requestSettingsService";
import {
  REQUEST_PRIORITIES,
  REQUEST_PRIORITY_TONE,
  REQUEST_STATUSES,
  REQUEST_STATUS_TONE,
} from "../../constants/requestOptions";
import {
  formatDate,
  formatDateTime,
  formatFileSize,
} from "../../utils/formatting";
import { toUserMessage } from "../../utils/errors";
import type {
  RequestPriority,
  RequestStatus,
} from "../../types/projectRequest";

export default function RequestDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: request, loading, error, reload } = useProjectRequest(id);

  const [status, setStatus] = useState<RequestStatus>("new");
  const [priority, setPriority] = useState<RequestPriority>("normal");
  const [notes, setNotes] = useState("");
  const [customerUpdate, setCustomerUpdate] = useState("");
  const [quote, setQuote] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [trashError, setTrashError] = useState<string | null>(null);
  const [trashing, setTrashing] = useState(false);
  const [projectToken, setProjectToken] = useState("");
  const [trashWindowHours, setTrashWindowHours] = useState(24);

  useEffect(() => {
    if (!request) return;
    setStatus(request.status);
    setPriority(request.priority);
    setNotes(request.admin.notes ?? "");
    setCustomerUpdate(request.customerUpdate ?? "");
    setQuote(request.admin.quotedAmount?.toString() ?? "");
  }, [request]);

  useEffect(() => {
    void requestSettingsService
      .getSecuritySettings()
      .then((settings) => setTrashWindowHours(settings.customerRequestEditWindowHours))
      .catch(() => undefined);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error) return <ErrorState message={error} onRetry={reload} />;

  if (!request) {
    return (
      <EmptyState
        title="Request not found"
        description="It may have been deleted, or the link may be wrong."
      />
    );
  }

  const {
    contact,
    project,
    technical,
    software,
    scale,
    budget,
    timeline,
    references,
  } = request;
  const additional = request.additionalRequirements;

  const softwareNeeds = [
    software.requiresMobileApp && "Mobile app",
    software.requiresWebDashboard && "Web dashboard",
    software.requiresCloudDatabase && "Cloud database",
    software.requiresNotifications && "Notifications",
    software.requiresRemoteControl && "Remote control",
  ].filter(Boolean) as string[];

  const handleTrash = async () => {
    if (!id || !request || request.deletedAt) return;

    let enteredToken = projectToken.trim().toUpperCase();

    // Older requests may predate the project-token field. Backfill one on
    // demand instead of making those requests permanently unmanageable.
    if (!request.projectToken) {
      try {
        enteredToken = await requestService.ensureProjectToken(id);
        setProjectToken(enteredToken);
      } catch (caught) {
        setTrashError(
          toUserMessage(caught, "Could not create a project token for this request."),
        );
        return;
      }
    }

    if (!enteredToken) {
      setTrashError("Enter the project token to authorize this trash action.");
      return;
    }

    const createdAt = request.createdAt?.toMillis();
    if (!createdAt) {
      setTrashError("This request cannot be moved to trash because its submission time is unavailable.");
      return;
    }

    const deadline = createdAt + trashWindowHours * 60 * 60 * 1000;
    const insideProtectionWindow = Date.now() < deadline;

    const confirmed = window.confirm(
      insideProtectionWindow
        ? `This request is still inside the ${trashWindowHours}-hour protection window. The project token will authorize early deletion to trash. Continue?`
        : "Move this request to trash? It will remain recoverable in Request Trash.",
    );
    if (!confirmed) return;

    setTrashing(true);
    setTrashError(null);
    try {
      await requestService.trashRequest(id, enteredToken);
      setProjectToken("");
      reload();
    } catch (caught) {
      setTrashError(toUserMessage(caught, "Could not move this request to trash."));
    } finally {
      setTrashing(false);
    }
  };

  const handleSave = async () => {
    if (!id) return;
    setSaving(true);
    setSaveError(null);
    setSaved(false);
    try {
      await requestService.updateRequestStatus(id, status);
      await requestService.updateRequestPriority(id, priority);
      await requestService.updateCustomerUpdate(id, customerUpdate);
      await requestService.updateAdminFields(id, {
        notes: notes.trim() || null,
        quotedAmount: quote === "" ? null : Number(quote),
      });
      setSaved(true);
      reload();
    } catch (caught) {
      setSaveError(toUserMessage(caught, "Changes could not be saved."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Seo title={`Request ${request.requestNumber}`} noIndex />

      <Link
        to="/admin/requests"
        className="inline-flex items-center gap-2 rounded-md py-2 text-sm text-content-secondary transition-colors hover:text-content"
      >
        <ArrowLeft size={15} aria-hidden="true" />
        All requests
      </Link>

      <header className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight">
            {project.title}
          </h1>
          <p className="mt-1.5 font-mono text-sm text-content-secondary">
            {request.requestNumber}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone={REQUEST_STATUS_TONE[request.status]}>
            {request.status}
          </Badge>
          <Badge tone={REQUEST_PRIORITY_TONE[request.priority]}>
            {request.priority}
          </Badge>
        </div>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
        <div className="flex min-w-0 flex-col gap-8">
          <Block title="Contact">
            <Rows
              rows={[
                ["Name", contact.fullName],
                ["Email", contact.email],
                ["Phone", contact.phone],
                ["WhatsApp", contact.whatsapp],
                [
                  "Location",
                  [contact.city, contact.country].filter(Boolean).join(", ") ||
                    null,
                ],
                ["Prefers", contact.preferredContactMethod],
              ]}
            />
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={`mailto:${contact.email}?subject=${encodeURIComponent(`MECTEC ${request.requestNumber} — ${project.title}`)}`}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-line bg-surface-raised px-3.5 text-sm transition-colors hover:border-line-strong"
              >
                <Mail size={15} aria-hidden="true" />
                Email
              </a>
              {contact.whatsapp && (
                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-2 rounded-lg border border-line bg-surface-raised px-3.5 text-sm transition-colors hover:border-line-strong"
                >
                  <MessageCircle size={15} aria-hidden="true" />
                  WhatsApp
                </a>
              )}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="inline-flex h-9 items-center gap-2 rounded-lg border border-line bg-surface-raised px-3.5 text-sm transition-colors hover:border-line-strong"
                >
                  <Phone size={15} aria-hidden="true" />
                  Call
                </a>
              )}
            </div>
          </Block>

          <Block title="Project">
            <Rows
              rows={[
                ["Category", project.category],
                ["Type", project.type],
              ]}
            />
            {project.purpose && (
              <Paragraph label="Purpose" text={project.purpose} />
            )}
            <Paragraph label="Description" text={project.description} />
          </Block>

          <Block title="Technical">
            <Rows
              rows={[
                ["Platforms", list(technical.preferredPlatforms)],
                ["Connectivity", list(technical.connectivity)],
                ["Sensors", list(technical.sensors)],
                ["Outputs", list(technical.outputs)],
                ["Power source", technical.powerSource],
              ]}
            />
            {technical.powerRequirements && (
              <Paragraph
                label="Power notes"
                text={technical.powerRequirements}
              />
            )}
          </Block>

          <Block title="Software">
            <Rows
              rows={[
                ["Needs", list(softwareNeeds)],
                ["Languages", list(software.languages)],
              ]}
            />
            {software.notes && (
              <Paragraph label="Notes" text={software.notes} />
            )}
          </Block>

          <Block title="Scale, budget and timeline">
            <Rows
              rows={[
                ["Complexity", scale.complexity],
                ["Prototypes", scale.prototypeQuantity?.toString() ?? null],
                [
                  "Eventual quantity",
                  scale.estimatedQuantity?.toString() ?? null,
                ],
                ["Environment", scale.deploymentEnvironment],
                ["Budget range", budget.range],
                [
                  "Start date",
                  timeline.desiredStartDate
                    ? formatDate(timeline.desiredStartDate)
                    : null,
                ],
                [
                  "Deadline",
                  timeline.desiredDeadline
                    ? formatDate(timeline.desiredDeadline)
                    : null,
                ],
                ["Flexibility", timeline.flexibility],
                ["Urgency", timeline.urgency],
              ]}
            />
            {budget.notes && (
              <Paragraph label="Budget notes" text={budget.notes} />
            )}
          </Block>

          {(references.links.length > 0 || references.description) && (
            <Block title="References">
              {references.links.length > 0 && (
                <ul className="flex flex-col gap-1.5">
                  {references.links.map((link) => (
                    <li key={link}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all text-sm text-accent transition-colors hover:text-accent-hover"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              {references.description && (
                <Paragraph label="Notes" text={references.description} />
              )}
            </Block>
          )}

          {request.attachments.length > 0 && (
            <Block title="Attachments">
              <ul className="flex flex-col gap-2">
                {request.attachments.map((attachment) => (
                  <li key={attachment.storagePath}>
                    <a
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface-raised px-3 py-2.5 transition-colors hover:border-line-strong"
                    >
                      <span className="min-w-0 flex-1 truncate text-sm">
                        {attachment.name}
                      </span>
                      <span className="shrink-0 font-mono text-xs text-content-muted">
                        {formatFileSize(attachment.size)}
                      </span>
                      <Download
                        size={15}
                        className="shrink-0 text-content-muted"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </Block>
          )}

          <Block title="Additional">
            <Rows
              rows={[
                [
                  "Wants a consultation",
                  additional.consultationRequired ? "Yes" : "No",
                ],
                ["Has hardware", additional.hasExistingHardware ? "Yes" : "No"],
                ["Has code", additional.hasExistingCode ? "Yes" : "No"],
              ]}
            />
            {additional.existingHardwareDescription && (
              <Paragraph
                label="Existing hardware"
                text={additional.existingHardwareDescription}
              />
            )}
            {additional.existingCodeDescription && (
              <Paragraph
                label="Existing code"
                text={additional.existingCodeDescription}
              />
            )}
            {additional.specialRequirements && (
              <Paragraph
                label="Special requirements"
                text={additional.specialRequirements}
              />
            )}
            {additional.additionalNotes && (
              <Paragraph
                label="Other notes"
                text={additional.additionalNotes}
              />
            )}
          </Block>

          <Block title="Submission">
            <Rows
              rows={[
                ["Submitted", formatDateTime(request.createdAt as never)],
                ["Last updated", formatDateTime(request.updatedAt as never)],
                ["Source", request.metadata.source],
                [
                  "Consent to contact",
                  request.consent.allowContact ? "Given" : "Not given",
                ],
              ]}
            />
          </Block>
        </div>

        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="card p-5">
            <h2 className="text-sm font-medium">
              Internal — not visible to the client
            </h2>

            <div className="mt-4 flex flex-col gap-4">
              {saveError && <Alert tone="danger">{saveError}</Alert>}
              {saved && <Alert tone="success">Changes saved.</Alert>}

              <Field label="Status" htmlFor="status" required>
                <Select
                  id="status"
                  options={REQUEST_STATUSES}
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value as RequestStatus)
                  }
                />
              </Field>

              <Field label="Priority" htmlFor="priority" required>
                <Select
                  id="priority"
                  options={REQUEST_PRIORITIES}
                  value={priority}
                  onChange={(event) =>
                    setPriority(event.target.value as RequestPriority)
                  }
                />
              </Field>

              <Field
                label="Quoted amount"
                htmlFor="quote"
                hint={`In ${request.admin.currency}.`}
              >
                <TextInput
                  id="quote"
                  type="number"
                  min={0}
                  value={quote}
                  onChange={(event) => setQuote(event.target.value)}
                />
              </Field>

              <Field
                label="Customer update"
                htmlFor="customerUpdate"
                hint="Visible on the public Track Request page."
              >
                <TextArea
                  id="customerUpdate"
                  rows={5}
                  value={customerUpdate}
                  placeholder="Example: The PCB assembly is complete and firmware testing is underway."
                  onChange={(event) => setCustomerUpdate(event.target.value)}
                  maxLength={1000}
                />
              </Field>

              <Field label="Internal notes" htmlFor="notes">
                <TextArea
                  id="notes"
                  rows={6}
                  value={notes}
                  placeholder="Scoping thoughts, component ideas, what was discussed on the call."
                  onChange={(event) => setNotes(event.target.value)}
                />
              </Field>

              {request.deletedAt ? (
                <div className="rounded-lg border border-line bg-surface-raised p-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-content-muted">
                    <Trash2 size={15} aria-hidden="true" />
                    Request is in trash
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-content-muted">
                    Deleted by {request.deletedBy === "customer" ? "customer" : "admin"}. Restore it from Request Trash if needed.
                  </p>
                  <Link
                    to="/admin/requests/trash"
                    className="mt-3 inline-flex h-9 items-center justify-center rounded-lg border border-line bg-surface px-3.5 text-sm font-medium text-content transition-colors hover:border-line-strong hover:bg-surface-raised"
                  >
                    View Trash
                  </Link>
                </div>
              ) : (
                <>
                  {trashError && <Alert tone="danger">{trashError}</Alert>}
                  <Field
                    label="Project token"
                    htmlFor="projectToken"
                    required
                    hint="Required to move this request to trash, including during the protection window."
                  >
                    <TextInput
                      id="projectToken"
                      value={projectToken}
                      onChange={(event) => setProjectToken(event.target.value)}
                      placeholder="MECTEC-2026-ABSFDW"
                      autoComplete="off"
                      spellCheck={false}
                    />
                  </Field>
                  <Button
                    variant="danger"
                    onClick={() => void handleTrash()}
                    loading={trashing}
                    className="w-full"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Trash2 size={15} aria-hidden="true" />
                      {trashing ? "Moving to trash…" : "Move to trash"}
                    </span>
                  </Button>
                  <div className="flex items-start gap-2 rounded-lg border border-line bg-surface-raised p-3 text-xs text-content-muted">
                    <Clock3 size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                    <span>
                      The configured {trashWindowHours}-hour protection period normally prevents trashing.
                      A valid project token lets an administrator authorize the action before that period ends.
                    </span>
                  </div>
                </>
              )}

              <Button
                onClick={() => void handleSave()}
                loading={saving}
                className="w-full"
              >
                {saving ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

const list = (items: string[] | undefined) =>
  items && items.length ? items.join(", ") : null;

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line pt-6 first:border-0 first:pt-0">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

/** Rows with a null value are omitted, so empty optional fields never render. */
function Rows({ rows }: { rows: [string, string | null | undefined][] }) {
  const visible = rows.filter(([, value]) => value);
  if (visible.length === 0) return null;

  return (
    <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
      {visible.map(([label, value]) => (
        <div key={label}>
          <dt className="text-xs text-content-muted">{label}</dt>
          <dd className="mt-0.5 break-words text-sm text-content">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Paragraph({ label, text }: { label: string; text: string }) {
  return (
    <div className="mt-4">
      <p className="text-xs text-content-muted">{label}</p>
      <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-content-secondary">
        {text}
      </p>
    </div>
  );
}
