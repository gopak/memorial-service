import React, { useRef } from "react";
import "./ConsultantPassword.scss";

import { useSelector } from "react-redux";

import InfoView from "../../../../../components/info-view/InfoView";
import EditConsultantPasswordModal, {
  EditConsultantPasswordModalRef,
} from "./components/edit-consultant-password-modal/EditConsultantPasswordModal";
import { selectConsultantState } from "../../../../../store/selectors/Consultant.selectors";

interface ConsultantPasswordProps {}

const ConsultantPassword: React.FC<ConsultantPasswordProps> = (props) => {
  const consultant = useSelector(selectConsultantState);
  const profile = consultant.profile;
  const editConsultantPasswordModalRef =
    useRef<EditConsultantPasswordModalRef>(null);

  const openModal = (): void => {
    if (!profile) {
      return;
    }

    editConsultantPasswordModalRef?.current?.openModal(profile);
  };

  return (
    <div className={"consultant-password"}>
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
            <EditConsultantPasswordModal ref={editConsultantPasswordModalRef} />
          ) : null}
        </div>
      </div>
      <InfoView label={"Поточний пароль"} value={"*************"} />
    </div>
  );
};

export default ConsultantPassword;
