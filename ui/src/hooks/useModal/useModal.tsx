import { useContext } from "react";
import { ModalContext } from "./ModalContext";

const useModal = () => {
  const modalContext = useContext(ModalContext);
  if (modalContext === undefined) {
    throw new Error("useModal can only be used inside ModalProvider");
  }
  return modalContext;
};

export default useModal;
