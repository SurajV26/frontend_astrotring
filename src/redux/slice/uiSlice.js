// src/redux/slice/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rechargeModalOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openRechargeModal: (state) => {
      state.rechargeModalOpen = true;
    },
    closeRechargeModal: (state) => {
      state.rechargeModalOpen = false;
    },
  },
});

export const { openRechargeModal, closeRechargeModal } = uiSlice.actions;
export default uiSlice.reducer;