import React, { JSX, useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  content: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, content }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const onClickHandler: React.MouseEventHandler = (e) => {
    console.group("onClickHandler running...");
    console.log("e.target:", e.target);
    const element = e.target as HTMLElement;
    if (element.tagName === "DIALOG") closeModal();
    console.groupEnd();
  };

  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;

    if (isOpen) {
      modalElement.showModal();
    } else {
      modalElement.close();
    }
  }, [isOpen]);

  return (
    <dialog id="modal" onClick={onClickHandler} ref={modalRef}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p>If you see this, the modal is open</p>
        {content}
      </div>
    </dialog>
  );
};

export default Modal;
