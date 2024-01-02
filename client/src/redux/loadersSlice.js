import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
  nname: "loaders",
  initialState: {
    loading: false,
  },
  reducers: {
    SetLoader: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { SetLoader } = loaderSlice.actions;
