import { configureStore } from "@reduxjs/toolkit";
import { loaderSlice } from "./loadersSlice";

const store = configureStore({
  reducer: {
    loaders: loaderSlice.reducer,
  },
});

export default store;
