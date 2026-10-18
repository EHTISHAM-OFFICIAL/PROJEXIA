import { useState } from "react";
import { PageIntro } from "../../components/ui/PageIntro";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  Copy,
  Clock3,
  Cpu,
  GraduationCap,
  ArrowRight,
  Circle,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";
import { Container } from "../../components/ui/Container";
import { Seo } from "../../components/ui/Seo";
import { Button, ButtonLink } from "../../components/ui/Button";
import { Alert } from "../../components/ui/Alert";
import { SectionA } from "./sections/SectionA";
import { SectionB } from "./sections/SectionB";
import { SectionC } from "./sections/SectionC";
import { SectionD } from "./sections/SectionD";
import { SectionE } from "./sections/SectionE";
import { SectionF } from "./sections/SectionF";
import { SectionG } from "./sections/SectionG";
import { SectionH } from "./sections/SectionH";
import { SectionI } from "./sections/SectionI";
import { SectionJ } from "./sections/SectionJ";
import { requestService } from "../../services/requestService";
import { requestSettingsService } from "../../services/requestSettingsService";
import {
  projectRequestSchema,
  type ProjectRequestFormOutput,
  type ProjectRequestFormValues,
} from "../../utils/validation";
import { toUserMessage } from "../../utils/errors";
import { saveTrackedRequest } from "../../utils/trackedRequest";
import { SITE } from "../../constants/site";
import { useAuth } from "../../hooks/useAuth";
import { useSiteSettings } from "../../contexts/SiteSettingsContext";

const DEFAULT_VALUES: ProjectRequestFormValues = {
  fullName: "",
  email: "",
  phone: "",
  whatsapp: "",
  country: "",
  city: "",
  preferredContactMethod: "Email",

  projectTitle: "",
  projectCategory: "Arduino",
  projectType: "Personal",
  projectPurpose: "",
  projectDescription: "",

  preferredPlatform: [],
  connectivity: [],
  sensors: [],
  outputs: [],
  powerSource: "",
  powerRequirements: "",

  requiresMobileApp: false,
  requiresWebDashboard: false,
  requiresCloudDatabase: false,
  requiresNotifications: false,
  requiresRemoteControl: false,
  softwareNotes: "",
  possibleLanguages: [],

  complexity: "Not sure",
  prototypeQuantity: "",
  estimatedQuantity: "",
  deploymentEnvironment: "",

  budgetRange: "",
  budgetNotes: "",

  desiredStartDate: "",
  desiredDeadline: "",
  timelineFlexibility: "",
  urgency: "Normal",

  referenceLinks: [""],
  referenceDescription: "",

  specialRequirements: "",
  additionalNotes: "",
  consultationRequired: false,
  hasExistingHardware: false,
  existingHardwareDescription: "",
  hasExistingCode: false,
  existingCodeDescription: "",

  agreeToTerms: false as unknown as true,
  allowContact: false as unknown as true,

  website: "",
};

const SECTION_LINKS = [
  { id: "contact", label: "Contact" },
  { id: "basics", label: "The project" },
  { id: "technical", label: "Technical" },
  { id: "software", label: "Software" },
  { id: "scale", label: "Scale" },
  { id: "budget", label: "Budget" },
  { id: "timeline", label: "Timeline" },
  { id: "references", label: "References" },
  { id: "additional", label: "Anything else" },
  { id: "consent", label: "Send" },
];

