import { useState } from 'react';
import { PageIntro } from '../../components/ui/PageIntro';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarDays, CheckCircle2, Clock3, Video } from 'lucide-react';
import { z } from 'zod';
import { Container } from '../../components/ui/Container';
import { Seo } from '../../components/ui/Seo';
import { Button, ButtonLink } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { Field } from '../../components/forms/Field';
import { Select, TextArea, TextInput } from '../../components/forms/Inputs';
import { meetingService } from '../../services/meetingService';
import { toUserMessage } from '../../utils/errors';
import { useAuth } from '../../hooks/useAuth';

const schema = z.object({
  fullName: z.string().trim().min(2, 'Enter your full name.').max(100),
  email: z.string().trim().email('Enter a valid email address.').max(200),
  phone: z.string().trim().max(30).optional(), whatsapp: z.string().trim().max(30).optional(),
  country: z.string().trim().max(80).optional(), city: z.string().trim().max(80).optional(),
  purpose: z.enum(['Project consultation','Discuss an existing project request','Technical discussion','General inquiry']),
  preferredDate: z.string().min(1, 'Choose a preferred date.'), preferredTime: z.string().min(1, 'Choose a preferred time.'),
  timezone: z.string().min(1), duration: z.enum(['15 minutes','30 minutes','60 minutes']),
  method: z.enum(['Google Meet','WhatsApp','Phone call','Face-to-face']),
  discussion: z.string().trim().min(10, 'Tell us what you would like to discuss.').max(3000),
  projectReference: z.string().trim().max(80).optional(), additionalNotes: z.string().trim().max(2000).optional(),
  website: z.string().max(0).optional(),
});
const purposes = ['Project consultation','Discuss an existing project request','Technical discussion','General inquiry'].map(value => ({value,label:value}));
const durations = ['15 minutes','30 minutes','60 minutes'].map(value => ({value,label:value}));
const methods = ['Google Meet','WhatsApp','Phone call','Face-to-face'].map(value => ({value,label:value}));
const timezones = [
  {value:'Asia/Karachi',label:'Pakistan Standard Time (UTC+05:00)'},{value:'UTC',label:'UTC'},
  {value:'Europe/London',label:'United Kingdom'},{value:'Europe/Berlin',label:'Central Europe'},
  {value:'America/New_York',label:'Eastern Time (US/Canada)'},{value:'America/Los_Angeles',label:'Pacific Time (US/Canada)'}
];
type FormValues = z.infer<typeof schema>;

