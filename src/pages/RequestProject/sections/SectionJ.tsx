import type { UseFormReturn } from 'react-hook-form';
import { FormSection } from '../../../components/forms/FormSection';
import { Checkbox } from '../../../components/forms/Choice';
import type { ProjectRequestFormValues } from '../../../utils/validation';

export function SectionJ({ form }: { form: UseFormReturn<ProjectRequestFormValues> }) {
  const { register, formState } = form;
  const errors = formState.errors;

  return (
    <FormSection
      id="consent"
      step={10}
      title="Before you send"
      description="Both boxes are required — the team cannot act on a request without them."
    >
      <div className="flex flex-col gap-4 rounded-card border border-line bg-surface p-5">
        <div>
          <Checkbox
            id="agreeToTerms"
            label="The information above is accurate to the best of my knowledge."
            description="Submitting a request is not a contract. Nothing is agreed until scope and cost are confirmed in writing."
            {...register('agreeToTerms')}
          />
          {errors.agreeToTerms && (
            <p className="ml-7 mt-1.5 text-xs text-state-danger" role="alert">
              {errors.agreeToTerms.message}
            </p>
          )}
        </div>

        <div>
          <Checkbox
            id="allowContact"
            label="the team may contact me about this request."
            description="Only about this project. Your details are not shared with anyone else or used for marketing."
            {...register('allowContact')}
          />
          {errors.allowContact && (
            <p className="ml-7 mt-1.5 text-xs text-state-danger" role="alert">
              {errors.allowContact.message}
            </p>
          )}
        </div>
      </div>
    </FormSection>
  );
}
