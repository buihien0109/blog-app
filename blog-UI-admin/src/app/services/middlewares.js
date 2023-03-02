import { isRejectedWithValue } from "@reduxjs/toolkit";
import { logout } from "../slices/auth.slice";

/**
 * Log a warning and show a toast!
 */
export const handleError =
    (api) => (next) => (action) => {
        if (isRejectedWithValue(action)) {
            console.error(action);

            if (action.meta?.baseQueryMeta?.response?.status === 401) {
                alert("Vui lòng đăng nhập");
                api.dispatch(logout());
            } else if (action.meta?.baseQueryMeta?.response?.status === 403) {
                alert("Token hết hạn, vui lòng đăng nhập lại")
                api.dispatch(logout());
            }
        }

        return next(action);
    };