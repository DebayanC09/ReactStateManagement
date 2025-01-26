import { store } from "../../store/AppStore";
import { setIsLoggedIn } from "../../store/slice/AuthSlice";

const TOKEN_KEY = "token_key";

const TokenManager = {
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
    store.dispatch(setIsLoggedIn(true));
  },
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  hasToken() {
    if (this.getToken() && this.getToken() !== null && this.getToken() !== "") {
      return true;
    } else {
      return false;
    }
  },
  deleteToken() {
    localStorage.removeItem(TOKEN_KEY);
    store.dispatch(setIsLoggedIn(false));
  },
};

export default TokenManager;
