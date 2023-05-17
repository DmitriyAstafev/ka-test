import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {},
});

export const {} = fileSlice.actions;

export const selectFile = (state) => state.file;

export default fileSlice.reducer;
