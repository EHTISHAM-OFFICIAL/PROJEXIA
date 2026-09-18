import type { UseFormReturn } from 'react-hook-form';
import { FormSection } from '../../../components/forms/FormSection';
import { Field, FieldSet } from '../../../components/forms/Field';
import { Select, TextInput } from '../../../components/forms/Inputs';
import { RadioGroup } from '../../../components/forms/Choice';
import { TIMELINE_FLEXIBILITY, URGENCY_OPTIONS } from '../../../constants/requestOptions';
import type { ProjectRequestFormValues } from '../../../utils/validation';

export function SectionG({ form }: { form: UseFormReturn<ProjectRequestFormValues> }) {
  const { register, watch, setValue, formState } = form;
  const errors = formState.errors;
  const today = new Date().toISOString().slice(0, 10);

  return (
    <FormSection
      id="timeline"
      step={7}
      title="Timeline"
      description="Hard deadlines matter — say so early if you have one."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Ideal start date"
          htmlFor="desiredStartDate"
          error={errors.desiredStartDate?.message}
        >
          <TextInput
            id="desiredStartDate"
            type="date"
            min={today}
            hasError={Boolean(errors.desiredStartDate)}
            {...register('desiredStartDate')}
          />
        </Field>

        <Field label="Deadline" htmlFor="desiredDeadline" error={errors.desiredDeadline?.message}>
          <TextInput
            id="desiredDeadline"
            type="date"
            min={today}
            hasError={Boolean(errors.desiredDeadline)}
            {...register('desiredDeadline')}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="How flexible is that?"
          htmlFor="timelineFlexibility"
          error={errors.timelineFlexibility?.message}
        >
          <Select
            id="timelineFlexibility"
            options={TIMELINE_FLEXIBILITY}
            placeholder="Choose one"
            hasError={Boolean(errors.timelineFlexibility)}
            {...register('timelineFlexibility')}
          />
        </Field>
      </div>

      <FieldSet legend="Urgency" required error={errors.urgency?.message}>
        <RadioGroup
          name="urgency"
          options={URGENCY_OPTIONS}
          value={watch('urgency')}
          onChange={(value) =>
            setValue('urgency', value as ProjectRequestFormValues['urgency'], {
              shouldValidate: true,
            })
          }
        />
      </FieldSet>
    </FormSection>
  );
}
