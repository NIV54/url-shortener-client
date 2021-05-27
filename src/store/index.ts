import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { editableCellReducer } from "./editable-cell/slice";
import { userReducer } from "./user/slice";

const rootReducer = combineReducers({
  editableCell: editableCellReducer,
  user: userReducer
});

export type State = ReturnType<typeof rootReducer>;

export const store = configureStore({ reducer: rootReducer });
