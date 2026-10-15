import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Copy, Clock3 } from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Seo } from '../../components/ui/Seo';
import { Button, ButtonLink } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { SectionA } from './sections/SectionA';
import { SectionB } from './sections/SectionB';
import { SectionC } from './sections/SectionC';
import { SectionD } from './sections/SectionD';
import { SectionE } from './sections/SectionE';
import { SectionF } from './sections/SectionF';
import { SectionG } from './sections/SectionG';
import { SectionH } from './sections/SectionH';
import { SectionI } from './sections/SectionI';
import { SectionJ } from './sections/SectionJ';
import { requestService } from '../../services/requestService';
import { requestSettingsService } from '../../services/requestSettingsService';
import {
  projectRequestSchema,
  type ProjectRequestFormOutput,
  type ProjectRequestFormValues,
} from '../../utils/validation';
import { toUserMessage } from '../../utils/errors';
import { saveTrackedRequest } from '../../utils/trackedRequest';
import { SITE } from '../../constants/site';
import { useAuth } from '../../hooks/useAuth';
import { useSiteSettings } from '../../contexts/SiteSettingsContext';

const DEFAULT_VALUES: ProjectRequestFormValues = {
  fullName: '',
  email: '',
  phone: '',
  whatsapp: '',
  country: '',
  city: '',
  preferredContactMethod: 'Email',

  projectTitle: '',
  projectCategory: 'Arduino',
  projectType: 'Personal',
  projectPurpose: '',
  projectDescription: '',

  preferredPlatform: [],
  connectivity: [],
  sensors: [],
  outputs: [],
  powerSource: '',
  powerRequirements: '',

  requiresMobileApp: false,
  requiresWebDashboard: false,
  requiresCloudDatabase: false,
  requiresNotifications: false,
  requiresRemoteControl: false,
  softwareNotes: '',
  possibleLanguages: [],

  complexity: 'Not sure',
  prototypeQuantity: '',
  estimatedQuantity: '',
  deploymentEnvironment: '',

  budgetRange: '',
  budgetNotes: '',

  desiredStartDate: '',
  desiredDeadline: '',
  timelineFlexibility: '',
  urgency: 'Normal',

  referenceLinks: [''],
  referenceDescription: '',

  specialRequirements: '',
  additionalNotes: '',
  consultationRequired: false,
  hasExistingHardware: false,
  existingHardwareDescription: '',
  hasExistingCode: false,
  existingCodeDescription: '',

  agreeToTerms: false as unknown as true,
  allowContact: false as unknown as true,

  website: '',
};

const SECTION_LINKS = [
  { id: 'contact', label: 'Contact' },
  { id: 'basics', label: 'The project' },
  { id: 'technical', label: 'Technical' },
  { id: 'software', label: 'Software' },
  { id: 'scale', label: 'Scale' },
  { id: 'budget', label: 'Budget' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'references', label: 'References' },
  { id: 'additional', label: 'Anything else' },
  { id: 'consent', label: 'Send' },
];

