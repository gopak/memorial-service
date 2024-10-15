import React, { useRef } from "react";
import "./CustomerPassword.scss";

import { useSelector } from "react-redux";

import EditCustomerPasswordModal, {
  EditCustomerPasswordModalRef,
} from "./components/edit-customer-password-modal/EditCustomerPasswordModal";
import { selectCustomerState } from "../../../../../../store/selectors/Customer.selectors";
import InfoView from "../../../../../../components/info-view/InfoView";

interface CustomerPasswordProps {}

const CustomerPassword: React.FC<CustomerPasswordProps> = (props) => {
  const customer = useSelector(selectCustomerState);
  const profile = customer.profile;
  const editCustomerPasswordModalRef =
    useRef<EditCustomerPasswordModalRef>(null);

  const openModal = (): void => {
    if (!profile) {
      return;
    }

    editCustomerPasswordModalRef?.current?.openModal(profile);
  };

  return (
    <div className={"customer-password"}>
      <div className={"heading"}>
        <h4>Пароль</h4>
        <div className={"heading__action"}>
          <button
            className={"btn btn-border"}
            onClick={openModal}
            disabled={!profile}
          >
            Редагувати
          </button>
          {profile ? (
            <EditCustomerPasswordModal ref={editCustomerPasswordModalRef} />
          ) : null}
        </div>
      </div>
      <InfoView label={"Поточний пароль"} value={"*************"} />
    </div>
  );
};

export default CustomerPassword;
