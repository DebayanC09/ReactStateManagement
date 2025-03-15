import { useNavigate } from "react-router-dom";
import { AuthQuery } from "../../../customquery/auth/AuthQuery";
import React from "react";
import { LoginRequest } from "../../../models/auth/LoginRequest";
import { LoginResponse } from "../../../models/auth/LoginResponse";
import TokenManager from "../../../services/local/TokenManagers";

export const useLoginHelper = () => {
  const { callLogin,isLoginLoading } = AuthQuery.useLoginQuery();
  const navigate = useNavigate();

  const callLoginApi = React.useCallback(
    (
      requset: LoginRequest,
      options?: {
        onSuccess?: (response: LoginResponse) => void;
        onError?: (error: Error) => void;
      }
    ) => {
      callLogin(
        {
          email: requset.email,
          password: requset.password,
        },
        {
          onSuccess: (data) => {
            TokenManager.setToken(data.user.token);
            options?.onSuccess && options.onSuccess(data);
          },
          onError: options?.onError,
        }
      );
    },
    [callLogin]
  );

  return {
    navigate,
    callLoginApi,
    isLoginLoading
  };
};
