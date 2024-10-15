import React, {
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./EditConsultantAvatarModal.scss";

import { ref } from "firebase/storage";
import { Consultant } from "../../../../../../../../services/consultant/Consultant.model";
import { useAppDispatch } from "../../../../../../../../store/store";
import Modal, {
  ModalRef,
} from "../../../../../../../../components/modal/Modal";
import {
  getImagePathFromStorage,
  storage,
} from "../../../../../../../../firebase/Firebase.service";
import { alertMessage } from "../../../../../../../../components/alert-message/AlertMessage";
import { DEFAULT_MESSAGES_ERROR } from "../../../../../../../../app.types";
import { convertImageToWebp } from "../../../../../../../../utils/Image.util";
import { pushFileToStorage } from "../../../../../../../../services/file-upload/FileUpload.service";
import {
  getConsultantProfile,
  updateConsultantProfile,
} from "../../../../../../../../services/consultant/Consultant.service";
import Icon from "../../../../../../../../components/icons/Icons";
import AvatarView from "../../../../../../../../components/avatar-view/AvatarView";
import Loader from "../../../../../../../../components/loader/Loader";

interface EditConsultantAvatarModalProps {}

export interface EditConsultantAvatarModalRef {
  openModal: (profile: Consultant) => void;
}

const MAX_PHOTO_SIZE = 10 * 1024 * 1024;

const EditConsultantAvatarModal = forwardRef<
  EditConsultantAvatarModalRef,
  PropsWithChildren<EditConsultantAvatarModalProps>
>((props, refView) => {
  const dispatch = useAppDispatch();
  const modalRef = useRef<ModalRef>(null);
  const [profile, setProfile] = useState<Consultant | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorDetail, setErrorDetail] = useState<string>("");
  const fileInput = useRef<HTMLInputElement>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | undefined>("");

  useImperativeHandle(refView, () => ({
    openModal,
  }));

  const openModal = (profile: Consultant | null): void => {
    setProfile(profile);
    setPhotoPreview(getImagePathFromStorage(profile?.photoPath));
    modalRef?.current?.open();
  };

  const onClose = (): void => {
    reset();
  };

  const reset = (): void => {
    setPhotoFile(null);
    setPhotoPreview("");
    setErrorDetail("");
  };

  const onSavePhoto = (): void => {
    handlerSavePhoto();
  };

  const handlerSavePhoto = async (): Promise<void> => {
    if (!profile?.id || !photoFile) {
      alertMessage({
        type: "error",
        message: !photoFile
          ? "Будь ласка, завантажте фотографію"
          : DEFAULT_MESSAGES_ERROR,
      });
      return;
    }

    console.log("handlerSavePhoto attempt");
    setErrorDetail("");
    setLoading(true);
    try {
      const photoPath = `consultants/${profile.id}/${photoFile.name}`;

      const storageRef = ref(storage, photoPath);

      await pushFileToStorage(storageRef, photoFile);

      await dispatch(
        updateConsultantProfile(profile.id, {
          photoPath,
        }),
      );
      console.log("handlerSavePhoto success");
      dispatch(getConsultantProfile(profile?.id));
      alertMessage({
        type: "success",
        message: "Дякуємо, фото успішно застосовано",
      });
      modalRef?.current?.close();
    } catch (error: any) {
      console.log("handlerSavePhoto error", error);
      setErrorDetail(error?.details ?? DEFAULT_MESSAGES_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const onClickFileInput = () => {
    fileInput.current?.click();
  };

  const onChangeFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoto(event?.target?.files);
  };

  const onDropPhoto = (event: React.DragEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setPhoto(event?.dataTransfer?.files);
  };

  const isValidPhotoSize = (size: number): boolean => {
    return size <= MAX_PHOTO_SIZE;
  };

  const isValidPhotoFormat = (name: string): boolean => {
    const regex = new RegExp("(.*?).(jpeg|jpg|png|bmp|webp)$");
    return regex.test(name.toLocaleLowerCase());
  };

  const validatePhoto = (photo: File): boolean => {
    if (isValidPhotoSize(photo.size) && isValidPhotoFormat(photo.name)) {
      return true;
    }

    switch (false) {
      case isValidPhotoSize(photo.size):
        alertMessage({
          type: "error",
          message: `Фото більше ніж ${MAX_PHOTO_SIZE / (1024 * 1024)}Mb`,
        });
        break;
      case isValidPhotoFormat(photo.name):
        alertMessage({
          type: "error",
          message: `${photo.name}: формат файлу не підтримується. Виберіть правильний формат файлу: jpeg, jpg, png, bmp, webp`,
        });
        break;
    }

    return false;
  };

  const setPhoto = async (files: FileList | null): Promise<void> => {
    if (!files?.length) {
      return;
    }

    if (!validatePhoto(files[0])) {
      return;
    }

    try {
      const photoWebp = await convertImageToWebp(files[0]);
      setPhotoFile(photoWebp);
      setPhotoPreview(URL.createObjectURL(photoWebp));
    } catch (error: any) {
      alertMessage({
        type: "error",
        message: error?.code ?? DEFAULT_MESSAGES_ERROR,
      });
    }
  };

  return (
    <Modal
      ref={modalRef}
      contentClassName={"edit-consultant-avatar-modal"}
      headerTitle={"Додати фотографію профілю"}
      onClose={onClose}
    >
      <div className={"edit-consultant-avatar-form"}>
        <p className={"edit-consultant-avatar-form__desc"}>
          Оберіть фотографію на своєму носії та завантажте її на сервіс.
        </p>
        <div className={"edit-consultant-avatar-form__control"}>
          <div
            className={"edit-consultant-avatar-form__control__drag"}
            onDrop={onDropPhoto}
            onDragOver={(event) => event.preventDefault()}
          >
            <p className={"edit-consultant-avatar-form__control__drag__desc"}>
              Перетягніть файл у цю область
            </p>
            Підтримуються формати: .png, .jpg, .bmp, .webp
          </div>
          <div className={"edit-consultant-avatar-form__control__separator"}>
            або
          </div>
          <button
            className={"btn btn-border btn-block"}
            onClick={onClickFileInput}
          >
            <Icon name={"upload"} className={"mr-2"} />
            Завантажити файл
          </button>
          <input
            type="file"
            hidden
            onChange={onChangeFileInput}
            ref={fileInput}
            accept=".jpeg,.jpg,.png,.webp,.bmp"
            disabled={loading}
          />
        </div>
        <h5 className={"mb-3"}>Поточне фото</h5>
        <AvatarView src={photoPreview} />
        <div className={"edit-consultant-avatar-form__action"}>
          {errorDetail ? (
            <div className={"msg msg-error mb-3"}>{errorDetail}</div>
          ) : null}
          <button
            className={"btn btn-block"}
            disabled={loading}
            onClick={onSavePhoto}
          >
            {loading ? <Loader className={"mr-2"} /> : null}
            Зберегти
          </button>
        </div>
      </div>
    </Modal>
  );
});

export default EditConsultantAvatarModal;
