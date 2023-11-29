import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const options = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/history',
    params: {
        referenceCurrencyUuid: 'yhjMzLPhuIDl',
        timePeriod: '24h'
    },
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_CRYPTO_KEY,
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
};

export const getCryptoHistory = createAsyncThunk(
    "getCryptoHistory",
    async ({ uuid }) => {
        try {
            const dynamicOptions = {
                ...options,
                url: `https://coinranking1.p.rapidapi.com/coin/${uuid}/history`,
            };

            const response = await axios.request(dynamicOptions);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)

const CryptoHistorySlice = createSlice({
    name: "Crypto",
    initialState: {
        crypto_history: [],
        loading: false,
        error: {
            open: false,
            type: "",
            message: "",
        },
    },
    extraReducers: {
        [getCryptoHistory.pending]: (state, action) => {
            state.loading = true;
        },
        [getCryptoHistory.fulfilled]: (state, action) => {
            state.loading = false;
            state.crypto_history = action.payload.data;
        },
        [getCryptoHistory.rejected]: (state, action) => {
            state.loading = false;
            state.error.open = true;
        },

    },
});

export default CryptoHistorySlice.reducer;