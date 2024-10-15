import React from "react";
import "./ConsultantClientsTable.scss";

import { Customer } from "../../services/customer/Customer.model";
import { convertTimestampToString } from "../../utils/Helpers.util";
import { getImagePathFromStorage } from "../../firebase/Firebase.service";

interface ConsultantClientsTableProps {
  clients: Customer[];
}

const ConsultantClientsTable: React.FC<ConsultantClientsTableProps> = ({
  clients,
}) => {
  return (
    <div className="table consultant-clients-table">
      <div className="table-row">
        <div className="th consultant-clients-table__number">№</div>
        <div className="th">ПІБ клієнта</div>
        <div className="th">Телефон</div>
        <div className="th">Волевиявлення</div>
      </div>
      {clients.map((item, index) => (
        <div key={index} className="table-row">
          <div className="td consultant-clients-table__number">{index + 1}</div>
          <div className="td">
            <div className="consultant-clients-table__card">
              <div className="consultant-clients-table__card__photo">
                <div className="consultant-clients-table__card__photo__img">
                  <img
                    src={getImagePathFromStorage(item?.photoPath)}
                    alt={`${item.lastName} ${item.firstName} ${item.surName}`}
                  />
                </div>
              </div>
              <div className="consultant-clients-table__card__info">
                <div className="consultant-clients-table__card__name">
                  {item.lastName} {item.firstName} {item.surName}
                </div>
                <div className="consultant-clients-table__card__desc">
                  <div>{convertTimestampToString(item?.dateBirth)}</div>
                  <div>{item.cityName ?? ""}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="td">{item.phone}</div>
          <div className="td"></div>
        </div>
      ))}
    </div>
  );
};

export default ConsultantClientsTable;
