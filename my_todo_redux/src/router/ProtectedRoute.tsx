import React from "react";
import { Navigate } from "react-router-dom";
import TokenManager from "../services/local/TokenManagers";

type ProtectedRouteProps = {
  redirectPath?: string;
  children: React.ReactNode;
  protect?: boolean;
};

const ProtectedRoute = ({
  redirectPath = "/",
  children,
  protect = false,
}: ProtectedRouteProps) => {
  if (protect && !TokenManager.hasToken()) {
    return <Navigate to="/login" />;
  }

  if (!protect && TokenManager.hasToken()) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
