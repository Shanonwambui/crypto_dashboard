import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
    value: "",
    status: 'idle',
    coinData: null,
    error: null
};

// Define the async thunk
export const fetchCoinData = createAsyncThunk('search/fetchCoinData', async (searchInput) => {
    const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${searchInput}`, {
        headers: {
            'accept': 'application/json',
            'x-cg-demo-api-key': 'CG-WYyw7xXVmQkEA1X5WMXVWuyB'

        }
    });
    const coinData = await response.json();
    console.log(coinData);
    return coinData;
});

// Define the slice
export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchInput: (state, action) => {
            state.value = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoinData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCoinData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.coinData = action.payload;
            })
            .addCase(fetchCoinData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setSearchInput } = searchSlice.actions;

export const selectSearchInput = (state) => state.search.value;

export default searchSlice.reducer;