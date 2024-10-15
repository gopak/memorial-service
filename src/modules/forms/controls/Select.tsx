import React, { forwardRef, useImperativeHandle } from "react";
import { useController } from "react-hook-form";
import { FORM_ERROR_MESSAGES } from "../validators/Validator";
import { Control } from "react-hook-form/dist/types/form";
import { RegisterOptions } from "react-hook-form/dist/types/validator";

export interface SelectOption<T = number | string> {
  id: T;
  value?: any;
  label: string;
}
interface SelectProps {
  option: SelectOption[];
  control: Control<any, any>;
  rules: Omit<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  name: string;
  placeholder?: string;
  className?: string;
  onValueChange?: (value: any) => void;
}

export interface SelectRef {}

const Select = forwardRef<SelectRef, SelectProps>((props, ref) => {
  const {
    control,
    rules,
    name,
    placeholder,
    className,
    option,
    onValueChange,
  } = props;
  const { field, fieldState } = useController({ control, rules, name });

  useImperativeHandle(ref, () => ({}));

  return (
    <>
      <select
        {...field}
        className={`form-control ${className ?? ""}`}
        onChange={(e) => {
          const value = e.target.value;
          field.onChange(value);
          onValueChange && onValueChange(value);
        }}
      >
        <option value={""}>{placeholder}</option>
        {option.map((item) => (
          <option value={item.id} key={item.id}>
            {item.label}
          </option>
        ))}
      </select>
      {fieldState?.error && (
        <div className={"form-error"}>{FORM_ERROR_MESSAGES.REQUIRED}</div>
      )}
    </>
  );
});

export default Select;
