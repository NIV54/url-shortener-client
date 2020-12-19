import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { editableCellReducer } from "./editable-cell/slice";

const rootReducer = combineReducers({
  editableCell: editableCellReducer
});

export type State = ReturnType<typeof rootReducer>;

export const store = configureStore({ reducer: rootReducer });
