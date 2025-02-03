import { useMutation, useQuery } from "@tanstack/react-query";
import { LoginResponse } from "../../models/auth/LoginResponse";
import { LoginRequest } from "../../models/auth/LoginRequest";
import { AuthService } from "../../services/network/auth/AuthService";
import { ProfileResponse } from "../../models/auth/ProfileResponse";

const useLoginQuery = () => {
  const loginMutation = useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (loginRequest: LoginRequest) =>
      AuthService.loginUser(loginRequest),
  });
  return {
    callLogin: loginMutation.mutate,
    isLoginLoading: loginMutation.isPending,
    loginData: loginMutation.data,
    loginError: loginMutation.error,
  };
};

const useUserDetailsQuery = () => {
  const { refetch, isPending, data, error } = useQuery<ProfileResponse, Error>({
    queryKey: ["userDetails"],
    queryFn: () => AuthService.userDetails(),
    enabled: false,
  });

  return {
    callUserDetails: refetch,
    isUserDetailsLoading: isPending,
    userDetailsData: data,
    userDetailsError: error,
  };
};

export const AuthQuery = {
  useLoginQuery: useLoginQuery,
  useUserDetailsQuery: useUserDetailsQuery,
};
