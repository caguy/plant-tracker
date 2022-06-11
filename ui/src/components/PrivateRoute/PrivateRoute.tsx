import { useUser } from "@/hooks";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const { isAuthenticated } = useUser();
  const { pathname, search } = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ redirectTo: pathname + search }} replace />
  );
};

export default PrivateRoute;
