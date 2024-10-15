import React from "react";
import "./SignUpAction.scss";
import { UserType } from "../../../../app.types";

interface SignUpActionProps {
  openSignUpForm: (type: UserType) => void;
}

const SignUpAction: React.FC<SignUpActionProps> = (props) => {
  const openSignUpForm = (type: UserType): void => {
    props.openSignUpForm(type);
  };

  return (
    <>
      <p>Для продовження реєстрації оберіть, який акаунт ви хочете створити.</p>
      <p>
        Зареєструватись як користувач - ви зможете додавати могили до реєстру,
        додати власне волевиявлення або замовити послуги ритуальної служби.
        Детальніше читайте <a href="/">тут</a>.
      </p>
      <p>
        Зареєструватись як консультант - ви зможете залучати клієнтів та
        отримувати оплату за надання послуг. Детальніше читайте{" "}
        <a href="/">тут</a>.
      </p>
      <p className={"mb-4"}>
        Зареєструватись як ритуальна служба - ви зможете додавати кладовища до
        реєстру та надавати послуги. Детальніше читайте <a href="/">тут</a>.
      </p>

      <button
        className="btn btn-block mb-3"
        onClick={() => openSignUpForm("customer")}
      >
        Зареєструватись як користувач
      </button>
      <button
        className="btn btn-block mb-3"
        onClick={() => openSignUpForm("consultant")}
      >
        Зареєструватись як консультант
      </button>
      <button
        className="btn btn-block"
        onClick={() => openSignUpForm("ritual-service")}
      >
        Зареєструватись як ритуальна служба
      </button>
    </>
  );
};

export default SignUpAction;
