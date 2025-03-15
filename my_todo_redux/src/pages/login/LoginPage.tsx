import React from "react";
import LoginComponent from "./components/LoginComponent";
import { LoginRequest } from "../../models/auth/LoginRequest";
import { showToast } from "../../utils/CustomToast";
import { useLoginHelper } from "./helpers/LoginHelper";
import Loader from "../../core/components/Loader";

const LoginPage: React.FC = () => {
  const { navigate, callLoginApi,isLoginLoading } = useLoginHelper();

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

  return (
    <>
      <LoginComponent onSubmitClick={handleSubmitCLick} />
      {isLoginLoading ? <Loader/> : null}
    </>
  );
};

export default LoginPage;
