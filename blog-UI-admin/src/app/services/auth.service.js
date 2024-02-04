import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
const ENDPOINT = "http://localhost:8080/api/public/auth"
export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery(
        { baseUrl: ENDPOINT }
    ),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "login",
                method: "POST",
                body: credentials,
            }),
        }),
    }),
});

export const {
    useLoginMutation
} = authApi;
