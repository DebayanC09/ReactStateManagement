import React from "react";
import LoginComponent from "./components/LoginComponent";
import { LoginRequest } from "../../models/auth/LoginRequest";
import { showToast } from "../../utils/CustomToast";
import { useLoginHelper } from "./helpers/LoginHelper";

const LoginPage: React.FC = () => {
  const { navigate, callLoginApi } = useLoginHelper();

  const handleSubmitCLick = React.useCallback(
    (requset: LoginRequest) => {
      callLoginApi(requset, {
        onSuccess: (response) => {
          showToast(response.message);
          navigate("/todo");
        },
        onError: (error) => {
          showToast(error.message);
        },
      });
    },
    [callLoginApi, navigate]
  );

  return <LoginComponent onSubmitClick={handleSubmitCLick} />;
};

export default LoginPage;
