import {useMutation} from '@tanstack/react-query';
import {LoginResponse} from '../../models/auth/LoginResponse';
import {LoginRequest} from '../../models/auth/LoginRequest';
import {AuthService} from '../../services/network/auth/AuthService';

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

export const AuthQuery = {
  useLoginQuery: useLoginQuery,
};
