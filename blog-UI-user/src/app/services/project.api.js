import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN, API_DOMAIN_PUBLIC } from "../../data/constants";

export const projectApi = createApi({
    reducerPath: "projectApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_DOMAIN_PUBLIC }),
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: () => `projects`,
            transformResponse: (response, meta, arg) => {
                return response.map((item) => {
                    return {
                        ...item,
                        thumbnail: `${API_DOMAIN}${item.thumbnail}`
                    };
                });
            },
        })
    }),
});

export const {
    useGetProjectsQuery
} = projectApi;
