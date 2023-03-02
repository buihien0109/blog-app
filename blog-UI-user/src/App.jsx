import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import NotFound from "./components/notfound/NotFound";
import BlogDetail from "./pages/blog/BlogDetail";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import TagDetail from "./pages/tag/TagDetail";
import TagList from "./pages/tag/TagList";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/tags">
                    <Route index element={<TagList />} />
                    <Route path=":tagName" element={<TagDetail />} />
                </Route>
                <Route path="/search" element={<Search />} />
                <Route path="/blogs/:blogId/:blogSlug" element={<BlogDetail />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
