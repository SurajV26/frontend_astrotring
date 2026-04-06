import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../baseApi";


export const getHoroscope = createAsyncThunk(
    "horoscope/get",
    async (data, thunkApi) => {
        try {
            const res = await api.get("/horoscopes");
            console.log(res.data.data)
            return res.data.data;
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

    extraReducers: (builder) => {
        builder
            // GET HOROSCOPE
            .addCase(getHoroscope.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getHoroscope.fulfilled, (state, action) => {
                state.loading = false;
                state.horoscope = action.payload;
            })
            .addCase(getHoroscope.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export default horoscopeSlice.reducer;



//===============================================================================

// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Token fetch karne ka function
// const fetchAccessToken = async () => {
//  const params = new URLSearchParams();
// params.append('grant_type', 'client_credentials');
// params.append('client_id', import.meta.env.VITE_PROKERALA_CLIENT_ID);
// params.append('client_secret', import.meta.env.VITE_PROKERALA_CLIENT_SECRET); 

//   const response = await axios.post(
//     'https://api.prokerala.com/token',
//     params,
//     {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     }
//   );
//   return response.data; // { access_token, token_type, expires_in }
// };

// export const getHoroscope = createAsyncThunk(
//   'horoscope/get',
//   async (_, thunkApi) => {
//     try {
//       // 1. Pehle token le lo
//       const tokenData = await fetchAccessToken();
//       const accessToken = tokenData.access_token;
//       const tokenType = tokenData.token_type;

//       // 2. Ab horoscope API call karo with token in header
//       const response = await axios.get(
//         'https://api.prokerala.com/v2/horoscope/daily/advanced',
//         {
//           params: {
//             sign: 'all',
//             type: 'all',
//             datetime: new Date().toISOString(),
//           },
//           headers: {
//             Authorization: `${tokenType} ${accessToken}`,
//           },
//         }
//       );

//       // 3. Response ko transform karo
//       const predictions = response.data.data.daily_predictions;
//       const horoscopes = predictions.map((item) => ({
//         zodiac: { name: item.sign.name.toLowerCase() },
//         type: 'daily',
//         title: `${item.sign.name} Daily Horoscope`,
//         description: item.predictions.find(p => p.type === 'general')?.prediction || '',
//         love: item.predictions.find(p => p.type === 'love')?.prediction,
//         career: item.predictions.find(p => p.type === 'career')?.prediction,
//         health: item.predictions.find(p => p.type === 'health')?.prediction,
//         finance: null,
//       }));

//       return horoscopes;
//     } catch (error) {
//       console.error('API Error:', error.response?.data || error.message);
//       return thunkApi.rejectWithValue(
//         error.response?.data?.message || 'Failed to fetch horoscope'
//       );
//     }
//   }
// );

// const initialState = {
//   horoscope: null,
//   loading: false,
//   error: null,
// };

// const horoscopeSlice = createSlice({
//   name: 'horoscope',
//   initialState,
//   extraReducers: (builder) => {
//     builder
//       .addCase(getHoroscope.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getHoroscope.fulfilled, (state, action) => {
//         state.loading = false;
//         state.horoscope = action.payload;
//       })
//       .addCase(getHoroscope.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default horoscopeSlice.reducer;




// utils/auth.js
// import axios from 'axios';
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const fetchAccessToken = async () => {
//     console.log("fetchAccessToken called");
//   const params = new URLSearchParams();
//   params.append('grant_type', 'client_credentials');
//   params.append('client_id', import.meta.env.VITE_PROKERALA_CLIENT_ID);
//   params.append('client_secret', import.meta.env.VITE_PROKERALA_CLIENT_SECRET);


//    console.log("Request params:", {
//     grant_type: 'client_credentials',
//     client_id: import.meta.env.VITE_PROKERALA_CLIENT_ID,
//     client_secret: '***hidden***'
//   });

//   const response = await axios.post('https://api.prokerala.com/token', params, {
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//   });
//     console.log("Token response:", response.data);
//   return response.data; // { access_token, token_type, expires_in }
// };



// Token ko store karne ke liye (localStorage ya Redux state)
// let cachedToken = null;
// let tokenExpiry = null;

// const getValidToken = async () => {
//      console.log("getValidToken called");
//   // Agar token hai aur expire nahi hua to use karo
//   if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
//     console.log("Using cached token");
//     return cachedToken;
//   }
//     console.log("Fetching new token...");
  
//   // Naya token le lo
//   const tokenData = await fetchAccessToken();
//   console.log("tokendata", tokenData);
//   cachedToken = tokenData.access_token;
//   tokenExpiry = Date.now() + tokenData.expires_in * 1000; // expires_in seconds mein aata hai
//   console.log("New token cached", cachedToken);
//   return cachedToken;
// };

// const ZODIAC_SIGNS = [
//   'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
//   'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
// ];

// export const getHoroscope = createAsyncThunk(
//   "horoscope/get",
//   async (_, thunkApi) => {
//     // console.log("🔥 Thunk started")
    
//     try {
//       // 1. Valid token le lo
//       const token = await getValidToken();
//       console.log("token",token);

//       // 2. Har sign ke liye promise banao
//       const promises = ZODIAC_SIGNS.map(sign =>
//         axios.get('https://api.prokerala.com/v2/horoscope/daily', {
//           params: {
//             sign: sign,
//             datetime: new Date().toISOString(),
//           },
//           headers: {
//             'Authorization': `Bearer ${token}`,  // 👈 Token header mein bhejo
//           }
//         })
//         .then(res => {
//           console.log(`Response for ${sign}:`, res.data);
//           return res.data;
//         })
//         .catch(err => {
//           console.error(`Error fetching ${sign}:`, err);
//           return null;
//         })
//       );

//       const results = await Promise.all(promises);

//       // 3. Data transform karo
//       const horoscopes = results
//         .filter(result => result?.status === 'ok')
//         .map(result => ({
//           zodiac: { name: result.data.daily_prediction.sign_name.toLowerCase() },
//           type: 'daily',
//           title: `${result.data.daily_prediction.sign_name} Daily Horoscope`,
//           description: result.data.daily_prediction.prediction,
//           love: null,
//           career: null,
//           health: null,
//           finance: null,
//         }));

//       return horoscopes;
//     } catch (error) {
//       console.error('API Error:', error.response?.data || error.message);
//       return thunkApi.rejectWithValue(
//         error.response?.data?.message || "Failed to fetch horoscope"
//       );
//     }
//   }
// );

// const initialState = {
//   horoscope: null,
//   loading: false,
//   error: null,
// };

// const horoscopeSlice = createSlice({
//   name: "horoscope",
//   initialState,
//   extraReducers: (builder) => {
//     builder
//       .addCase(getHoroscope.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getHoroscope.fulfilled, (state, action) => {
//         state.loading = false;
//         state.horoscope = action.payload;
//       })
//       .addCase(getHoroscope.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default horoscopeSlice.reducer;
