import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const options = {
    method: 'GET',
    url: 'https://crypto-news16.p.rapidapi.com/news/top/100',
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_CRYPTO_KEY,
        'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com'
    }
};

export const getCryptoNews = createAsyncThunk(
    "getCryptoNews",
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

const NewsSlice = createSlice({
    name: "News",
    initialState: {
        news: [],
        loading: false,
        error: {
            open: false,
            type: "",
            message: "",
        },
    },

    extraReducers: {
        [getCryptoNews.pending]: (state, action) => {
            state.loading = true;
        },
        [getCryptoNews.fulfilled]: (state, action) => {
            state.loading = false;
            state.news = action.payload;

        },
        [getCryptoNews.rejected]: (state, action) => {
            state.loading = false;
            state.error.open = true;
        },

    },
});

export default NewsSlice.reducer;