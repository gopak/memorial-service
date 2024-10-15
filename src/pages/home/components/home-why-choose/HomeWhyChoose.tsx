import React from "react";
import "./HomeWhyChoose.scss";
import WhyChoose from "../../../../components/why-choose/WhyChoose";
import { HOME_WHY_CHOOSE_LIST } from "./HomeWhyChoose.constant";

interface HomeWhyChooseProps {}

const HomeWhyChoose: React.FC<HomeWhyChooseProps> = (props) => {
  return (
    <div className="home-why-choose-container">
      <div className="wrapper">
        <h2>Навіщо працювати з нашим сервісом?</h2>
        <div className="home-why-choose">
          <WhyChoose list={HOME_WHY_CHOOSE_LIST} />
        </div>
      </div>
    </div>
  );
};

export default HomeWhyChoose;
