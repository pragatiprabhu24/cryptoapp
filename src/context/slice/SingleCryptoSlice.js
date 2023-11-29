import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const options = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd',
    params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      timePeriod: '24h'
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_CRYPTO_KEY,
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };
  export const getSingleCryptoInfo = createAsyncThunk(
    "getSingleCryptoInfo",
    async (uuid) => {
        try {
            const dynamicOptions = {
                ...options,
                url: `https://coinranking1.p.rapidapi.com/coin/${uuid}`,
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

const SingleCryptoSlice = createSlice({
    name: "Crypto",
    initialState: {
        singlecrypto: {},
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
        [getSingleCryptoInfo.pending]: (state, action) => {
            state.loading = true;
        },
        [getSingleCryptoInfo.fulfilled]: (state, action) => {
            state.loading = false;
            state.singlecrypto = action.payload.data.coin;
        },
        [getSingleCryptoInfo.rejected]: (state, action) => {
            state.loading = false;
            state.error.open = true;
        },

    },
});

export default SingleCryptoSlice.reducer;