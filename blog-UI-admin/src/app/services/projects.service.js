import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
const ENDPOINT = import.meta.env.VITE_API_DOMAIN_ADMIN;

export const projectApi = createApi({
    reducerPath: "projectApi",
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
        getProjects: builder.query({
            query: () => "projects",
            providesTags: ["Project"],
        }),
        getProjectById: builder.query({
            query: (id) => `projects/${id}`,
            providesTags: (result, error, id) => [{ type: "Project", id: id }],
        }),
        createProject: builder.mutation({
            query: (newProject) => ({
                url: "projects",
                method: "POST",
                body: newProject,
            }),
            invalidatesTags: [{ type: "Project" }],
        }),
        updateProject: builder.mutation({
            query: ({ id, ...updatedProject }) => ({
                url: `projects/${id}`,
                method: "PUT",
                body: updatedProject,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Project", id: id },
            ],
        }),
        deleteProject: builder.mutation({
            query: (id) => ({
                url: `projects/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "Project" }],
        })
    }),
});

export const {
    useGetProjectsQuery,
    useGetProjectByIdQuery,
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
    ProjectesetPasswordMutation,
} = projectApi;
