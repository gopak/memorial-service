import React, {
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./EditConsultantPasswordModal.scss";

import { useForm } from "react-hook-form";
import { Consultant } from "../../../../../../../../services/consultant/Consultant.model";
import Modal, {
  ModalRef,
} from "../../../../../../../../components/modal/Modal";
import {
  auth,
  paresFirebaseErrors,
} from "../../../../../../../../firebase/Firebase.service";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { alertMessage } from "../../../../../../../../components/alert-message/AlertMessage";
import Input from "../../../../../../../../modules/forms/controls/Input";
import {
  MAX_LENGTH,
  MIN_LENGTH,
} from "../../../../../../../../modules/forms/validators/Validator";
import Loader from "../../../../../../../../components/loader/Loader";

interface EditConsultantPasswordModalProps {}

export interface EditConsultantPasswordModalRef {
  openModal: (profile: Consultant) => void;
}

interface Form {
  password: string;
  passwordVerify: string;
  passwordCurrent: string;
}

const EditConsultantPasswordModal = forwardRef<
  EditConsultantPasswordModalRef,
  PropsWithChildren<EditConsultantPasswordModalProps>
>((props, ref) => {
  const [profile, setProfile] = useState<Consultant | null>();
  const modalRef = useRef<ModalRef>(null);
  const [needPasswordCurrent, setNeedPasswordCurrent] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorDetail, setErrorDetail] = useState<string>("");
  const { control, getValues, handleSubmit, reset } = useForm<Form>({
    defaultValues: {
      password: "",
      passwordVerify: "",
      passwordCurrent: "",
    },
  });

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  const openModal = (profile: Consultant | null): void => {
    setProfile(profile);
    modalRef?.current?.open();
  };

  const onClose = (): void => {
    reset();
    setNeedPasswordCurrent(false);
    setErrorDetail("");
  };

  const handlerFormSubmit = (data: Form): void => {
    console.log("form data", data);
    if (needPasswordCurrent) {
      handlerReauthenticateWithCredential();
    } else {
      handleUpdatePassword();
    }
  };

  const handlerError = (errors): void => {
    console.log("form error", errors);
  };

  const handleUpdatePassword = async (): Promise<void> => {
    if (!auth?.currentUser) {
      return;
    }

    console.log("handleUpdatePassword attempt");
    setLoading(true);

    try {
      await updatePassword(auth.currentUser, getValues("password"));
      console.log("handleUpdatePassword success");
      alertMessage({
        type: "success",
        message: "Дякуємо, пароль успішно змінено!",
      });
      modalRef?.current?.close();
    } catch (error: any) {
      console.log("handleUpdatePassword error", error);
      if (error?.code === "auth/requires-recent-login") {
        setNeedPasswordCurrent(true);
        alertMessage({
          type: "info",
          message: "Bведіть свій поточний пароль",
        });
      } else {
        setErrorDetail(paresFirebaseErrors(error?.code));
      }
    } finally {
      setLoading(false);
    }
  };

  const handlerReauthenticateWithCredential = async (): Promise<void> => {
    if (!profile || !auth?.currentUser) {
      return;
    }

    console.log("handlerReauthenticateWithCredential attempt");
    setLoading(true);
    try {
      const passwordCredential = EmailAuthProvider.credential(
        profile.email,
        getValues("passwordCurrent"),
      );
      await reauthenticateWithCredential(auth.currentUser, passwordCredential);
      console.log("handlerReauthenticateWithCredential success");
    } catch (error: any) {
      console.log("handlerReauthenticateWithCredential error", error);
      setErrorDetail(paresFirebaseErrors(error?.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      ref={modalRef}
      contentClassName={"edit-consultant-password-modal"}
      headerTitle={"Змінити пароль"}
      onClose={onClose}
    >
      <p className={"mb-4"}>
        Введіть новий пароль, щоб здіснювати вхід в обліковий запис за допомогою
        нього
      </p>
      <form onSubmit={handleSubmit(handlerFormSubmit, handlerError)}>
        {needPasswordCurrent ? (
          <div className={"form-group"}>
            <label className={"form-label"}>Пароль</label>
            <Input
              control={control}
              type={"password"}
              name="passwordCurrent"
              rules={{
                required: true,
                minLength: MIN_LENGTH.PASSWORD,
                maxLength: MAX_LENGTH.PASSWORD,
              }}
              placeholder={"Введіть поточний пароль"}
              icon={"eye"}
              iconClassName={"cursor-pointer"}
            />
          </div>
        ) : null}
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
        {errorDetail ? (
          <div className={"msg msg-error mb-3"}>{errorDetail}</div>
        ) : null}
        <button className={"btn btn-block mb-3"} disabled={loading}>
          {loading ? <Loader className={"mr-2"} /> : null}
          Змінити пароль
        </button>
      </form>
    </Modal>
  );
});

export default EditConsultantPasswordModal;
