import { configureStore } from "@reduxjs/toolkit";
import CryptoSlice from "./slice/CryptoSlice";
import NewsSlice from "./slice/NewsSlice";
import SingleCryptoSlice from "./slice/SingleCryptoSlice";
import CryptoHistorySlice from "./slice/CryptoHistorySlice";
import ExchangeSlice from "./slice/ExchangeSlice";

export default configureStore({
    reducer: {
        crypto: CryptoSlice,
        news: NewsSlice,
        singlecrypto: SingleCryptoSlice,
        history: CryptoHistorySlice,
        exchange: ExchangeSlice
    },
});