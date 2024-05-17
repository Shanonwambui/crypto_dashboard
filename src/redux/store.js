import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./state/search/SearchSlice";
import userReducer from "./state/user/UserSlice";
import cryptoReducer from "./state/crypto/CryptoSlice";
import detailReducer from "./state/coin-details/CoinDetailSlice";

export const store = configureStore({
    reducer: {
        search: searchReducer,
        user: userReducer,
        crypto: cryptoReducer,
        coinDetails: detailReducer,

    },
    });


