import { AuthQuery } from "../../../customquery/auth/AuthQuery";

export const useProfileHelper = () => {
  const { callUserDetails, isUserDetailsLoading, userDetailsData } =
    AuthQuery.useUserDetailsQuery();

  return {
    callUserDetails,
    isUserDetailsLoading,
    userDetailsData,
  };
};
