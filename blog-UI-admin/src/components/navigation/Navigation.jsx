import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../app/slices/auth.slice";

function Navigation() {
    const { auth } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className="d-flex justify-content-end align-items-center px-3">
            <div className="dropdown">
                <a
                    className="btn btn-secondary dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    {auth.name}
                </a>

                <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                >
                    <li>
                        <button
                            className="dropdown-item"
                            onClick={handleLogout}
                        >
                            Đăng xuất
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;
