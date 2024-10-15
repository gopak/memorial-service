import React from "react";
import "./ConsultantSingleDescription.scss";

import { Consultant } from "../../../../services/consultant/Consultant.model";

interface ConsultantSingleDescriptionProps {
  consultant: Consultant;
}

const ConsultantSingleDescription: React.FC<
  ConsultantSingleDescriptionProps
> = ({ consultant }) => {
  return (
    <div id="ConsultantSingleDescription" className={"box mb-4"}>
      <h4>Про консультанта</h4>
      <div className={"mt-3"}>{consultant?.description}</div>
    </div>
  );
};

export default ConsultantSingleDescription;
