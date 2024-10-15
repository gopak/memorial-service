import React, {
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./EditConsultantDescriptionModal.scss";

import { useForm } from "react-hook-form";
import {
  Consultant,
  ConsultantPayload,
} from "../../../../../../../../services/consultant/Consultant.model";
import { useAppDispatch } from "../../../../../../../../store/store";
import Modal, {
  ModalRef,
} from "../../../../../../../../components/modal/Modal";
import Select, {
  SelectOption,
} from "../../../../../../../../modules/forms/controls/Select";
import { AreasConstant } from "../../../../../../../../constants/Areas.constant";
import {
  getConsultantProfile,
  updateConsultantProfile,
} from "../../../../../../../../services/consultant/Consultant.service";
import { alertMessage } from "../../../../../../../../components/alert-message/AlertMessage";
import { DEFAULT_MESSAGES_ERROR } from "../../../../../../../../app.types";
import Input from "../../../../../../../../modules/forms/controls/Input";
import {
  MAX_LENGTH,
  MIN_LENGTH,
  PATTERN,
} from "../../../../../../../../modules/forms/validators/Validator";
import InputDate from "../../../../../../../../modules/forms/controls/InputDate";
import Loader from "../../../../../../../../components/loader/Loader";
import Textarea from "../../../../../../../../modules/forms/controls/Textarea";

interface EditConsultantDescriptionModalProps {}

export interface EditConsultantDescriptionModalRef {
  openModal: (profile: Consultant) => void;
}

interface Form {
  description: string | undefined;
}

const EditConsultantDescriptionModal = forwardRef<
  EditConsultantDescriptionModalRef,
  PropsWithChildren<EditConsultantDescriptionModalProps>
>((props, ref) => {
  const dispatch = useAppDispatch();
  const modalRef = useRef<ModalRef>(null);
  const [profile, setProfile] = useState<Consultant>();
  const [initValueCalendar, setInitValueCalendar] = useState<Date | null>(null);
  const [regions, setRegions] = useState<SelectOption[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorDetail, setErrorDetail] = useState<string>("");
  const { control, handleSubmit, getValues, reset } = useForm<Form>({
    defaultValues: {
      description: "",
    },
  });

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  const openModal = (profile: Consultant | null): void => {
    if (profile) {
      setProfile(profile);
      let defaultValues = {} as Form;
      defaultValues.description = profile.description;
      reset({ ...defaultValues });
    }
    modalRef?.current?.open();
  };

  const onClose = (): void => {
    reset();
  };

  const handlerFormSubmit = (data: Form): void => {
    console.log("form data", data);
    handlerUpdateConsultantProfile(data);
  };

  const handlerError = (errors): void => {
    console.log("form error", errors);
  };

  const handlerUpdateConsultantProfile = async (form: Form): Promise<void> => {
    if (!profile?.id) {
      return;
    }
    setErrorDetail("");
    setLoading(true);
    try {
      const result = await dispatch(
        updateConsultantProfile(profile.id, {
          description: form.description,
        }),
      );
      console.log("handlerUpdateConsultantProfile success", result);
      dispatch(getConsultantProfile(profile?.id));
      alertMessage({
        type: "success",
        message: "Дякуємо, дані успішно застосовано",
      });
      modalRef?.current?.close();
    } catch (error) {
      setErrorDetail(DEFAULT_MESSAGES_ERROR);
      console.log("handlerUpdateConsultantProfile error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      ref={modalRef}
      contentClassName={"edit-consultant-description-modal"}
      headerTitle={"Редагувати опис"}
      onClose={onClose}
    >
      <div className="msg msg-info mt-3">
        <p>
          <span className="font-weight-md">Зверніть увагу!</span> Цей блок буде
          відображатися у вашому особистому профілі на головній сторінці сайту.
        </p>
        Опис не має перевищувати 5000 знаків.
      </div>
      <form onSubmit={handleSubmit(handlerFormSubmit, handlerError)}>
        <div className={"edit-consultant-description-form"}>
          <div className={"form-group"}>
            <label className={"form-label"}>Опишіть себе тут</label>
            <Textarea
              control={control}
              name="description"
              rules={{
                required: true,
                minLength: MIN_LENGTH.DESCRIPTION,
                maxLength: MAX_LENGTH.DESCRIPTION,
              }}
              placeholder={
                "Можна додати інформацію про досвід та коротко розказати про себе"
              }
              rows={10}
            />
          </div>
        </div>
        {errorDetail ? (
          <div className={"msg msg-error mb-3"}>{errorDetail}</div>
        ) : null}
        <div className={"text-right"}>
          <button className={"btn"} disabled={loading}>
            {loading ? <Loader className={"mr-2"} /> : null}
            Зберегти дані
          </button>
        </div>
      </form>
    </Modal>
  );
});

export default EditConsultantDescriptionModal;
