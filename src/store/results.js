import { createReducer, createAction } from "@reduxjs/toolkit";

export const setResults = createAction("SET_RESULTS");
export const addContent = createAction("ADD_CONTENT");

const initialState = [];

const resultsReducer = createReducer(initialState, {
  [setResults]: (state, action) => {
    const res = [];

    for (let i = 0; i < action.payload.length; i += 20) {
      const chunk = action.payload.slice(i, i + 20);
      res.push(chunk);
    }
    return res;
  },
  [addContent]: (state, action) => {
    return [...state, action.payload];
  },
});

export default resultsReducer;
