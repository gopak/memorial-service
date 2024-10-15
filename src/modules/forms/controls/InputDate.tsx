import React, {
    forwardRef,
    useImperativeHandle,
} from "react";
import {  useController } from "react-hook-form";
import { ERROR_MESSAGES, PATTERN } from "../validators/Validator";
import { Control } from "react-hook-form/dist/types/form";
import { RegisterOptions } from "react-hook-form/dist/types/validator";

interface InputProps {
    control: Control<any, any>;
    rules: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    name: string;
    placeholder?: string;
}

export interface InputRef {}

const Input = forwardRef<InputRef, InputProps>( (props, ref) => {
    const {
        control,
        rules,
        name,
        placeholder
    } = props;
    const { field, fieldState } = useController({ control, rules, name } );

    useImperativeHandle(ref, () => ({}));

    const getMinLengthErrorMessages = (): string => {
        return ERROR_MESSAGES.MIN_LENGTH.replace('{length}', String(rules?.minLength));
    }

    const getPatternErrorMessages = (): string => {
        let message = ERROR_MESSAGES.DEFAULT;

        switch (rules.pattern) {
            case PATTERN.PHONE:
                message = ERROR_MESSAGES.PATTERN_PHONE;
                break;
            case PATTERN.EMAIL:
                message = ERROR_MESSAGES.PATTERN_EMAIL;
                break;
        }

        return message;
    }

    const getErrorMessages = (): string => {
        let message = ERROR_MESSAGES.DEFAULT;

        switch (fieldState?.error?.type) {
            case "required":
                message = ERROR_MESSAGES.REQUIRED;
                break;
            case "minLength":
                message = getMinLengthErrorMessages();
                break;
            case "pattern":
                message = getPatternErrorMessages();
                break;
            }

        return message;
    }

    return (
        <>
            <input {...field}
                   placeholder={placeholder}
                   className={"form-control"}
                   maxLength={Number(rules.maxLength) || undefined}
            />
            {fieldState?.error && (
                <div className={"form-error"}>
                    {getErrorMessages()}
                </div>
            )}
        </>
    );
});

export default Input;
