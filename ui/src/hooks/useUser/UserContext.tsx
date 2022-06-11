import React from "react";
import { UserState } from "./UserTypes";

export const UserContext = React.createContext<UserState | undefined>(
  undefined
);
