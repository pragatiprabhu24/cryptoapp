import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const options = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/exchange/-zdvbieRdZ/coins',
    params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      limit: '50',
      offset: '0',
      orderBy: '24hVolume',
      orderDirection: 'desc'
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_CRYPTO_KEY,
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };

export const getExchanges = createAsyncThunk(
    "getExchanges",
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

const ExchangesSlice = createSlice({
    name: "News",
    initialState: {
        exchanges: [],
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
        [getExchanges.pending]: (state, action) => {
            state.loading = true;
        },
        [getExchanges.fulfilled]: (state, action) => {
            state.loading = false;
            state.exchanges = action.payload.data.coins;

        },
        [getExchanges.rejected]: (state, action) => {
            state.loading = false;
            state.error.open = true;
        },

    },
});

export default ExchangesSlice.reducer;