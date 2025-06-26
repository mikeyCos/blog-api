import React, { JSX, useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  content: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, content }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const handleDialogClick: React.MouseEventHandler = (e) => {
    console.group("handleDialogClick running...");
    console.log("e.target:", e.target);
    const element = e.target as HTMLElement;
    if (element.tagName === "DIALOG") closeModal();
    console.groupEnd();
  };

  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement || !content) return;

    if (isOpen) {
      modalElement.showModal();
    } else {
      modalElement.close();
    }
  }, [isOpen]);

  return (
    <dialog id="modal" onClick={handleDialogClick} ref={modalRef}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {content}
      </div>
    </dialog>
  );
};

export default Modal;
