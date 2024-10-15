import React from "react";
import "./SignInAction.scss";

import { UserType } from "../../../../../../app.types";

interface SignInActionProps {
  openSigninForm: (type: UserType) => void;
}

const SignInAction: React.FC<SignInActionProps> = (props) => {
  const openSigninForm = (type: UserType): void => {
    props.openSigninForm(type);
  };

  return (
    <>
      <p className={"mb-5"}>
        Оберіть роль, за допомогою якої ви хочете увійти на сайт
      </p>
      <button
        className="btn btn-block mb-3"
        onClick={() => openSigninForm("customer")}
      >
        Увійти як користувач
      </button>
      <button
        className="btn btn-block mb-3"
        onClick={() => openSigninForm("consultant")}
      >
        Увійти як консультант
      </button>
      <button
        className="btn btn-block"
        onClick={() => openSigninForm("ritual-service")}
      >
        Увійти як ритуальна служба
      </button>
    </>
  );
};

export default SignInAction;
