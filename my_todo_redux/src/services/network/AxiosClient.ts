import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import TokenManager from "../local/TokenManagers";
import { AuthService } from "./auth/AuthService";
import { RefreshTokenResponse } from "../../models/auth/RefreshTokenResponse";
import { EnvironmentConfig } from "../../utils/EnvironmentConfig";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  withAuth?: boolean;
  useResponseInterceptor?: boolean;
}

const instance: AxiosInstance = axios.create({
  baseURL: EnvironmentConfig.API_BASE_URL,
  //timeout: 10000,
});

instance.interceptors.request.use(async (config) => {
  const customConfig = config as CustomAxiosRequestConfig;

  // Check if the request should use authentication
  const shouldUseAuth = customConfig.withAuth ?? true;
  if (shouldUseAuth) {
    const token = TokenManager.getToken();
    if (token) {
      config.headers.Authorization = `${token}`;
    }
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const shouldUseResponseInterceptor =
      (error.config as CustomAxiosRequestConfig).useResponseInterceptor ?? true;

    if (shouldUseResponseInterceptor) {
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
    }
    return Promise.reject(new Error(error));
  }
);

export const AxiosClient = {
  ...instance,
  get: async (url: string, config?: CustomAxiosRequestConfig) => {
    return instance.get(url, config);
  },
  post: async (url: string, data?: any, config?: CustomAxiosRequestConfig) => {
    return instance.post(url, data, config);
  },
  put: async (url: string, data?: any, config?: CustomAxiosRequestConfig) => {
    return instance.put(url, data, config);
  },
};
