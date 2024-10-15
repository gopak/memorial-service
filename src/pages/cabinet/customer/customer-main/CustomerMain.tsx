import React from "react";
import { useSelector } from "react-redux";
import { selectCustomerState } from "../../../store/selectors/Customer.selectors";
import CustomerShortProfile from "./components/customer-short-profile/CustomerShortProfile";
import CustomerConsultantShortProfile from "./components/customer-consultant-short-profile/CustomerConsultantShortProfile";

interface UserMainProps {}

const CustomerMain: React.FC<UserMainProps> = (props) => {
  const customer = useSelector(selectCustomerState);

  return (
    <>
      <div
        className={`box mb-4 ${customer.profileLoading ? "skeleton-pseudo-transparent" : ""}`}
      >
        <h3>Вітаємо, {customer.profile?.firstName}!</h3>
        <p>
          Ви увійшли у свій особистий кабінет. Тут ви можете додати могили
          <br /> до українського реєстру поховань, замовити послуги щодо них,
          поповнювати
          <br /> власний баланс та взаємодіяти з консультантом
        </p>
      </div>
      <div className={"container-50"}>
        <div className={"container-50__item"}>
          <CustomerShortProfile />
        </div>
        {customer.profile?.consultantId ? (
          <div className={"container-50__item"}>
            <CustomerConsultantShortProfile />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CustomerMain;
