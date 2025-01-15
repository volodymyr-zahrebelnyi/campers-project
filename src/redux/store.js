import { configureStore } from "@reduxjs/toolkit";
import campersReducer from "../redux/campers/slice";

const store = configureStore({
  reducer: {
    campers: campersReducer,
  },
});

export { store };
