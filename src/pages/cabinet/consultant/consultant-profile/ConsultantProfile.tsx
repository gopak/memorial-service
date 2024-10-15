import React from "react";
import "./ConsultantProfile.scss";

import ConsultantInfo from "./components/consultant-info/ConsultantInfo";
import ConsultantAvatar from "./components/consultant-avatar/ConsultantAvatar";
import { useSelector } from "react-redux";
import ConsultantPassword from "./components/consultant-password/ConsultantPassword";
import { selectConsultantState } from "../../../../store/selectors/Consultant.selectors";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ConsultantDescription from "./components/consultant-description/ConsultantDescription";

interface ConsultantProfileProps {}

const ConsultantProfile: React.FC<ConsultantProfileProps> = (props) => {
  const consultant = useSelector(selectConsultantState);

  return (
    <div className="box consultant-profile">
      <h3>Особисті дані</h3>
      <div
        className={`${consultant.profileLoading ? "skeleton-pseudo-transparent" : ""}`}
      >
        <Tabs selectedTabClassName={"active"}>
          <TabList className="consultant-profile-tab">
            <Tab className="consultant-profile-tab__item">Основні дані</Tab>
            <Tab className="consultant-profile-tab__item">Опис спеціаліста</Tab>
            <Tab className="consultant-profile-tab__item">Послуги</Tab>
          </TabList>

          <TabPanel>
            <div className="consultant-profile__item">
              <ConsultantInfo />
            </div>
            <div className="consultant-profile__item">
              <ConsultantAvatar />
            </div>
            <div className="consultant-profile__item">
              <ConsultantPassword />
            </div>
          </TabPanel>
          <TabPanel>
            <ConsultantDescription />
          </TabPanel>
          <TabPanel>Послуги</TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default ConsultantProfile;
