import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import ForbiddenPage from "../error-page/ForbiddenPage";

function AuthorizeRoutes({ requireRoles }) {
    const { auth } = useSelector((state) => state.auth);
    const { role } = auth

    const canAccess = role && requireRoles.includes(role);
    if (!canAccess) {
        return <ForbiddenPage />;
    }

    return (
        <>
            <Outlet />
        </>
    );
}

export default AuthorizeRoutes;