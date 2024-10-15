import React from "react";
import "./InfoView.scss";

interface InfoViewProps {
  label: string;
  value: any;
}

const InfoView: React.FC<InfoViewProps> = ({ label, value }) => {
  return (
    <div className={"info-view"}>
      <p className={"info-view__label"}>{label}</p>
      <span className={"info-view__value"}>{value}</span>
    </div>
  );
};

export default InfoView;
