import React, {
    ChangeEvent,
    ChangeEventHandler,
    forwardRef,
    PropsWithChildren, useEffect,
    useImperativeHandle,
    useRef,
    useState
} from "react";
import "./EditModal.scss";
// import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import { useNavigate } from "react-router-dom";
import Modal, { ModalRef } from "../../../../../../../components/modal/Modal";
import { useForm } from "react-hook-form";
import Loader from "../../../../../../../components/loader/Loader";
import { loginUser } from "../../../../../../../services/auth/Auth.service";
import { useAppDispatch } from "../../../../../../../store/store";
import Icon from "../../../../../../../components/icons/Icons";
import { AREAS } from "../../../../../../../constants/areas";
import { Customer } from "../../../../../../../services/customer/Customer.model";
// import DatePicker from "react-date-picker";
import Calendar from "react-calendar";
import { Value } from "../../../../../../../app.types";
import { useClickOutside } from "../../../../../../../hook/UseClickOutside";
import { MIN_LENGTH, PATTERN } from "../../../../../../../modules/forms/validators/Validator";



interface EditModalProps {}

export interface EditModalRef {
    openEditModal: (profile: Customer | null) => void;
}

interface Form {
    lastName: string;
    firstName: string;
    surName: string;
    dateBirth: string;
    phone: number;
    email: string;
    regionId: number;
    cityId: number;
    address: string;
}

const registerOptions = {
    firstName: {
        required: "Поле обов'язкове",
        minLength: {
            value: MIN_LENGTH.NAME,
            message: "Введіть принаймні 5 символів."
        },
    },
    lastName: { required: "Поле обов'язкове" },
    surName: { required: "Поле обов'язкове" },
    dateBirth: { required: "Поле обов'язкове" },
    phone: {
        required: "Поле обов'язкове",
        pattern: {
            value: PATTERN.PHONE,
            message: "Введіть правильний номер телефону"
        },
    },
    email: {
        required: "Поле обов'язкове",
        pattern: {
            value: PATTERN.EMAIL,
            message: "Введіть правильну електронну пошту"
        }
    },
    regionId: { required: "Поле обов'язкове" },
    cityId: { required: "Поле обов'язкове" },
    address: { required: "Поле обов'язкове" },
}

