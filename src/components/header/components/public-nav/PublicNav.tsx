import React from "react";
import { Link } from "react-router-dom";
import "./PublicNav.scss";
import { SITE_MAP } from "../../../../constants/SiteMap.constants";

interface PublicNavProps {}

const PublicNav: React.FC<PublicNavProps> = (props) => {
  return (
    <ul className={"public-nav"}>
      {SITE_MAP.map((item) => (
        <li key={item.title} className={"public-nav__list"}>
          <Link to={item.path} className={"public-nav__item"}>
            <span className={"public-nav__item__link"}>{item.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PublicNav;
