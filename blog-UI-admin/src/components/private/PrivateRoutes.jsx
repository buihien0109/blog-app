import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes() {
    const { isAuthenticated } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to={"/admin/login"} />
    }

    return (
        <>
            <Outlet />
        </>
    );
}

export default PrivateRoutes;