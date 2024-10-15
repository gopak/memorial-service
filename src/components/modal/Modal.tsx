import React, {
  forwardRef,
  PropsWithChildren,
  RefObject,
  useImperativeHandle,
  useState,
} from "react";
import "./Modal.scss";
import ReactModal from "react-modal";
import Icon from "../icons/Icons";

interface ModalProps {
  children: React.ReactNode;
  ref: RefObject<ModalRef>;
  headerTitle: string;
  contentClassName?: string;
  onClose?: () => void;
}

export interface ModalRef {
  close: () => void;
  open: () => void;
}

const Modal = forwardRef<ModalRef, PropsWithChildren<ModalProps>>(
  (props, ref) => {
    const [showModal, setShowModal] = useState(false);

    useImperativeHandle(ref, () => ({
      close,
      open,
    }));

    const open = (): void => {
      setShowModal(true);
    };

    const close = (): void => {
      setShowModal(false);
      props?.onClose && props?.onClose();
    };

    return (
      <ReactModal
        isOpen={showModal}
        shouldCloseOnOverlayClick={true}
        onRequestClose={close}
        className={props.contentClassName ? props.contentClassName : ""}
      >
        <div className={"modal__header"}>
          <h3>{props.headerTitle}</h3>
          <span className={"modal__header__close"} onClick={close}>
            <Icon name={"close"} />
          </span>
        </div>
        {props.children}
      </ReactModal>
    );
  },
);

export default Modal;
