import React from "react";
import "./ConsultantServices.scss";
import { useSelector } from "react-redux";
import { selectConsultantState } from "../../store/selectors/Consultant.selectors";
import { ConsultantService } from "../../services/consultant/Consultant.model";

interface ConsultantServicesProps {
  services: ConsultantService[];
}

const ConsultantServices: React.FC<ConsultantServicesProps> = ({
  services,
}) => {
  return (
    <div className={"table consultant-services-table"}>
      <div className="table-row">
        <div className={"th"}>Назва послуги</div>
        <div className={"th"}>Ціна</div>
        <div className={"th"}></div>
      </div>
      {services.map((item, index) => (
        <div key={index} className="table-row">
          <div className={"td"}>
            <p className={"consultant-services-table__title"}>{item.title}</p>
            <span className={"consultant-services-table__desc"}>
              {item.description}
            </span>
          </div>
          <div className={"td consultant-services-table__cost"}>
            {item.cost} грн
          </div>
          <div className={"td"}>
            <button className="btn">Замовити</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConsultantServices;
