import { configureStore } from "@reduxjs/toolkit";
import UserAuthReducer from "./slice/UserAuth";
import HoroscopeReducer from "./slice/HoroscopesSlice";
import AstroAuthReducer from "./slice/AstroAuth";
import languageReducer from "./slice/LanguageSlice";
import WalletReducer from "./slice/walletSlice";

export const store = configureStore({
  reducer: {
    userAuth: UserAuthReducer,
    horoscope: HoroscopeReducer,
    astroAuth: AstroAuthReducer,
    language: languageReducer,
    wallet: WalletReducer,
  },
});
