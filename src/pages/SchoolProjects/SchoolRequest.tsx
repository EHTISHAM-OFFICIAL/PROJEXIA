import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Copy, GraduationCap, ShieldCheck } from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { PageIntro } from '../../components/ui/PageIntro';
import { Seo } from '../../components/ui/Seo';
import { Button, ButtonLink } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { Field, FieldSet } from '../../components/forms/Field';
import { Select, TextArea, TextInput } from '../../components/forms/Inputs';
import { RadioGroup } from '../../components/forms/Choice';
import { FileUpload } from '../../components/forms/FileUpload';
import { FormSection } from '../../components/forms/FormSection';
import { schoolModelService } from '../../services/schoolModelService';
import type { SchoolModel } from '../../services/schoolModelService';
import { useAuth } from '../../hooks/useAuth';

const CUSTOM_MODEL: SchoolModel = {
  id: 'custom', title: '', slug: 'custom', category: 'Others', subcategory: '', modelType: 'Custom model', difficulty: '', status: 'Available for quote', subject: '', gradeRange: '',
  shortDescription: '', description: '', problemStatement: '', workingPrinciple: '', howToUse: '', materials: [], objectives: [], features: [], customizationOptions: [], setupInstructions: '', maintenanceNotes: '', safetyNotes: '', components: [], specifications: [], tags: [], dimensions: '', estimatedBuildTime: '',
  thumbnailUrl: '', heroImageUrl: '', galleryUrls: [], videoUrl: '', documentationUrl: '', featured: false, published: false, seoTitle: '',
  seoDescription: '', keywords: [], createdAt: null, updatedAt: null,
};
const SECTIONS = [
  { id: 'school-contact', label: 'Contact' },
  { id: 'school-model-choice', label: 'Model' },
  { id: 'school-learning', label: 'Learning needs' },
  { id: 'school-build-requirements', label: 'Build requirements' },
  { id: 'school-specifications', label: 'Size & quantity' },
  { id: 'school-budget-timeline', label: 'Budget & timing' },
  { id: 'school-references', label: 'References' },
  { id: 'school-extra', label: 'Anything else' },
  { id: 'school-consent', label: 'Review & send' },
];
const inputClass = 'h-11 w-full rounded-xl border border-line bg-bg px-3 text-sm text-content placeholder:text-content-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15';
const textareaClass = 'w-full rounded-xl border border-line bg-bg p-3 text-sm text-content placeholder:text-content-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15';

