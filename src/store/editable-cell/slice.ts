import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const editableCellSlice = createSlice({
  name: "editableCell",
  initialState: "",
  reducers: {
    setEditableCell: (_state, action: PayloadAction<string>) => action.payload,
    resetEditableCell: () => ""
  }
});

export const {
  reducer: editableCellReducer,
  actions: { setEditableCell, resetEditableCell }
} = editableCellSlice;
