import React from "react";
import { ModalState } from "./ModalTypes";

export const ModalContext = React.createContext<ModalState | undefined>(
  undefined
);
