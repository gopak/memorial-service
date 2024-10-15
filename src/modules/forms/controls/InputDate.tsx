import React, { forwardRef, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";

import { useController } from "react-hook-form";
import { FORM_ERROR_MESSAGES } from "../validators/Validator";
import { Control } from "react-hook-form/dist/types/form";
import { RegisterOptions } from "react-hook-form/dist/types/validator";
import { Value } from "../../../app.types";
import DatePicker from "react-date-picker";
import Icon from "../../../components/icons/Icons";

interface InputProps {
  control: Control<any, any>;
  rules: Omit<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  name: string;
  initValueCalendar?: Date | null;
}

export interface InputRef {}

const MAX_DATE = new Date();

const InputDate = forwardRef<InputRef, InputProps>((props, ref) => {
  const { control, rules, name, initValueCalendar } = props;
  const { field, fieldState } = useController({ control, rules, name });
  const [value, setValue] = useState<Value>(initValueCalendar ?? null);

  const onChangeCalendar = (value: Value): void => {
    if (!value) {
      return;
    }

    setValue(value);
    field.onChange(new Date(String(value)).getTime());
  };

  return (
    <>
      <DatePicker
        onChange={onChangeCalendar}
        value={value}
        locale={"uk-UA"}
        calendarIcon={<Icon name={"calendar"} />}
        clearIcon={<></>}
        className={"form-input-date"}
        maxDate={MAX_DATE}
        format={"dd.MM.yy"}
      />
      {fieldState?.error && (
        <div className={"form-error"}>{FORM_ERROR_MESSAGES.REQUIRED}</div>
      )}
    </>
  );
});

export default InputDate;
