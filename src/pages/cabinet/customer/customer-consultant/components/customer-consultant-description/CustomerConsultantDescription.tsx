import React from "react";
import "./CustomerConsultantDescription.scss";
import { useSelector } from "react-redux";
import { selectConsultantState } from "../../../../../store/selectors/Consultant.selectors";

interface CustomerConsultantDescriptionProps {}

const CustomerConsultantDescription: React.FC<
  CustomerConsultantDescriptionProps
> = (props) => {
  const consultant = useSelector(selectConsultantState);
  const profile = consultant.profile;

  return (
    <div className={"customer-consultant-description"}>
      <h4>Про консультанта</h4>
      <div className={"mt-3"}>{profile?.description}</div>
    </div>
  );
};

export default CustomerConsultantDescription;
