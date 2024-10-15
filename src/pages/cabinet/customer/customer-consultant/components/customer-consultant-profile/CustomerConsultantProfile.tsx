import React from "react";
import "./CustomerConsultantProfile.scss";
import { useSelector } from "react-redux";
import { selectConsultantState } from "../../../../../store/selectors/Consultant.selectors";
import { getImagePathFromStorage } from "../../../../../firebase/Firebase.service";
import InfoView from "../../../../../components/info-view/InfoView";

interface CustomerConsultantProfileProps {}

const CustomerConsultantProfile: React.FC<CustomerConsultantProfileProps> = (
  props,
) => {
  const consultant = useSelector(selectConsultantState);
  const profile = consultant.profile;

  return (
    <div className={"customer-consultant-profile"}>
      <div className={"customer-consultant-profile__photo"}>
        <img src={getImagePathFromStorage(profile?.photoPath)} alt="" />
        <div className={"customer-consultant-profile__photo__action"}>
          <button className={"btn btn-border btn-block"}>Написати</button>
        </div>
      </div>
      <div className={"customer-consultant-profile__body"}>
        <h5 className={"customer-consultant-profile__name"}>
          {profile?.lastName} {profile?.firstName} {profile?.surName}
        </h5>
        <InfoView label={"Номер телефону"} value={profile?.phone} />
        <InfoView label={"Email"} value={profile?.email} />
        {profile?.cityName ? (
          <InfoView label={"Населений пункт"} value={profile?.phone} />
        ) : null}
      </div>
    </div>
  );
};

export default CustomerConsultantProfile;
