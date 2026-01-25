/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RHFInputField, RHFInputRangerField, RHFSelectField } from "./form-fields";

type InputFieldType<T> = {
  component: "input";
  name: keyof z.infer<T>;
  label: string;
  placeholder?: string;
  type?: string;
};

type SelectFieldType<T> = {
  component: "select";
  name: keyof z.infer<T>;
  label: string;
  placeholder?: string;
  options: { label: string; value: string }[];
};

type InputRangerFieldType = {
  component: "inputRanger";
  label: string;
  type?: "number" | "date";
  from: string;
  to: string;
};

interface DynamicFormProps<T extends z.ZodType<any, any, any>> {
  schema: T;
  onSubmit: (data: z.infer<T>) => void;
  defaultValues?: Partial<z.infer<T>>;
  fields: Array<
    | InputFieldType<T>
    | SelectFieldType<T>
    | InputRangerFieldType
  >;
  submitButtonText?: string;
  isSubmitting?: boolean;
}


export function DynamicForm<T extends z.ZodType<any, any, any>>({
  schema,
  onSubmit,
  defaultValues,
  fields,
  submitButtonText = "Submit",
  isSubmitting = false,
}: DynamicFormProps<T>) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as any,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((fieldConfig, index) => (
          //uso o index ao invés de .name
          <div key={index}>
            {fieldConfig.component === "input" && (
              <RHFInputField
                name={fieldConfig.name as string}
                label={fieldConfig.label}
                placeholder={fieldConfig.placeholder}
                type={fieldConfig.type}
              />
            )}
            {fieldConfig.component === "select" && (
              <RHFSelectField
                name={fieldConfig.name as string}
                label={fieldConfig.label}
                placeholder={fieldConfig.placeholder}
                options={fieldConfig.options}
              />
            )}
            {fieldConfig.component === "inputRanger" && (
              <RHFInputRangerField
                label={fieldConfig.label}
                type={fieldConfig.type}
                from={fieldConfig.from}
                to={fieldConfig.to}
              />
            )}
          </div>
        ))}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : submitButtonText}
        </Button>
      </form>
    </Form>
  );
}
