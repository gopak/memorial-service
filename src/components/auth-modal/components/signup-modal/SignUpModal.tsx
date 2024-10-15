import React, {
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./SignUpModal.scss";

import CustomerSignUpForm from "./components/customer-signup-form/CustomerSignUpForm";
import SignUpAction from "./components/signup-action/SignUpAction";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import ConsultantSignUpForm from "./components/consultant-signup-form/ConsultantSignUpForm";
import { useAppDispatch } from "../../../../store/store";
import { selectAuthState } from "../../../../store/selectors/Auth.selectors";
import Modal, { ModalRef } from "../../../modal/Modal";
import { UserType } from "../../../../app.types";
import { clearLoginError } from "../../../../store/actions/Auth.action";

interface SignUpModalProps {
  onClickFooterLink: () => void;
}

export interface SignUpModalRef {
  openModal: () => void;
  closeModal: () => void;
}

const SignUpModal = forwardRef<
  SignUpModalRef,
  PropsWithChildren<SignUpModalProps>
>((props, ref) => {
  const dispatch = useAppDispatch();
  const auth = useSelector(selectAuthState);
  const navigate = useNavigate();
  const modalRef = useRef<ModalRef>(null);
  const [userType, setUserType] = useState<UserType>(null);

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
  };

  const reset = (): void => {
    setUserType(null);
    if (auth.error) {
      dispatch(clearLoginError());
    }
  };

  const openSignUpForm = (type: UserType): void => {
    setUserType(type);
  };

  const composeHeaderTitle = (): string => {
    let title = "Реєстрація на сайті";
    const prefixFormTitle = "Реєстрація ";

    switch (userType) {
      case "customer":
        title = prefixFormTitle + "користувача";
        break;
      case "consultant":
        title = prefixFormTitle + "консультанта";
        break;
      case "ritual-service":
        title = prefixFormTitle + "ритуальної служби";
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

  const renderFormView = (): React.JSX.Element => {
    switch (userType) {
      case "customer":
        return <CustomerSignUpForm onSuccess={onSuccess} />;
      case "consultant":
        return <ConsultantSignUpForm onSuccess={onSuccess} />;
      default:
        return <SignUpAction openSignUpForm={openSignUpForm} />;
    }
  };

  return (
    <Modal
      ref={modalRef}
      contentClassName={"signup-modal"}
      headerTitle={composeHeaderTitle()}
      onClose={onCloseModal}
    >
      {renderFormView()}
      <div className={"text-center mt-3"}>
        <span className={"link link-dashed"} onClick={onClickFooterLink}>
          У мене вже є акаунт
        </span>
      </div>
    </Modal>
  );
});

export default SignUpModal;
