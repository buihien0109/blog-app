import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN, API_DOMAIN_PUBLIC } from "../../data/constants";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_DOMAIN_PUBLIC }),
    endpoints: (builder) => ({
        getCategoies: builder.query({
            query: () => `categories`,
        }),
        getCategoryBySlug: builder.query({
            query: (slug) => `categories/${slug}`,
        }),
        getBlogsOfCategory: builder.query({
            query: ({ slug, page, limit }) => `categories/${slug}/blogs?page=${page}&limit=${limit}`,
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
    }),
});

export const {
    useGetCategoiesQuery,
    useGetBlogsOfCategoryQuery,
    useGetCategoryBySlugQuery,
} = categoryApi;
