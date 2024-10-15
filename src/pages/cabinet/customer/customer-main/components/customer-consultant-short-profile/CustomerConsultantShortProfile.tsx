import React from "react";
import "./CustomerConsultantShortProfile.scss";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectConsultantState } from "../../../../../../store/selectors/Consultant.selectors";
import PersonCard from "../../../../../../components/person-card/PersonCard";
import { getImagePathFromStorage } from "../../../../../../firebase/Firebase.service";
import InfoView from "../../../../../../components/info-view/InfoView";

interface CustomerConsultantShortProfileProps {}

const CustomerConsultantShortProfile: React.FC<
  CustomerConsultantShortProfileProps
> = (props) => {
  const navigate = useNavigate();
  const consultant = useSelector(selectConsultantState);
  const profile = consultant.profile;

  const navigateToConsultantProfile = (): void => {
    navigate("/customer/consultant");
  };

  return (
    <div
      className={`box customer-consultant-short-profile ${consultant.profileLoading ? "skeleton-pseudo-transparent" : ""}`}
    >
      <h3>Мій консультант</h3>
      <div className={"customer-consultant-short-profile__body"}>
        <PersonCard
          photoPath={getImagePathFromStorage(profile?.photoPath)}
          name={`${profile?.lastName} ${profile?.firstName} ${profile?.surName}`}
          phone={profile?.phone ?? ""}
        />
        <InfoView label={"Email"} value={profile?.email} />
        {profile?.cityName ? (
          <InfoView label={"Населений пункт"} value={profile?.cityName} />
        ) : null}
        {profile?.services?.length ? (
          <InfoView
            label={"Кількість доступних послуг"}
            value={profile?.services?.length}
          />
        ) : null}
      </div>
      <div className={"customer-consultant-short-profile__action"}>
        <button
          className={"btn customer-consultant-short-profile__action__button"}
        >
          Написати
        </button>
        <button
          className={
            "btn btn-border customer-consultant-short-profile__action__button"
          }
          onClick={navigateToConsultantProfile}
        >
          Детальніше
        </button>
      </div>
    </div>
  );
};

export default CustomerConsultantShortProfile;