export default function BookMeeting() {
  const [sent,setSent]=useState(false); const [error,setError]=useState<string|null>(null); const { user } = useAuth();
  const {register,handleSubmit,reset,formState:{errors,isSubmitting}}=useForm<FormValues>({
    resolver:zodResolver(schema),
    defaultValues:{fullName:'',email:'',phone:'',whatsapp:'',country:'',city:'',purpose:'Project consultation',
      preferredDate:'',preferredTime:'',timezone:'Asia/Karachi',duration:'30 minutes',method:'Google Meet',
      discussion:'',projectReference:'',additionalNotes:'',website:''}
  });

  if (!user) {
    return <>
      <Seo title="Login required" path="/book-meeting" noIndex />
      <Container className="py-20 sm:py-28">
        <div className="mx-auto max-w-xl rounded-card border border-line bg-surface p-8 text-center sm:p-12">
          <p className="text-sm font-medium text-accent">ProjexiaHub meetings</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Log in to continue</h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-content-secondary">
            A ProjexiaHub account is required to request a meeting. This keeps meeting requests connected to your account and lets you manage your requests securely.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink to="/login?next=%2Fbook-meeting" size="lg">Log in</ButtonLink>
            <ButtonLink to="/register?next=%2Fbook-meeting" variant="secondary" size="lg">Create account</ButtonLink>
          </div>
        </div>
      </Container>
    </>;
  }
  const onSubmit=async(values:FormValues)=>{
    setError(null); if(values.website){setSent(true);return;}
    try { const {website: _website,...meeting}=values; await meetingService.createMeeting(meeting); reset(); setSent(true); }
    catch(e){setError(toUserMessage(e,'Your meeting request could not be submitted. Please try again.'));}
  };
  return <>
    <Seo title="Book a Meeting with ProjexiaHub" description="Request a meeting with ProjexiaHub to discuss an electronics project, technical question, or existing project request." path="/book-meeting"/>
    <PageIntro
      eyebrow="Talk with ProjexiaHub"
      title="Book a Meeting"
      description="Choose a preferred time and tell us what you want to discuss. This is a meeting request, not an instant calendar booking — ProjexiaHub will review it and confirm the meeting."
    />
    <Container className="py-14"><div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16"><div>
      {sent ? <div className="rounded-card border border-state-success/25 bg-state-success/5 p-8"><CheckCircle2 size={24} className="text-state-success"/><h2 className="mt-4 text-2xl font-semibold">Meeting request received</h2><p className="mt-3 max-w-prose text-sm leading-relaxed text-content-secondary">Thanks. ProjexiaHub will review your preferred time and contact you using the details you provided to confirm the meeting.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button variant="secondary" size="sm" onClick={()=>setSent(false)}>Request another meeting</Button><ButtonLink to="/request-project" size="sm">Request a project</ButtonLink></div></div> :
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-8">{error&&<Alert tone="danger">{error}</Alert>}
        <section><h2 className="text-xl font-semibold">How to reach you</h2><p className="mt-1 text-sm text-content-secondary">So ProjexiaHub can confirm the meeting.</p><div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field label="Full name" htmlFor="fullName" required error={errors.fullName?.message}><TextInput id="fullName" autoComplete="name" hasError={!!errors.fullName} {...register('fullName')}/></Field>
          <Field label="Email" htmlFor="email" required error={errors.email?.message}><TextInput id="email" type="email" autoComplete="email" hasError={!!errors.email} {...register('email')}/></Field>
          <Field label="Phone" htmlFor="phone"><TextInput id="phone" type="tel" autoComplete="tel" {...register('phone')}/></Field>
          <Field label="WhatsApp" htmlFor="whatsapp"><TextInput id="whatsapp" type="tel" {...register('whatsapp')}/></Field>
          <Field label="Country" htmlFor="country"><TextInput id="country" autoComplete="country-name" {...register('country')}/></Field>
          <Field label="City" htmlFor="city"><TextInput id="city" autoComplete="address-level2" {...register('city')}/></Field>
        </div></section>
        <section className="border-t border-line pt-8"><h2 className="text-xl font-semibold">The meeting</h2><div className="mt-5 flex flex-col gap-5">
          <Field label="What is the meeting about?" htmlFor="purpose" required><Select id="purpose" options={purposes} {...register('purpose')}/></Field>
          <div className="grid gap-5 sm:grid-cols-2"><Field label="Preferred date" htmlFor="preferredDate" required error={errors.preferredDate?.message}><TextInput id="preferredDate" type="date" {...register('preferredDate')}/></Field><Field label="Preferred time" htmlFor="preferredTime" required error={errors.preferredTime?.message}><TextInput id="preferredTime" type="time" {...register('preferredTime')}/></Field></div>
          <Field label="Time zone" htmlFor="timezone" required><Select id="timezone" options={timezones} {...register('timezone')}/></Field>
          <div className="grid gap-5 sm:grid-cols-2"><Field label="Meeting duration" htmlFor="duration" required><Select id="duration" options={durations} {...register('duration')}/></Field><Field label="Preferred meeting method" htmlFor="method" required><Select id="method" options={methods} {...register('method')}/></Field></div>
        </div></section>
        <section className="border-t border-line pt-8"><h2 className="text-xl font-semibold">What should we discuss?</h2><div className="mt-5 flex flex-col gap-5">
          <Field label="Discussion" htmlFor="discussion" required hint="A clear description helps ProjexiaHub prepare for the conversation." error={errors.discussion?.message}><TextArea id="discussion" rows={7} placeholder="What do you want to discuss?" {...register('discussion')}/></Field>
          <Field label="Project reference" htmlFor="projectReference"><TextInput id="projectReference" placeholder="e.g. ProjexiaHub-2026-ABC123" {...register('projectReference')}/></Field>
          <Field label="Additional notes" htmlFor="additionalNotes"><TextArea id="additionalNotes" rows={4} {...register('additionalNotes')}/></Field>
        </div></section>
        <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute h-0 w-0 opacity-0" {...register('website')}/>
        <Button type="submit" loading={isSubmitting}>{isSubmitting?'Submitting…':'Request meeting'}</Button>
      </form>}
    </div>
    <aside className="flex flex-col gap-5"><div className="card p-5"><CalendarDays size={20} className="text-accent"/><h2 className="mt-4 text-base font-semibold">How it works</h2><ul className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-content-secondary"><li>1. Choose a preferred date and time.</li><li>2. Tell ProjexiaHub what you want to discuss.</li><li>3. ProjexiaHub reviews the request.</li><li>4. You receive confirmation before the meeting.</li></ul></div><div className="card p-5"><Clock3 size={20} className="text-content-muted"/><h2 className="mt-4 text-base font-semibold">Need a full project quote?</h2><p className="mt-2 text-sm leading-relaxed text-content-secondary">Use the project request form when you already know what you want built and need a detailed technical review.</p><ButtonLink to="/request-project" variant="secondary" size="sm" className="mt-4 w-full">Request a project</ButtonLink></div><div className="card p-5"><Video size={20} className="text-content-muted"/><h2 className="mt-4 text-base font-semibold">Meeting format</h2><p className="mt-2 text-sm leading-relaxed text-content-secondary">Meetings are confirmed individually. The final meeting method, time and link are confirmed by ProjexiaHub.</p></div></aside>
    </div></Container>
  </>;
}
