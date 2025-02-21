import React from "react";
import { Outlet,useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
function Layout() {
    const location = useLocation();
    const hideNavbar = ["/signup",'/login','/Chat'].includes(location.pathname);
    

    return (
        <>
           {!hideNavbar && <Header />}
            <Outlet />
        </>
    );
}

export default Layout;
