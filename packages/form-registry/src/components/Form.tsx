import { useMemo } from "react";
import { useForm, Controller, type DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { zodSchemaToFields } from "../resolvers/zod";
import { InputField } from "./fields/InputField";
import { TextareaField } from "./fields/TextareaField";
import { SelectField } from "./fields/SelectField";
import { CheckboxField } from "./fields/CheckboxField";
import { SwitchField } from "./fields/SwitchField";
import { RadioGroupField } from "./fields/RadioGroupField";
import { DateField } from "./fields/DateField";
import type { FormField, FieldComponent } from "../types";
import { CardFeild } from "./fields/CardFeild";

const fieldRegistry: Record<FormField["type"], FieldComponent> = {
  input: InputField,
  textarea: TextareaField,
  select: SelectField,
  checkbox: CheckboxField,
  switch: SwitchField,
  radio: RadioGroupField,
  date: DateField,
  number: InputField,
  file: InputField,
};

interface FormProps<T extends z.ZodTypeAny> {
  schema: T;
  onSubmit: (values: any) => void | Promise<void>;
  defaultValues?: DefaultValues<any>;
  className?: string;
  children?: React.ReactNode;
  title: string;
  description?: string;
}

export function Form<T extends z.ZodTypeAny>({
  schema,
  onSubmit,
  defaultValues,
  className,
  children,
  title,
  description
}: FormProps<T>) {
  const fields = useMemo(() => zodSchemaToFields(schema as any), [schema]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await handleSubmit(async (data) => {
        await onSubmit(data);
      })(e);
    } catch (err) {
      console.error("Form submission error:", err);
      if (err instanceof z.ZodError) {
        // Handle ZodError manually
        const zodError = err as z.ZodError;
        zodError.issues.forEach((issue: z.ZodIssue) => {
          const fieldName = issue.path[0] as string;
          setError(fieldName as any, {
            type: "manual",
            message: issue.message,
          });
        });
      }
    }
  };

  return (
    <form onSubmit={onFormSubmit} className={className}>

      <CardFeild
        title={title}
        description={description}
      >
        <div className="space-y-4">
          {fields.map((field) => {
            const FieldComponent = fieldRegistry[field.type];
            const fieldError = errors[field.name]?.message as string | undefined;

            return (
              <Controller
                key={field.name}
                name={field.name as any}
                control={control}
                render={({ field: controllerField }) => (
                  <FieldComponent
                    field={field}
                    value={controllerField.value}
                    onChange={controllerField.onChange}
                    onBlur={controllerField.onBlur}
                    error={fieldError}
                  />
                )}
              />
            );
          })}
        </div>
      </CardFeild>

      {children}
    </form>
  );
}
