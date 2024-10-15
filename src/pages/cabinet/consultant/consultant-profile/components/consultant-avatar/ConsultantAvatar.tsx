import React, { useRef } from "react";
import "./ConsultantAvatar.scss";

import { useSelector } from "react-redux";
import EditConsultantAvatarModal, {
  EditConsultantAvatarModalRef,
} from "./components/edit-consultant-avatar-modal/EditConsultantAvatarModal";
import { selectConsultantState } from "../../../../../../store/selectors/Consultant.selectors";
import AvatarView from "../../../../../../components/avatar-view/AvatarView";
import { getImagePathFromStorage } from "../../../../../../firebase/Firebase.service";

interface ConsultantAvatarProps {}

const ConsultantAvatar: React.FC<ConsultantAvatarProps> = (props) => {
  const consultant = useSelector(selectConsultantState);
  const profile = consultant.profile;
  const editConsultantAvatarModalRef =
    useRef<EditConsultantAvatarModalRef>(null);

  const openEditModal = async (): Promise<void> => {
    if (!profile) {
      return;
    }

    editConsultantAvatarModalRef?.current?.openModal(profile);
  };

  return (
    <div className={"consultant-avatar"}>
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
            <EditConsultantAvatarModal ref={editConsultantAvatarModalRef} />
          ) : null}
        </div>
      </div>
      <div className={"consultant-avatar__photo"}>
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

export default ConsultantAvatar;
