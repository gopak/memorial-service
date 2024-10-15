import React from "react";
import "./CustomerConsultantServices.scss";
import { useSelector } from "react-redux";
import { selectConsultantState } from "../../../../../../store/selectors/Consultant.selectors";
import ConsultantServicesTable from "../../../../../../components/consultant-services-table/ConsultantServicesTable";

interface CustomerConsultantServicesProps {}

const CustomerConsultantServices: React.FC<CustomerConsultantServicesProps> = (
  props,
) => {
  const consultant = useSelector(selectConsultantState);
  const profile = consultant.profile;

  return (
    <div className={"customer-consultant-services"}>
      <h4>Послуги</h4>
      <div className="mt-3">
        <ConsultantServicesTable services={profile?.services ?? []} />
      </div>
    </div>
  );
};

export default CustomerConsultantServices;
