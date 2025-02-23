import React from "react";
import ProfileComponent from "./components/ProfileComponent";
import { useSelector } from "react-redux";
import { getAuthState } from "../../store/slice/AuthSlice";
const Profilepage = () => {
  const { userdata } = useSelector(getAuthState);

  return (
    <ProfileComponent
      name={userdata?.name ?? ""}
      email={userdata?.email ?? ""}
    />
  );
};

export default Profilepage;
