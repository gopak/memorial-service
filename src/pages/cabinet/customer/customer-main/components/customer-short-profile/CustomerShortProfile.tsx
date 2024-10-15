import React from "react";
import "./CustomerShortProfile.scss";

import { useSelector } from "react-redux";
import { selectCustomerState } from "../../../../../store/selectors/Customer.selectors";
import { useNavigate } from "react-router-dom";
import InfoView from "../../../../../components/info-view/InfoView";
import PersonCard from "../../../../../components/person-card/PersonCard";
import { getImagePathFromStorage } from "../../../../../firebase/Firebase.service";

interface CustomerShortProfileProps {}

const CustomerShortProfile: React.FC<CustomerShortProfileProps> = (props) => {
  const navigate = useNavigate();
  const customer = useSelector(selectCustomerState);
  const profile = customer.profile;

  const navigateToProfile = (): void => {
    navigate("/customer/profile");
  };

  return (
    <div
      className={`box customer-short-profile ${customer.profileLoading ? "skeleton-pseudo-transparent" : ""}`}
    >
      <h3>Особисті дані</h3>
      <div className={"customer-short-profile__body"}>
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
      </div>
      <div className={"customer-short-profile__action"}>
        <button
          className={"btn btn-border customer-short-profile__action__button"}
          onClick={navigateToProfile}
        >
          Детальніше
        </button>
      </div>
    </div>
  );
};

export default CustomerShortProfile;
