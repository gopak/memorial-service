import React, { useRef } from "react";
import "./HeaderAuth.scss";

import Icon from "../../../icons/Icons";
import { useSelector } from "react-redux";
import { selectAuthState } from "../../../../store/selectors/Auth.selectors";
import SignInModal, { SignInModalRef } from "../../../signin-modal/SignInModal";
import SignUpModal, { SignUpModalRef } from "../../../signup-modal/SignUpModal";

interface HeaderAuthProps {}

const HeaderAuth: React.FC<HeaderAuthProps> = (props) => {
  const auth = useSelector(selectAuthState);
  const signInModalRef = useRef<SignInModalRef>(null);
  const signUpModalRef = useRef<SignUpModalRef>(null);

  const openSignInModal = (): void => {
    signInModalRef?.current?.openModal();
  };

  const openSignUpModal = (): void => {
    signUpModalRef?.current?.openModal();
  };

  const onClickFooterLinkSignInModal = (): void => {
    signInModalRef?.current?.closeModal();
    openSignUpModal();
  };
  const onClickFooterLinkSignUpModal = (): void => {
    signUpModalRef?.current?.closeModal();
    openSignInModal();
  };

  return (
    <div className={"header-auth"}>
      {auth?.accessToken ? (
        <>
          <button className={"btn btn-link mr-2"}>
            <Icon name={"message"} className={"mr-2"} />
            Повідомлення
          </button>
          <button className={"btn btn-link mr-2"}>
            <Icon name={"bell"} className={"mr-2"} />
            Сповіщення
          </button>
          <button className={"btn btn-border"}>Стати консультантом</button>
        </>
      ) : (
        <>
          <button className={"btn btn-link mr-2"} onClick={openSignInModal}>
            Вхід
          </button>
          <button className={"btn"} onClick={openSignUpModal}>
            Реєстрація
          </button>
          <SignInModal
            ref={signInModalRef}
            onClickFooterLink={onClickFooterLinkSignInModal}
          />
          <SignUpModal
            ref={signUpModalRef}
            onClickFooterLink={onClickFooterLinkSignUpModal}
          />
        </>
      )}
    </div>
  );
};

export default HeaderAuth;
