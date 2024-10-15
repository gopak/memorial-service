import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import CabinetSidebar from "./components/cabinet-sidebar/CabinetSidebar";
import { UserType } from "../../../app.types";
import { getCustomerProfile } from "../../../services/customer/Customer.service";
import { useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import { selectAuthState } from "../../../store/selectors/Auth.selectors";
import { getConsultantProfile } from "../../../services/consultant/Consultant.service";

interface CabinetProps {
  userType: UserType;
}

const Cabinet: React.FC<CabinetProps> = (props) => {
  const dispatch = useAppDispatch();
  const auth = useSelector(selectAuthState);

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async (): Promise<void> => {
    switch (props.userType) {
      case "customer":
        dispatchGetCustomerProfile();
        break;
      case "consultant":
        dispatchGetConsultantProfile();
        break;
      case "ritual-service":
        break;
    }
  };

  const dispatchGetCustomerProfile = async (): Promise<void> => {
    try {
      await dispatch(getCustomerProfile(auth.uid, true));
      console.log("Cabinet dispatchGetCustomerProfile success");
    } catch (e) {
      console.log("Cabinet dispatchGetCustomerProfile error", e);
    }
  };

  const dispatchGetConsultantProfile = async (): Promise<void> => {
    try {
      await dispatch(getConsultantProfile(auth.uid));
      console.log("Cabinet dispatchGetConsultantProfile success");
    } catch (e) {
      console.log("Cabinet dispatchGetConsultantProfile error", e);
    }
  };

  return (
    <div className="container wrapper">
      <div className="container__nav">
        <CabinetSidebar userType={props.userType} />
      </div>
      <div className="container__content">
        <Outlet />
      </div>
    </div>
  );
};

export default Cabinet;
