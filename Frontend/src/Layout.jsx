import React from "react";
import { Outlet,useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
function Layout() {
    const location = useLocation();
    const hideNavbar = ["/signup",'/login'].includes(location.pathname);
    

    return (
        <>
           {!hideNavbar && <Navbar />}
            <Outlet />
        </>
    );
}

export default Layout;
