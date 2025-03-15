import axios from "axios";
import { LoginRequest } from "../../../models/auth/LoginRequest";
import { Endpoints } from "../../../utils/EndPoints";
import { AxiosClient } from "../AxiosClient";
import { EnvironmentConfig } from "../../../utils/EnvironmentConfig";

const loginUser = async (loginRequest: LoginRequest) => {
  const response = await AxiosClient.post(
    Endpoints.userLogin,
    {
      email: loginRequest.email,
      password: loginRequest.password,
    },
    {
      withAuth: false,
    }
  );
  return response.data;
};

const userDetails = async () => {
  const response = await AxiosClient.get(Endpoints.userDetails, {
    withAuth: true,
  });
  return response.data;
};

const refreshToken = async () => {
  const response = await axios
    .create({
      baseURL: EnvironmentConfig.API_BASE_URL,
      timeout: 10000,
    })
    .get(Endpoints.refreshToken);
  return response.data;
};

export const AuthService = {
  loginUser: loginUser,
  refreshToken: refreshToken,
  userDetails: userDetails,
};
