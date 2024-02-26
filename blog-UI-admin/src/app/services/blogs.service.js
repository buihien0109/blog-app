import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN_ADMIN } from "../../data/constants";

// Define a service using a base URL and expected endpoints
const ENDPOINT = API_DOMAIN_ADMIN;

export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({
        baseUrl: ENDPOINT,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.accessToken;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: () => "blogs",
            providesTags: ["Blog"],
        }),
        getOwnBlogs: builder.query({
            query: () => "blogs/own-blogs",
            providesTags: ["Blog"],
        }),
        getBlogById: builder.query({
            query: (blogId) => `blogs/${blogId}`,
            providesTags: (result, error, blogId) => [
                { type: "Blog", id: blogId },
            ],
        }),
        createBlog: builder.mutation({
            query: (newBlog) => ({
                url: "blogs",
                method: "POST",
                body: newBlog,
            }),
            invalidatesTags: ["Blog"],
        }),
        updateBlog: builder.mutation({
            query: ({ blogId, ...updatedBlog }) => ({
                url: `blogs/${blogId}`,
                method: "PUT",
                body: updatedBlog,
            }),
            invalidatesTags: (result, error, { blogId }) => [
                { type: "Blog", id: blogId },
            ],
        }),
        deleteBlog: builder.mutation({
            query: (blogId) => ({
                url: `blogs/${blogId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Blog"],
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetBlogsQuery,
    useGetOwnBlogsQuery,
    useGetBlogByIdQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
} = blogApi;
