import React from "react";
import "./CustomerConsultant.scss";
import { useSelector } from "react-redux";
import { selectConsultantState } from "../../../store/selectors/Consultant.selectors";
import CustomerConsultantProfile from "./components/customer-consultant-profile/CustomerConsultantProfile";
import CustomerConsultantDescription from "./components/customer-consultant-description/CustomerConsultantDescription";
import CustomerConsultantServices from "./components/customer-consultant-services/CustomerConsultantServices";

interface CustomerConsultantProps {}

const CustomerConsultant: React.FC<CustomerConsultantProps> = (props) => {
  const consultant = useSelector(selectConsultantState);
  const profile = consultant.profile;

  return (
    <div className={"box customer-consultant"}>
      <div className={"heading"}>
        <h3>Мій консультант</h3>
        <div className="heading__action">
          <button className="btn btn-border">Змінити консультанта</button>
          <button className="btn ml-3">Залишити відгук</button>
        </div>
      </div>
      <div className={"customer-consultant__item"}>
        <CustomerConsultantProfile />
      </div>
      {profile?.description ? (
        <div className={"customer-consultant__item"}>
          <CustomerConsultantDescription />
        </div>
      ) : null}
      {profile?.services?.length ? (
        <div className={"customer-consultant__item"}>
          <CustomerConsultantServices />
        </div>
      ) : null}
    </div>
  );
};

export default CustomerConsultant;
