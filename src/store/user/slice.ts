import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getUser } from "../../common/api/users";

interface User {
  id: string;
  admin: boolean;
  email: string;
  username: string;
}

export const getLoggedInUser = createAsyncThunk("user/getLoggedIn", async (_nothing, _thunkAPI) => {
  const response = await getUser();
  if (!response.ok) {
    return null;
  }
  const json: { user: User } = await response.json();
  return json.user;
});

const userSlice = createSlice({
  name: "user",
  initialState: null as User | null,
  reducers: {},
  extraReducers: {
    [getLoggedInUser.fulfilled as any]: (_state, action: PayloadAction<User>) => action.payload
  }
});

export const { reducer: userReducer } = userSlice;
