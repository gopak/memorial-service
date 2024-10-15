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
  placeholder?: string;
  rows?: number;
}

export interface InputRef {}

const Textarea = forwardRef<InputRef, InputProps>((props, ref) => {
  const { control, rules, name, placeholder, rows } = props;
  const { field, fieldState } = useController({ control, rules, name });

  useImperativeHandle(ref, () => ({}));

  const getMinLengthErrorMessages = (): string => {
    return FORM_ERROR_MESSAGES.MIN_LENGTH.replace(
      "{length}",
      String(rules?.minLength),
    );
  };

  const getErrorMessages = (): string => {
    let message = FORM_ERROR_MESSAGES.DEFAULT;

    switch (fieldState?.error?.type) {
      case "required":
        message = FORM_ERROR_MESSAGES.REQUIRED;
        break;
      case "minLength":
        message = getMinLengthErrorMessages();
        break;
    }

    return message;
  };

  return (
    <>
      <textarea
        {...field}
        placeholder={placeholder}
        className="form-control"
        rows={rows ?? 3}
        maxLength={rules?.maxLength ? Number(rules.maxLength) : undefined}
      ></textarea>
      {fieldState?.error && (
        <div className={"form-error"}>{getErrorMessages()}</div>
      )}
    </>
  );
});

export default Textarea;
