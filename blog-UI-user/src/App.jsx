import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import NotFound from "./components/notfound/NotFound";
import About from "./pages/about/About";
import BlogDetail from "./pages/blog/BlogDetail";
import BlogList from "./pages/blog/BlogList";
import CategoryDetail from "./pages/category/CategoryDetail";
import CategoryList from "./pages/category/CategoryList";
import Home from "./pages/home/Home";
import Project from "./pages/project/Project";
import Search from "./pages/search/Search";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="bai-viet">
                    <Route index element={<BlogList />} />
                    <Route path=":blogId/:blogSlug" element={<BlogDetail />} />
                </Route>
                <Route path="danh-muc">
                    <Route index element={<CategoryList />} />
                    <Route path=":categorySlug" element={<CategoryDetail />} />
                </Route>
                <Route path="tim-kiem" element={<Search />} />
                <Route path="du-an-ca-nhan" element={<Project />} />
                <Route path="ve-tac-gia" element={<About />} />
                <Route path="*" element={<NotFound />} />

            </Route>
        </Routes>
    );
}

export default App;


