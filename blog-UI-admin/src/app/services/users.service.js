import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN_ADMIN } from "../../data/constants";

// Define a service using a base URL and expected endpoints
const ENDPOINT = API_DOMAIN_ADMIN;

export const userApi = createApi({
    reducerPath: "userApi",
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
        getUsers: builder.query({
            query: () => "users",
            providesTags: ["User"],
        }),
        getUserById: builder.query({
            query: (id) => `users/${id}`,
            providesTags: (result, error, id) => [{ type: "User", id: id }],
        }),
        createUser: builder.mutation({
            query: (newUser) => ({
                url: "users",
                method: "POST",
                body: newUser,
            }),
            invalidatesTags: [{ type: "User" }],
        }),
        updateUser: builder.mutation({
            query: ({ id, ...updatedUser }) => ({
                url: `users/${id}`,
                method: "PUT",
                body: updatedUser,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "User", id: id },
            ],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "User" }],
        }),
        resetPassword: builder.mutation({
            query: (id) => ({
                url: `users/${id}/reset-password`,
                method: "POST",
            }),
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useResetPasswordMutation,
} = userApi;
