import { configureStore } from "@reduxjs/toolkit";
import { checkStatusMiddleware } from "./middlewares/middlewares";
import { authApi } from "./services/auth.service";
import { blogApi } from "./services/blogs.service";
import { categoryApi } from "./services/categories.service";
import { dashboardApi } from "./services/dashboard.service";
import { imageApi } from "./services/images.service";
import { projectApi } from "./services/projects.service";
import { userApi } from "./services/users.service";
import authReducer from "./slices/auth.slice";
import imageReducer from "./slices/image.slice";

const store = configureStore({
    reducer: {
        [dashboardApi.reducerPath]: dashboardApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [imageApi.reducerPath]: imageApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
        auth: authReducer,
        images: imageReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            blogApi.middleware,
            categoryApi.middleware,
            imageApi.middleware,
            authApi.middleware,
            userApi.middleware,
            dashboardApi.middleware,
            projectApi.middleware,
            checkStatusMiddleware
        ),
});

export default store;
