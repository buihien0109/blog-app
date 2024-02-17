import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ENDPOINT = import.meta.env.VITE_API_DOMAIN_PUBLIC;

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: ENDPOINT }),
    endpoints: (builder) => ({
        getCategoies: builder.query({
            query: () => `categories`,
        }),
        getCategoryBySlug: builder.query({
            query: (slug) => `categories/${slug}`,
        }),
        getBlogsOfCategory: builder.query({
            query: ({ slug, page, limit }) => `categories/${slug}/blogs?page=${page}&limit=${limit}`,
        }),
    }),
});

export const {
    useGetCategoiesQuery,
    useGetBlogsOfCategoryQuery,
    useGetCategoryBySlugQuery,
} = categoryApi;
