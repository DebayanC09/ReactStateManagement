import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../AppStore";
import { User } from "../../models/auth/UserModel";

export const getAuthState = (state: RootState) => state.auth;

interface AuthState {
  isLoggedIn: boolean;
  userdata: User | null;
  isUserDetailsLoading: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  userdata: null,
  isUserDetailsLoading: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setUserDetails: (state, action: PayloadAction<User | null>) => {
      state.userdata = action.payload;
    },
  },
});

export const { setIsLoggedIn, setUserDetails } = AuthSlice.actions;
