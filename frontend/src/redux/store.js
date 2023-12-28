import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import generalSlice from "./generalSlice";

export default configureStore({
  reducer: {
    products: productSlice,
    general: generalSlice,
  },
});
