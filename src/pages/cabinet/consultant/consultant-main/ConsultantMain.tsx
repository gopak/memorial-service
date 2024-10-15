import React from "react";
import { useSelector } from "react-redux";
import ConsultantShortProfile from "./components/consultant-short-profile/ConsultantShortProfile";
import ConsultantClientsView from "./components/consultant-clients-view/ConsultantClientsView";
import { selectConsultantState } from "../../../../store/selectors/Consultant.selectors";

interface ConsultantMainProps {}

const ConsultantMain: React.FC<ConsultantMainProps> = (props) => {
  const consultant = useSelector(selectConsultantState);

  return (
    <>
      <div
        className={`box mb-4 ${consultant.profileLoading ? "skeleton-pseudo-transparent" : ""}`}
      >
        <h3>Вітаємо, {consultant.profile?.firstName}!</h3>
        <p>
          Ви увійшли у свій особистий кабінет. Тут ви можете керувати клієнтами,
          замовити послуги у державних органах, отримувати кошти за надання
          власних послуг та виводити їх.
        </p>
      </div>
      <div className={"container-50"}>
        <div className={"container-50__item"}>
          <ConsultantShortProfile />
        </div>
      </div>
      {consultant.profile?.clientIds?.length ? (
        <div className={"mt-4"}>
          <ConsultantClientsView />
        </div>
      ) : null}
    </>
  );
};

export default ConsultantMain;
