import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
const ENDPOINT = "http://localhost:8080/api/admin"

export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({
        baseUrl: ENDPOINT,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: () => "blogs",
            providesTags: ['Post'],
        }),
        getBlogById: builder.query({
            query: (id) => `blogs/${id}`,
            
        }),
        getOwnBlogs: builder.query({
            query: () => `blogs/own-blogs`,
            providesTags: ['Post'],
        }),
        createBlog: builder.mutation({
            query: (data) => ({
                url: "blogs",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['Post'],
        }),
        updateBlog: builder.mutation({
            query: ({ id, ...data }) => {
                console.log({ id, data });
                return {
                    url: `blogs/${id}`,
                    method: "PUT",
                    body: data,
                }
            },
            invalidatesTags: ['Post'],
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `blogs/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Post'],
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetBlogsQuery,
    useGetBlogByIdQuery,
    useGetOwnBlogsQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
} = blogApi;
