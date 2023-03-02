import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../header/Header";

function Layout() {
    return (
        <>
            <Header />
            <Outlet />
            <ToastContainer
                position="top-center"
                closeOnClick
                autoClose={3000}
                hideProgressBar={true}
                theme="colored"
            />
        </>
    );
}

export default Layout;
