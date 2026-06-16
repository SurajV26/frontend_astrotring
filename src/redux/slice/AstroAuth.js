import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../baseApi";

/* ================== THUNKS ================== */

export const AstrologerRegister = createAsyncThunk(
  "astroAuth/register",
  async (data, thunkApi) => {
    try {
      const res = await api.post("/astro/register", data);
      console.log("astro register",res.data.astro)
      return res.data.astro;

    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);

export const AstrologerLogin = createAsyncThunk(
  "astroAuth/login",
  async (data, thunkApi) => {
    try {
      const res = await api.post("/astro/login", data);
      console.log("checking astro login data", res.data.astro);

      if (res?.data?.user?.role_id === 3) {
        return thunkApi.rejectWithValue("User cannot login from here");
      } else {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role_id", res?.data?.astro?.role_id);

        // localStorage.setItem("token", res.data.token);
        return res.data.astro;
      }

      // localStorage.setItem("token", res?.data?.token);
      // localStorage.setItem("role_id", res?.data?.astro?.role_id);
      // return res.data.astro;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Login failed",
      );
    }
  },
);



// export const AstrologerProfile = createAsyncThunk(
//   "astroAuth/profile",
//   async (_, thunkApi) => {
//     try {
//       const res = await api.get("/astro/profile");
//       return res.data.astro;
//     } catch (error) {
//       return thunkApi.rejectWithValue(
//         error.response?.data?.message || "Profile fetch failed"
//       );
//     }
//   }
// );

export const AstrologerProfile = createAsyncThunk(
  "astroAuth/profile",
  async (_, thunkApi) => {
    try {
      const res = await api.get("/astro/profile");
      return res.data.astro; // yaha "astro" me reviews bhi hone chahiye
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Profile fetch failed"
      );
    }
  }
);

export const GetAllAstrologer = createAsyncThunk(
  "astroAuth/getAllAstrologer",
  async (_, thunkApi) => {
    try {
      const res = await api.get("/astro");
      const allastro = res.data.data;
      // console.log("all astro data from astro auth",allastro)

      const onlineastro = allastro.filter((astro) => astro.is_online);
      const offlineastro = allastro.filter((astro) => !astro.is_online);
      return [...onlineastro, ...offlineastro];
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to fetch astrologers",
      );
    }
  },
);
export const GetSingleAstro = createAsyncThunk(
  "astroAuth/getSingleAstro",
  async (data, thunkApi) => {
    console.log("get single astro api data", data);
    try {
      const res = await api.get(`/astro/${data}`);
      console.log("get single astro api response", res.data.data);

      return res.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to fetch Single astro",
      );
    }
  },
);

export const AstrologerLogout = createAsyncThunk(
  "astroAuth/logout",
  async (_, thunkApi) => {
    try {
      const res = await api.post("/astro/logout");
      return res.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to fetch astrologers",
      );
    }
  },
);
export const AstrologerUpdate = createAsyncThunk(
  "astroAuth/update",
  async (data, thunkApi) => {
    try {
      const res = await api.post("/astro/update", data);
      console.log(res);
      return res.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to fetch astrologers",
      );
    }
  },
);


// ========== FORGOT PASSWORD FLOW FOR ASTRO ==========
export const astroForgotPasswordRequest = createAsyncThunk(
  "user/forgotPasswordRequest",
  async ({email,type}, thunkApi) => {
    try {
      const res = await api.post("/astro/forgot-password", { email,type });
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to send OTP"
      );
    }
  }
);

export const astroVerifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async ({ email, otp, type }, thunkApi) => {
    try {
      const res = await api.post("/astro/verify-otp", { email, otp ,type});
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

export const astroResetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ email, password, password_confirmation, type}, thunkApi) => {
    try {
      const res = await api.post("/astro/reset-password", { email, password, password_confirmation, type });
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Password reset failed"
      );
    }
  }
);


/* ================== SLICE ================== */

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  astrologer: null,
  allastrologers: [],
  token: localStorage.getItem("token") || " ",
  singleAstro: null,
  loading: false,
  error: null,
};

const AstroAuthSlice = createSlice({
  name: "astroAuth",
  initialState,
  reducers: {
    clearAstroError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ---------- REGISTER ---------- */
      .addCase(AstrologerRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AstrologerRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.astrologer = action.payload;
      })
      .addCase(AstrologerRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- LOGIN ---------- */
      .addCase(AstrologerLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AstrologerLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.astrologer = action.payload;
      })
      .addCase(AstrologerLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      /* ---------- PROFILE ---------- */
      .addCase(AstrologerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AstrologerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.astrologer = action.payload;
      })
      .addCase(AstrologerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.astrologer = null;
      })

      /* ---------- GET ALL ---------- */
      .addCase(GetAllAstrologer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAllAstrologer.fulfilled, (state, action) => {
        state.loading = false;
        state.allastrologers = action.payload;
      })
      .addCase(GetAllAstrologer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* ---------- Logout ---------- */
      .addCase(AstrologerLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AstrologerLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.astrologer = null;
      })
      .addCase(AstrologerLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* ---------- update Astrologer ---------- */
      .addCase(AstrologerUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AstrologerUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(AstrologerUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* ---------- single Astrologer ---------- */
      .addCase(GetSingleAstro.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetSingleAstro.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.singleAstro = action.payload;
      })
      .addCase(GetSingleAstro.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAstroError } = AstroAuthSlice.actions;
export default AstroAuthSlice.reducer;
