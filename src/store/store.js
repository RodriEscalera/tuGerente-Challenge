import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal";
import resultsReducer from "./results";
const store = configureStore({
  reducer: {
    modal: modalReducer,
    results: resultsReducer,
  },
});

export default store;
