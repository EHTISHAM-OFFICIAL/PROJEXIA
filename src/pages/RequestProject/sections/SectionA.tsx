import type { UseFormReturn } from 'react-hook-form';
import { FormSection } from '../../../components/forms/FormSection';
import { Field, FieldSet } from '../../../components/forms/Field';
import { TextInput } from '../../../components/forms/Inputs';
import { RadioGroup } from '../../../components/forms/Choice';
import { CONTACT_METHODS } from '../../../constants/requestOptions';
import type { ProjectRequestFormValues } from '../../../utils/validation';

export function SectionA({ form }: { form: UseFormReturn<ProjectRequestFormValues> }) {
  const { register, watch, setValue, formState } = form;
  const errors = formState.errors;

  return (
    <FormSection
      id="contact"
      step={1}
      title="How to reach you"
      description="So MECTEC can reply. Your details are never published or shared."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="fullName" required error={errors.fullName?.message}>
          <TextInput
            id="fullName"
            autoComplete="name"
            hasError={Boolean(errors.fullName)}
            {...register('fullName')}
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

        <Field label="Phone" htmlFor="phone" error={errors.phone?.message}>
          <TextInput
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+92 300 1234567"
            hasError={Boolean(errors.phone)}
            {...register('phone')}
          />
        </Field>

        <Field label="WhatsApp" htmlFor="whatsapp" error={errors.whatsapp?.message}>
          <TextInput
            id="whatsapp"
            type="tel"
            inputMode="tel"
            placeholder="+92 300 1234567"
            hasError={Boolean(errors.whatsapp)}
            {...register('whatsapp')}
          />
        </Field>

        <Field label="Country" htmlFor="country" error={errors.country?.message}>
          <TextInput
            id="country"
            autoComplete="country-name"
            hasError={Boolean(errors.country)}
            {...register('country')}
          />
        </Field>

        <Field label="City" htmlFor="city" error={errors.city?.message}>
          <TextInput
            id="city"
            autoComplete="address-level2"
            hasError={Boolean(errors.city)}
            {...register('city')}
          />
        </Field>
      </div>

      <FieldSet
        legend="Preferred way to be contacted"
        required
        error={errors.preferredContactMethod?.message}
      >
        <RadioGroup
          name="preferredContactMethod"
          options={CONTACT_METHODS}
          value={watch('preferredContactMethod')}
          onChange={(value) =>
            setValue('preferredContactMethod', value as ProjectRequestFormValues['preferredContactMethod'], {
              shouldValidate: true,
            })
          }
        />
      </FieldSet>
    </FormSection>
  );
}
