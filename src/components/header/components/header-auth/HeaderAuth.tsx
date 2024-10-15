import React, {useContext, useRef} from 'react';
import "./Auth.scss";
import SignInModal, { SignInModalRef } from "./components/signin-modal/SignInModal";
import SignUpModal, { SignUpModalRef } from "./components/signup-modal/SignUpModal";
import { AuthContext } from "../../../../provider/AuthProvider";
import { useSelector } from "react-redux";
import { selectAuthState } from "../../../../store/selectors/Auth.selectors";
import Icon from "../../../icons/Icons";

interface AuthProps {

}

const Auth: React.FC<AuthProps> = props => {
    const authContext = useContext(AuthContext);
    const auth = useSelector(selectAuthState);
    const signInModalRef = useRef<SignInModalRef>(null);
    const signUpModalRef = useRef<SignUpModalRef>(null);

    const openSignInModal = () => {
        signInModalRef?.current?.open();
    }

    const openSignUpModal = () => {
        signUpModalRef?.current?.open();
    }

    return (
      <div>
          {authContext?.user ? (
              <>
                  <button className={"btn btn-link"}>
                      <Icon name={"message"}/>
                      Повідомлення
                  </button>
                  <button className={"btn btn-link"}>
                      <Icon name={"bell"}/>
                      Сповіщення
                  </button>
                  <button className={"btn btn-border"}>Стати консультантом</button>
              </>
          ) : (
              <>
              <button className={"btn btn-link mr-2"} onClick={openSignInModal}>Вхід</button>
                  <button className={"btn"} onClick={openSignUpModal}>Реєстрація</button>
                  <SignInModal ref={signInModalRef}/>
                  <SignUpModal ref={signUpModalRef}/>
              </>
          )}

      </div>
    );
}

export default Auth;
