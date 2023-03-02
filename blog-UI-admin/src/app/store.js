import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth.service";
import { blogApi } from "./services/blogs.service";
import { categoryApi } from "./services/categories.service";
import { imageApi } from "./services/images.service";
import { handleError } from "./services/middlewares";
import authReducer from "./slices/auth.slice";
import blogsReducer from "./slices/blogs.slice";

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [imageApi.reducerPath]: imageApi.reducer,
        blogs: blogsReducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            blogApi.middleware,
            categoryApi.middleware,
            imageApi.middleware,
            authApi.middleware,
            handleError
        ),
});

export default store;
