import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// Define the initial state
const initialState = {
  value: "bitcoin",
  status: "idle",
  coinDetails: null,
  error: null,
};

// Define the async thunk
export const fetchCoinDetails = createAsyncThunk(
  "coinDetails/fetchCoinDetails",
  async (coinId) => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}`,
      {
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-WYyw7xXVmQkEA1X5WMXVWuyB",
          'Access-Control-Allow-Origin':'*'
        },
      }
    );
    const coinDetails = await response.json();
    console.log(coinDetails);
    return coinDetails;
  }
);

// Define the slice
export const coinDetailSlice = createSlice({
  name: "coinDetails",
  initialState,
  reducers: {
    setCoinId: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoinDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coinDetails = action.payload;
      })
      .addCase(fetchCoinDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCoinId } = coinDetailSlice.actions;

export const selectCoinId = (state) => state.coinDetails.value;

export default coinDetailSlice.reducer;

