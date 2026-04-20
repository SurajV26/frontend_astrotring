// src/redux/slices/walletSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../baseApi';

// ---------- Wallet Details ----------
export const fetchWalletDetails = createAsyncThunk(
  'wallet/fetchDetails',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/wallet');
      console.log("fetch wallet",response)
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch wallet details');
    }
  }
);

// ---------- Recharge History ----------
export const fetchRechargeHistory = createAsyncThunk(
  'wallet/fetchRechargeHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/wallet/recharge-history');
       console.log("fetch recharge history",response)
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch recharge history');
    }
  }
);

// ---------- Payout History ----------
export const fetchPayoutHistory = createAsyncThunk(
  'wallet/fetchPayoutHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/payout/history');
       console.log("fetch payout history",response)
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch payout history');
    }
  }
);

// ---------- Create Payout Request ----------
export const createPayoutRequest = createAsyncThunk(
  'wallet/createPayoutRequest',
  async (amount, { rejectWithValue }) => {
    try {
      const response = await api.post('/payout/request', { amount });
       console.log("fetch payout request",response)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create payout request');
    }
  }
);

// ---------- Razorpay: Create Order ----------
export const createRazorpayOrder = createAsyncThunk(
  'wallet/createRazorpayOrder',
  async (amount, { rejectWithValue }) => {
    try {
      const response = await api.post('/razorpay/create-order', { amount });
      return response.data; // expects { order_id, amount, currency }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create Razorpay order');
    }
  }
);

// ---------- Razorpay: Verify Payment ----------
export const verifyRazorpayPayment = createAsyncThunk(
  'wallet/verifyRazorpayPayment',
  async ({ paymentData, amount }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post('/razorpay/verify', {
        ...paymentData,
        amount,
      });
      await dispatch(fetchWalletDetails()); // refresh balance
      await dispatch(fetchRechargeHistory()); // refresh recharge history
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Payment verification failed');
    }
  }
);

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    details: null,
    rechargeHistory: [],
    payoutHistory: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearWalletError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchWalletDetails
      .addCase(fetchWalletDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWalletDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchWalletDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchRechargeHistory
      .addCase(fetchRechargeHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRechargeHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.rechargeHistory = action.payload;
      })
      .addCase(fetchRechargeHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchPayoutHistory
      .addCase(fetchPayoutHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayoutHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.payoutHistory = action.payload;
      })
      .addCase(fetchPayoutHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // createPayoutRequest
      .addCase(createPayoutRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPayoutRequest.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createPayoutRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // createRazorpayOrder
      .addCase(createRazorpayOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRazorpayOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createRazorpayOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // verifyRazorpayPayment
      .addCase(verifyRazorpayPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyRazorpayPayment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyRazorpayPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWalletError } = walletSlice.actions;
export default walletSlice.reducer;