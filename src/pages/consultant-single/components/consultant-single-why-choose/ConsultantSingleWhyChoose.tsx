import React from "react";
import "./ConsultantSingleWhyChoose.scss";

import WhyChoose from "../../../../components/why-choose/WhyChoose";
import { CONSULTANT_SINGLE_WHY_CHOOSE } from "./ConsultantSingleWhyChoose.constant";

interface ConsultantSingleWhyChooseProps {}

const ConsultantSingleWhyChoose: React.FC<ConsultantSingleWhyChooseProps> = (
  props,
) => {
  return (
    <div id="ConsultantSingleWhyChoose" className={"box mb-4"}>
      <h4 className="mb-4">Переваги роботи з консультантом</h4>
      <WhyChoose list={CONSULTANT_SINGLE_WHY_CHOOSE} />
    </div>
  );
};

export default ConsultantSingleWhyChoose;
