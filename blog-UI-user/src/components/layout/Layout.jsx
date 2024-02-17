import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../header/Header";
import ScrollButton from "../scroll-button/ScrollButton";

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
            <ScrollButton />
        </>
    );
}

export default Layout;
