import axios, { AxiosInstance } from "axios";
import TokenManager from "../local/TokenManagers";
import { AuthService } from "./auth/AuthService";
import { RefreshTokenResponse } from "../../models/auth/RefreshTokenResponse";

const instance: AxiosInstance = axios.create({
  baseURL: "https://api-samples-ts.onrender.com/",
  timeout: 10000,
});

instance.interceptors.request.use(async (config) => {
  const token = TokenManager.getToken();
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      try {
        const result: RefreshTokenResponse = await AuthService.refreshToken();
        TokenManager.setToken(result.token);
        error.config.headers.Authorization = result.token;
        return instance.request(error.config);
      } catch (refreshError) {
        TokenManager.deleteToken();
        window.location.href = "/login";
        return Promise.reject(new Error(error));
      }
    }
    return Promise.reject(new Error(error));
  }
);

export const AxiosClient: AxiosInstance = instance;
