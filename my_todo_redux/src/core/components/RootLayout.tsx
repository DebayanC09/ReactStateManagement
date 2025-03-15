import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import "../styles/RootLayout.css";

const Rootlayout = () => {
  return (
    <div className="layout">
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default Rootlayout;
