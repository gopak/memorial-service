import React from "react";
import "./WhyChoose.scss";

export interface WhyChooseList {
  title: string;
  description: string;
}

interface WhyChooseProps {
  list: WhyChooseList[];
}

const WhyChoose: React.FC<WhyChooseProps> = ({ list }) => {
  const getNumberList = (index: number): string => {
    return String(index + 1).padStart(2, "0");
  };

  return (
    <div className="why-choose">
      {list.map((item, index) => (
        <div key={index} className="why-choose__item">
          <div className="why-choose__number">{getNumberList(index)}</div>
          <div className="why-choose__title">{item.title}</div>
          <div className="why-choose__desc">{item.description}</div>
        </div>
      ))}
    </div>
  );
};

export default WhyChoose;
