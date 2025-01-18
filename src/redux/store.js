import { configureStore } from "@reduxjs/toolkit";
import campersReducer from "../redux/campers/slice";
import filterReducer from "./filters/slice";

const store = configureStore({
  reducer: {
    campers: campersReducer,
    filter: filterReducer,
  },
});

export { store };
