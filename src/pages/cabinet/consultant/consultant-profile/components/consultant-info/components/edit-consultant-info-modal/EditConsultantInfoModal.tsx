import React, {
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./EditConsultantInfoModal.scss";

import Modal, { ModalRef } from "../../../../../../../components/modal/Modal";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../../../../../store/store";
import { AreasConstant } from "../../../../../../../constants/Areas.constant";
import {
  MAX_LENGTH,
  MIN_LENGTH,
  PATTERN,
} from "../../../../../../../modules/forms/validators/Validator";
import Input from "../../../../../../../modules/forms/controls/Input";
import Select, {
  SelectOption,
} from "../../../../../../../modules/forms/controls/Select";
import InputDate from "../../../../../../../modules/forms/controls/InputDate";
import Loader from "../../../../../../../components/loader/Loader";
import { DEFAULT_MESSAGES_ERROR } from "../../../../../../../app.types";
import { alertMessage } from "../../../../../../../components/alert-message/AlertMessage";
import {
  Consultant,
  ConsultantPayload,
} from "../../../../../../../services/consultant/Consultant.model";
import {
  getConsultantProfile,
  updateConsultantProfile,
} from "../../../../../../../services/consultant/Consultant.service";

interface EditConsultantInfoModalProps {}

export interface EditConsultantInfoModalRef {
  openModal: (profile: Consultant) => void;
}

interface Form {
  lastName: string;
  firstName: string;
  surName: string;
  dateBirth: number;
  phone: string;
  email: string;
  regionId: string;
  cityId: string;
  address: string;
}

const EditConsultantInfoModal = forwardRef<
  EditConsultantInfoModalRef,
  PropsWithChildren<EditConsultantInfoModalProps>
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
      lastName: "",
      firstName: "",
      surName: "",
      dateBirth: 0,
      phone: "",
      email: "",
      regionId: "",
      cityId: "",
      address: "",
    },
  });

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  const getRegionsFormSelect = (): SelectOption[] => {
    return AreasConstant.map((i) => ({
      id: i.id,
      label: i.name,
    }));
  };

  const openModal = (profile: Consultant | null): void => {
    setRegions(getRegionsFormSelect());
    if (profile) {
      setProfile(profile);
      let defaultValues = {} as Form;
      defaultValues.lastName = profile.lastName;
      defaultValues.firstName = profile.firstName;
      defaultValues.surName = profile.surName;
      defaultValues.phone = profile.phone;
      defaultValues.email = profile.email;
      defaultValues.address = profile.address ?? "";

      if (profile.regionId) {
        defaultValues.regionId = profile.regionId;
        setCities(getCitiesFormSelect(profile.regionId));
        defaultValues.cityId = profile.cityId ?? "";
      }

      if (profile?.dateBirth) {
        defaultValues.dateBirth = profile.dateBirth;
        setInitValueCalendar(new Date(profile.dateBirth));
      }
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
        updateConsultantProfile(profile.id, getUpdatePayload(form)),
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

  const getRegionName = (regionId: string): string => {
    return AreasConstant?.find((i) => i.id === regionId)?.name;
  };

  const getCityName = (cityId: string): string => {
    return cities?.find((i) => i.id === cityId)?.label;
  };

  const getUpdatePayload = (form: Form): ConsultantPayload => {
    return {
      firstName: form.firstName,
      lastName: form.lastName,
      surName: form.surName,
      dateBirth: form.dateBirth,
      phone: form.phone,
      email: form.email,
      regionId: form.regionId,
      regionName: getRegionName(form.regionId),
      cityId: form.cityId,
      cityName: getCityName(form.cityId),
      address: form.address,
    };
  };

  const onChangeRegion = (): void => {
    const regionId = getValues("regionId");
    setCities(getCitiesFormSelect(regionId));
  };

  const getCitiesFormSelect = (regionId: string): SelectOption[] => {
    const cityAreas = AreasConstant.find((i) => i.id === regionId)?.areas ?? [];
    return cityAreas.map((i) => ({
      id: i.id,
      label: i.name,
    }));
  };

  return (
    <Modal
      ref={modalRef}
      contentClassName={"edit-consultant-info-modal"}
      headerTitle={"Редагувати особисті дані"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(handlerFormSubmit, handlerError)}>
        <div className={"edit-consultant-info-form"}>
          <h4>Основна інформація</h4>
          <div className="container-50">
            <div className={"container-50__item"}>
              <div className={"form-group"}>
                <label className={"form-label"}>Ім’я</label>
                <Input
                  control={control}
                  type={"text"}
                  name="firstName"
                  rules={{
                    required: true,
                    minLength: MIN_LENGTH.NAME,
                    maxLength: MAX_LENGTH.NAME,
                  }}
                  placeholder={"Наприклад, Сергій"}
                />
              </div>
              <div className={"form-group"}>
                <label className={"form-label"}>По-батькові</label>
                <Input
                  control={control}
                  type={"text"}
                  name="surName"
                  rules={{
                    required: true,
                    minLength: MIN_LENGTH.NAME,
                    maxLength: MAX_LENGTH.NAME,
                  }}
                  placeholder={"Наприклад, Сергійович"}
                />
              </div>
              <div className={"form-group"}>
                <label className={"form-label"}>Номер телефону</label>
                <Input
                  control={control}
                  type={"text"}
                  name="phone"
                  rules={{
                    required: true,
                    pattern: PATTERN.PHONE,
                    minLength: MIN_LENGTH.PHONE,
                    maxLength: MAX_LENGTH.PHONE,
                  }}
                  placeholder={"+38  (  0 _  _  )  _  _  _  _  _  _  _"}
                />
              </div>
              <div className={"form-group"}>
                <label className={"form-label"}>Область</label>
                <Select
                  control={control}
                  rules={{
                    required: true,
                  }}
                  name="regionId"
                  className={"text-capitalize"}
                  option={regions}
                  placeholder={"Вибіріть область"}
                  onValueChange={onChangeRegion}
                />
              </div>
              <div className={"form-group"}>
                <label className={"form-label"}>Адрес</label>
                <Input
                  control={control}
                  name="address"
                  rules={{
                    required: true,
                    maxLength: MAX_LENGTH.ADDRESS,
                  }}
                  placeholder={"Введіть адрес"}
                />
              </div>
            </div>
            <div className={"container-50__item"}>
              <div className={"form-group"}>
                <label className={"form-label"}>Прізвище</label>
                <Input
                  control={control}
                  type={"text"}
                  name="lastName"
                  rules={{
                    required: true,
                    minLength: MIN_LENGTH.NAME,
                    maxLength: MAX_LENGTH.NAME,
                  }}
                  placeholder={"Наприклад, Сергійченко"}
                />
              </div>
              <div className={"form-group"}>
                <label className={"form-label"}>Дата народження</label>
                <InputDate
                  control={control}
                  name="dateBirth"
                  rules={{
                    required: true,
                  }}
                  initValueCalendar={initValueCalendar}
                />
              </div>
              <div className={"form-group"}>
                <label className={"form-label"}>Email</label>
                <Input
                  control={control}
                  type={"text"}
                  name="email"
                  rules={{
                    required: true,
                    pattern: PATTERN.EMAIL,
                  }}
                  placeholder={"Введіть email"}
                  readOnly={true}
                />
              </div>
              <div className={"form-group"}>
                <label className={"form-label"}>Населений пункт</label>
                <Select
                  control={control}
                  rules={{
                    required: true,
                  }}
                  name="cityId"
                  className={"text-capitalize"}
                  option={cities}
                  placeholder={"Вибіріть населений пункт"}
                />
              </div>
            </div>
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

export default EditConsultantInfoModal;
