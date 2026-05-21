import { configureStore } from "@reduxjs/toolkit";
import UserAuthReducer from "./slice/UserAuth";
import HoroscopeReducer from "./slice/HoroscopesSlice";
import AstroAuthReducer from "./slice/AstroAuth";
import WalletReducer from "./slice/walletSlice";
import blogReducer from './slice/BlogSlice';

export const store = configureStore({
  reducer: {
    userAuth: UserAuthReducer,
    horoscope: HoroscopeReducer,
    astroAuth: AstroAuthReducer,
    wallet: WalletReducer,
    blog: blogReducer,
  },
});
