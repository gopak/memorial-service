import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.scss"
import { Icon } from "../icons/Icons";
import Login from "./components/login/Login";
interface Props {}

const Header: React.FC<Props> = props => {

  return (
      <header className="header">
          <div className="wrapper">
              <div className={"header__in"}>
                  <Link to="/"
                        className={"logo"}
                  ><Icon name={'logo'} width={182} height={38} /></Link>
                  <Login/>
              </div>

          </div>
      </header>
  );
}

export default Header;
