import React from "react";
import "./ConsultantSingleNav.scss";
import { Link } from "react-scroll";
import ConsultantSingleDescription from "../consultant-single-description/ConsultantSingleDescription";
import ConsultantSingleWhyChoose from "../consultant-single-why-choose/ConsultantSingleWhyChoose";
import ConsultantSingleService from "../consultant-single-services/ConsultantSingleService";
import { useSelector } from "react-redux";
import { selectConsultantState } from "../../../../store/selectors/Consultant.selectors";

interface ConsultantSingleNavProps {}

const ConsultantSingleNav: React.FC<ConsultantSingleNavProps> = (props) => {
  const consultant = useSelector(selectConsultantState);
  const profile = consultant.profile;
  // {profile?.description ? <ConsultantSingleDescription /> : null}
  // <ConsultantSingleWhyChoose />
  // {profile?.services?.length ? <ConsultantSingleService /> : null}
  return (
    <div className="box consultant-single-nav__wrap">
      <h3>Навігація</h3>
      <ul className="consultant-single-nav">
        <li className="consultant-single-nav__list">
          <Link
            className="consultant-single-nav__item"
            smooth
            spy
            offset={-10}
            to="ConsultantSingleProfile"
          >
            Основні дані
          </Link>
        </li>
        {profile?.description ? (
          <li className="consultant-single-nav__list">
            <Link
              className="consultant-single-nav__item"
              smooth
              spy
              offset={-10}
              to="ConsultantSingleDescription"
            >
              Про консультанта
            </Link>
          </li>
        ) : null}

        <li className="consultant-single-nav__list">
          <Link
            className="consultant-single-nav__item"
            smooth
            spy
            offset={-10}
            to="ConsultantSingleWhyChoose"
          >
            Переваги
          </Link>
        </li>
        {profile?.services?.length ? (
          <li className="consultant-single-nav__list">
            <Link
              className="consultant-single-nav__item"
              smooth
              spy
              offset={-10}
              to="ConsultantSingleServices"
            >
              Послуги
            </Link>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default ConsultantSingleNav;