export default function RequestProject() {
  const { settings } = useSiteSettings();
  const [files, setFiles] = useState<File[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<{ requestNumber: string; editDeadline: Date | null; editHours: number } | null>(null);
  const [copied, setCopied] = useState(false);
  const { user } = useAuth();

  const form = useForm<ProjectRequestFormValues>({
    resolver: zodResolver(projectRequestSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onBlur',
  });

  const { handleSubmit, formState } = form;
  const { isSubmitting, errors } = formState;
  const errorCount = Object.keys(errors).length;

  const onSubmit = async (values: ProjectRequestFormValues) => {
    setSubmitError(null);

    if (!user) {
      setSubmitError('Please log in before submitting a project request.');
      return;
    }

    // Honeypot: hidden from real users, so a value here means an automated submission.
    if (values.website) {
      setResult({ requestNumber: 'MECTEC-0000-000000', editDeadline: null, editHours: 24 });
      return;
    }

    try {
      const created = await requestService.createRequest(
        values as ProjectRequestFormOutput,
        files
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
          editDeadline = new Date(savedRequest.createdAt.toMillis() + editHours * 60 * 60 * 1000);
        }
      } catch {
        // The request is already saved; the account page remains the source of truth for the deadline.
      }

      setResult({
        requestNumber: created.requestNumber,
        editDeadline,
        editHours,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setSubmitError(
        toUserMessage(error, 'Your request could not be sent. Please try again in a moment.')
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
              {settings.name} will review the details and reply {SITE.responseTime} to the contact method you
              chose.
            </p>

            <div className="mt-6 rounded-lg border border-state-warning/30 bg-state-warning/5 p-5 text-left">
              <div className="flex items-start gap-3">
                <Clock3 size={18} className="mt-0.5 shrink-0 text-state-warning" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold">Important: your request has a limited editing window</p>
                  <p className="mt-1 text-sm leading-relaxed text-content-secondary">
                    You can edit or delete this request for the next {result.editHours} {result.editHours === 1 ? 'hour' : 'hours'} after submission.
                    {result.editDeadline
                      ? <> Your current deadline is <span className="font-medium text-content">{result.editDeadline.toLocaleString()}</span>.</>
                      : ' The exact deadline is also shown on your request details page.'}
                    {' '}After the window closes, the request becomes read-only.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-lg border border-line bg-surface p-5">
              <p className="text-sm text-content-muted">Your reference number</p>
              <p className="mt-2 font-mono text-lg text-content">{result.requestNumber}</p>
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
                {copied ? 'Copied' : 'Copy reference'}
              </button>
              <p className="mt-3 text-xs leading-relaxed text-content-muted">
                Quote this if you follow up by email or WhatsApp — or use it to{' '}
                <Link to={`/track-request?ref=${encodeURIComponent(result.requestNumber)}`} className="text-accent underline underline-offset-2 hover:text-accent-hover">
                  check the status
                </Link>{' '}
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

  if (!user) {
    return (
      <>
        <Seo title="Login required" path="/request-project" noIndex />
        <Container className="py-20 sm:py-28">
          <div className="mx-auto max-w-xl rounded-card border border-line bg-surface p-8 text-center sm:p-12">
            <p className="text-sm font-medium text-accent">MECTEC project requests</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">Log in to continue</h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-content-secondary">
              A MECTEC account is required to submit a project request. This lets you securely
              access your own requests and gives you a limited editing window after submission.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink to="/login?next=%2Frequest-project" size="lg">Log in</ButtonLink>
              <ButtonLink to="/register?next=%2Frequest-project" variant="secondary" size="lg">
                Create account
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
        title="Request a Custom Electronics Project"
        description="Tell MECTEC what you want to build. Submit a detailed project brief covering technical requirements, budget and timeline for a more useful first reply."
        path="/request-project"
      />

      <div className="border-b border-line">
        <Container className="py-14 sm:py-20">
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Request a project
          </h1>
          <p className="mt-5 max-w-prose text-base leading-relaxed text-content-secondary">
            Ten short sections. Only a handful of fields are required — skip anything technical you
            aren't sure about, and MECTEC will fill in the gaps when replying. Expect a response{' '}
            {SITE.responseTime}.
          </p>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid gap-12 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
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
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {section.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex min-w-0 flex-col gap-14">
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
              {...form.register('website')}
            />

            <div className="border-t border-line pt-8">
              {errorCount > 0 && (
                <Alert tone="danger" className="mb-5">
                  {errorCount === 1
                    ? 'One field needs attention before this can be sent. It is marked in red above.'
                    : `${errorCount} fields need attention before this can be sent. They are marked in red above.`}
                </Alert>
              )}

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button type="submit" size="lg" loading={isSubmitting}>
                  {isSubmitting
                    ? files.length
                      ? 'Uploading and sending…'
                      : 'Sending…'
                    : 'Send project request'}
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
