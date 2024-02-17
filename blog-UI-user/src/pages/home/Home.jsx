import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useGetBlogLatestQuery, useGetMostViewBlogsQuery } from "../../app/services/blog.api";
import Loading from "../../components/loading/Loading";
import { formatDate } from "../../utils/functionUtils";

function Home() {
    const {
        data: latestBlogs,
        isLoading: isLoadingLatestBlog,
        isError: isErrorLatestBlog,
        error: errorLatestBlog
    } = useGetBlogLatestQuery(10);
    const {
        data: mostViewBlogs,
        isLoading: isLoadingMostViewBlog,
        isError: isErrorMostViewBlog,
        error: errorMostViewBlog
    } = useGetMostViewBlogsQuery(5);

    if (isLoadingLatestBlog || isLoadingMostViewBlog) {
        return <Loading />;
    }

    if (isErrorLatestBlog || isErrorMostViewBlog) {
        return <Error />;
    }
    return (
        <>
            <Helmet>
                <title>Trang chủ</title>
            </Helmet>
            <div className="max-w-6xl mx-auto py-7">
                <div className="grid grid-cols-3 pb-10 gap-6">
                    <div className="col-span-2 pr-4">
                        <h2 className="mb-0 text-lg font-semibold">Bài viết mới nhất</h2>
                        <div className="grid grid-cols-1 divide-y divide-gray-300">
                            {latestBlogs && latestBlogs.map((blog) => (
                                <article className="py-6" key={blog.id}>
                                    <div className="flex flex-nowrap ">
                                        <div className="flex-1 order-2 pl-5">
                                            <div className="max-w-2xl">
                                                <header>
                                                    <Link to={`/bai-viet/${blog.id}/${blog.slug}`}>
                                                        <h3 className="font-semibold leading-tight text-gray-800 hover:underline text-lg line-clamp-1">
                                                            {blog.title}
                                                        </h3>
                                                    </Link>
                                                </header>
                                                <div className="mt-2 text-sm text-gray-600 line-clamp-2">
                                                    {blog.description}
                                                </div>
                                                <div className="mt-2 text-sm text-gray-600">
                                                    {formatDate(blog.publishedAt)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-initial order-1 w-52 relative">
                                            <Link to={`/bai-viet/${blog.id}/${blog.slug}`}>
                                                <div className="overflow-hidden bg-gray-100 aspect-[16/9] rounded-md">
                                                    <img className="w-full h-full object-cover"
                                                        alt={blog.title}
                                                        src={blog.thumbnail} />
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                            <div className="py-5 text-center md:py-10">
                                <Link to="/bai-viet"
                                    className="rounded border bg-gray-800 text-white border-gray-800 py-2 pl-4 pr-6 transition-all hover:bg-white hover:text-gray-800">
                                    <span><i className="fa-solid fa-arrow-down"></i></span>
                                    <span>Xem thêm</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="sticky top-5">
                            <div className="mt-8 rounded-lg bg-pink-50 px-4 py-5 lg:mt-0 lg:bg-white lg:px-0 lg:py-0">
                                <h2 className="mb-3 text-lg font-semibold">Xem nhiều nhất</h2>
                                <div className="grid grid-cols-1">
                                    {mostViewBlogs && mostViewBlogs.map((blog, index) => (
                                        <div className="py-2 md:py-3" key={blog.id}>
                                            <div className="flex flex-nowrap">
                                                <div className="relative flex-initial order-1 w-36">
                                                    <Link to={`/bai-viet/${blog.id}/${blog.slug}`}>
                                                        <div className="overflow-hidden bg-gray-100 aspect-[16/9] rounded-md">
                                                            <img className="w-full h-full object-cover"
                                                                alt={blog.title}
                                                                src={blog.thumbnail} />
                                                            <div
                                                                className="grad-over-popular absolute left-0 top-0 z-10 flex h-full w-full items-end  overflow-hidden p-3 text-3xl font-semibold text-white">
                                                                {index + 1}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className="flex-1 pl-4 md:order-2 md:pl-5">
                                                    <div className="max-w-2xl">
                                                        <Link to={`/bai-viet/${blog.id}/${blog.slug}`}>
                                                            <h3
                                                                className="font-semibold leading-tight text-gray-800 hover:underline text-sm md:text-lg lg:text-sm line-clamp-2">
                                                                {blog.title}
                                                            </h3>
                                                            <div className="mt-1 text-sm text-gray-600">
                                                                {formatDate(blog.publishedAt)}
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
