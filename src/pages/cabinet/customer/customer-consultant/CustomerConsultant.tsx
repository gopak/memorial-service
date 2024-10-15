import React from "react";
import "./CustomerConsultant.scss";
import { useSelector } from "react-redux";
import CustomerConsultantProfile from "./components/customer-consultant-profile/CustomerConsultantProfile";
import CustomerConsultantDescription from "./components/customer-consultant-description/CustomerConsultantDescription";
import CustomerConsultantServices from "./components/customer-consultant-services/CustomerConsultantServices";
import { selectConsultantState } from "../../../../store/selectors/Consultant.selectors";

interface CustomerConsultantProps {}

const CustomerConsultant: React.FC<CustomerConsultantProps> = (props) => {
  const consultant = useSelector(selectConsultantState);
  const consultantProfile = consultant.profile;

  return (
    <div className={"box customer-consultant"}>
      <div className={"heading"}>
        <h3>Мій консультант</h3>
        {consultantProfile ? (
          <div className="heading__action">
            <button className="btn btn-border">Змінити консультанта</button>
            <button className="btn ml-3">Залишити відгук</button>
          </div>
        ) : null}
      </div>
      {consultantProfile ? (
        <>
          {" "}
          <div className={"customer-consultant__item"}>
            <CustomerConsultantProfile />
          </div>
          {consultantProfile?.description ? (
            <div className={"customer-consultant__item"}>
              <CustomerConsultantDescription />
            </div>
          ) : null}
          {consultantProfile?.services?.length ? (
            <div className={"customer-consultant__item"}>
              <CustomerConsultantServices />
            </div>
          ) : null}
        </>
      ) : (
        <div>
          <p className="text-md mb-3">Поки що ви не обрали собі консультанта</p>
          <h5 className="mb-2">Навіщо потрібен консультант?</h5>
          <p>
            Консультанти - це спеціально навчені люди, що допомагають
            користувачам орієнтуватися в сервісі та надають власні послуги.
          </p>
          <p>
            Консультант допоможе вам скласти волевиявлення, оформить всі
            необхідні документи та допоможе розібратися в роботі сервісу.
          </p>
          <p>
            Якщо ви вже обрали консультанта, натисніть “Ввести ID консультанта”
            та уведіть його ID у відповідному полі.
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomerConsultant;