const EditModal = forwardRef<EditModalRef, PropsWithChildren<EditModalProps>>( (props, ref) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const modalRef = useRef<ModalRef>(null);
    const [regions, setRegions] = useState<any[]>(AREAS);
    const [cities, setCities] = useState<any[]>([]);
    const { register, handleSubmit, getValues, setValue, reset, formState: { errors } } = useForm<Form>();

    const [initValueCalendar, setInitValueCalendar] = useState<Date>(new Date());
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const refCalendarPopup = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => ({
        openEditModal
    }));

    useClickOutside(refCalendarPopup, () => setShowCalendar(false))

    const openEditModal = (profile: Customer | null): void => {
        if (profile) {
            let defaultValues = {} as Form;
            defaultValues.lastName = profile.lastName;
            defaultValues.firstName = profile.firstName;
            defaultValues.surName = profile.surName;
            defaultValues.phone = profile.phone;
            defaultValues.email = profile.email;
            defaultValues.address = profile.address;

            if (profile.regionId) {
                defaultValues.regionId = profile.regionId;
                setCities(regions.find(i => Number(i.id) === profile.regionId).areas ?? []);
                defaultValues.cityId = profile.cityId;
            }

            if (profile?.dateBirth) {
                const dateBirth = new Date(profile.dateBirth);
                defaultValues.dateBirth = dateBirth.toLocaleDateString("uk-UA");
                setInitValueCalendar(dateBirth);
            }
            reset({ ...defaultValues });
        }
        modalRef?.current?.open();
    }

    const close = (): void => {
        reset();
    }

    // const reset = (): void => {
    //     // setUserType(null);
    // }

    // const openSignInForm = (type: UserType): void => {
    //     setUserType(type);
    //   }

    // const composeHeaderTitle = (): string => {
    //     let title = "Вхід на сайт";
    //     const prefixFormTitle = "Увійти як "
    //
    //     switch (userType) {
    //         case "customer":
    //             title = prefixFormTitle + "користувач";
    //             break;
    //         case "consultant":
    //             title = prefixFormTitle + "консультант";
    //             break;
    //         case "ritual-service":
    //             title = prefixFormTitle + "ритуальна служба";
    //             break;
    //     }
    //
    //     return title;
    // }

    const onSuccess = (): void => {
        // reset();
        modalRef?.current?.close();
        navigateToCabinet();
    }

    const navigateToCabinet = (): void => {
        // navigate(`/${userType}`);
    }

    const handleFormSubmit = (data: Form): void => {
        console.log('form data', data);
        // handleLoginUser(data);
    };
    const handleError = (errors): void => {
        console.log('form error', errors)
    };

    const handleLoginUser = async (form: Form): Promise<void> => {
        // const { email, password } = form;
        //
        // try {
        //     const result  =  await dispatch(loginUser(email, password));
        //     console.log('SignInForm loginUser success', result);
        //     // props.onSuccess();
        // } catch (error) {
        //     console.log('SignInForm loginUser error', error);
        // }
    };

    const onChangeRegion = (): void => {
        const regionId = Number(getValues("regionId"));
        const cityAreas = AREAS?.find(i => Number(i.id) === regionId)?.areas ?? [];
        setCities(cityAreas);
    }

    const onChangeCalendar = (value: Value): void => {
        if (!value) {
            return;
        }

        const dateBirth = new Date(String(value)).toLocaleDateString("uk-UA");
        setValue('dateBirth', dateBirth, { shouldValidate: true });
        setShowCalendar(false);
    }

    const onFocusDateBirth = (): void => {
        setShowCalendar(true);
    }

    return (
      <Modal
        ref={modalRef}
        contentClassName={"edit-modal"}
        headerTitle={"Редагувати особисті дані"}
        close={close}
      >
          <form onSubmit={handleSubmit(handleFormSubmit, handleError)}>
              <div className={"edit-form"}>
                  <h4>Основна інформація</h4>
                  <div className="container-50">
                      <div className={"container-50__item"}>
                          <div className={"form-group"}>
                              <label className={"form-label"}>Ім’я</label>
                              <input
                                type="text"
                                {...register('firstName', registerOptions.firstName)}
                                className={"form-control"}
                                placeholder={"Наприклад, Сергій"}
                              />
                              {errors?.firstName ? (
                                <div className="form-error">
                                    {errors.firstName.message}
                                </div>
                              ) : null}
                          </div>
                          <div className={"form-group"}>
                              <label className={"form-label"}>По-батькові</label>
                              <input
                                type="text"
                                {...register('surName', registerOptions.surName)}
                                className={"form-control"}
                                placeholder={"Наприклад, Сергійович"}
                              />
                              {errors?.surName ? (
                                <div className="form-error">
                                    {errors.surName.message}
                                </div>
                              ) : null}
                          </div>
                          <div className={"form-group"}>
                              <label className={"form-label"}>Телефон</label>
                              <input
                                type="text"
                                {...register('phone', registerOptions.phone)}
                                className={"form-control"}
                                placeholder={"+38 (0_ _) _ _ _ - _ _ - _ _"}
                              />
                              {errors?.phone ? (
                                <div className="form-error">
                                    {errors.phone.message}
                                </div>
                              ) : null}
                          </div>
                          <div className={"form-group"}>
                              <label className={"form-label"}>Область</label>
                              <select {...register('regionId', {...registerOptions.regionId, onChange: onChangeRegion })}
                                      className={"form-control text-capitalize"}
                              >
                                  <option value={""}>Вибіріть область</option>
                                  {regions.map((item) => (
                                    <option value={item.id} key={item.id}>{item.name}</option>
                                  ))}
                              </select>
                              {errors?.regionId ? (
                                  <div className="form-error">
                                      {errors.regionId.message}
                                  </div>
                              ) : null}
                          </div>
                          <div className={"form-group"}>
                              <label className={"form-label"}>Адрес</label>
                              <input
                                type="text"
                                {...register('address', registerOptions.address)}
                                className={"form-control"}
                                placeholder={"Адрес"}
                              />
                              {errors?.address ? (
                                <div className="form-error">
                                    {errors.address.message}
                                </div>
                              ) : null}
                          </div>
                      </div>
                      <div className={"container-50__item"}>
                          <div className={"form-group"}>
                              <label className={"form-label"}>Прізвище</label>
                              <input
                                type="text"
                                {...register('lastName', registerOptions.lastName)}
                                className={"form-control"}
                                placeholder={"Наприклад, Сергійченко"}
                              />
                              {errors?.lastName ? (
                                <div className="form-error">
                                    {errors.lastName.message}
                                </div>
                              ) : null}
                          </div>
                          <div className={"form-group"}>
                              <label className={"form-label"}>Дата народження</label>
                              <div className={"calendar-popup"}  ref={refCalendarPopup}>
                                  <input
                                    type="text"
                                    {...register('dateBirth', { ...registerOptions.dateBirth})}
                                    className={"form-control form-control--calendar"}
                                    placeholder={"Введіть дату"}
                                    onFocus={onFocusDateBirth}
                                    readOnly
                                  />
                                  {/*onBlur={onBlurDateBirth}*/}
                                  {showCalendar ? (
                                    <div className={"calendar-popup__body"}>
                                        <Calendar onChange={onChangeCalendar}
                                                  value={initValueCalendar}
                                                  locale={"uk-UA"}
                                        />
                                    </div>
                                  ) : null}
                              </div>
                              {errors?.dateBirth ? (
                                <div className="form-error">
                                    {errors.dateBirth.message}
                                </div>
                              ) : null}
                                   </div>
                          <div className={"form-group"}>
                              <label className={"form-label"}>Email</label>
                              <input
                                type="text"
                                {...register('email', registerOptions.email)}
                                className={"form-control"}
                                placeholder={"Введіть email"}
                              />
                              {errors?.email ? (
                                 <div className="form-error">
                                    {errors.email.message}
                                 </div>
                              ) : null}
                          </div>
                          <div className={"form-group"}>
                              <label className={"form-label"}>Населений пункт</label>
                              <select {...register('cityId', registerOptions.cityId)}
                                      className={"form-control text-capitalize"}
                              >
                                  <option value={""}>Вибіріть населений пункт</option>
                                  {cities.map((item) => (
                                    <option value={item.id} key={item.id}>{item.name}</option>
                                  ))}
                              </select>
                              {errors?.cityId ? (
                                <div className="form-error">
                                    {errors.cityId.message}
                                </div>
                              ) : null}
                          </div>
                      </div>
                  </div>
              </div>

              <div className={"text-right"}>
                  <button className={"btn"}>Зберегти дані</button>
              </div>
          </form>
      </Modal>
    );
});

export default EditModal;
