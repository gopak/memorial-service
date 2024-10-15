import React, { useRef } from "react";
import "./HomeSignup.scss";

import AuthModal, {
  AuthModalRef,
} from "../../../../components/auth-modal/AuthModal";

interface HomeSignupProps {}

const HomeSignup: React.FC<HomeSignupProps> = (props) => {
  const authModalRef = useRef<AuthModalRef>(null);

  const openSignUpModal = (): void => {
    authModalRef?.current?.openSignUpModal();
  };

  return (
    <div className={"home-signup-container"}>
      <div className="wrapper">
        <div className="home-signup">
          <div className="home-signup__item">
            <h2 className={"mb-3"}>
              Зареєструйтесь та додайте могилу до реєстру просто зараз!
            </h2>
            <p className={"mb-3"}>
              Таким чином ми разом будемо проводити цифровізацію сфери поховань
              в Україні
            </p>
            <button className={"btn"} onClick={openSignUpModal}>
              Зареєструватись
            </button>
            <AuthModal ref={authModalRef}></AuthModal>
          </div>
          <div className="home-signup__item text-right">
            <img src="/images/map.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSignup;
