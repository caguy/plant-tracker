import React, { ReactElement, useCallback, useState } from "react";
import Modal from "./Modal";
import { ModalContext } from "./ModalContext";

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState<ReactElement | null>(null);
  const isOpen = !!content;

  const open = useCallback((content: ReactElement) => {
    setContent(content);
  }, []);

  const close = useCallback(() => {
    setContent(null);
  }, []);

  return (
    <ModalContext.Provider value={{ open, close }}>
      {children}
      <Modal open={isOpen} onClose={close}>
        {content ?? <></>}
      </Modal>
    </ModalContext.Provider>
  );
};

export default ModalProvider;
