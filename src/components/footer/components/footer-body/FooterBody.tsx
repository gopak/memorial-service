import React from "react";
import "./FooterBody.scss";
import Icon from "../../../icons/Icons";
import InfoView from "../../../info-view/InfoView";
import { SITE_MAP } from "../../../../constants/SiteMap.constants";
import { Link } from "react-router-dom";
import SocialList from "../../../social-list/SocialList";

interface FooterBodyProps {}

const FooterBody: React.FC<FooterBodyProps> = (props) => {
  return (
    <div className={"wrapper"}>
      <div className={"footer-body"}>
        <div className={"footer-body__item"}>
          <div className={"mb-4"}>
            <Icon name={"logo"} width={182} height={38} />
          </div>

          <InfoView
            label={"Адреса"}
            value={"м. Київ, вул. Михайла Бойчука, 20"}
          />
          <InfoView label={"Телефон"} value={"+38 (098) 580 03 30"} />
          <div className={"mt-3"}>
            <SocialList />
          </div>
        </div>
        <div className={"footer-body__item"}>
          <h5 className={"mb-3"}>Мапа сайту</h5>
          <ul className={"footer-nav"}>
            {SITE_MAP.map((item) => (
              <li key={item.title} className={"footer-nav__list"}>
                <Link
                  to={item.path}
                  className={"footer-nav__item"}
                  preventScrollReset={false}
                >
                  <span className={"footer-nav__item__link"}>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={"footer-body__item"}>
          <h5 className={"mb-3"}>Особистий кабінет</h5>
          <ul className={"footer-nav"}>
            <li className={"footer-nav__list"}>
              <Link to={"/"} className={"footer-nav__item"}>
                <span className={"footer-nav__item__link"}>
                  Для користувача
                </span>
              </Link>
            </li>
            <li className={"footer-nav__list"}>
              <Link to={"/"} className={"footer-nav__item"}>
                <span className={"footer-nav__item__link"}>
                  Для консультанта
                </span>
              </Link>
            </li>
            <li className={"footer-nav__list"}>
              <Link to={"/"} className={"footer-nav__item"}>
                <span className={"footer-nav__item__link"}>
                  Для ритуальної служби
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterBody;
