import React, {
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./SignInModal.scss";

import SignInAction from "./components/signin-action/SignInAction";
import SignInForm from "./components/signin-form/SignInForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PasswordResetForm from "./components/password-reset-form/PasswordResetForm";
import { useAppDispatch } from "../../store/store";
import { selectAuthState } from "../../store/selectors/Auth.selectors";
import Modal, { ModalRef } from "../modal/Modal";
import { UserType } from "../../app.types";
import { clearLoginError } from "../../store/actions/Auth.action";

interface SignInModalProps {
  onClickFooterLink: () => void;
}

export interface SignInModalRef {
  openModal: () => void;
  closeModal: () => void;
}

const SignInModal = forwardRef<
  SignInModalRef,
  PropsWithChildren<SignInModalProps>
>((props, ref) => {
  const dispatch = useAppDispatch();
  const auth = useSelector(selectAuthState);
  const navigate = useNavigate();
  const modalRef = useRef<ModalRef>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [showResetPassword, setShowResetPassword] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

  const openModal = (): void => {
    modalRef?.current?.open();
  };

  const closeModal = (): void => {
    modalRef?.current?.close();
  };

  const onCloseModal = (): void => {
    reset();
    setShowResetPassword(false);
  };

  const reset = (): void => {
    setUserType(null);
    if (auth.error) {
      dispatch(clearLoginError());
    }
  };

  const openSignInForm = (type: UserType): void => {
    setUserType(type);
  };

  const composeHeaderTitle = (): string => {
    let title = "Вхід на сайт";
    const prefixFormTitle = "Увійти як ";

    switch (true) {
      case showResetPassword:
        title = "Забули пароль?";
        break;
      case userType === "customer":
        title = prefixFormTitle + "користувач";
        break;
      case userType === "consultant":
        title = prefixFormTitle + "консультант";
        break;
      case userType === "ritual-service":
        title = prefixFormTitle + "ритуальна служба";
        break;
    }

    return title;
  };

  const onSuccess = (): void => {
    reset();
    closeModal();
    navigateToCabinet();
  };

  const navigateToCabinet = (): void => {
    navigate(`/${userType}`);
  };

  const onClickFooterLink = (): void => {
    props.onClickFooterLink && props.onClickFooterLink();
  };

  const onOpenPasswordResetForm = (): void => {
    setShowResetPassword(true);
  };

  const onSuccessResetPassword = (): void => {
    reset();
    closeModal();
  };

  const renderFormView = (): React.JSX.Element => {
    switch (true) {
      case showResetPassword:
        return <PasswordResetForm onSuccess={onSuccessResetPassword} />;
      case !!userType:
        return (
          <SignInForm
            userType={userType}
            onSuccess={onSuccess}
            openPasswordResetForm={onOpenPasswordResetForm}
          />
        );
      default:
        return <SignInAction openSigninForm={openSignInForm} />;
    }
  };

  return (
    <Modal
      ref={modalRef}
      contentClassName={"signin-modal"}
      headerTitle={composeHeaderTitle()}
      onClose={onCloseModal}
    >
      {renderFormView()}
      {!showResetPassword ? (
        <div className={"text-center mt-3"}>
          <span className={"link link-dashed"} onClick={onClickFooterLink}>
            У мене ще немає акаунта
          </span>
        </div>
      ) : null}
    </Modal>
  );
});

export default SignInModal;
