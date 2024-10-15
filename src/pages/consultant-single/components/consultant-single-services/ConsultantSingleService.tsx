import React from "react";
import "./ConsultantSingleService.scss";

import ConsultantServicesTable from "../../../../components/consultant-services-table/ConsultantServicesTable";
import { Consultant } from "../../../../services/consultant/Consultant.model";

interface ConsultantSingleServiceProps {
  consultant: Consultant;
}

const ConsultantSingleService: React.FC<ConsultantSingleServiceProps> = ({
  consultant,
}) => {
  return (
    <div id="ConsultantSingleServices" className={"box"}>
      <h4 className="mb-4">Послуги консультанта</h4>
      <ConsultantServicesTable services={consultant?.services ?? []} />
    </div>
  );
};

export default ConsultantSingleService;
