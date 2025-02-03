import React, { useEffect } from "react";
import { useProfileHelper } from "../pages/profile/helpers/ProfileHelper";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState, setUserDetails } from "../store/slice/AuthSlice";
import { AppDispatch } from "../store/AppStore";

interface MasterComponentProps {
  children: React.ReactNode;
}

const MasterComponent = ({ children }: MasterComponentProps) => {
  const { callUserDetails } = useProfileHelper();
  const { isLoggedIn } = useSelector(getAuthState);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isLoggedIn) {
      callUserDetails().then((response) => {
        dispatch(setUserDetails(response.data?.data || null));
      });
    }
  }, [isLoggedIn, dispatch, callUserDetails]);

  return <>{children}</>;
};
export default MasterComponent;
