import type { UseFormReturn } from 'react-hook-form';
import { FormSection } from '../../../components/forms/FormSection';
import { Field, FieldSet } from '../../../components/forms/Field';
import { Select, TextArea } from '../../../components/forms/Inputs';
import { CheckboxGroup } from '../../../components/forms/Choice';
import {
  CONNECTIVITY_OPTIONS,
  OUTPUT_OPTIONS,
  PLATFORM_OPTIONS,
  POWER_SOURCES,
  SENSOR_OPTIONS,
} from '../../../constants/requestOptions';
import type { ProjectRequestFormValues } from '../../../utils/validation';

export function SectionC({ form }: { form: UseFormReturn<ProjectRequestFormValues> }) {
  const { register, watch, setValue, formState } = form;
  const errors = formState.errors;

  const multi = (name: 'preferredPlatform' | 'connectivity' | 'sensors' | 'outputs') => ({
    value: (watch(name) ?? []) as string[],
    onChange: (next: string[]) => setValue(name, next, { shouldDirty: true }),
  });

  return (
    <FormSection
      id="technical"
      step={3}
      title="Technical preferences"
      description="All optional. Skip anything you're unsure about — MECTEC will recommend the parts."
    >
      <FieldSet legend="Preferred platform" hint="Choose any that would suit, or leave blank.">
        <CheckboxGroup name="preferredPlatform" options={PLATFORM_OPTIONS} {...multi('preferredPlatform')} />
      </FieldSet>

      <FieldSet legend="Connectivity" hint="How should the device communicate, if at all?">
        <CheckboxGroup name="connectivity" options={CONNECTIVITY_OPTIONS} {...multi('connectivity')} />
      </FieldSet>

      <FieldSet legend="Sensors and inputs" hint="What does it need to measure or detect?">
        <CheckboxGroup name="sensors" options={SENSOR_OPTIONS} {...multi('sensors')} />
      </FieldSet>

      <FieldSet legend="Outputs and actuators" hint="What does it need to display, drive or switch?">
        <CheckboxGroup name="outputs" options={OUTPUT_OPTIONS} {...multi('outputs')} />
      </FieldSet>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Power source" htmlFor="powerSource" error={errors.powerSource?.message}>
          <Select
            id="powerSource"
            options={POWER_SOURCES}
            placeholder="No preference"
            hasError={Boolean(errors.powerSource)}
            {...register('powerSource')}
          />
        </Field>
      </div>

      <Field
        label="Power notes"
        htmlFor="powerRequirements"
        hint="For example: must run 12 hours on battery, or mains power is available nearby."
        error={errors.powerRequirements?.message}
      >
        <TextArea
          id="powerRequirements"
          rows={3}
          hasError={Boolean(errors.powerRequirements)}
          {...register('powerRequirements')}
        />
      </Field>
    </FormSection>
  );
}
