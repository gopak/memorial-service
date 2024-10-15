import React from "react";
import "./HomeStatistics.scss";

interface HomeStatisticsProps {}

const HomeStatistics: React.FC<HomeStatisticsProps> = (props) => {
  return (
    <div className={"home-statistics-container"}>
      <div className="wrapper">
        <h2>Український реєстр поховань у цифрах</h2>
        <div className={"home-statistics"}>
          <div className={"home-statistics__item"}>
            <div className={"home-statistics__count"}>1 036 364</div>
            Користувачів щодня додають могили до реєстру
          </div>
          <div className={"home-statistics__item"}>
            <div className={"home-statistics__count"}>2 035</div>
            Консультантів уже успішно працюють на сервісі
          </div>
          <div className={"home-statistics__item"}>
            <div className={"home-statistics__count"}>6 056</div>
            Кладовищ охоплює Український реєстр поховань
          </div>
          <div className={"home-statistics__item"}>
            <div className={"home-statistics__count"}>26 236 000</div>
            Могил уже додано до всеукраїнського реєстру
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeStatistics;
