import React, { useRef } from "react";
import "./HomeBoard.scss";

import AuthModal, {
  AuthModalRef,
} from "../../../../components/auth-modal/AuthModal";
import { useSelector } from "react-redux";
import { selectAuthState } from "../../../../store/selectors/Auth.selectors";
import { useNavigate } from "react-router-dom";

interface HomeBoardProps {}

const HomeBoard: React.FC<HomeBoardProps> = (props) => {
  const auth = useSelector(selectAuthState);
  const navigate = useNavigate();
  const authModalRef = useRef<AuthModalRef>(null);

  const openSignInModal = (): void => {
    authModalRef?.current?.openSignInModal();
  };

  const onClickOpenCabinet = (): void => {
    if (auth.accessToken) {
      navigateToCabinet();
    } else {
      openSignInModal();
    }
  };

  const navigateToCabinet = (): void => {
    navigate(`/${auth.userType}`);
  };

  return (
    <div className={"home-board-container"}>
      <div className={"wrapper"}>
        <div className={"home-board"}>
          <div className={"home-board__item"}>
            <h1 className={"home-board__title"}>Український реєстр поховань</h1>
            <p className={"home-board__desc"}>
              Оберіть власного консультанта та приведіть до ладу усі сімейні
              поховання.
            </p>
            <button className={"btn"} onClick={onClickOpenCabinet}>
              Перейти в особистий кабінет
            </button>
            {!auth.accessToken ? (
              <AuthModal ref={authModalRef}></AuthModal>
            ) : null}
          </div>
          <div className={"home-board__item text-right"}>
            <video controls height="300">
              <source src="/video/День захисника__24.mp4" type="video/mp4" />
              <p>
                Your browser doesn't support HTML video. Here is a
                <a href="rabbit320.mp4">link to the video</a> instead.
              </p>
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBoard;
