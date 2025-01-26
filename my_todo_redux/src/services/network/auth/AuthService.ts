import axios from "axios";
import { LoginRequest } from "../../../models/auth/LoginRequest";
import { Endpoints } from "../../../utils/EndPoints";
import { AxiosClient } from "../AxiosClient";

const loginUser = async (loginRequest: LoginRequest) => {
  const response = await AxiosClient.post(Endpoints.userLogin, {
    email: loginRequest.email,
    password: loginRequest.password,
  });
  return response.data;
};

const refreshToken = async () => {
  //const response = await AxiosClient.get(Endpoints.refreshToken);
  const response = await axios
    .create({
      baseURL: "https://api-samples-ts.onrender.com/",
      timeout: 10000,
    })
    .get(Endpoints.refreshToken);
  return response.data;
};

export const AuthService = {
  loginUser: loginUser,
  refreshToken: refreshToken,
};
