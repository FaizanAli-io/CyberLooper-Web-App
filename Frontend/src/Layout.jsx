import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function Layout() {
  const location = useLocation();
  const hideNavbar = ["/signup", "/login", "/ForgotPassword", "/Chat","/chat","/reset-password"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Header />}
      <Outlet />
      {!hideNavbar && <Footer />}
    </>
  );
}

export default Layout;
