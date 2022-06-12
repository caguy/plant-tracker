import { ReactElement } from "react";

export type ModalState = {
  open: (content: ReactElement) => void;
  close: () => void;
};
