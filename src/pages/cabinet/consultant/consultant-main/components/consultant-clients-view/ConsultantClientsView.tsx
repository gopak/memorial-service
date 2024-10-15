import React, { useEffect, useState } from "react";
import "./ConsultantCustomers.scss";

import { useSelector } from "react-redux";
import { selectConsultantState } from "../../../../../../store/selectors/Consultant.selectors";
import { getConsultantCustomersList } from "../../../../../../services/consultant/Consultant.service";
import { useAppDispatch } from "../../../../../../store/store";
import { Customer } from "../../../../../../services/customer/Customer.model";
import ConsultantClientsTable from "../../../../../../components/consultant-clients-table/ConsultantClientsTable";

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
      <ConsultantClientsTable clients={customersList} />
    </div>
  );
};

export default ConsultantCustomers;
