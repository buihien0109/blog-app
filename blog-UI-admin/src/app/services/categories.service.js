import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN_ADMIN } from "../../data/constants";

// Define a service using a base URL and expected endpoints
const ENDPOINT = API_DOMAIN_ADMIN;

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: ENDPOINT,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.accessToken
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => 'categories',
            providesTags: ['Category'],
        }),
        getCategoryById: builder.query({
            query: (id) => `categories/${id}`,
        }),
        createCategory: builder.mutation({
            query: (newCategory) => ({
                url: 'categories',
                method: 'POST',
                body: newCategory,
            }),
            invalidatesTags: [{ type: 'Category' }],
        }),
        updateCategory: builder.mutation({
            query: ({ id, ...updatedCategory }) => ({
                url: `categories/${id}`,
                method: 'PUT',
                body: updatedCategory,
            }),
            invalidatesTags: [{ type: 'Category' }],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `categories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Category' }],
        }),
    }),
});


export const {
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApi;
