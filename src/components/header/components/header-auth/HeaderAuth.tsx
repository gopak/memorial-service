import React, { useRef } from "react";
import "./HeaderAuth.scss";

import Icon from "../../../icons/Icons";
import { useSelector } from "react-redux";
import { selectAuthState } from "../../../../store/selectors/Auth.selectors";
import AuthModal, { AuthModalRef } from "../../../auth-modal/AuthModal";

interface HeaderAuthProps {}

const HeaderAuth: React.FC<HeaderAuthProps> = (props) => {
  const auth = useSelector(selectAuthState);
  const authModalRef = useRef<AuthModalRef>(null);

  const openSignInModal = (): void => {
    authModalRef?.current?.openSignInModal();
  };

  const openSignUpModal = (): void => {
    authModalRef?.current?.openSignUpModal();
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
          <AuthModal ref={authModalRef} />
        </>
      )}
    </div>
  );
};

export default HeaderAuth;
