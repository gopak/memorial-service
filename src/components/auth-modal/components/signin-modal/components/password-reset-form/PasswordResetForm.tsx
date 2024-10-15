import React, { useState } from "react";
import "./PasswordResetForm.scss";
import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";
import { alertMessage } from "../../../alert-message/AlertMessage";
import {
  auth,
  paresFirebaseErrors,
} from "../../../../firebase/Firebase.service";
import Input from "../../../../modules/forms/controls/Input";
import { PATTERN } from "../../../../modules/forms/validators/Validator";
import Loader from "../../../loader/Loader";

interface PasswordResetFormProps {
  onSuccess: () => void;
}

interface Form {
  email: string;
}

const PasswordResetForm: React.FC<PasswordResetFormProps> = (props) => {
  const [errorDetail, setErrorDetail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { control, handleSubmit } = useForm<Form>({
    defaultValues: {
      email: "",
    },
  });

  const handlerFormSubmit = (data: Form): void => {
    console.log("form data", data);
    handlerPasswordReset(data);
  };

  const handlerError = (errors): void => {
    console.log("form error", errors);
  };

  const handlerPasswordReset = async (form: Form): Promise<void> => {
    const { email } = form;

    try {
      const result = await sendPasswordResetEmail(auth, email);
      console.log("SignInForm loginUser success", result);
      alertMessage({
        type: "success",
        message:
          "Посилання для вводу нового паролю надіслано на вашу електронну адресу.",
      });
      props.onSuccess();
    } catch (error: any) {
      console.log("SignInForm loginUser error", error);
      setErrorDetail(paresFirebaseErrors(error?.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <p className={"mb-4"}>
        Введіть свій email та натисніть кнопку “Скинути пароль”. Посилання для
        вводу нового паролю буде надіслано на вашу електронну адресу.
      </p>
      <form onSubmit={handleSubmit(handlerFormSubmit, handlerError)}>
        <div className={"mb-4"}>
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
        {errorDetail ? (
          <div className={"msg msg-error mb-3"}>{errorDetail}</div>
        ) : null}
        <button className={"btn btn-block"} disabled={loading}>
          {loading ? <Loader className={"mr-2"} /> : null}
          Скинути пароль
        </button>
      </form>
    </>
  );
};

export default PasswordResetForm;
