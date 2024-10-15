import React, { useEffect, useState } from "react";
import "./CabinetNav.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../../../../../services/auth/Auth.service";
import { useAppDispatch } from "../../../../../store/store";
import Icon from "../../../../icons/Icons";
import { CabinetNavItem, UserType } from "../../../../../app.types";
import { CUSTOMER_CABINET_NAV } from "../../../../../pages/customer/CustomerCabinetNav.constants";
import { useSelector } from "react-redux";
import { selectCustomerState } from "../../../../../store/selectors/Customer.selectors";

interface UserNavProps {
    userType: UserType;
}

interface ShortInfo {
  photoPath?: string;
  name: string;
  contact: string;
}

const CabinetNav: React.FC<UserNavProps> = ({ userType }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const customer = useSelector(selectCustomerState);
  const [navList, setNavList] = useState<CabinetNavItem[]>([]);

  useEffect(() => {
    setNavList(getNavList);
  }, [userType]);

  const getNavList = (): CabinetNavItem[] => {
    let list: CabinetNavItem[] = [];

    switch (userType) {
      case "customer":
        list = CUSTOMER_CABINET_NAV;
        break;
      case "consultant":
        break;
      case "ritual-service":
        break;
    }

    return list;
  }

  const getShortInfo = (): ShortInfo => {
    const info: ShortInfo = {
      photoPath: '',
      name: '',
      contact: '',
    };

    switch (userType) {
      case "customer":
        info.photoPath = customer.info?.photoPath || 'https://placehold.co/100x100';
        info.name = `${customer.info?.firstName} ${customer.info?.lastName}`;
        info.contact = `${customer.info?.phone}`;
        break;
      case "consultant":
        break;
      case "ritual-service":
        break;
    }

    return info;
  }

  const handleLogout = async (): Promise<void> => {
      try {
          await dispatch(logOut());
          navigate("/");
          console.log("CabinetNavItem logOut success");
      } catch (error) {
          console.log("CabinetNavItem logOut error", error);
      }
  }

  return (
    <nav className={"box"}>
      <div className={"cabinet-short-info"}>
        <span className={`cabinet-short-info__photo ${customer.infoLoading ? 'skeleton-pseudo-transparent' : ''}`}>
          <img  src={getShortInfo().photoPath} alt=""/>
        </span>

        <span className={`h4 ${customer.infoLoading ? 'skeleton-pseudo-transparent' : ''}`}>
          {getShortInfo().name}
        </span>
        <span className={`cabinet-short-info__contact  ${customer.infoLoading ? 'skeleton-pseudo-transparent' : ''}`}>
          {getShortInfo().contact}
        </span>
      </div>
      <ul className={"cabinet-nav"}>
        {navList.map((item) => (
          <li key={item.title}
              className={"cabinet-nav__list"}
          >
            <NavLink to={item.path}
                     className={"cabinet-nav__item"}
                     end
            >
              <Icon name={item.icon} />
              <span className={"cabinet-nav__item__link"}>
                  {item.title}
              </span>
            </NavLink>
          </li>
          ))}
          <li className={"cabinet-nav__list cabinet-nav__list--logout"}>
            <span className={"cabinet-nav__item"} onClick={handleLogout}>
              <Icon name={"logout"} />
              <span className={"cabinet-nav__item__link"}>
                  Вийти з кабінету
              </span>
            </span>
          </li>
      </ul>
    </nav>
  );
}

export default CabinetNav;
