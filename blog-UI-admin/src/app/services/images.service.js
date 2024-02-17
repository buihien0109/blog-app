import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
const ENDPOINT = import.meta.env.VITE_API_DOMAIN_ADMIN;

export const imageApi = createApi({
    reducerPath: "imageApi",
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
        getImages: builder.query({
            query: () => "images",
        }),
        uploadImage: builder.mutation({
            query: (formData) => ({
                url: "images",
                method: "POST",
                body: formData,
            }),
        }),
        deleteImage: builder.mutation({
            query: (imageId) => ({
                url: `images/${imageId}`,
                method: "DELETE",
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetImagesQuery,
    useUploadImageMutation,
    useDeleteImageMutation,
} = imageApi;
