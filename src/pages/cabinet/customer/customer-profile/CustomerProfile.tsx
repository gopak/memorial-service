import React from "react";
import "./CustomerProfile.scss";

import CustomerInfo from "./components/customer-info/CustomerInfo";
import CustomerAvatar from "./components/customer-avatar/CustomerAvatar";
import { useSelector } from "react-redux";
import { selectCustomerState } from "../../../store/selectors/Customer.selectors";
import CustomerPassword from "./components/customer-password/CustomerPassword";
interface CustomerProfileProps {}

const CustomerProfile: React.FC<CustomerProfileProps> = (props) => {
  const customer = useSelector(selectCustomerState);

  return (
    <div className={"box customer-profile"}>
      <h3>Особисті дані</h3>
      <div
        className={`${customer.profileLoading ? "skeleton-pseudo-transparent" : ""}`}
      >
        <div className={"customer-profile__item"}>
          <CustomerInfo />
        </div>
        <div className={"customer-profile__item"}>
          <CustomerAvatar />
        </div>
        <div className={"customer-profile__item"}>
          <CustomerPassword />
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
