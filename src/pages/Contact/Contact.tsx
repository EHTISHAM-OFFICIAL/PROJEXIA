import { useState } from 'react';
import { PageIntro } from '../../components/ui/PageIntro';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Clock, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Seo } from '../../components/ui/Seo';
import { Button, ButtonLink } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { Field } from '../../components/forms/Field';
import { TextArea, TextInput } from '../../components/forms/Inputs';
import { contactService } from '../../services/contactService';
import { contactSchema, type ContactFormValues } from '../../utils/validation';
import { toUserMessage } from '../../utils/errors';
import { SITE, SOCIAL_LINKS, whatsappLink } from '../../constants/site';
import { useSiteSettings } from '../../contexts/SiteSettingsContext';

const activeSocials = SOCIAL_LINKS.filter((social) => social.href);

export default function Contact() {
  const { settings } = useSiteSettings();
  const [submitState, setSubmitState] = useState<'idle' | 'sent'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const whatsapp = settings.showWhatsapp ? whatsappLink(`Hello ${settings.name}, I have a question about a project.`, settings.whatsapp) : null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '', website: '' },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitError(null);
    // Honeypot: a real person never sees or fills this field.
    if (values.website) {
      setSubmitState('sent');
      return;
    }
    try {
      await contactService.sendMessage(values);
      reset();
      setSubmitState('sent');
    } catch (error) {
      setSubmitError(toUserMessage(error, 'Your message could not be sent. Please try again.'));
    }
  };

  return (
    <>
      <Seo
        title={`Contact ${settings.name}`}
        description={`Get in touch with ${settings.name} about an electronics project. Replies usually ${SITE.responseTime}.`}
        path="/contact"
      />

      <PageIntro
        eyebrow="Get in touch"
        title="Contact"
        description="Questions about a build, a quote, or whether something is feasible — send a message. For a full project brief, the request form collects more useful detail."
      />

      <Container className="py-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Send a message</h2>

            {submitState === 'sent' ? (
              <div className="mt-6 rounded-card border border-state-success/25 bg-state-success/5 p-8">
                <CheckCircle2 size={22} className="text-state-success" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold">Message sent</h3>
                <p className="mt-2 max-w-prose text-sm leading-relaxed text-content-secondary">
                  Thanks for getting in touch. {settings.name} replies {SITE.responseTime}, usually to the
                  email address you provided.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button variant="secondary" size="sm" onClick={() => setSubmitState('idle')}>
                    Send another message
                  </Button>
                  <ButtonLink to="/request-project" size="sm">
                    Request a project
                  </ButtonLink>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 flex flex-col gap-5">
                {submitError && <Alert tone="danger">{submitError}</Alert>}

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Your name" htmlFor="name" required error={errors.name?.message}>
                    <TextInput
                      id="name"
                      autoComplete="name"
                      hasError={Boolean(errors.name)}
                      {...register('name')}
                    />
                  </Field>

                  <Field label="Email" htmlFor="email" required error={errors.email?.message}>
                    <TextInput
                      id="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      hasError={Boolean(errors.email)}
                      {...register('email')}
                    />
                  </Field>
                </div>

                <Field label="Subject" htmlFor="subject" required error={errors.subject?.message}>
                  <TextInput
                    id="subject"
                    placeholder="What is this about?"
                    hasError={Boolean(errors.subject)}
                    {...register('subject')}
                  />
                </Field>

                <Field label="Message" htmlFor="message" required error={errors.message?.message}>
                  <TextArea
                    id="message"
                    rows={7}
                    placeholder="Describe what you need. The more detail, the more useful the reply."
                    hasError={Boolean(errors.message)}
                    {...register('message')}
                  />
                </Field>

                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute h-0 w-0 opacity-0"
                  {...register('website')}
                />

                <div>
                  <Button type="submit" loading={isSubmitting}>
                    {isSubmitting ? 'Sending…' : 'Send message'}
                  </Button>
                </div>
              </form>
            )}
          </div>

          <aside className="flex flex-col gap-5">
            <div className="card p-5">
              <h2 className="text-sm font-medium">Reach {settings.name} directly</h2>
              <ul className="mt-4 flex flex-col gap-4 text-sm">
                {settings.showEmail && settings.email && (
                  <li className="flex gap-3">
                    <Mail size={16} className="mt-0.5 shrink-0 text-content-muted" aria-hidden="true" />
                    <a href={`mailto:${settings.email}`} className="break-all text-content-secondary transition-colors hover:text-content">
                      {settings.email}
                    </a>
                  </li>
                )}
                {settings.showPhone && settings.phone && (
                  <li className="flex gap-3">
                    <MessageCircle size={16} className="mt-0.5 shrink-0 text-content-muted" aria-hidden="true" />
                    <a href={`tel:${settings.phone.replace(/[^+0-9]/g, '')}`} className="text-content-secondary transition-colors hover:text-content">
                      {settings.phone}
                    </a>
                  </li>
                )}
                {whatsapp && (
                  <li className="flex gap-3">
                    <MessageCircle
                      size={16}
                      className="mt-0.5 shrink-0 text-content-muted"
                      aria-hidden="true"
                    />
                    <a
                      href={whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-content-secondary transition-colors hover:text-content"
                    >
                      Message on WhatsApp
                    </a>
                  </li>
                )}
                {settings.showAddress && settings.address && (
                  <li className="flex gap-3">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-content-muted" aria-hidden="true" />
                    <span className="text-content-secondary">{settings.address}</span>
                  </li>
                )}
                <li className="flex gap-3">
                  <Clock size={16} className="mt-0.5 shrink-0 text-content-muted" aria-hidden="true" />
                  <span className="text-content-secondary">Replies {SITE.responseTime}</span>
                </li>
              </ul>

              {activeSocials.length > 0 && (
                <div className="mt-5 border-t border-line pt-4">
                  <h3 className="text-sm font-medium">Elsewhere</h3>
                  <ul className="mt-3 flex flex-col gap-2">
                    {activeSocials.map((social) => (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-content-secondary transition-colors hover:text-content"
                        >
                          {social.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="card p-5">
              <h2 className="text-base font-semibold tracking-tight">Have a full brief?</h2>
              <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                The project request form covers platform, sensors, budget and timeline — so the
                first reply can include a real estimate.
              </p>
              <ButtonLink to="/request-project" size="sm" className="mt-4 w-full">
                Request a project
              </ButtonLink>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