export default function SchoolRequest() {
  const [params] = useSearchParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [model, setModel] = useState<SchoolModel | null>(null);
  const [models, setModels] = useState<SchoolModel[]>([]);
  const [customTitle, setCustomTitle] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [contactMethod, setContactMethod] = useState('Email');
  const [grade, setGrade] = useState('');
  const [purpose, setPurpose] = useState('');
  const [modelFormat, setModelFormat] = useState('Not sure yet');
  const [interaction, setInteraction] = useState('Not sure yet');
  const [preferredMaterials, setPreferredMaterials] = useState('');
  const [labelLanguage, setLabelLanguage] = useState('English');
  const [assemblyRequirement, setAssemblyRequirement] = useState('Not sure');
  const [displayEnvironment, setDisplayEnvironment] = useState('Classroom');
  const [powerRequirements, setPowerRequirements] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [dimensions, setDimensions] = useState('');
  const [deadline, setDeadline] = useState('');
  const [startDate, setStartDate] = useState('');
  const [flexibility, setFlexibility] = useState('Some flexibility');
  const [urgency, setUrgency] = useState('Normal');
  const [budgetRange, setBudgetRange] = useState('');
  const [budgetNotes, setBudgetNotes] = useState('');
  const [customization, setCustomization] = useState('');
  const [details, setDetails] = useState('');
  const [referenceLinks, setReferenceLinks] = useState<string[]>(['']);
  const [referenceDescription, setReferenceDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [number, setNumber] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let live = true;
    const slug = params.get('slug');
    void schoolModelService.getPublished().then((list) => {
      if (!live) return;
      setModels(list);
      if (slug) setModel(list.find((item) => item.slug === slug) ?? null);
    }).catch(() => { if (live) setModels([]); });
    return () => { live = false; };
  }, [params]);

  useEffect(() => {
    if (user?.email && !email) setEmail(user.email);
    if (user?.displayName && !name) setName(user.displayName);
  }, [user, email, name]);

  const selectedModel = model?.id === 'custom' ? { ...CUSTOM_MODEL, title: customTitle.trim() || 'Custom school model / chart' } : model;
  const sectionCompletion: Record<string, boolean> = {
    'school-contact': Boolean(name.trim() && email.trim()),
    'school-model-choice': Boolean(model && (model.id !== 'custom' || customTitle.trim())),
    'school-learning': Boolean(details.trim().length >= 20 || purpose.trim()),
    'school-build-requirements': Boolean(modelFormat !== 'Not sure yet' || interaction !== 'Not sure yet' || preferredMaterials.trim() || labelLanguage !== 'English' || assemblyRequirement !== 'Not sure' || displayEnvironment !== 'Classroom' || powerRequirements.trim()),
    'school-specifications': Boolean(quantity.trim() && Number.isInteger(Number(quantity)) && Number(quantity) >= 1),
    'school-budget-timeline': Boolean(budgetRange || budgetNotes.trim() || deadline || startDate),
    'school-references': Boolean(referenceLinks.some((link) => link.trim()) || files.length || referenceDescription.trim()),
    'school-extra': Boolean(customization.trim() || additionalNotes.trim()),
    'school-consent': consent,
  };
  const filled = Object.values(sectionCompletion).filter(Boolean).length;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    if (!user) {
      setError('Please sign in using the account link above. Your draft is still on this page; once signed in, return here and submit again.');
      return;
    }
    if (!model) { setError('Choose a published model or select “Custom / not listed”.'); return; }
    if (model.id === 'custom' && !customTitle.trim()) { setError('Give your custom chart or model a working title.'); return; }
    if (!name.trim() || !email.trim()) { setError('Add your name and email so we can reply.'); return; }
    if (!Number.isInteger(Number(quantity)) || Number(quantity) < 1) { setError('Quantity must be a whole number of at least one.'); return; }
    if (details.trim().length < 20) { setError('Please describe what you need in at least 20 characters.'); return; }
    if (!consent) { setError('Please confirm that we may contact you about this quote request.'); return; }

    setBusy(true);
    try {
      const requestNumber = await schoolModelService.requestQuote({
        model: { ...model, title: model.id === 'custom' ? customTitle.trim() : model.title },
        name: name.trim(), email: email.trim(), phone: phone.trim(), whatsapp: whatsapp.trim(),
        country: country.trim(), city: city.trim(), preferredContactMethod: contactMethod,
        grade: grade.trim(), purpose: purpose.trim(), modelFormat, interaction, preferredMaterials: preferredMaterials.trim(), labelLanguage, assemblyRequirement, displayEnvironment, powerRequirements: powerRequirements.trim(), quantity, dimensions: dimensions.trim(),
        deadline, startDate, timelineFlexibility: flexibility, urgency, budgetRange,
        budgetNotes: budgetNotes.trim(), customization: customization.trim(), details: details.trim(), additionalNotes: additionalNotes.trim(),
        referenceLinks: referenceLinks.map((link) => link.trim()).filter(Boolean),
        referenceDescription: referenceDescription.trim(), files,
      });
      setNumber(requestNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not submit your quote request. Please try again.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally { setBusy(false); }
  };

  if (number) return (
    <>
      <Seo title="Quote request submitted" noIndex />
      <Container className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl rounded-2xl border border-state-success/25 bg-state-success/5 p-7 text-center sm:p-12">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-state-success/10 text-state-success"><CheckCircle2 size={30}/></span>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-state-success">Request received</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Your quote request is in.</h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-content-secondary">We’ll review your model, quantity, size, timing and any references or attachments before preparing a response. This is a quote request, not a confirmed order.</p>
          <div className="mt-7 rounded-xl border border-line bg-surface p-5 text-left">
            <p className="text-xs font-medium uppercase tracking-wide text-content-muted">Your reference number</p>
            <p className="mt-2 break-all font-mono text-lg font-semibold">{number}</p>
            <button type="button" onClick={() => { void navigator.clipboard.writeText(number); setCopied(true); }} className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover"><Copy size={15}/>{copied ? 'Copied reference' : 'Copy reference'}</button>
          </div>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button onClick={() => navigate('/track-request?ref=' + encodeURIComponent(number))}>Track request <ArrowRight size={16}/></Button>
            <ButtonLink to="/school-projects" variant="secondary">Browse school models</ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );

  return (
    <>
      <Seo title="Request a School Chart or Educational Model" description="Send a detailed quote request for a school chart, classroom learning aid or educational model." path="/request-school-model" noIndex />
      <PageIntro eyebrow="School & learning · Custom quote" title="Tell us what you need." description="Choose a catalog model or describe a custom idea. Share only what you know — size, quantity, learning goals and references help us prepare a more useful quote."/>
      <Container className="pt-5">
        <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-start gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent"><GraduationCap size={22}/></span><div><p className="text-xs font-semibold uppercase tracking-wide text-content-muted">Selected service</p><p className="mt-1 font-semibold">School Charts & Educational Models</p><p className="mt-1 text-sm text-content-secondary">Quote-based · No fixed price assumed</p></div></div>
          <Link to="/request-project" className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-lg border border-line px-4 py-2 text-sm font-medium text-content transition hover:bg-surface-raised sm:self-center">Need an electronics / mechanical project instead? <ArrowRight size={15}/></Link>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-10">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-xl border border-line bg-surface p-4">
              <p className="text-sm font-semibold">Your request</p>
              <p className="mt-1 text-xs text-content-muted">{filled} of {SECTIONS.length} checkpoints covered</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-raised"><div className="h-full rounded-full bg-accent transition-all" style={{width: (filled / SECTIONS.length * 100) + '%'}}/></div>
              <nav aria-label="Quote request sections" className="mt-4 flex flex-col gap-1">
                {SECTIONS.map((section, index) => <a key={section.id} href={'#' + section.id} className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-content-secondary transition hover:bg-surface-raised hover:text-content"><span className="font-mono text-[11px] text-content-muted">{String(index + 1).padStart(2, '0')}</span>{sectionCompletion[section.id] ? <CheckCircle2 size={14} className="shrink-0 text-state-success"/> : <span className="h-3.5 w-3.5 shrink-0 rounded-full border border-line"/>}<span className="flex-1">{section.label}</span></a>)}
              </nav>
              <div className="mt-4 rounded-lg bg-surface-raised p-3"><ShieldCheck size={16} className="text-accent"/><p className="mt-2 text-xs leading-relaxed text-content-muted">Your contact details and request are used to respond to this enquiry.</p></div>
            </div>
          </aside>
          <nav aria-label="Quote request sections" className="flex flex-wrap gap-2 lg:hidden">
            {SECTIONS.map((section, index) => <a key={section.id} href={'#' + section.id} className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-2 text-xs text-content-secondary transition hover:bg-surface-raised"><span className="font-mono text-content-muted">{String(index + 1).padStart(2, '0')}</span>{sectionCompletion[section.id] ? <CheckCircle2 size={13} className="text-state-success"/> : <span className="h-3 w-3 rounded-full border border-line"/>}{section.label}</a>)}
          </nav>
          <form onSubmit={submit} className="min-w-0 space-y-12">
            {error && <Alert tone="danger">{error}</Alert>}
            {!user && <div className="rounded-xl border border-accent/25 bg-accent/5 p-4"><p className="text-sm font-semibold">Sign in before submitting</p><p className="mt-1 text-sm leading-relaxed text-content-secondary">You can keep preparing this form. Open sign-in in a new tab; your draft will stay here, and you can submit after signing in.</p><div className="mt-3 flex flex-wrap gap-3"><a target="_blank" rel="noreferrer" href={'/login?next='+encodeURIComponent(location.pathname+location.search)} className="text-sm font-semibold text-accent hover:underline">Log in</a><a target="_blank" rel="noreferrer" href={'/register?next='+encodeURIComponent(location.pathname+location.search)} className="text-sm font-semibold text-accent hover:underline">Create account</a></div></div>}

            <FormSection id="school-contact" step={1} title="How to reach you" description="We need a reliable way to reply. Your details are not displayed on the public catalog.">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" required><TextInput autoComplete="name" maxLength={100} value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your name"/></Field>
                <Field label="Email address" required><TextInput type="email" autoComplete="email" maxLength={200} value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com"/></Field>
                <Field label="Phone" hint="Optional"><TextInput type="tel" autoComplete="tel" maxLength={30} value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="+92…"/></Field>
                <Field label="WhatsApp" hint="Optional"><TextInput type="tel" maxLength={30} value={whatsapp} onChange={(e)=>setWhatsapp(e.target.value)} placeholder="+92…"/></Field>
                <Field label="Country"><TextInput autoComplete="country-name" maxLength={80} value={country} onChange={(e)=>setCountry(e.target.value)} placeholder="Country"/></Field>
                <Field label="City"><TextInput autoComplete="address-level2" maxLength={80} value={city} onChange={(e)=>setCity(e.target.value)} placeholder="City"/></Field>
              </div>
              <FieldSet legend="Preferred way to be contacted"><RadioGroup name="school-contact-method" options={['Email','WhatsApp','Phone']} value={contactMethod} onChange={setContactMethod}/></FieldSet>
            </FormSection>

            <FormSection id="school-model-choice" step={2} title="Choose the model" description="Pick a published item or choose custom if you have a different idea.">
              {!params.get('slug') || !model ? <Field label="School chart or educational model" required>
                <Select value={model?.id || ''} onChange={(e)=>setModel(e.target.value === 'custom' ? CUSTOM_MODEL : models.find((item)=>item.id === e.target.value) ?? null)} options={models.map((item)=>({value:item.id,label:item.title+' — '+item.category+(item.subcategory?' / '+item.subcategory:'')+(item.modelType?' · '+item.modelType:'')})).concat([{value:'custom',label:'Custom / not listed'}])} placeholder="Choose an item"/>
              </Field> : <div className="rounded-xl border border-line bg-surface-raised p-4"><p className="text-xs font-semibold uppercase tracking-wide text-content-muted">Selected catalog item</p><p className="mt-1 font-semibold">{model?.title || 'Loading selected model…'}</p><Link to="/school-projects" className="mt-2 inline-flex text-sm text-accent hover:underline">Choose another from the catalog</Link></div>}
              {model?.id === 'custom' && <Field label="Working title for your custom model" required hint="A simple name is enough; you can explain the full idea below."><TextInput value={customTitle} maxLength={120} onChange={(e)=>setCustomTitle(e.target.value)} placeholder="e.g. Working model of a hydraulic lift"/></Field>}
              {selectedModel && <div className="overflow-hidden rounded-xl border border-accent/20 bg-accent/5 sm:flex">{selectedModel.thumbnailUrl && <img src={selectedModel.thumbnailUrl} alt="" className="aspect-[16/9] w-full object-cover sm:w-40"/>}<div className="min-w-0 flex-1 p-4"><div className="flex flex-wrap gap-2 text-xs"><span className="rounded-full bg-accent/10 px-2.5 py-1 text-accent">{selectedModel.category}</span>{selectedModel.subject && <span className="rounded-full bg-surface px-2.5 py-1 text-content-secondary">{selectedModel.subject}</span>}{selectedModel.gradeRange && <span className="rounded-full bg-surface px-2.5 py-1 text-content-secondary">{selectedModel.gradeRange}</span>}{selectedModel.modelType && <span className="rounded-full bg-surface px-2.5 py-1 text-content-secondary">{selectedModel.modelType}</span>}{selectedModel.difficulty && <span className="rounded-full bg-surface px-2.5 py-1 text-content-secondary">{selectedModel.difficulty}</span>}</div><p className="mt-2 font-semibold">{selectedModel.title}</p><p className="mt-1 text-sm leading-relaxed text-content-secondary">{selectedModel.shortDescription || 'Custom request — describe your idea and intended use below.'}</p><button type="button" onClick={() => setModel(null)} className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline">Choose a different model <ArrowRight size={13}/></button></div></div>}
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Subject or topic" hint="Optional"><TextInput value={purpose} maxLength={200} onChange={(e)=>setPurpose(e.target.value)} placeholder="e.g. biology, water cycle, electricity"/></Field>
                <Field label="Grade / class"><TextInput value={grade} maxLength={120} onChange={(e)=>setGrade(e.target.value)} placeholder="e.g. Class 8, college exhibition"/></Field>
              </div>
            </FormSection>

            <FormSection id="school-learning" step={3} title="Learning goals & content" description="Tell us what the model should teach, demonstrate or help explain.">
              <Field label="What should students learn or understand?" required hint="At least 20 characters. Describe the concept, process or key parts to show."><TextArea rows={6} maxLength={4000} value={details} onChange={(e)=>setDetails(e.target.value)} placeholder="Explain the concept, what needs to be visible or movable, how it will be demonstrated, and any labels or language needed."/></Field>
              <Field label="Customization" hint="Optional"><TextArea rows={3} maxLength={1200} value={customization} onChange={(e)=>setCustomization(e.target.value)} placeholder="Colors, labels, language, working parts, school logo, accessibility or special instructions"/></Field>
            </FormSection>

            <FormSection id="school-build-requirements" step={4} title="Build & classroom requirements" description="These choices help distinguish a printed chart from a physical or working model. Choose what you know; “not sure” is completely fine.">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Preferred model format" hint="Choose the closest match."><Select value={modelFormat} onChange={(e) => setModelFormat(e.target.value)} options={['Not sure yet','Printed / laminated chart','Static 3D model','Working mechanical model','Electrical / electronic demonstration','Interactive display','Exhibition centerpiece','Digital / presentation aid']}/></Field>
                <Field label="How should it work?" hint="Optional; helps us understand moving or powered parts."><Select value={interaction} onChange={(e) => setInteraction(e.target.value)} options={['Not sure yet','Display only, no moving parts','Manual moving parts','Powered / motorized movement','Lights, sensors or electronics','Hands-on student interaction']}/></Field>
                <Field label="Preferred materials" hint="Optional; alternatives can be suggested after review."><TextInput value={preferredMaterials} maxLength={200} onChange={(e) => setPreferredMaterials(e.target.value)} placeholder="e.g. wood, acrylic, foam board, recycled material"/></Field>
                <Field label="Label / content language"><Select value={labelLanguage} onChange={(e) => setLabelLanguage(e.target.value)} options={['English','Urdu','English and Urdu','Other / discuss']}/></Field>
                <Field label="Assembly needed?" hint="For large displays or multi-part models."><Select value={assemblyRequirement} onChange={(e) => setAssemblyRequirement(e.target.value)} options={['Not sure','Ready to display','Basic assembly is fine','Assembly instructions needed','On-site setup requested']}/></Field>
                <Field label="Where will it be used?" hint="Helps plan stability, portability and finish."><Select value={displayEnvironment} onChange={(e) => setDisplayEnvironment(e.target.value)} options={['Classroom','Wall display','Tabletop demonstration','School exhibition / competition','Laboratory','Outdoor display','Multiple locations']}/></Field>
              </div>
              <Field label="Power, electronics or special mechanism requirements" hint="Optional. Mention a power source, moving parts, switches, lighting, sound or other practical constraints."><TextArea rows={3} maxLength={600} value={powerRequirements} onChange={(e) => setPowerRequirements(e.target.value)} placeholder="e.g. battery powered, safe for classroom use, no exposed wiring, easy to transport"/></Field>
            </FormSection>

            <FormSection id="school-specifications" step={5} title="Size, quantity & delivery" description="Estimates are fine. If you do not know the exact dimensions, leave them blank.">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Quantity" required hint="How many copies or models?"><TextInput type="number" min={1} value={quantity} onChange={(e)=>setQuantity(e.target.value)} placeholder="1"/></Field>
                <Field label="Approximate dimensions" hint="Optional"><TextInput value={dimensions} maxLength={120} onChange={(e)=>setDimensions(e.target.value)} placeholder="e.g. 60 × 90 cm, tabletop size"/></Field>
              </div>
            </FormSection>

            <FormSection id="school-budget-timeline" step={6} title="Budget & timing" description="These details help us judge scope. A quote is confirmed only after review.">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Budget range" hint="Optional"><Select value={budgetRange} onChange={(e)=>setBudgetRange(e.target.value)} options={['Under PKR 2,000','PKR 2,000–5,000','PKR 5,000–10,000','PKR 10,000–25,000','PKR 25,000+','Not decided yet']} placeholder="No budget set"/></Field>
                <Field label="Preferred start date"><TextInput type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)}/></Field>
                <Field label="Needed by"><TextInput type="date" min={startDate || undefined} value={deadline} onChange={(e)=>setDeadline(e.target.value)}/></Field>
                <Field label="Timeline flexibility"><Select value={flexibility} onChange={(e)=>setFlexibility(e.target.value)} options={['Flexible','Some flexibility','Fixed deadline','Not sure']}/></Field>
              </div>
              <FieldSet legend="Urgency"><RadioGroup name="school-urgency" options={['Normal','Urgent']} value={urgency} onChange={setUrgency}/></FieldSet>
              <Field label="Budget notes" hint="Optional"><TextArea rows={3} maxLength={800} value={budgetNotes} onChange={(e)=>setBudgetNotes(e.target.value)} placeholder="Budget includes materials, delivery, or any constraints we should know about."/></Field>
            </FormSection>

            <FormSection id="school-references" step={7} title="References & attachments" description="Photos, sketches or links make it easier to understand what you have in mind.">
              <FieldSet legend="Reference links" hint="Add a YouTube video, example image, or webpage.">
                <div className="space-y-2">{referenceLinks.map((link,index)=><div key={index} className="flex gap-2"><TextInput type="url" value={link} onChange={(e)=>setReferenceLinks((current)=>current.map((item,i)=>i===index?e.target.value:item))} placeholder="https://…"/><button type="button" disabled={referenceLinks.length===1} onClick={()=>setReferenceLinks((current)=>current.filter((_,i)=>i!==index))} className="rounded-lg border border-line px-3 text-sm text-content-secondary hover:bg-surface-raised disabled:opacity-40" aria-label="Remove reference link">×</button></div>)}</div>
                <button type="button" onClick={()=>setReferenceLinks((current)=>current.length<8?[...current,'']:current)} disabled={referenceLinks.length>=8} className="mt-3 inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm font-medium hover:bg-surface-raised disabled:opacity-40"><span aria-hidden="true">+</span> Add another link</button>
              </FieldSet>
              <Field label="What should we notice in these references?"><TextArea rows={3} maxLength={1200} value={referenceDescription} onChange={(e)=>setReferenceDescription(e.target.value)} placeholder="Mention what you like, what must be different, or which details matter."/></Field>
              <FieldSet legend="Images & sketches" hint="Upload photos, diagrams or sketches that help explain your idea."><FileUpload files={files} onChange={setFiles} disabled={busy}/></FieldSet>
            </FormSection>

            <FormSection id="school-extra" step={8} title="Anything else?" description="Anything about use, handling or the school event that has not been covered.">
              <Field label="Additional requirements"><TextArea rows={4} maxLength={1600} value={additionalNotes} onChange={(e)=>setAdditionalNotes(e.target.value)} placeholder="Any additional context, classroom constraints, event details or delivery notes."/></Field>
              <div className="rounded-xl border border-line bg-surface p-4"><p className="text-sm font-semibold">Before submitting</p><p className="mt-1 text-sm leading-relaxed text-content-secondary">This sends a request for review, not a confirmed order. Final scope, price and timing will be shared after your requirements are reviewed.</p></div>
            </FormSection>

            <FormSection id="school-consent" step={9} title="Review & send" description="Please confirm that we may contact you about this specific request.">
              <label className="flex items-start gap-3 rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed text-content"><input type="checkbox" checked={consent} onChange={(e)=>setConsent(e.target.checked)} className="mt-1 h-4 w-4 accent-accent"/><span>I confirm these details are accurate to the best of my knowledge and agree that PROJEXIAHUB may contact me about this quote request.<span className="mt-1 block text-xs text-content-muted">Your details are used to respond to this enquiry, not to publish a listing.</span></span></label>
              {error && <Alert tone="danger">{error}</Alert>}
              <div className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center"><Button type="submit" loading={busy} disabled={busy}>{busy ? 'Uploading & sending…' : 'Submit quote request'} <ArrowRight size={16}/></Button><p className="text-xs leading-relaxed text-content-muted">Required: contact details, model choice, quantity, 20+ characters describing requirements, and consent.</p></div>
            </FormSection>
          </form>
        </div>
      </Container>
    </>
  );
}
