import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ENDPOINT = import.meta.env.VITE_API_DOMAIN_PUBLIC;

export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({ baseUrl: ENDPOINT }),
    endpoints: (builder) => ({
        getBlogLatest: builder.query({
            query: (limit) => `blogs/latest?limit=${limit}`,
        }),
        getBlogs: builder.query({
            query: ({ page, limit }) => `blogs?page=${page}&limit=${limit}`,
        }),
        searchBlog: builder.query({
            query: (term) => `blogs/search?term=${term}`,
        }),
        getBlogDetail: builder.query({
            query: ({ id, slug }) => `blogs/${id}/${slug}`,
        }),
        getMostViewBlogs: builder.query({
            query: (limit = 5) => `blogs/most-view?limit=${limit}`,
        }),
        getRecommendBlogs: builder.query({
            query: ({ id, limit }) => `blogs/${id}/recommend?limit=${limit}`,
        }),
    }),
});

export const {
    useGetBlogLatestQuery,
    useGetBlogsQuery,
    useSearchBlogQuery,
    useGetBlogDetailQuery,
    useLazySearchBlogQuery,
    useGetMostViewBlogsQuery,
    useGetRecommendBlogsQuery,
} = blogApi;
