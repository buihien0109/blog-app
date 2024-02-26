import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN, API_DOMAIN_PUBLIC } from "../../data/constants";

export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_DOMAIN_PUBLIC }),
    endpoints: (builder) => ({
        getBlogLatest: builder.query({
            query: (limit) => `blogs/latest?limit=${limit}`,
            transformResponse: (response, meta, arg) => {
                return response.map((item) => {
                    return {
                        ...item,
                        thumbnail: `${API_DOMAIN}${item.thumbnail}`
                    };
                });
            },
        }),
        getBlogs: builder.query({
            query: ({ page, limit }) => `blogs?page=${page}&limit=${limit}`,
            transformResponse: (response, meta, arg) => {
                return {
                    ...response, content: response.content.map((item) => {
                        return {
                            ...item,
                            thumbnail: `${API_DOMAIN}${item.thumbnail}`
                        };
                    })
                }
            },
        }),
        searchBlog: builder.query({
            query: (term) => `blogs/search?term=${term}`,
        }),
        getBlogDetail: builder.query({
            query: ({ id, slug }) => `blogs/${id}/${slug}`,
            transformResponse: (response, meta, arg) => {
                return {...response, thumbnail: `${API_DOMAIN}${response.thumbnail}`};
            },
        }),
        getMostViewBlogs: builder.query({
            query: (limit = 5) => `blogs/most-view?limit=${limit}`,
            transformResponse: (response, meta, arg) => {
                return response.map((item) => {
                    return {
                        ...item,
                        thumbnail: `${API_DOMAIN}${item.thumbnail}`
                    };
                });
            },
        }),
        getRecommendBlogs: builder.query({
            query: ({ id, limit }) => `blogs/${id}/recommend?limit=${limit}`,
            transformResponse: (response, meta, arg) => {
                return response.map((item) => {
                    return {
                        ...item,
                        thumbnail: `${API_DOMAIN}${item.thumbnail}`
                    };
                });
            },
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
