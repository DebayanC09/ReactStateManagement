import React from "react";
import { Outlet } from "react-router-dom";
import "../styles/RootLayout.css";
import Header from "./Header";

const ProfileRootlayout = () => {
  return (
    <>
      <Header />
      <main className="todo-content">
        <Outlet />
      </main>
    </>
  );
};
export default ProfileRootlayout;
