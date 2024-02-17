import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
    return (
        <header className="bg-slate-800">
            <div className="max-w-6xl mx-auto py-3">
                <div className="flex items-center">
                    <div className="me-6">
                        <Link to={"/"}>
                            <h2 className="text-white text-2xl">BH.DEV</h2>
                        </Link>
                    </div>
                    <div className="flex items-center justify-between flex-grow-1 text-white grow">
                        <ul className="flex items-center">
                            <li className="me-4 hover:text-gray-300">
                                <NavLink to="/bai-viet">Bài viết</NavLink>
                            </li>
                            <li className="me-4 hover:text-gray-300">
                                <NavLink to="/danh-muc">Danh mục</NavLink>
                            </li>
                            <li className="me-4 hover:text-gray-300">
                                <NavLink to="/du-an-ca-nhan">Dự án cá nhân</NavLink>
                            </li>
                            <li className="me-4 hover:text-gray-300">
                                <NavLink to="ve-tac-gia">Về tác giả</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
