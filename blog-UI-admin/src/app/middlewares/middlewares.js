import { logout } from "../slices/auth.slice";

// Middleware to check HTTP status code
export const checkStatusMiddleware = ({ dispatch }) => (next) => (action) => {
    if (action.type.endsWith('rejected')) {
        const { payload, error } = action;
        if (error && payload.status === 401) {
            dispatch(logout());
        }
    }
    return next(action);
};