import React, {
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useRef,
} from "react";

import SignInModal, {
  SignInModalRef,
} from "./components/signin-modal/SignInModal";
import SignUpModal, {
  SignUpModalRef,
} from "./components/signup-modal/SignUpModal";

interface AuthModalProps {}
export interface AuthModalRef {
  openSignInModal: () => void;
  openSignUpModal: () => void;
}

const AuthModal = forwardRef<AuthModalRef, PropsWithChildren<AuthModalProps>>(
  (props, ref) => {
    const signInModalRef = useRef<SignInModalRef>(null);
    const signUpModalRef = useRef<SignUpModalRef>(null);

    useImperativeHandle(ref, () => ({
      openSignInModal,
      openSignUpModal,
    }));

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
      <>
        <SignInModal
          ref={signInModalRef}
          onClickFooterLink={onClickFooterLinkSignInModal}
        />
        <SignUpModal
          ref={signUpModalRef}
          onClickFooterLink={onClickFooterLinkSignUpModal}
        />
      </>
    );
  },
);

export default AuthModal;
