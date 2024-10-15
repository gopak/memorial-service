import React from "react";
import "./ConsultantShortProfile.scss";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InfoView from "../../../../../components/info-view/InfoView";
import PersonCard from "../../../../../components/person-card/PersonCard";
import { selectConsultantState } from "../../../../../store/selectors/Consultant.selectors";
import { getImagePathFromStorage } from "../../../../../firebase/Firebase.service";

interface ConsultantShortProfileProps {}

const ConsultantShortProfile: React.FC<ConsultantShortProfileProps> = (
  props,
) => {
  const navigate = useNavigate();
  const consultant = useSelector(selectConsultantState);
  const profile = consultant.profile;

  const navigateToProfile = (): void => {
    navigate("/consultant/profile");
  };

  return (
    <div
      className={`box consultant-short-profile ${consultant.profileLoading ? "skeleton-pseudo-transparent" : ""}`}
    >
      <h3>Особисті дані</h3>
      <div className={"consultant-short-profile__body"}>
        <PersonCard
          photoPath={getImagePathFromStorage(profile?.photoPath)}
          name={`${profile?.lastName} ${profile?.firstName} ${profile?.surName}`}
          phone={profile?.phone ?? ""}
        />
        <InfoView label={"Email"} value={profile?.email} />
        {profile?.regionName ? (
          <InfoView label={"Область"} value={profile?.regionName} />
        ) : null}
        {profile?.cityName ? (
          <InfoView label={"Населений пункт"} value={profile?.cityName} />
        ) : null}
        {profile?.address ? (
          <InfoView label={"Адреса"} value={profile?.address} />
        ) : null}
        <button className={"btn btn-border mt-3"} onClick={navigateToProfile}>
          Детальніше
        </button>
      </div>
    </div>
  );
};

export default ConsultantShortProfile;
