import React, { createContext, useContext, useMemo, useState } from "react";
import Modal from "../components/modal/Modal";

interface ModalContext {
  openModal: (modalContent: React.ReactNode) => void;
  closeModal: () => void;
}

/* React createContext without default value
 * https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/#without-default-context-value
 * Problem, a component for the modal needs to be passed in as a prop
 */
const ModalContext = createContext<ModalContext | null>(null);

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode | null>(null);

  const openModal = (modalContent: React.ReactNode) => {
    console.group("openDialog running...");
    console.groupEnd();
    setContent(modalContent);
    setIsOpen(true);
  };

  const closeModal = () => {
    setContent(null);
    setIsOpen(false);
  };

  const value = useMemo(() => {
    return {
      openModal,
      closeModal,
    };
  }, []);

  return (
    <ModalContext.Provider value={value}>
      <Modal isOpen={isOpen} closeModal={closeModal} content={content} />
      {children}
    </ModalContext.Provider>
  );
};

const useModalContext = () => {
  const modalContext = useContext(ModalContext);
  if (!modalContext) {
    throw new Error(
      "useModalContext has to be used within <ModalContext.Provider>"
    );
  }

  return modalContext;
};

export { ModalProvider as default, useModalContext };
