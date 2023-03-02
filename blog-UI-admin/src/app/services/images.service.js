import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
const ENDPOINT = "http://localhost:8080/api/admin"

export const imageApi = createApi({
    reducerPath: "imageApi",
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
        uploadImage: builder.mutation({
            query: (data) => ({
                url: "images",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['Post']
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useUploadImageMutation
} = imageApi;
