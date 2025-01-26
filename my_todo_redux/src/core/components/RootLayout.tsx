import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import "../styles/RootLayout.css";

const Rootlayout = () => {
  // const { isLoggedIn } = useAuth();
  // return (
  //   <div className="layout">
  //     {/* {isLoggedIn && <Header />} */}
  //     {/* <main className="content"> */}
  //     {/* <div className="sign-in__backdrop" /> */}
  //     <Outlet />
  //     {/* </main> */}
  //     <Footer />
  //   </div>
  // );

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
