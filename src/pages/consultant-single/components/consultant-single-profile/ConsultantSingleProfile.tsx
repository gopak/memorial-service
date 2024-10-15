import React, { useRef, useState } from "react";
import "./ConsultantSingleProfile.scss";

import { useSelector } from "react-redux";
import { getImagePathFromStorage } from "../../../../firebase/Firebase.service";
import InfoView from "../../../../components/info-view/InfoView";
import { selectAuthState } from "../../../../store/selectors/Auth.selectors";
import AuthModal, {
  AuthModalRef,
} from "../../../../components/auth-modal/AuthModal";
import { selectCustomerState } from "../../../../store/selectors/Customer.selectors";
import { useAppDispatch } from "../../../../store/store";
import { updateCustomerProfile } from "../../../../services/customer/Customer.service";
import { alertMessage } from "../../../../components/alert-message/AlertMessage";
import { DEFAULT_MESSAGES_ERROR } from "../../../../app.types";
import Loader from "../../../../components/loader/Loader";
import Icon from "../../../../components/icons/Icons";
import { setConsultantClient } from "../../../../services/consultant/Consultant.service";
import { Consultant } from "../../../../services/consultant/Consultant.model";

interface ConsultantSingleProfileProps {
  consultant: Consultant;
}

const ConsultantSingleProfile: React.FC<ConsultantSingleProfileProps> = ({
  consultant,
}) => {
  const dispatch = useAppDispatch();
  const auth = useSelector(selectAuthState);
  const customer = useSelector(selectCustomerState);
  const authModalRef = useRef<AuthModalRef>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const isUserEmpty = (): boolean => {
    return !auth.accessToken;
  };

  const isUserCustomer = (): boolean => {
    return !!auth.accessToken && auth.userType === "customer";
  };

  const isSelectedConsultant = (): boolean => {
    return (
      isUserCustomer() && customer.profile?.consultantId === consultant?.id
    );
  };

  const openSignInModal = (): void => {
    authModalRef?.current?.openSignInModal();
  };

  const textChooseButton = (): string => {
    return isSelectedConsultant()
      ? "Обраний консультант"
      : "Обрати консультанта";
  };

  const onClickChooseButton = (): void => {
    switch (true) {
      case isUserEmpty():
        openSignInModal();
        break;
      case !isSelectedConsultant():
        selectConsultant();
        break;
    }
  };

  const selectConsultant = async (): Promise<void> => {
    if (!customer?.profile?.id || !consultant?.id) {
      return;
    }

    setLoading(true);
    try {
      const result = await dispatch(
        updateCustomerProfile(customer.profile.id, {
          consultantId: consultant?.id,
        }),
      );

      await dispatch(setConsultantClient(consultant?.id, customer.profile.id));
      console.log("selectConsultant success", result);
      alertMessage({
        type: "success",
        message: "Консультант успішно вибран",
      });
    } catch (error) {
      console.log("handlerUpdateCustomerProfile error", error);
      alertMessage({
        type: "error",
        message: DEFAULT_MESSAGES_ERROR,
      });
    } finally {
      setLoading(false);
    }
  };

  const iconChooseButton = (): React.JSX.Element | null => {
    switch (true) {
      case loading || customer.profileLoading:
        return <Loader className={"mr-2"} />;
      case isSelectedConsultant():
        return <Icon name={"done"} className={"mr-2"} />;
      default:
        return null;
    }
  };

  return (
    <div id="ConsultantSingleProfile" className="box mb-4">
      <div className="consultant-single-profile">
        <div className="consultant-single-profile__photo">
          <div className="consultant-single-profile__photo__img">
            <img src={getImagePathFromStorage(consultant?.photoPath)} alt="" />
          </div>
        </div>
        <div className="consultant-single-profile__body">
          <p className="consultant-single-profile__name">
            {consultant?.lastName} {consultant?.firstName} {consultant?.surName}
          </p>
          <div className="consultant-single-profile__info">
            <div className="consultant-single-profile__info__item">
              <InfoView label={"ID консультанта"} value={consultant?.id} />
            </div>
            {consultant?.regionName ? (
              <div className="consultant-single-profile__info__item">
                <InfoView label={"Область"} value={consultant?.regionName} />
              </div>
            ) : null}
            <div className="consultant-single-profile__info__item">
              <InfoView label={"Номер телефону"} value={consultant?.phone} />
            </div>
            {consultant?.cityName ? (
              <div className="consultant-single-profile__info__item">
                <InfoView
                  label={"Населений пункт"}
                  value={consultant?.cityName}
                />
              </div>
            ) : null}
            <div className="consultant-single-profile__info__item">
              <InfoView label={"Email"} value={consultant?.email} />
            </div>
          </div>
          {isUserEmpty() || isUserCustomer() ? (
            <div className="consultant-single-profile__action">
              <button
                className="btn"
                onClick={onClickChooseButton}
                disabled={isSelectedConsultant()}
              >
                {iconChooseButton()}
                {textChooseButton()}
              </button>
              <button className="btn btn-border ml-3">
                Написати консультанту
              </button>
              {isUserEmpty() ? (
                <AuthModal ref={authModalRef}></AuthModal>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ConsultantSingleProfile;
