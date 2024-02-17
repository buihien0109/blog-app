import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ENDPOINT = import.meta.env.VITE_API_DOMAIN_PUBLIC;

export const projectApi = createApi({
    reducerPath: "projectApi",
    baseQuery: fetchBaseQuery({ baseUrl: ENDPOINT }),
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: () => `projects`,
        })
    }),
});

export const {
    useGetProjectsQuery
} = projectApi;
