import { createSlice } from "@reduxjs/toolkit";
import { blogApi } from "../services/blogs.service";

const initialState = [];

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      blogApi.endpoints.getBlogs.matchFulfilled,
      (state, action) => {
        state = action.payload;
        return state;
      }
    );
  },
});

export const { } = blogsSlice.actions;

export default blogsSlice.reducer;
