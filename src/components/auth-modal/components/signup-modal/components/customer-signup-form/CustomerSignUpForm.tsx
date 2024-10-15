import React from "react";
import "./CustomerSignUpForm.scss";

import { useForm } from "react-hook-form";

import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../store/store";
import { selectAuthState } from "../../../../store/selectors/Auth.selectors";
import { CustomerPayload } from "../../../../services/customer/Customer.model";
import { createUser } from "../../../../services/auth/Auth.service";
import Input from "../../../../modules/forms/controls/Input";
import {
  MAX_LENGTH,
  MIN_LENGTH,
  PATTERN,
} from "../../../../modules/forms/validators/Validator";
import InputDate from "../../../../modules/forms/controls/InputDate";
import InputCheckbox from "../../../../modules/forms/controls/InputCheckbox";
import Loader from "../../../loader/Loader";

interface CustomerSignUpFormProps {
  onSuccess: () => void;
}

interface Form {
  firstName: string;
  lastName: string;
  surName: string;
  dateBirth: number;
  phone: string;
  email: string;
  password: string;
  passwordVerify: string;
  consultantId: string;
  offerContract: boolean;
}

const CustomerSignUpForm: React.FC<CustomerSignUpFormProps> = (props) => {
  const dispatch = useAppDispatch();
  const auth = useSelector(selectAuthState);
  const { control, getValues, handleSubmit } = useForm<Form>({
    defaultValues: {
      firstName: "",
      lastName: "",
      surName: "",
      dateBirth: 0,
      phone: "",
      email: "",
      password: "",
      passwordVerify: "",
      consultantId: "",
      offerContract: false,
    },
  });

  const handlerFormSubmit = (data: Form): void => {
    console.log("form data", data);
    createUserHandler(data);
  };
  const handlerError = (errors): void => {
    console.log("form error", errors);
  };

  const createUserHandler = async (form: Form): Promise<void> => {
    const payload: CustomerPayload = {
      firstName: form.firstName,
      lastName: form.lastName,
      surName: form.surName,
      dateBirth: form.dateBirth,
      phone: form.phone,
      email: form.email,
      consultantId: form.consultantId,
    };

    try {
      const result = await dispatch(
        createUser("customer", form.email, form.password, payload),
      );
      console.log("SignInForm loginUser success", result);
      props.onSuccess();
    } catch (error) {
      console.log("SignInForm loginUser error", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handlerFormSubmit, handlerError)}>
        <div className={"form-group"}>
          <label className={"form-label"}>Ім’я</label>
          <Input
            control={control}
            type={"text"}
            name="firstName"
            rules={{
              required: true,
              minLength: MIN_LENGTH.NAME,
              maxLength: MAX_LENGTH.NAME,
            }}
            placeholder={"Наприклад, Сергій"}
          />
        </div>
        <div className={"form-group"}>
          <label className={"form-label"}>Прізвище</label>
          <Input
            control={control}
            type={"text"}
            name="lastName"
            rules={{
              required: true,
              minLength: MIN_LENGTH.NAME,
              maxLength: MAX_LENGTH.NAME,
            }}
            placeholder={"Наприклад, Сергійченко"}
          />
        </div>
        <div className={"form-group"}>
          <label className={"form-label"}>По-батькові</label>
          <Input
            control={control}
            type={"text"}
            name="surName"
            rules={{
              required: true,
              minLength: MIN_LENGTH.NAME,
              maxLength: MAX_LENGTH.NAME,
            }}
            placeholder={"Наприклад, Сергійович"}
          />
        </div>
        <div className={"form-group"}>
          <label className={"form-label"}>Дата народження</label>
          <InputDate
            control={control}
            name="dateBirth"
            rules={{
              required: true,
            }}
          />
        </div>
        <div className={"form-group"}>
          <label className={"form-label"}>Номер телефону</label>
          <Input
            control={control}
            type={"text"}
            name="phone"
            rules={{
              required: true,
              pattern: PATTERN.PHONE,
              minLength: MIN_LENGTH.PHONE,
              maxLength: MAX_LENGTH.PHONE,
            }}
            placeholder={"+38  (  0 _  _  )  _  _  _  _  _  _  _"}
          />
        </div>
        <div className={"form-group"}>
          <label className={"form-label"}>Email</label>
          <Input
            control={control}
            type={"text"}
            name="email"
            rules={{
              required: true,
              pattern: PATTERN.EMAIL,
            }}
            placeholder={"Введіть email"}
          />
        </div>
        <div className={"form-group"}>
          <label className={"form-label"}>Пароль</label>
          <Input
            control={control}
            type={"password"}
            name="password"
            rules={{
              required: true,
              minLength: MIN_LENGTH.PASSWORD,
              maxLength: MAX_LENGTH.PASSWORD,
            }}
            placeholder={"Введіть пароль тут"}
            icon={"eye"}
            iconClassName={"cursor-pointer"}
          />
        </div>
        <div className={"form-group"}>
          <label className={"form-label"}>Повторіть пароль</label>
          <Input
            control={control}
            type={"password"}
            name="passwordVerify"
            rules={{
              required: true,
              minLength: MIN_LENGTH.PASSWORD,
              maxLength: MAX_LENGTH.PASSWORD,
              validate: {
                passwordVerify: (value: string) =>
                  value === getValues("password"),
              },
            }}
            placeholder={"Введіть пароль тут"}
            icon={"eye"}
            iconClassName={"cursor-pointer"}
          />
        </div>
        <div className={"form-group"}>
          <label className={"form-label"}>
            ID консультанта (не обов’язково)
          </label>
          <Input
            control={control}
            type={"text"}
            name="consultantId"
            placeholder={"Наприклад, 236515"}
          />
        </div>
        <div className="mt-4 mb-4">
          <InputCheckbox
            control={control}
            name={"offerContract"}
            rules={{
              required: true,
            }}
            label={
              <>
                Я погоджуюсь договором <a href="/">оферти</a>
              </>
            }
          />
        </div>
        {auth.error?.detail ? (
          <div className={"msg msg-error mb-3"}>{auth.error?.detail}</div>
        ) : null}
        <button className={"btn btn-block"} disabled={auth.loading}>
          {auth.loading ? <Loader className={"mr-2"} /> : null}
          Зареєструватись
        </button>
      </form>
    </div>
  );
};

export default CustomerSignUpForm;
