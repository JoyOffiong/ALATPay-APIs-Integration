import { MenuItem, TextField, TextFieldProps } from "@mui/material";
import { Controller, Control, FieldValues } from "react-hook-form";
 
type Option = {
  label: string;
  value: string;
};
 
export type SelectBoxCompProps = {
  name: string;
  label?: string;
  control: Control<FieldValues>;
  data: Option[];
  onChange?: (value: string) => void;
  size?: TextFieldProps["size"];
  placeholder?: string;
  disabled?: boolean;
};
 
export default function SelectBoxComp({
  name,
  label,
  control,
  data,
  onChange,
  size,
  placeholder,
  disabled,
}: SelectBoxCompProps) {
  return (
    <div className="w-full">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            size={size || "small"}
            fullWidth
            label={label}
            disabled={disabled}
            select
            defaultValue="all"
            placeholder={placeholder}
            value={(field.value as string) ?? ""}
            onChange={(e) => {
              field.onChange(e);
              const selectedValue = e.target.value;
              if (onChange && selectedValue !== "") {
                onChange(selectedValue);
              }
            }}
          >
            {data?.map((option, dataIndex) => (
              <MenuItem key={dataIndex} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </div>
  );
}
 
 