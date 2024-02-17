import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useParams } from "react-router-dom";
import { useGetBlogDetailQuery, useGetRecommendBlogsQuery } from "../../app/services/blog.api";
import Error from "../../components/error/Error";
import Loading from "../../components/loading/Loading";
import { formatDate } from "../../utils/functionUtils";
import MarkdownRenderer from "./markdown/MarkdownRenderer";
import TableOfContents from "./toc/TableOfContent";

function BlogDetail() {
    const location = useLocation();
    const { blogId, blogSlug } = useParams();
    const {
        data: blog,
        isLoading: isLoadingBlogDetail,
        isError: isErrorBlogDetail,
        isFetching: isFetchingBlogDetail,
        refetch: refetchBlogDetail,
    } = useGetBlogDetailQuery({ id: blogId, slug: blogSlug });
    const {
        data: recommendBlogs,
        isLoading: isLoadingRecommendBlogs,
        isError: isErrorRecommendBlogs,
        isFetching: isFetchingRecommendBlogs,
        refetch: refetchRecommendBlogs,
    } = useGetRecommendBlogsQuery({ id: blogId, limit: 5 });

    useEffect(() => {
        refetchBlogDetail();
        refetchRecommendBlogs();
    }, [location.pathname]);

    if (isLoadingBlogDetail || isLoadingRecommendBlogs || isFetchingBlogDetail || isFetchingRecommendBlogs) {
        return <Loading />;
    }

    if (isErrorBlogDetail || isErrorRecommendBlogs) {
        return <Error />;
    }

    return (
        <>
            <Helmet>
                <title>{blog?.title}</title>
            </Helmet>
            <div className="max-w-6xl mx-auto py-7">
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2 pr-4">
                        <h1 className="text-3xl font-bold mb-3">{blog.title}</h1>
                        <p className="text-gray-500 text-sm mb-4">{formatDate(blog.publishedAt)}</p>
                        <div className="overflow-hidden" id="blog-content">
                            <MarkdownRenderer markdownContent={blog.content} />
                        </div>
                        {/* <Comment /> */}
                    </div>
                    <div>
                        <div className="sticky top-5">
                            <TableOfContents />
                            <div className="mt-8 rounded-lg bg-pink-50 px-4 py-5 lg:mt-0 lg:bg-white lg:px-0 lg:py-0">
                                <h2 className="mb-0 text-lg font-semibold">Bài viết đề xuất</h2>
                                <div className="grid grid-cols-1">
                                    {recommendBlogs && recommendBlogs.map((blog, index) => (
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

export default BlogDetail;
