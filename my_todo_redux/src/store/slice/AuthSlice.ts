import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../AppStore";
import TokenManager from "../../services/local/TokenManagers";

export const getAuthState = (state: RootState) => state.auth;

interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    initializeAuth: (state) => {
      console.log("initializeAuth");

      const token = TokenManager.getToken();
      if (token) {
        state.isLoggedIn = true;
      }
    },
  },
});

export const { setIsLoggedIn, initializeAuth } = AuthSlice.actions;
