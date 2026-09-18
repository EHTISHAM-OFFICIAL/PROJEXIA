import type { UseFormReturn } from 'react-hook-form';
import { FormSection } from '../../../components/forms/FormSection';
import { Field, FieldSet } from '../../../components/forms/Field';
import { Select, TextInput } from '../../../components/forms/Inputs';
import { RadioGroup } from '../../../components/forms/Choice';
import { COMPLEXITY_OPTIONS, DEPLOYMENT_ENVIRONMENTS } from '../../../constants/requestOptions';
import type { ProjectRequestFormValues } from '../../../utils/validation';

export function SectionE({ form }: { form: UseFormReturn<ProjectRequestFormValues> }) {
  const { register, watch, setValue, formState } = form;
  const errors = formState.errors;

  return (
    <FormSection
      id="scale"
      step={5}
      title="Scale and setting"
      description="How big is this, and where will it end up running?"
    >
      <FieldSet
        legend="How complex do you think it is?"
        required
        hint="A rough sense is enough — 'Not sure' is a valid answer."
        error={errors.complexity?.message}
      >
        <RadioGroup
          name="complexity"
          options={COMPLEXITY_OPTIONS}
          value={watch('complexity')}
          onChange={(value) =>
            setValue('complexity', value as ProjectRequestFormValues['complexity'], {
              shouldValidate: true,
            })
          }
        />
      </FieldSet>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Prototypes needed"
          htmlFor="prototypeQuantity"
          hint="How many working units to start with?"
          error={errors.prototypeQuantity?.message}
        >
          <TextInput
            id="prototypeQuantity"
            type="number"
            inputMode="numeric"
            min={1}
            placeholder="1"
            hasError={Boolean(errors.prototypeQuantity)}
            {...register('prototypeQuantity')}
          />
        </Field>

        <Field
          label="Eventual quantity"
          htmlFor="estimatedQuantity"
          hint="If you might produce more later."
          error={errors.estimatedQuantity?.message}
        >
          <TextInput
            id="estimatedQuantity"
            type="number"
            inputMode="numeric"
            min={1}
            hasError={Boolean(errors.estimatedQuantity)}
            {...register('estimatedQuantity')}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Where will it be used?"
          htmlFor="deploymentEnvironment"
          hint="This affects enclosure, power and durability choices."
          error={errors.deploymentEnvironment?.message}
        >
          <Select
            id="deploymentEnvironment"
            options={DEPLOYMENT_ENVIRONMENTS}
            placeholder="Choose an environment"
            hasError={Boolean(errors.deploymentEnvironment)}
            {...register('deploymentEnvironment')}
          />
        </Field>
      </div>
    </FormSection>
  );
}
