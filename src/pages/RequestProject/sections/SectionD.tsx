import type { UseFormReturn } from 'react-hook-form';
import { FormSection } from '../../../components/forms/FormSection';
import { Field, FieldSet } from '../../../components/forms/Field';
import { TextArea } from '../../../components/forms/Inputs';
import { Checkbox, CheckboxGroup } from '../../../components/forms/Choice';
import { LANGUAGE_OPTIONS } from '../../../constants/requestOptions';
import type { ProjectRequestFormValues } from '../../../utils/validation';

const SOFTWARE_FEATURES = [
  { name: 'requiresMobileApp', label: 'A mobile app to control or monitor it' },
  { name: 'requiresWebDashboard', label: 'A web dashboard showing live data' },
  { name: 'requiresCloudDatabase', label: 'Cloud storage for readings and history' },
  { name: 'requiresNotifications', label: 'Alerts or notifications when something happens' },
  { name: 'requiresRemoteControl', label: 'Control it from somewhere else, over the internet' },
] as const;

export function SectionD({ form }: { form: UseFormReturn<ProjectRequestFormValues> }) {
  const { register, watch, setValue, formState } = form;
  const errors = formState.errors;

  return (
    <FormSection
      id="software"
      step={4}
      title="Software side"
      description="Does the hardware need anything beyond the device itself?"
    >
      <FieldSet legend="Software features needed">
        <div className="flex flex-col gap-3">
          {SOFTWARE_FEATURES.map((feature) => (
            <Checkbox
              key={feature.name}
              id={feature.name}
              label={feature.label}
              {...register(feature.name)}
            />
          ))}
        </div>
      </FieldSet>

      <FieldSet legend="Preferred programming languages" hint="Only if you have a requirement.">
        <CheckboxGroup
          name="possibleLanguages"
          options={LANGUAGE_OPTIONS}
          value={(watch('possibleLanguages') ?? []) as string[]}
          onChange={(next) => setValue('possibleLanguages', next, { shouldDirty: true })}
        />
      </FieldSet>

      <Field label="Software notes" htmlFor="softwareNotes" error={errors.softwareNotes?.message}>
        <TextArea
          id="softwareNotes"
          rows={4}
          placeholder="Anything about how the software should behave, or systems it needs to work with."
          hasError={Boolean(errors.softwareNotes)}
          {...register('softwareNotes')}
        />
      </Field>
    </FormSection>
  );
}
