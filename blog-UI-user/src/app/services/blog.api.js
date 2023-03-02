import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const END_POINT = "http://localhost:8080/api/public";

export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({ baseUrl: END_POINT }),
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: () => `blogs`,
        }),
        searchBlog: builder.query({
            query: (term) => `blogs/search?term=${term}`,
        }),
        getBlogDetail: builder.query({
            query: ({ id, slug }) => `blogs/${id}/${slug}`,
        }),
    }),
});

export const {
    useGetBlogsQuery,
    useSearchBlogQuery,
    useGetBlogDetailQuery,
    useLazySearchBlogQuery
} = blogApi;
