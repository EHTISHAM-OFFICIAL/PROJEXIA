import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Save, LockKeyhole } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container } from '../../components/ui/Container';
import { Seo } from '../../components/ui/Seo';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { SectionA } from '../RequestProject/sections/SectionA';
import { SectionB } from '../RequestProject/sections/SectionB';
import { SectionC } from '../RequestProject/sections/SectionC';
import { SectionD } from '../RequestProject/sections/SectionD';
import { SectionE } from '../RequestProject/sections/SectionE';
import { SectionF } from '../RequestProject/sections/SectionF';
import { SectionG } from '../RequestProject/sections/SectionG';
import { SectionI } from '../RequestProject/sections/SectionI';
import { SectionJ } from '../RequestProject/sections/SectionJ';
import { requestService } from '../../services/requestService';
import { requestSettingsService } from '../../services/requestSettingsService';
import type { ProjectRequest } from '../../types/projectRequest';
import {
  projectRequestSchema,
  type ProjectRequestFormValues,
} from '../../utils/validation';
import { toUserMessage } from '../../utils/errors';

function dateValue(timestamp: ProjectRequest['timeline']['desiredStartDate']) {
  return timestamp ? timestamp.toDate().toISOString().slice(0, 10) : '';
}

function toFormValues(request: ProjectRequest): ProjectRequestFormValues {
  return {
    fullName: request.contact.fullName,
    email: request.contact.email,
    phone: request.contact.phone ?? '',
    whatsapp: request.contact.whatsapp ?? '',
    country: request.contact.country ?? '',
    city: request.contact.city ?? '',
    preferredContactMethod: request.contact.preferredContactMethod as ProjectRequestFormValues['preferredContactMethod'],
    projectTitle: request.project.title,
    projectCategory: request.project.category as ProjectRequestFormValues['projectCategory'],
    projectType: request.project.type as ProjectRequestFormValues['projectType'],
    projectPurpose: request.project.purpose ?? '',
    projectDescription: request.project.description,
    preferredPlatform: request.technical.preferredPlatforms ?? [],
    connectivity: request.technical.connectivity ?? [],
    sensors: request.technical.sensors ?? [],
    outputs: request.technical.outputs ?? [],
    powerSource: request.technical.powerSource ?? '',
    powerRequirements: request.technical.powerRequirements ?? '',
    requiresMobileApp: request.software.requiresMobileApp,
    requiresWebDashboard: request.software.requiresWebDashboard,
    requiresCloudDatabase: request.software.requiresCloudDatabase,
    requiresNotifications: request.software.requiresNotifications,
    requiresRemoteControl: request.software.requiresRemoteControl,
    softwareNotes: request.software.notes ?? '',
    possibleLanguages: request.software.languages ?? [],
    complexity: request.scale.complexity as ProjectRequestFormValues['complexity'],
    prototypeQuantity: request.scale.prototypeQuantity ?? '',
    estimatedQuantity: request.scale.estimatedQuantity ?? '',
    deploymentEnvironment: request.scale.deploymentEnvironment ?? '',
    budgetRange: request.budget.range ?? '',
    budgetNotes: request.budget.notes ?? '',
    desiredStartDate: dateValue(request.timeline.desiredStartDate),
    desiredDeadline: dateValue(request.timeline.desiredDeadline),
    timelineFlexibility: request.timeline.flexibility ?? '',
    urgency: request.timeline.urgency as ProjectRequestFormValues['urgency'],
    referenceLinks: request.references.links.length ? request.references.links : [''],
    referenceDescription: request.references.description ?? '',
    specialRequirements: request.additionalRequirements.specialRequirements ?? '',
    additionalNotes: request.additionalRequirements.additionalNotes ?? '',
    consultationRequired: request.additionalRequirements.consultationRequired,
    hasExistingHardware: request.additionalRequirements.hasExistingHardware,
    existingHardwareDescription: request.additionalRequirements.existingHardwareDescription ?? '',
    hasExistingCode: request.additionalRequirements.hasExistingCode,
    existingCodeDescription: request.additionalRequirements.existingCodeDescription ?? '',
    agreeToTerms: true,
    allowContact: true,
    website: '',
  };
}

export default function EditRequest() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [request, setRequest] = useState<ProjectRequest | null>(null);
  const [hours, setHours] = useState(24);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ProjectRequestFormValues>({
    resolver: zodResolver(projectRequestSchema),
    defaultValues: undefined,
    mode: 'onBlur',
  });

  useEffect(() => {
    if (!user || !id) return;

    Promise.all([
      requestService.getMyRequestById(id, user.uid),
      requestSettingsService.getSecuritySettings(),
    ])
      .then(([nextRequest, settings]) => {
        if (!nextRequest) {
          setError('This request could not be found.');
          return;
        }

        setRequest(nextRequest);
        setHours(settings.customerRequestEditWindowHours);
        form.reset(toFormValues(nextRequest));
      })
      .catch((caught) => setError(toUserMessage(caught, 'Could not load this request.')))
      .finally(() => setLoading(false));
  }, [user, id, form]);

  const editUntil = useMemo(() => {
    if (!request?.createdAt) return null;
    return request.createdAt.toMillis() + hours * 60 * 60 * 1000;
  }, [request, hours]);

  const canEdit = editUntil !== null && Date.now() < editUntil;

  const submit = async (values: ProjectRequestFormValues) => {
    if (!user || !id || !canEdit) {
      setError('The editing window for this request has ended.');
      return;
    }

    setError(null);

    try {
      await requestService.updateMyRequest(id, user.uid, values);
      navigate(`/account/requests/${id}`, { replace: true });
    } catch (caught) {
      setError(toUserMessage(caught, 'Could not save your changes.'));
    }
  };

  return (
    <>
      <Seo title="Edit request" noIndex />
      <Container className="py-12 sm:py-16">
        <Link to={`/account/requests/${id ?? ''}`} className="inline-flex items-center gap-2 text-sm text-content-secondary hover:text-content">
          <ArrowLeft size={15} /> Request
        </Link>

        <div className="mt-8">
          <h1 className="text-3xl font-semibold tracking-tight">Edit project request</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-content-secondary">
            You can change customer and project details until the configured editing window closes. Submitted attachments remain unchanged.
          </p>
        </div>

        {error && <div className="mt-6"><Alert tone="danger">{error}</Alert></div>}

        {!loading && !canEdit ? (
          <div className="mt-8 rounded-card border border-line bg-surface p-6">
            <div className="flex items-center gap-2 text-sm font-medium"><LockKeyhole size={16}/> Editing window closed</div>
            <p className="mt-2 text-sm text-content-secondary">This request is now read-only.</p>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(submit)} className="mt-10 flex flex-col gap-14">
            <SectionA form={form} />
            <SectionB form={form} />
            <SectionC form={form} />
            <SectionD form={form} />
            <SectionE form={form} />
            <SectionF form={form} />
            <SectionG form={form} />
            <section className="rounded-card border border-line bg-surface p-6">
              <h2 className="text-base font-semibold">References and attachments</h2>
              <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                Reference links and descriptions are editable below through the existing request fields. Existing attachments stay unchanged for security and consistency.
              </p>
            </section>
            <SectionI form={form} />
            <SectionJ form={form} />

            <div className="border-t border-line pt-8">
              <Button type="submit" size="lg" loading={form.formState.isSubmitting}>
                <span className="flex items-center gap-2"><Save size={16}/> Save changes</span>
              </Button>
            </div>
          </form>
        )}
      </Container>
    </>
  );
}
