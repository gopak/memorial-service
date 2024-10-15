import React, { forwardRef, useImperativeHandle } from "react";
import { useController } from "react-hook-form";
import { FORM_ERROR_MESSAGES } from "../validators/Validator";
import { Control } from "react-hook-form/dist/types/form";
import { RegisterOptions } from "react-hook-form/dist/types/validator";

interface InputProps {
  control: Control<any, any>;
  rules?: Omit<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  name: string;
  label: React.ReactNode;
}

export interface InputRef {}

const InputCheckbox = forwardRef<InputRef, InputProps>((props, ref) => {
  const { control, rules, name, label } = props;
  const { field, fieldState } = useController({ control, rules, name });

  useImperativeHandle(ref, () => ({}));

  return (
    <>
      <label className={"form-control-checkbox"}>
        <input {...field} type={"checkbox"} hidden />
        <span className={"form-control-checkbox__button"}></span>
        <span>{label}</span>
      </label>
      {fieldState?.error && (
        <div className={"form-error"}>{FORM_ERROR_MESSAGES.REQUIRED}</div>
      )}
    </>
  );
});

export default InputCheckbox;
