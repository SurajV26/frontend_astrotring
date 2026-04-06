import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../baseApi";

export const getHoroscope = createAsyncThunk(
  "horoscope/get",
  async (_, thunkApi) => {
    try {
      const res = await api.get("/horoscopes");
      return res.data.data; // full array (weekly, monthly, yearly)
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to fetch horoscope"
      );
    }
  }
);

const initialState = {
  horoscope: null,
  loading: false,
  error: null,
};

const horoscopeSlice = createSlice({
  name: "horoscope",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHoroscope.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHoroscope.fulfilled, (state, action) => {
        state.loading = false;
        state.horoscope = action.payload; // full data
      })
      .addCase(getHoroscope.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = horoscopeSlice.actions;
export default horoscopeSlice.reducer;

// Selectors
export const selectHoroscopeLoading = (state) => state.horoscope.loading;
export const selectHoroscopeError = (state) => state.horoscope.error;
export const selectAllHoroscopes = (state) => state.horoscope.horoscope;

export const selectHoroscopeByPeriodAndSign = (state, timePeriod, zodiac) => {
  const all = state.horoscope.horoscope;
  if (!all || !Array.isArray(all)) return null;

  const targetPeriod = timePeriod?.toLowerCase();   // "monthly" or "yearly"
  const targetSign = zodiac?.toLowerCase();         // "aries", etc.

  return all.find((item) => {
    // Match type (monthly/yearly)
    if (item.type?.toLowerCase() !== targetPeriod) return false;
    // Match zodiac slug
    const zodiacSlug = item.zodiac?.slug?.toLowerCase();
    return zodiacSlug === targetSign;
  }) || null;
};