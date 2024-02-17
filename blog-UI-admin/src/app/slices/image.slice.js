import { createSlice } from '@reduxjs/toolkit';
import { imageApi } from '../services/images.service';


const initialState = []

const imageSlice = createSlice({
    name: "image",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            imageApi.endpoints.getImages.matchFulfilled,
            (state, action) => {
                state = action.payload;
                return state;
            }
        );
        builder.addMatcher(
            imageApi.endpoints.uploadImage.matchFulfilled,
            (state, action) => {
                state.unshift(action.payload);
                return state;
            }
        );
        builder.addMatcher(
            imageApi.endpoints.deleteImage.matchFulfilled,
            (state, action) => {
                state = state.filter((image) => image.id !== action.meta.arg.originalArgs);
                return state;
            }
        );
    }
});

export const { } = imageSlice.actions

export default imageSlice.reducer