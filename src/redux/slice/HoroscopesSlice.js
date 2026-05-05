// src/redux/slice/HoroscopeSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../baseApi";

// ✅ Original thunk – unchanged, used by many components
export const getHoroscope = createAsyncThunk(
    "horoscope/get",
    async (_, thunkApi) => {
        try {
            const res = await api.get("/horoscopes");
            console.log(res.data.data);
            return res.data.data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "Failed to fetch horoscope"
            );
        }
    }
);

// ✅ New thunk – for fetching a single horoscope by ID
export const getHoroscopeById = createAsyncThunk(
    "horoscope/getById",
    async (id, thunkApi) => {
        try {
            const res = await api.get(`/horoscopes/${id}`);
            return res.data.data; // single object
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "Failed to fetch horoscope by ID"
            );
        }
    }
);

const initialState = {
    horoscope: null,        
    allList: [],            
    idMap: {},              
    currentHoroscope: null, 
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
        clearCurrentHoroscope: (state) => {
            state.currentHoroscope = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Original getHoroscope
            .addCase(getHoroscope.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getHoroscope.fulfilled, (state, action) => {
                state.loading = false;
                state.horoscope = action.payload;   // original field
                state.allList = action.payload;     // for mapping
                // Build idMap from the full list
                const map = {};
                action.payload.forEach((item) => {
                    const key = `${item.type}-${item.zodiac?.slug}`;
                    if (key && item.id) map[key] = item.id;
                });
                state.idMap = map;
            })
            .addCase(getHoroscope.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // New getHoroscopeById
            .addCase(getHoroscopeById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getHoroscopeById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentHoroscope = action.payload;
            })
            .addCase(getHoroscopeById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError, clearCurrentHoroscope } = horoscopeSlice.actions;
export default horoscopeSlice.reducer;