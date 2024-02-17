import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useGetBlogsQuery, useGetMostViewBlogsQuery } from '../../app/services/blog.api';
import Loading from '../../components/loading/Loading';
import { formatDate } from '../../utils/functionUtils';
import Pagination from '../../components/pagination/Pagination';

function BlogList() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(() => {
        const page = searchParams.get('page');
        return page ? parseInt(page) : 1;
    });

    const {
        data: pageData,
        isLoading: isLoadingGetBlogs,
        isError: isErrorGetBlogs,
        isFetching: isFetchingGetBlogs,
    } = useGetBlogsQuery({
        page: currentPage,
        limit: 10
    });
    const {
        data: mostViewBlogs,
        isLoading: isLoadingMostViewBlog,
        isError: isErrorMostViewBlog,
        isFetching: isFetchingMostViewBlog,
    } = useGetMostViewBlogsQuery(5);


    if (isLoadingGetBlogs || isLoadingMostViewBlog || isFetchingGetBlogs || isFetchingMostViewBlog) {
        return <Loading />;
    }

    if (isErrorGetBlogs || isErrorMostViewBlog) {
        return <Error />;
    }

    const onPageChange = (page) => {
        setCurrentPage(page);
        if (page === 1) {
            navigate('/bai-viet');
        } else {
            navigate(`/bai-viet?page=${page}`);
        }
    };

    return (
        <>
            <Helmet>
                <title>Trang chủ</title>
            </Helmet>
            <div className="max-w-6xl mx-auto py-7">
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2 pr-4">
                        <h2 className="mb-0 text-lg font-semibold">Bài viết</h2>
                        <div className="mt-6 grid grid-cols-1 gap-6 md:mt-3 md:grid-cols-2 md:gap-6">
                            {pageData && pageData.content.map((blog) => (
                                <article key={blog.id}>
                                    <Link to={`/bai-viet/${blog.id}/${blog.slug}`}>
                                        <div className="overflow-hidden  bg-gray-100 aspect-[16/9] rounded-md">
                                            <img className="w-full h-full object-cover"
                                                alt={blog.title}
                                                src={blog.thumbnail} />
                                        </div>
                                    </Link>
                                    <div className="mt-2">
                                        <div className=" max-w-2xl">
                                            <Link to={`/bai-viet/${blog.id}/${blog.slug}`}>
                                                <h3 className="font-semibold leading-tight text-gray-800 hover:underline text-xl md:text-lg md:leading-tight lg:text-xl lg:leading-tight">
                                                    {blog.title}
                                                </h3>
                                            </Link>
                                            <div className="mt-2 text-sm text-gray-600">
                                                {formatDate(blog.publishedAt)}
                                            </div>
                                            <div className="mt-2 text-sm text-gray-600 lg:text-sm line-clamp-2">{blog.description}</div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={pageData?.totalPages}
                            onPageChange={onPageChange}
                        />
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
    )
}

export default BlogList