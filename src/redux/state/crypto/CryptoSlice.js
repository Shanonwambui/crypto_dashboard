// cryptoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk
export const fetchCryptoData = createAsyncThunk('crypto/fetchCryptoData', async () => {
    const options = {
        method: 'GET',
        url: 'https://api.coingecko.com/api/v3/coins/markets',
        params: {vs_currency: 'usd'},
        headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-WYyw7xXVmQkEA1X5WMXVWuyB'}
    };
    const response = await axios.request(options);
    const dataWithIds = response.data.map((item, index) => ({ id: index, ...item }));
    return dataWithIds;
});

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default cryptoSlice.reducer;