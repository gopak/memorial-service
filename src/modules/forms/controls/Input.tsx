import React, {
  forwardRef,
  HTMLInputTypeAttribute,
  useImperativeHandle,
  useState,
} from "react";
import { useController } from "react-hook-form";
import { FORM_ERROR_MESSAGES, PATTERN } from "../validators/Validator";
import { Control } from "react-hook-form/dist/types/form";
import { RegisterOptions } from "react-hook-form/dist/types/validator";
import { IconName } from "../../../components/icons";
import Icon from "../../../components/icons/Icons";

interface InputProps {
  control: Control<any, any>;
  rules?: Omit<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  name: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute | undefined;
  icon?: IconName;
  onClickIcon?: () => void;
  iconClassName?: string;
  readOnly?: boolean;
}

export interface InputRef {}

const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  const {
    control,
    rules,
    name,
    placeholder,
    type,
    icon,
    onClickIcon,
    iconClassName,
    readOnly,
  } = props;
  const { field, fieldState } = useController({ control, rules, name });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({}));

  const getMinLengthErrorMessages = (): string => {
    return FORM_ERROR_MESSAGES.MIN_LENGTH.replace(
      "{length}",
      String(rules?.minLength),
    );
  };

  const getPatternErrorMessages = (): string => {
    let message = FORM_ERROR_MESSAGES.DEFAULT;

    switch (rules?.pattern) {
      case PATTERN.PHONE:
        message = FORM_ERROR_MESSAGES.PATTERN_PHONE;
        break;
      case PATTERN.EMAIL:
        message = FORM_ERROR_MESSAGES.PATTERN_EMAIL;
        break;
    }

    return message;
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
      case "pattern":
        message = getPatternErrorMessages();
        break;
      case "passwordVerify":
        message = FORM_ERROR_MESSAGES.PASSWORD_VERIFY;
        break;
    }

    return message;
  };

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const getInputType = (): HTMLInputTypeAttribute | undefined => {
    return showPassword ? "text" : type;
  };

  return (
    <>
      <div className={"form-control__wrap"}>
        <input
          {...field}
          placeholder={placeholder}
          className={`form-control${icon ? " has-icon" : ""}`}
          maxLength={rules?.maxLength ? Number(rules.maxLength) : undefined}
          type={getInputType()}
          readOnly={readOnly}
        />
        {icon ? (
          <span
            className={`form-control__icon ${iconClassName ?? ""}`}
            onClick={() => {
              if (type === "password") {
                toggleShowPassword();
              } else {
                onClickIcon && onClickIcon();
              }
            }}
          >
            <Icon name={icon} />
          </span>
        ) : null}
      </div>
      {fieldState?.error && (
        <div className={"form-error"}>{getErrorMessages()}</div>
      )}
    </>
  );
});

export default Input;
