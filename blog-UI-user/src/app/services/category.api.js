import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const END_POINT = "http://localhost:8080/api/public";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: END_POINT }),
    endpoints: (builder) => ({
        getCategoies: builder.query({
            query: () => `categories`,
        }),
        getTop5Categories: builder.query({
            query: () => `categories/top5`,
        }),
        getBlogsOfCategory: builder.query({
            query: (name) => `categories/${name}`,
        }),
    }),
});

export const {
    useGetCategoiesQuery,
    useGetBlogsOfCategoryQuery,
    useGetTop5CategoriesQuery,
} = categoryApi;
