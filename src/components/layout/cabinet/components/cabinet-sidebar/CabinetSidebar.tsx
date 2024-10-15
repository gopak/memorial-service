import React, { useEffect, useState } from "react";
import "./CabinetSidebar.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../../../../../services/auth/Auth.service";
import { useAppDispatch } from "../../../../../store/store";
import Icon from "../../../../icons/Icons";
import { CabinetNavItem, UserType } from "../../../../../app.types";
import { useSelector } from "react-redux";
import { selectCustomerState } from "../../../../../store/selectors/Customer.selectors";
import { getImagePathFromStorage } from "../../../../../firebase/Firebase.service";
import { selectConsultantState } from "../../../../../store/selectors/Consultant.selectors";
import { CUSTOMER_CABINET_NAV } from "../../../../../pages/cabinet/customer/CustomerCabinetNav.constants";
import { CONSULTANT_CABINET_NAV } from "../../../../../pages/cabinet/consultant/ConsultantCabinetNav.constants";

interface CabinetSidebarProps {
  userType: UserType;
}

interface ShortProfile {
  photoPath?: string;
  name: string;
  contact: string;
}

const CabinetSidebar: React.FC<CabinetSidebarProps> = ({ userType }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const customer = useSelector(selectCustomerState);
  const consultant = useSelector(selectConsultantState);
  const [navList, setNavList] = useState<CabinetNavItem[]>([]);

  useEffect(() => {
    setNavList(getNavList());
  }, [userType]);

  const getNavList = (): CabinetNavItem[] => {
    let list: CabinetNavItem[] = [];

    switch (userType) {
      case "customer":
        list = CUSTOMER_CABINET_NAV;
        break;
      case "consultant":
        list = CONSULTANT_CABINET_NAV;
        break;
      case "ritual-service":
        break;
    }

    return list;
  };

  const getShortProfile = (): ShortProfile => {
    const profile: ShortProfile = {
      photoPath: "",
      name: "",
      contact: "",
    };

    switch (userType) {
      case "customer":
        profile.photoPath = getImagePathFromStorage(
          customer.profile?.photoPath,
        );
        profile.name = `${customer.profile?.firstName} ${customer.profile?.lastName}`;
        profile.contact = `${customer.profile?.phone}`;
        break;
      case "consultant":
        profile.photoPath = getImagePathFromStorage(
          consultant.profile?.photoPath,
        );
        profile.name = `${consultant.profile?.firstName} ${consultant.profile?.lastName}`;
        profile.contact = `${consultant.profile?.phone}`;
        break;
      case "ritual-service":
        break;
    }

    return profile;
  };

  const getProfileLoading = (): boolean => {
    switch (userType) {
      case "customer":
        return customer.profileLoading;
      case "consultant":
        return consultant.profileLoading;
      case "ritual-service":
        return false;
      default:
        return false;
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await dispatch(logOut());
      navigate("/");
      console.log("CabinetNavItem logOut success");
    } catch (error) {
      console.log("CabinetNavItem logOut error", error);
    }
  };

  return (
    <nav className={"box cabinet-sidebar"}>
      <div className={"cabinet-short-profile"}>
        <span
          className={`cabinet-short-profile__photo ${getProfileLoading() ? "skeleton-pseudo-transparent" : ""}`}
        >
          <img src={getShortProfile().photoPath} alt={getShortProfile().name} />
        </span>
        <span
          className={`h4 ${getProfileLoading() ? "skeleton-pseudo-transparent" : ""}`}
        >
          {getShortProfile().name}
        </span>
        <span
          className={`cabinet-short-profile__contact  ${getProfileLoading() ? "skeleton-pseudo-transparent" : ""}`}
        >
          {getShortProfile().contact}
        </span>
      </div>
      <ul
        className={`cabinet-nav  ${getProfileLoading() ? "skeleton-pseudo-transparent" : ""}`}
      >
        {navList.map((item) => (
          <li key={item.title} className={"cabinet-nav__list"}>
            <NavLink to={item.path} className={"cabinet-nav__item"} end>
              <Icon name={item.icon} />
              <span className={"cabinet-nav__item__link"}>{item.title}</span>
            </NavLink>
          </li>
        ))}
        <li className={"cabinet-nav__list cabinet-nav__list--logout"}>
          <span className={"cabinet-nav__item"} onClick={handleLogout}>
            <Icon name={"logout"} />
            <span className={"cabinet-nav__item__link"}>Вийти з кабінету</span>
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default CabinetSidebar;
