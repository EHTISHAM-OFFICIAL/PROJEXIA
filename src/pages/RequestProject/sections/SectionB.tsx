import type { UseFormReturn } from 'react-hook-form';
import { FormSection } from '../../../components/forms/FormSection';
import { Field } from '../../../components/forms/Field';
import { Select, TextArea, TextInput } from '../../../components/forms/Inputs';
import { PROJECT_CATEGORIES } from '../../../constants/categories';
import { PROJECT_TYPES } from '../../../constants/requestOptions';
import type { ProjectRequestFormValues } from '../../../utils/validation';

export function SectionB({ form }: { form: UseFormReturn<ProjectRequestFormValues> }) {
  const { register, formState } = form;
  const errors = formState.errors;

  return (
    <FormSection
      id="basics"
      step={2}
      title="The project"
      description="A clear description here does more than anything else to speed up the reply."
    >
      <Field
        label="Project title"
        htmlFor="projectTitle"
        required
        hint="A working name is fine — for example, Greenhouse humidity monitor."
        error={errors.projectTitle?.message}
      >
        <TextInput
          id="projectTitle"
          hasError={Boolean(errors.projectTitle)}
          {...register('projectTitle')}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Category"
          htmlFor="projectCategory"
          required
          error={errors.projectCategory?.message}
        >
          <Select
            id="projectCategory"
            options={PROJECT_CATEGORIES}
            placeholder="Choose a category"
            hasError={Boolean(errors.projectCategory)}
            {...register('projectCategory')}
          />
        </Field>

        <Field label="Type of project" htmlFor="projectType" required error={errors.projectType?.message}>
          <Select
            id="projectType"
            options={PROJECT_TYPES}
            placeholder="Choose a type"
            hasError={Boolean(errors.projectType)}
            {...register('projectType')}
          />
        </Field>
      </div>

      <Field
        label="What is it for?"
        htmlFor="projectPurpose"
        hint="Who will use it, and what problem does it solve for them?"
        error={errors.projectPurpose?.message}
      >
        <TextArea
          id="projectPurpose"
          rows={4}
          hasError={Boolean(errors.projectPurpose)}
          {...register('projectPurpose')}
        />
      </Field>

      <Field
        label="Describe the project"
        htmlFor="projectDescription"
        required
        hint="What should it do, step by step? Include anything you already know about how it should behave."
        error={errors.projectDescription?.message}
      >
        <TextArea
          id="projectDescription"
          rows={9}
          placeholder="Example: A device that measures soil moisture in four planters and opens a water valve when any of them drops below a threshold. It should show current readings on a small screen and let me change the threshold without reprogramming it."
          hasError={Boolean(errors.projectDescription)}
          {...register('projectDescription')}
        />
      </Field>
    </FormSection>
  );
}
