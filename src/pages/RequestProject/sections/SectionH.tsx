import type { UseFormReturn } from 'react-hook-form';
import { FormSection } from '../../../components/forms/FormSection';
import { Field, FieldSet } from '../../../components/forms/Field';
import { TextArea } from '../../../components/forms/Inputs';
import { RepeatableLinks } from '../../../components/forms/RepeatableLinks';
import { FileUpload } from '../../../components/forms/FileUpload';
import type { ProjectRequestFormValues } from '../../../utils/validation';

interface SectionHProps {
  form: UseFormReturn<ProjectRequestFormValues>;
  files: File[];
  onFilesChange: (files: File[]) => void;
  uploading: boolean;
}

export function SectionH({ form, files, onFilesChange, uploading }: SectionHProps) {
  const { register, watch, setValue, formState } = form;
  const errors = formState.errors;

  const linkErrors = Array.isArray(errors.referenceLinks)
    ? errors.referenceLinks.map((error) => error?.message)
    : [];

  return (
    <FormSection
      id="references"
      step={8}
      title="References and files"
      description="Anything that shows what you have in mind — a similar project, a sketch, a datasheet."
    >
      <FieldSet legend="Reference links" hint="Videos, articles or products that are close to what you want.">
        <RepeatableLinks
          values={(watch('referenceLinks') ?? ['']) as string[]}
          onChange={(next) => setValue('referenceLinks', next, { shouldDirty: true })}
          errors={linkErrors}
        />
      </FieldSet>

      <Field
        label="About those references"
        htmlFor="referenceDescription"
        hint="What specifically should be taken from them, and what should be different?"
        error={errors.referenceDescription?.message}
      >
        <TextArea
          id="referenceDescription"
          rows={4}
          hasError={Boolean(errors.referenceDescription)}
          {...register('referenceDescription')}
        />
      </Field>

      <FieldSet legend="Attachments" hint="Sketches, diagrams, specifications or photos of existing hardware.">
        <FileUpload files={files} onChange={onFilesChange} disabled={uploading} />
      </FieldSet>
    </FormSection>
  );
}
