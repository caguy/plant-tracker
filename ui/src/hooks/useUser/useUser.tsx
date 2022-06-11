import { useContext } from "react";
import { UserContext } from "./UserContext";

const useUser = () => {
  const userContext = useContext(UserContext);
  if (userContext === undefined) {
    throw new Error("useUser can only be used inside UserProvider");
  }
  return userContext;
};

export default useUser;
