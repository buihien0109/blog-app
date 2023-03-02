import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "./services/blog.api";
import { categoryApi } from "./services/category.api";

const store = configureStore({
    reducer: {
        [blogApi.reducerPath]: blogApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            blogApi.middleware,
            categoryApi.middleware
        ),
});

export default store;
