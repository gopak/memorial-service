import React from "react";
import "./HomeWhyChoose.scss";

interface HomeWhyChooseProps {}

const HomeWhyChoose: React.FC<HomeWhyChooseProps> = (props) => {
  return (
    <div className="home-why-choose-container">
      <div className="wrapper">
        <h2>Навіщо працювати з нашим сервісом?</h2>
        <div className="home-why-choose">
          <div className="home-why-choose__item">
            <div className="home-why-choose__number">01</div>
            <div className="home-why-choose__title">
              Швидка та якісна робота
            </div>
            <div className="home-why-choose__desc">
              Я надаю послуги щвидко, але при цьому вам не треба хвилюватись за
              їх якість
            </div>
          </div>
          <div className={"home-why-choose__item"}>
            <div className="home-why-choose__number">02</div>
            <div className="home-why-choose__title">
              Швидка та якісна робота
            </div>
            <div className="home-why-choose__desc">
              Я надаю послуги щвидко, але при цьому вам не треба хвилюватись за
              їх якість
            </div>
          </div>
          <div className={"home-why-choose__item"}>
            <div className="home-why-choose__number">03</div>
            <div className="home-why-choose__title">
              Швидка та якісна робота
            </div>
            <div className="home-why-choose__desc">
              Я надаю послуги щвидко, але при цьому вам не треба хвилюватись за
              їх якість
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeWhyChoose;
