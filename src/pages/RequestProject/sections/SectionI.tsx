import type { UseFormReturn } from 'react-hook-form';
import { FormSection } from '../../../components/forms/FormSection';
import { Field, FieldSet } from '../../../components/forms/Field';
import { TextArea } from '../../../components/forms/Inputs';
import { Checkbox } from '../../../components/forms/Choice';
import type { ProjectRequestFormValues } from '../../../utils/validation';

export function SectionI({ form }: { form: UseFormReturn<ProjectRequestFormValues> }) {
  const { register, watch, formState } = form;
  const errors = formState.errors;

  const hasHardware = watch('hasExistingHardware');
  const hasCode = watch('hasExistingCode');

  return (
    <FormSection
      id="additional"
      step={9}
      title="Anything else"
      description="What you already have, and anything that hasn't been covered."
    >
      <FieldSet legend="What you already have">
        <div className="flex flex-col gap-4">
          <Checkbox
            id="hasExistingHardware"
            label="I already have some of the hardware"
            {...register('hasExistingHardware')}
          />
          {hasHardware && (
            <Field
              label="What hardware do you have?"
              htmlFor="existingHardwareDescription"
              required
              className="ml-7"
              error={errors.existingHardwareDescription?.message}
            >
              <TextArea
                id="existingHardwareDescription"
                rows={3}
                placeholder="List the boards, sensors or modules you already own."
                hasError={Boolean(errors.existingHardwareDescription)}
                {...register('existingHardwareDescription')}
              />
            </Field>
          )}

          <Checkbox
            id="hasExistingCode"
            label="I already have code for part of this"
            {...register('hasExistingCode')}
          />
          {hasCode && (
            <Field
              label="What code do you have?"
              htmlFor="existingCodeDescription"
              required
              className="ml-7"
              error={errors.existingCodeDescription?.message}
            >
              <TextArea
                id="existingCodeDescription"
                rows={3}
                placeholder="What it does, what language it is in, and whether it currently works."
                hasError={Boolean(errors.existingCodeDescription)}
                {...register('existingCodeDescription')}
              />
            </Field>
          )}

          <Checkbox
            id="consultationRequired"
            label="I'd like a call or meeting before work starts"
            {...register('consultationRequired')}
          />
        </div>
      </FieldSet>

      <Field
        label="Special requirements"
        htmlFor="specialRequirements"
        hint="Size limits, certification, safety rules, or anything the build must comply with."
        error={errors.specialRequirements?.message}
      >
        <TextArea
          id="specialRequirements"
          rows={3}
          hasError={Boolean(errors.specialRequirements)}
          {...register('specialRequirements')}
        />
      </Field>

      <Field label="Anything else" htmlFor="additionalNotes" error={errors.additionalNotes?.message}>
        <TextArea
          id="additionalNotes"
          rows={4}
          hasError={Boolean(errors.additionalNotes)}
          {...register('additionalNotes')}
        />
      </Field>
    </FormSection>
  );
}
