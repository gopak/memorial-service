import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.scss";

import PublicNav from "./components/public-nav/PublicNav";
import HeaderAuth from "./components/header-auth/HeaderAuth";
import Icon from "../icons/Icons";
import { useSelector } from "react-redux";
import { selectAuthState } from "../../store/selectors/Auth.selectors";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = (props) => {
  const auth = useSelector(selectAuthState);
  const location = useLocation();

  const isPrivateRoute = (): boolean => {
    return location.pathname.startsWith(`/${auth.userType}`);
  };

  return (
    <header className={`header ${isPrivateRoute() ? "isPrivateRoute" : ""}`}>
      <div className="wrapper">
        <div className={"header__in"}>
          <Link to="/" className={"logo"}>
            <Icon name={"logo"} width={182} height={38} />
          </Link>
          {auth?.accessToken ? null : <PublicNav />}
          <HeaderAuth />
        </div>
      </div>
    </header>
  );
};

export default Header;
