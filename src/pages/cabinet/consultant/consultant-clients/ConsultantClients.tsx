import React, { useEffect, useState } from "react";
import "./ConsultantClients.scss";

import { useSelector } from "react-redux";
import { selectConsultantState } from "../../../../store/selectors/Consultant.selectors";
import { useAppDispatch } from "../../../../store/store";
import { Customer } from "../../../../services/customer/Customer.model";
import { getConsultantCustomersList } from "../../../../services/consultant/Consultant.service";
import ConsultantClientsTable from "../../../../components/consultant-clients-table/ConsultantClientsTable";

interface ConsultantClientsProps {}

const ConsultantClients: React.FC<ConsultantClientsProps> = (props) => {
  const dispatch = useAppDispatch();
  const consultant = useSelector(selectConsultantState);
  const profile = consultant.profile;
  const [customersList, setCustomersList] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getCustomersList();
  }, [profile?.id]);

  const getCustomersList = async (): Promise<void> => {
    if (!profile?.id) {
      return;
    }
    setLoading(true);
    try {
      const response = await dispatch(getConsultantCustomersList(profile?.id));
      setCustomersList(response);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="box">
      <h3>Мої клієнти</h3>
      <div
        className={`consultant-customers ${loading || consultant.profileLoading ? "skeleton-pseudo-transparent" : ""}`}
      >
        {customersList?.length ? (
          <ConsultantClientsTable clients={customersList} />
        ) : (
          <h5>У Вас ще немає клієнтів</h5>
        )}
      </div>
    </div>
  );
};

export default ConsultantClients;
