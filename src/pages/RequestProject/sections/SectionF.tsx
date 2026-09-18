import type { UseFormReturn } from 'react-hook-form';
import { FormSection } from '../../../components/forms/FormSection';
import { Field } from '../../../components/forms/Field';
import { Select, TextArea } from '../../../components/forms/Inputs';
import { BUDGET_RANGES } from '../../../constants/requestOptions';
import type { ProjectRequestFormValues } from '../../../utils/validation';

export function SectionF({ form }: { form: UseFormReturn<ProjectRequestFormValues> }) {
  const { register, formState } = form;
  const errors = formState.errors;

  return (
    <FormSection
      id="budget"
      step={6}
      title="Budget"
      description="A range is not a commitment. It helps MECTEC suggest components that actually fit."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Budget range" htmlFor="budgetRange" error={errors.budgetRange?.message}>
          <Select
            id="budgetRange"
            options={BUDGET_RANGES}
            placeholder="Not decided yet"
            hasError={Boolean(errors.budgetRange)}
            {...register('budgetRange')}
          />
        </Field>
      </div>

      <Field
        label="Budget notes"
        htmlFor="budgetNotes"
        hint="For example: the budget covers parts only, or there is room to increase it for better hardware."
        error={errors.budgetNotes?.message}
      >
        <TextArea
          id="budgetNotes"
          rows={3}
          hasError={Boolean(errors.budgetNotes)}
          {...register('budgetNotes')}
        />
      </Field>
    </FormSection>
  );
}
