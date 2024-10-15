import React, { useRef } from "react";
import "./CustomerInfo.scss";

import { useSelector } from "react-redux";
import EditCustomerInfoModal, {
  EditCustomerInfoModalRef,
} from "./components/edit-customer-info-modal/EditCustomerInfoModal";
import { selectCustomerState } from "../../../../../../store/selectors/Customer.selectors";
import InfoView from "../../../../../../components/info-view/InfoView";
import { convertTimestampToString } from "../../../../../../utils/Helpers.util";

interface CustomerInfoProps {}

const CustomerInfo: React.FC<CustomerInfoProps> = (props) => {
  const customer = useSelector(selectCustomerState);
  const profile = customer.profile;
  const editCustomerInfoModalRef = useRef<EditCustomerInfoModalRef>(null);

  const openModal = (): void => {
    if (!profile) {
      return;
    }

    editCustomerInfoModalRef?.current?.openModal(profile);
  };

  return (
    <div className={"customer-info"}>
      <div className={"heading"}>
        <h4>Основна інформація</h4>
        <div className={"heading__action"}>
          <button
            className={"btn btn-border"}
            onClick={openModal}
            disabled={!profile}
          >
            Редагувати
          </button>
          {profile ? (
            <EditCustomerInfoModal ref={editCustomerInfoModalRef} />
          ) : null}
        </div>
      </div>

      <div className={"container-50"}>
        <div className={"container-50__item"}>
          <InfoView
            label={"ПІБ користувача"}
            value={`${profile?.lastName} ${profile?.firstName} ${profile?.surName}`}
          />
          <InfoView label={"Номер телефону"} value={profile?.phone} />
          {profile?.regionName ? (
            <InfoView label={"Область"} value={profile?.regionName} />
          ) : null}
          {profile?.address ? (
            <InfoView label={"Адреса"} value={profile?.address} />
          ) : null}
        </div>
        <div className={"container-50__item"}>
          <InfoView
            label={"Дата народження"}
            value={convertTimestampToString(profile?.dateBirth)}
          />
          <InfoView label={"Email"} value={profile?.email} />
          {profile?.regionName ? (
            <InfoView label={"Номер телефону"} value={profile?.phone} />
          ) : null}
          {profile?.cityName ? (
            <InfoView label={"Населений пункт"} value={profile?.cityName} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
