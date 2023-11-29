import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const options = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/coins',
    params: {
        referenceCurrencyUuid: 'yhjMzLPhuIDl',
        timePeriod: '24h',
        'tiers[0]': '1',
        orderBy: 'marketCap',
        orderDirection: 'desc',
        limit: '50',
        offset: '0'
    },
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_CRYPTO_KEY,
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
};

export const getCryptoInfo = createAsyncThunk(
    "getCryptoInfo",
    async (payload) => {
        try {
            const response = await axios.request(options);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

const CryptoSlice = createSlice({
    name: "Crypto",
    initialState: {
        cryptoinfo: {},
        cryptos: [],
        loading: false,
        error: {
            open: false,
            type: "",
            message: "",
        },
    },
    reducers: {
        // You can add specific reducers if needed
    },
    extraReducers: {
        [getCryptoInfo.pending]: (state, action) => {
            state.loading = true;
        },
        [getCryptoInfo.fulfilled]: (state, action) => {
            state.loading = false;
            state.cryptoinfo = action.payload.data.stats;
            state.cryptos = action.payload.data.coins;
        },
        [getCryptoInfo.rejected]: (state, action) => {
            state.loading = false;
            state.error.open = true;
        },

    },
});

export default CryptoSlice.reducer;