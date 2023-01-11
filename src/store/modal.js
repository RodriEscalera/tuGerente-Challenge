import { createReducer, createAction } from "@reduxjs/toolkit";

export const setModal = createAction("SET_MODAL");

const initialState = false;

const modalReducer = createReducer(initialState, {
  [setModal]: (state, action) => action.payload,
});

export default modalReducer;
