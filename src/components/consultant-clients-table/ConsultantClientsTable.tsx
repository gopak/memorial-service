import React, { useEffect, useState } from "react";
import "./ConsultantCustomers.scss";

import { useSelector } from "react-redux";
import { selectConsultantState } from "../../../../../../store/selectors/Consultant.selectors";
import { getConsultantCustomersList } from "../../../../../../services/consultant/Consultant.service";
import { useAppDispatch } from "../../../../../../store/store";
import { Customer } from "../../../../../../services/customer/Customer.model";
import { getImagePathFromStorage } from "../../../../../../firebase/Firebase.service";
import { convertTimestampToString } from "../../../../../../utils/Helpers.util";

interface ConsultantCustomersProps {}

const ConsultantCustomers: React.FC<ConsultantCustomersProps> = (props) => {
  const dispatch = useAppDispatch();
  const consultant = useSelector(selectConsultantState);
  const profile = consultant.profile;
  const [customersList, setCustomersList] = useState<Customer[]>([]);

  useEffect(() => {
    getCustomersList();
  }, []);

  const getCustomersList = async (): Promise<void> => {
    if (!profile?.id) {
      return;
    }

    try {
      const response = await dispatch(getConsultantCustomersList(profile?.id));
      setCustomersList(response);
    } catch (error) {}
  };

  return (
    <div className={"box consultant-customers"}>
      <h3>Мої клієнти</h3>
      <div className={"table consultant-customers-table"}>
        <div className="table-row">
          <div className={"th consultant-customers-table__number"}>№</div>
          <div className={"th"}>ПІБ клієнта</div>
          <div className={"th"}>Телефон</div>
          <div className={"th"}>Волевиявлення</div>
        </div>
        {customersList.map((item, index) => (
          <div key={index} className="table-row">
            <div className={"td consultant-customers-table__number"}>
              {index + 1}
            </div>
            <div className={"td"}>
              <div className={"consultant-customers-table__card"}>
                <div className={"consultant-customers-table__card__photo"}>
                  <img
                    src={getImagePathFromStorage(item?.photoPath)}
                    alt={`${item.lastName} ${item.firstName} ${item.surName}`}
                  />
                </div>
                <div className={"consultant-customers-table__card__info"}>
                  <div className={"consultant-customers-table__card__name"}>
                    {item.lastName} {item.firstName} {item.surName}
                  </div>
                  <div className={"consultant-customers-table__card__desc"}>
                    <div>{convertTimestampToString(item?.dateBirth)}</div>
                    <div>{item.cityName ?? ""}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={"td"}>{item.phone}</div>
            <div className={"td"}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultantCustomers;
