import React, { useRef } from "react";
import "./CustomerAvatar.scss";

import { useSelector } from "react-redux";
import { selectCustomerState } from "../../../../../store/selectors/Customer.selectors";

import AvatarView from "../../../../../components/avatar-view/AvatarView";

import EditCustomerAvatarModal, {
  EditCustomerAvatarModalRef,
} from "./components/edit-customer-avatar-modal/EditCustomerAvatarModal";
import { getImagePathFromStorage } from "../../../../../firebase/Firebase.service";

interface CustomerAvatarProps {}

const CustomerAvatar: React.FC<CustomerAvatarProps> = (props) => {
  const customer = useSelector(selectCustomerState);
  const profile = customer.profile;
  const editCustomerAvatarModalRef = useRef<EditCustomerAvatarModalRef>(null);

  const openEditModal = async (): Promise<void> => {
    if (!profile) {
      return;
    }

    editCustomerAvatarModalRef?.current?.openModal(profile);
  };

  return (
    <div className={"customer-avatar"}>
      <div className={"heading"}>
        <h4>Аватар</h4>
        <div className={"heading__action"}>
          <button
            className={"btn btn-border"}
            onClick={openEditModal}
            disabled={!profile}
          >
            Редагувати
          </button>
          {profile ? (
            <EditCustomerAvatarModal ref={editCustomerAvatarModalRef} />
          ) : null}
        </div>
      </div>

      <div className={"customer-avatar__photo"}>
        <AvatarView src={getImagePathFromStorage(profile?.photoPath)} />
      </div>

      <p>
        Аватар буде використовуватись в особистому кабінеті, а також під час
        публікації відгуків. Якщо ви бажаєте, щоб ваш профіль було простіше
        ідентифікувати, будь ласка додайте аватар!
      </p>
    </div>
  );
};

export default CustomerAvatar;
