import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "./services/blog.api";
import { categoryApi } from "./services/category.api";
import { projectApi } from "./services/project.api";

const store = configureStore({
    reducer: {
        [blogApi.reducerPath]: blogApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            blogApi.middleware,
            categoryApi.middleware,
            projectApi.middleware
        ),
});

export default store;
