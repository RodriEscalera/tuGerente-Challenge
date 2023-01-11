import { createReducer, createAction } from "@reduxjs/toolkit";

export const setResults = createAction("SET_RESULTS");
export const addContent = createAction("ADD_CONTENT");

const initialState = [];

const resultsReducer = createReducer(initialState, {
  [setResults]: (state, action) => action.payload,
  [addContent]: (state, action) => {
    return [...state, action.payload];
  },
});

export default resultsReducer;