export default function RequestProject() {
  const { settings } = useSiteSettings();
  const [files, setFiles] = useState<File[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    requestNumber: string;
    editDeadline: Date | null;
    editHours: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [serviceChoice, setServiceChoice] = useState<
    "electronics" | "school" | null
  >(null);
  const { user } = useAuth();

  const form = useForm<ProjectRequestFormValues>({
    resolver: zodResolver(projectRequestSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const { handleSubmit, formState } = form;
  const { isSubmitting, errors } = formState;
  const errorCount = Object.keys(errors).length;
  const watchedValues = form.watch();
  const sectionCompletion: Record<string, boolean> = {
    contact: Boolean(
      watchedValues.fullName?.trim() && watchedValues.email?.trim(),
    ),
    basics: Boolean(
      watchedValues.projectTitle?.trim() &&
      watchedValues.projectDescription?.trim(),
    ),
    technical: Boolean(
      watchedValues.preferredPlatform?.length ||
      watchedValues.connectivity?.length ||
      watchedValues.sensors?.length ||
      watchedValues.outputs?.length ||
      watchedValues.powerSource ||
      watchedValues.powerRequirements?.trim(),
    ),
    software: Boolean(
      watchedValues.requiresMobileApp ||
      watchedValues.requiresWebDashboard ||
      watchedValues.requiresCloudDatabase ||
      watchedValues.requiresNotifications ||
      watchedValues.requiresRemoteControl ||
      watchedValues.softwareNotes?.trim() ||
      watchedValues.possibleLanguages?.length,
    ),
    scale: Boolean(
      watchedValues.prototypeQuantity ||
      watchedValues.estimatedQuantity ||
      watchedValues.deploymentEnvironment,
    ),
    budget: Boolean(
      watchedValues.budgetRange || watchedValues.budgetNotes?.trim(),
    ),
    timeline: Boolean(
      watchedValues.desiredStartDate ||
      watchedValues.desiredDeadline ||
      watchedValues.timelineFlexibility ||
      watchedValues.urgency !== "Normal",
    ),
    references: Boolean(
      watchedValues.referenceLinks?.some((link) => Boolean(link?.trim())) ||
      watchedValues.referenceDescription?.trim() ||
      files.length,
    ),
    additional: Boolean(
      watchedValues.specialRequirements?.trim() ||
      watchedValues.additionalNotes?.trim() ||
      watchedValues.hasExistingHardware ||
      watchedValues.hasExistingCode ||
      watchedValues.consultationRequired,
    ),
    consent: Boolean(watchedValues.agreeToTerms && watchedValues.allowContact),
  };
  const completedSections =
    Object.values(sectionCompletion).filter(Boolean).length;

  const onSubmit = async (values: ProjectRequestFormValues) => {
    setSubmitError(null);

    if (!user) {
      setSubmitError("Please log in before submitting a project request.");
      return;
    }

    // Honeypot: hidden from real users, so a value here means an automated submission.
    if (values.website) {
      setResult({
        requestNumber: "PROJEXIAHUB-0000-000000",
        editDeadline: null,
        editHours: 24,
      });
      return;
    }

    try {
      const created = await requestService.createRequest(
        values as ProjectRequestFormOutput,
        files,
      );
      saveTrackedRequest({
        requestNumber: created.requestNumber,
        email: values.email,
        projectTitle: values.projectTitle,
      });

      let editDeadline: Date | null = null;
      let editHours = 24;
      try {
        const [settings, savedRequest] = await Promise.all([
          requestSettingsService.getSecuritySettings(),
          requestService.getMyRequestById(created.id, user.uid),
        ]);
        editHours = settings.customerRequestEditWindowHours;
        if (savedRequest?.createdAt) {
          editDeadline = new Date(
            savedRequest.createdAt.toMillis() + editHours * 60 * 60 * 1000,
          );
        }
      } catch {
        // The request is already saved; the account page remains the source of truth for the deadline.
      }

      setResult({
        requestNumber: created.requestNumber,
        editDeadline,
        editHours,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setSubmitError(
        toUserMessage(
          error,
          "Your request could not be sent. Please try again in a moment.",
        ),
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (result) {
    return (
      <>
        <Seo title="Request received" path="/request-project" noIndex />
        <Container className="py-20">
          <div className="mx-auto max-w-xl rounded-card border border-state-success/25 bg-state-success/5 p-8 text-center sm:p-12">
            <CheckCircle2
              size={30}
              className="mx-auto text-state-success"
              aria-hidden="true"
            />
            <h1 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
              Request received
            </h1>
            <p className="mt-4 text-base leading-relaxed text-content-secondary">
              {settings.name} will review the details and reply{" "}
              {SITE.responseTime} to the contact method you chose.
            </p>

            <div className="mt-6 rounded-lg border border-state-warning/30 bg-state-warning/5 p-5 text-left">
              <div className="flex items-start gap-3">
                <Clock3
                  size={18}
                  className="mt-0.5 shrink-0 text-state-warning"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold">
                    Important: your request has a limited editing window
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-content-secondary">
                    You can edit or delete this request for the next{" "}
                    {result.editHours}{" "}
                    {result.editHours === 1 ? "hour" : "hours"} after
                    submission.
                    {result.editDeadline ? (
                      <>
                        {" "}
                        Your current deadline is{" "}
                        <span className="font-medium text-content">
                          {result.editDeadline.toLocaleString()}
                        </span>
                        .
                      </>
                    ) : (
                      " The exact deadline is also shown on your request details page."
                    )}{" "}
                    After the window closes, the request becomes read-only.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-lg border border-line bg-surface p-5">
              <p className="text-sm text-content-muted">
                Your reference number
              </p>
              <p className="mt-2 font-mono text-lg text-content">
                {result.requestNumber}
              </p>
              <button
                type="button"
                onClick={() => {
                  void navigator.clipboard.writeText(result.requestNumber);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="mt-3 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-accent transition-colors hover:text-accent-hover"
              >
                <Copy size={14} aria-hidden="true" />
                {copied ? "Copied" : "Copy reference"}
              </button>
              <p className="mt-3 text-xs leading-relaxed text-content-muted">
                Quote this if you follow up by email or WhatsApp — or use it to{" "}
                <Link
                  to={`/track-request?ref=${encodeURIComponent(result.requestNumber)}`}
                  className="text-accent underline underline-offset-2 hover:text-accent-hover"
                >
                  check the status
                </Link>{" "}
                any time.
              </p>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink to="/projects" variant="secondary">
                Browse projects
              </ButtonLink>
              <ButtonLink to="/">Back to home</ButtonLink>
            </div>
          </div>
        </Container>
      </>
    );
  }

  if (!serviceChoice) {
    return (
      <>
        <Seo
          title="Choose a Project Type"
          description="Choose whether you need an electronics or mechanical build, or a school chart or educational model."
          path="/request-project"
          noIndex
        />
        <PageIntro
          eyebrow="Start a project"
          title="What would you like to request?"
          description="Choose the service that best matches what you need. We’ll show you the relevant request options."
        />
        <Container className="py-8 sm:py-12">
          <div className="mx-auto max-w-5xl">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-content-muted">
                  Choose your service
                </p>
                <h2 className="mt-1 text-lg font-semibold">
                  Two request paths, one clear starting point
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-content-secondary">
                You can skip details you do not know. Each form focuses on the
                questions relevant to that kind of work.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setServiceChoice("electronics")}
                className="group flex min-h-80 flex-col rounded-2xl border border-line bg-surface p-6 text-left transition duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:p-8"
              >
                <div className="flex w-full items-start justify-between gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Cpu size={25} />
                  </span>
                  <span className="rounded-full border border-line px-2.5 py-1 text-xs text-content-muted">
                    Technical build
                  </span>
                </div>
                <h2 className="mt-5 text-xl font-semibold tracking-tight">
                  Electronics & Mechanical Projects
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                  For custom technical builds, prototypes and automation
                  ideas—from early concepts to detailed requirements.
                </p>
                <ul className="mt-4 grid gap-2 text-sm text-content-secondary sm:grid-cols-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-accent" />
                    Arduino / ESP32 / IoT
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-accent" />
                    Robotics & control
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-accent" />
                    Sensors & electronics
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-accent" />
                    Mechanical prototypes
                  </li>
                </ul>
                <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-accent">
                  Build my project brief{" "}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </button>
              <Link
                to="/request-school-model"
                className="group flex min-h-80 flex-col rounded-2xl border border-line bg-surface p-6 text-left transition duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:p-8"
              >
                <div className="flex w-full items-start justify-between gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <GraduationCap size={25} />
                  </span>
                  <span className="rounded-full border border-line px-2.5 py-1 text-xs text-content-muted">
                    Education & display
                  </span>
                </div>
                <h2 className="mt-5 text-xl font-semibold tracking-tight">
                  School Charts & Educational Models
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                  For teaching aids, classroom demonstrations and school
                  exhibitions, including custom-made models.
                </p>
                <ul className="mt-4 grid gap-2 text-sm text-content-secondary sm:grid-cols-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-accent" />
                    Science & biology charts
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-accent" />
                    3D & working models
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-accent" />
                    Exhibition projects
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-accent" />
                    Custom classroom aids
                  </li>
                </ul>
                <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-accent">
                  Request a school model{" "}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </div>
            <div className="mt-5 flex flex-col gap-3 rounded-xl border border-line bg-surface/60 p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-relaxed text-content-secondary">
                <span className="font-semibold text-content">
                  No fixed price shown for school models.
                </span>{" "}
                Final pricing and timing are confirmed after the scope, quantity
                and requirements are reviewed.
              </p>
              <span className="shrink-0 text-xs text-content-muted">
                You can switch services later
              </span>
            </div>
          </div>
        </Container>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Seo title="Login required" path="/request-project" noIndex />
        <Container className="py-20 sm:py-28">
          <div className="mx-auto max-w-xl rounded-card border border-line bg-surface p-8 text-center sm:p-12">
            <p className="text-sm font-medium text-accent">
              ProjexiaHub project requests
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              Log in to continue
            </h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-content-secondary">
              A ProjexiaHub account is required to submit a project request.
              This lets you securely access your own requests and gives you a
              limited editing window after submission.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink to="/login?next=%2Frequest-project" size="lg">
                Log in
              </ButtonLink>
              <ButtonLink
                to="/register?next=%2Frequest-project"
                variant="secondary"
                size="lg"
              >
                Create account
              </ButtonLink>
              <ButtonLink
                to="/request-school-model"
                variant="secondary"
                size="lg"
              >
                Request a school model instead
              </ButtonLink>
            </div>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <Seo
        title="Request an Electronics or Mechanical Project"
        description="Tell ProjexiaHub what you want to build. Submit a detailed project brief covering technical requirements, budget and timeline for a more useful first reply."
        path="/request-project"
      />

      <PageIntro
        eyebrow="Start a project"
        title="Request a project"
        description={
          <>
            Ten short sections. Only a handful of fields are required — skip
            anything technical you aren't sure about, and ProjexiaHub will fill
            in the gaps when replying. Expect a response {SITE.responseTime}.
          </>
        }
      />

      <Container className="pt-5">
        <div className="mb-2 flex flex-col gap-3 rounded-2xl border border-line bg-surface p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Cpu size={20} />
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-content-muted">
                Selected service
              </p>
              <p className="text-sm font-semibold">
                Electronics / Mechanical Project
              </p>
            </div>
          </div>
          <Link
            to="/request-school-model"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-accent/30 px-4 py-2 text-sm font-semibold text-accent transition hover:bg-accent/10"
          >
            Switch to School Charts & Models <ArrowRight size={15} />
          </Link>
        </div>
      </Container>
      <Container className="pt-5">
        <section
          className="rounded-2xl border border-line bg-surface/70 p-4 sm:p-5"
          aria-label="Request progress"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <ClipboardList size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold">Your project brief</p>
                <p className="mt-1 text-xs leading-relaxed text-content-muted">
                  {completedSections} of {SECTION_LINKS.length} sections have
                  details. Technical sections are optional — skip anything
                  you’re unsure about.
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-content-secondary">
              <ShieldCheck size={16} className="text-accent" /> Private request
              · Quote after review
            </span>
          </div>
          <div
            className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-raised"
            role="progressbar"
            aria-label="Project request sections completed"
            aria-valuemin={0}
            aria-valuemax={SECTION_LINKS.length}
            aria-valuenow={completedSections}
          >
            <div
              className="h-full rounded-full bg-accent transition-[width]"
              style={{
                width: (completedSections / SECTION_LINKS.length) * 100 + "%",
              }}
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2 lg:hidden">
            {SECTION_LINKS.map((section, index) => (
              <a
                key={section.id}
                href={"#" + section.id}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-2 text-xs transition hover:bg-surface-raised"
              >
                <span className="font-mono text-content-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {sectionCompletion[section.id] ? (
                  <CheckCircle2 size={13} className="text-state-success" />
                ) : (
                  <Circle size={13} className="text-content-muted" />
                )}
                {section.label}
              </a>
            ))}
          </div>
        </section>
      </Container>
      <Container className="py-8 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12">
          <nav aria-label="Form sections" className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-sm font-medium text-content">Sections</p>
              <ol className="mt-4 flex flex-col gap-1">
                {SECTION_LINKS.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex items-baseline gap-2.5 rounded-md px-2 py-1.5 text-sm text-content-secondary transition-colors hover:bg-surface hover:text-content"
                    >
                      <span className="font-mono text-xs text-content-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {sectionCompletion[section.id] ? (
                        <CheckCircle2
                          size={14}
                          className="shrink-0 text-state-success"
                          aria-hidden="true"
                        />
                      ) : (
                        <Circle
                          size={14}
                          className="shrink-0 text-content-muted"
                          aria-hidden="true"
                        />
                      )}
                      <span className="flex-1">{section.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex min-w-0 flex-col gap-12"
          >
            {submitError && <Alert tone="danger">{submitError}</Alert>}

            <SectionA form={form} />
            <SectionB form={form} />
            <SectionC form={form} />
            <SectionD form={form} />
            <SectionE form={form} />
            <SectionF form={form} />
            <SectionG form={form} />
            <SectionH
              form={form}
              files={files}
              onFilesChange={setFiles}
              uploading={isSubmitting}
            />
            <SectionI form={form} />
            <SectionJ form={form} />

            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute h-0 w-0 opacity-0"
              {...form.register("website")}
            />

            <div className="border-t border-line pt-8">
              {errorCount > 0 && (
                <Alert tone="danger" className="mb-5">
                  {errorCount === 1
                    ? "One field needs attention before this can be sent. It is marked in red above."
                    : `${errorCount} fields need attention before this can be sent. They are marked in red above.`}
                </Alert>
              )}

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button type="submit" size="lg" loading={isSubmitting}>
                  {isSubmitting
                    ? files.length
                      ? "Uploading and sending…"
                      : "Sending…"
                    : "Send project request"}
                </Button>
                <p className="text-sm text-content-secondary">
                  You'll get a reference number as soon as this is sent.
                </p>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
