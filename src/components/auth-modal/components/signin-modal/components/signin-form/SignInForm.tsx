import React from "react";
import "./SignInForm.scss";

import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../../../../store/store";
import { UserType } from "../../../../../../app.types";
import { useSelector } from "react-redux";
import { selectAuthState } from "../../../../../../store/selectors/Auth.selectors";
import { loginUser } from "../../../../../../services/auth/Auth.service";
import Input from "../../../../../../modules/forms/controls/Input";
import {
  MAX_LENGTH,
  MIN_LENGTH,
  PATTERN,
} from "../../../../../../modules/forms/validators/Validator";
import InputCheckbox from "../../../../../../modules/forms/controls/InputCheckbox";
import Loader from "../../../../../loader/Loader";

interface SignInFormProps {
  userType: UserType;
  onSuccess: () => void;
  openPasswordResetForm: () => void;
}

interface Form {
  email: string;
  password: string;
  remember: boolean;
}

const SignInForm: React.FC<SignInFormProps> = (props) => {
  const dispatch = useAppDispatch();
  const auth = useSelector(selectAuthState);
  const { control, handleSubmit } = useForm<Form>({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const handlerFormSubmit = (data: Form): void => {
    console.log("form data", data);
    handlerLoginUser(data);
  };

  const handlerError = (errors): void => {
    console.log("form error", errors);
  };

  const handlerLoginUser = async (form: Form): Promise<void> => {
    const { email, password } = form;

    try {
      const result = await dispatch(loginUser(email, password, props.userType));
      console.log("SignInForm loginUser success", result);
      props.onSuccess();
    } catch (error) {
      console.log("SignInForm loginUser error", error);
    }
  };

  const onOpenPasswordResetForm = (): void => {
    props.openPasswordResetForm && props.openPasswordResetForm();
  };

  return (
    <>
      <form onSubmit={handleSubmit(handlerFormSubmit, handlerError)}>
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
        <div>
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
        <div className="mt-2">
          <span className={"link"} onClick={onOpenPasswordResetForm}>
            Забули пароль?
          </span>
        </div>
        <div className="mt-4 mb-4">
          <InputCheckbox
            control={control}
            name={"remember"}
            label={"Запам’ятати мене"}
          />
        </div>
        {auth.error?.detail ? (
          <div className={"msg msg-error mb-3"}>{auth.error?.detail}</div>
        ) : null}
        <button className={"btn btn-block"} disabled={auth.loading}>
          {auth.loading ? <Loader className={"mr-2"} /> : null}
          Увійти до особистого кабінету
        </button>
      </form>
    </>
  );
};

export default SignInForm;
