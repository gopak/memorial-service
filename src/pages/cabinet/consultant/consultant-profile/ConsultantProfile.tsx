import React from "react";
import "./ConsultantProfile.scss";

import ConsultantInfo from "./components/consultant-info/ConsultantInfo";
import ConsultantAvatar from "./components/consultant-avatar/ConsultantAvatar";
import { useSelector } from "react-redux";
import ConsultantPassword from "./components/consultant-password/ConsultantPassword";
import { selectConsultantState } from "../../../store/selectors/Consultant.selectors";
interface ConsultantProfileProps {}

const ConsultantProfile: React.FC<ConsultantProfileProps> = (props) => {
  const consultant = useSelector(selectConsultantState);

  return (
    <div className={"box consultant-profile"}>
      <h3>Особисті дані</h3>
      <div
        className={`${consultant.profileLoading ? "skeleton-pseudo-transparent" : ""}`}
      >
        <div className={"consultant-profile__item"}>
          <ConsultantInfo />
        </div>
        <div className={"consultant-profile__item"}>
          <ConsultantAvatar />
        </div>
        <div className={"consultant-profile__item"}>
          <ConsultantPassword />
        </div>
      </div>
    </div>
  );
};

export default ConsultantProfile;
