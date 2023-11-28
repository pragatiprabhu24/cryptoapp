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
      'X-RapidAPI-Key': '15d2ed8b8dmsh228b3214942db64p1d1632jsna1b82070aef7',
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