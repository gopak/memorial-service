import React, { useRef } from "react";
import "./ConsultantInfo.scss";

import { useSelector } from "react-redux";
import EditConsultantInfoModal, {
  EditConsultantInfoModalRef,
} from "./components/edit-consultant-info-modal/EditConsultantInfoModal";
import { convertTimestampToString } from "../../../../../utils/Helpers.util";
import InfoView from "../../../../../components/info-view/InfoView";
import { selectConsultantState } from "../../../../../store/selectors/Consultant.selectors";

interface ConsultantInfoProps {}

const ConsultantInfo: React.FC<ConsultantInfoProps> = (props) => {
  const consultant = useSelector(selectConsultantState);
  const profile = consultant.profile;
  const editConsultantInfoModalRef = useRef<EditConsultantInfoModalRef>(null);

  const openModal = (): void => {
    if (!profile) {
      return;
    }

    editConsultantInfoModalRef?.current?.openModal(profile);
  };

  return (
    <div className={"consultant-info"}>
      <div className={"heading"}>
        <h4>Основна інформація</h4>
        <div className={"heading__action"}>
          <button
            className={"btn btn-border"}
            onClick={openModal}
            disabled={!profile}
          >
            Редагувати
          </button>
          {profile ? (
            <EditConsultantInfoModal ref={editConsultantInfoModalRef} />
          ) : null}
        </div>
      </div>

      <div className={"container-50"}>
        <div className={"container-50__item"}>
          <InfoView
            label={"ПІБ користувача"}
            value={`${profile?.lastName} ${profile?.firstName} ${profile?.surName}`}
          />
          <InfoView label={"Номер телефону"} value={profile?.phone} />
          {profile?.regionName ? (
            <InfoView label={"Область"} value={profile?.regionName} />
          ) : null}
          {profile?.address ? (
            <InfoView label={"Адреса"} value={profile?.address} />
          ) : null}
        </div>
        <div className={"container-50__item"}>
          <InfoView
            label={"Дата народження"}
            value={convertTimestampToString(profile?.dateBirth)}
          />
          <InfoView label={"Email"} value={profile?.email} />
          {profile?.regionName ? (
            <InfoView label={"Номер телефону"} value={profile?.phone} />
          ) : null}
          {profile?.cityName ? (
            <InfoView label={"Населений пункт"} value={profile?.cityName} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ConsultantInfo;
