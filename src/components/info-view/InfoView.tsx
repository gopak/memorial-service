import React from "react";
import "./LabelValue.scss";

interface LabelValueProps {
  label: string;
  value: any;
}

const LabelValue: React.FC<LabelValueProps> = ({ label, value }) => {
  return (
    <div className={"label-value"}>
      <p className={"label-value__label"}>{label}</p>
      <span className={"label-value__value"}>{value}</span>
    </div>
  );
};

export default LabelValue;
