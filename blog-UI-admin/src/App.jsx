import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/error/NotFound";
import AppLayout from "./components/layout/AppLayout";
import AuthorizeRoutes from "./components/private/AuthorizeRoutes";
import PrivateRoutes from "./components/private/PrivateRoutes";
import BlogCreate from "./pages/blog/blog-create/BlogCreate";
import BlogDetail from "./pages/blog/blog-detail/BlogDetail";
import BlogList from "./pages/blog/blog-list/BlogList";
import OwnBlogList from "./pages/blog/own-blog/OwnBlogList";
import CategoryList from "./pages/category/category-list/CategoryList";
import Login from "./pages/login/Login";
import UserCreate from "./pages/user/user-create/UserCreate";
import UserDetail from "./pages/user/user-detail/UserDetail";
import UserList from "./pages/user/user-list/UserList";

function App() {
    return (
        <Routes>
            <Route element={<PrivateRoutes />}>
                <Route element={<AuthorizeRoutes requireRoles={["ADMIN"]} />}>
                    <Route path="/admin" element={<AppLayout />}>
                        <Route path="blogs">
                            <Route index element={<BlogList />} />
                            <Route path="own-blogs" element={<OwnBlogList />} />
                            <Route path=":blogId/detail" element={<BlogDetail />} />
                            <Route path="create" element={<BlogCreate />} />
                        </Route>
                        <Route path="users">
                            <Route index element={<UserList />} />
                            <Route path=":userId/detail" element={<UserDetail />} />
                            <Route path="create" element={<UserCreate />} />
                        </Route>
                        <Route path="categories">
                            <Route index element={<CategoryList />} />
                        </Route>
                    </Route>
                </Route>
            </Route>
            <Route path="/admin/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
