import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";

export type InputBoxCompProps = {
  name: string;
  label?: string;
  className?: string;
  type: string;
  control: Control<FieldValues> | any;
  required?: boolean;
  placeholder?: string;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  helperText?: string;
  ref?: React.Ref<HTMLInputElement>;
  rows?: number;
  disabled?: boolean;
  multiline?: boolean;
  size?: TextFieldProps["size"];
  hiddenLabel?: boolean;
  minRows?: number;
  variant?: TextFieldProps["variant"];
  color?: TextFieldProps["color"];
  defaultValue?: string | number;
};

export default function InputBoxComp({
  name,
  label,
  className,
  type,
  control,
  required,
  placeholder,
  onKeyUp,
  helperText,
  ref,
  rows,
  disabled = false,
  multiline = false,
  size,
  hiddenLabel,
  minRows,
  variant = "outlined",
  color = "primary",
  defaultValue,
}: InputBoxCompProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          value={(field.value as string) ?? ""}
          defaultValue={defaultValue}
          color={color}
          label={label}
          minRows={minRows}
          multiline={multiline}
          size={size || "small"}
          type={type}
          ref={ref}
          onKeyUp={onKeyUp}
          className={className}
          helperText={helperText}
          variant={variant || "outlined"}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          hiddenLabel={hiddenLabel}
          fullWidth
          rows={rows}
          {...(type === "number" && {
            inputProps: { min: 0, inputMode: "numeric", pattern: "[0-9]*" },
          })}
        />
      )}
    />
  );
}
