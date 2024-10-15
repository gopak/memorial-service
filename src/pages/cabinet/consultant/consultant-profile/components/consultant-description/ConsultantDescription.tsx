import React, { useRef } from "react";
import "./ConsultantDescription.scss";
import { useSelector } from "react-redux";
import { selectConsultantState } from "../../../../../../store/selectors/Consultant.selectors";
import EditConsultantDescriptionModal, {
  EditConsultantDescriptionModalRef,
} from "./components/edit-consultant-description-modal/EditConsultantDescriptionModal";

interface ConsultantDescriptionProps {}

const ConsultantDescription: React.FC<ConsultantDescriptionProps> = (props) => {
  const consultant = useSelector(selectConsultantState);
  const profile = consultant.profile;
  const editModalRef = useRef<EditConsultantDescriptionModalRef>(null);

  const openModal = (): void => {
    if (!profile) {
      return;
    }

    editModalRef?.current?.openModal(profile);
  };

  return (
    <>
      <div className="msg msg-info mt-3">
        <span className="font-weight-md">Зверніть увагу!</span> Цей блок буде
        відображатися у вашому особистому профілі на головній сторінці сайту.
        Опишіть свої сильні якості максимально детально, при цьому будьте
        лаконічними.
      </div>
      <div className="consultant-profile__item">
        <div className={"heading"}>
          <h4>Про вас</h4>
          <div className={"heading__action"}>
            <button
              className={"btn btn-border"}
              onClick={openModal}
              disabled={!profile}
            >
              Редагувати
            </button>
            {profile ? (
              <EditConsultantDescriptionModal ref={editModalRef} />
            ) : null}
          </div>
        </div>
        {profile?.description}
      </div>
    </>
  );
};

export default ConsultantDescription;
