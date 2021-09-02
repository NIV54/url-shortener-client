import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getUser } from "../../common/api/users";

interface User {
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
  initialState: { isGuest: false, user: null as User | null },
  reducers: {
    setLoggedInUser: (state, action: PayloadAction<User>) => ({
      isGuest: false,
      user: action.payload
    }),
    logoutUser: _state => ({ isGuest: false, user: null }),
    guestLogin: state => ({ ...state, isGuest: true })
  },
  extraReducers: {
    [getLoggedInUser.fulfilled as any]: (state, action: PayloadAction<User>) => ({
      isGuest: false,
      user: action.payload
    })
  }
});

export const {
  reducer: userReducer,
  actions: { setLoggedInUser, logoutUser, guestLogin }
} = userSlice;
