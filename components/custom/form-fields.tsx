import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Minus } from "lucide-react";

interface FormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  options?: { label: string; value: string }[];
}

export function RHFInputField({
  name,
  label,
  placeholder,
  type = "text",
}: FormFieldProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} type={type} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
export function RHFSelectField({
  name,
  label,
  placeholder,
  options,
}: FormFieldProps) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function RHFInputRangerField({
  from,
  to,
  label,
  type = "number",
}: {
  from: string;
  to: string;
  label: string;
  type?: string;
}) {
  const { control } = useFormContext();

  const parseValue = (value: string) => {
    if (type === "number") {
      return value === "" ? undefined : Number(value);
    }
    return value || undefined;
  };
  return (
    <div className="space-y-2">
      <FormLabel>{label}</FormLabel>

      <div className="flex items-center gap-2">
        <FormField
          control={control}
          name={from}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  type={type}
                  placeholder="De"
                  onChange={(e) =>
                    field.onChange(parseValue(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={to}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  type={type}
                  placeholder="Até"
                  onChange={(e) =>
                    field.onChange(parseValue(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}