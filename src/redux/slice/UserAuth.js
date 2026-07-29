import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../baseApi";
import { success } from "zod";

export const userLogin = createAsyncThunk(
  "user/login",
  async (data, thunkApi) => {
    try {
      const res = await api.post("/user/login", data);
      console.log("checking user login data", res.data.user);
      if (res?.data?.user?.role_id === 2) {
        return thunkApi.rejectWithValue("Astrologer cannot login from here");
      } else {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role_id", res?.data?.user?.role_id);

        // localStorage.setItem("token", res.data.token);
        return res.data.token;
      }
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Login failed",
      );
    }
  },
);

export const userRegister = createAsyncThunk(
  "user/register",
  async (data, thunkApi) => {
    try {
      const res = await api.post("/user/register", data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);
export const userUpdate = createAsyncThunk(
  "user/updateuser",
  async (data, thunkApi) => {
    try {
      const res = await api.post("/user/update", data);
      //   console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);
export const userLogout = createAsyncThunk(
  "user/logout",
  async (data, thunkApi) => {
    try {
      const res = await api.post("/user/logout", data);
      //   console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);
export const userProfile = createAsyncThunk(
  "user/profile",
  async (data, thunkApi) => {
    try {
      const res = await api.get("/user/profile");
      return res.data.user;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);

// ========== FORGOT PASSWORD FLOW FOR USER ==========
export const userForgotPasswordRequest = createAsyncThunk(
  "user/forgotPasswordRequest",
  async ({ email, type }, thunkApi) => {
    try {
      const res = await api.post(`/user/forgot-password`, { email, type });
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to send OTP",
      );
    }
  },
);

export const userVerifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async ({ email, otp, type }, thunkApi) => {
    try {
      const res = await api.post(`/user/verify-otp`, { email, otp, type });
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "OTP verification failed",
      );
    }
  },
);

export const userResetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ email, password, password_confirmation, type }, thunkApi) => {
    try {
      const res = await api.post(`/user/reset-password`, {
        email,
        password,
        password_confirmation,
        type,
      });
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Password reset failed",
      );
    }
  },
);

// ========== OTP LOGIN ==========
export const userSendLoginOtp = createAsyncThunk(
  "user/sendLoginOtp",
  async (mobile, { rejectWithValue }) => {
    try {
      const res = await api.post("/user/login", { mobile });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send OTP",
      );
    }
  },
);

export const userVerifyLoginOtp = createAsyncThunk(
  "user/verifyLoginOtp",
  async ({ mobile, otp }, { rejectWithValue }) => {
    try {
      const res = await api.post("/user/verify-login-otp", { mobile, otp });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role_id", res.data.user?.role_id);
      return res.data.token;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "OTP verification failed",
      );
    }
  },
);

export const userResendLoginOtp = createAsyncThunk(
  "user/resendLoginOtp",
  async (mobile, { rejectWithValue }) => {
    try {
      const res = await api.post("/user/resend-otp", { mobile });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to resend OTP",
      );
    }
  },
);

const tokenFromStorage = localStorage.getItem("token");
// console.log("tokenFromStorage",tokenFromStorage)

const initialState = {
  user: null,
  token: tokenFromStorage,
  loading: false,
  isLoggedIn: !!tokenFromStorage,
  error: null,
};
const UserAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role_id");
    },
  },

  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isLoggedIn = false;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
      })

      // REGISTER
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // PROFILE

      .addCase(userProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // logout user
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.token = null;
        state.user = null;
        state.isLoggedIn = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      //   update user
      .addCase(userUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(userUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      // ----- OTP LOGIN -----
      .addCase(userSendLoginOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSendLoginOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(userSendLoginOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(userVerifyLoginOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isLoggedIn = false;
      })
      .addCase(userVerifyLoginOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(userVerifyLoginOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
      })
      // resend otp for login
      .addCase(userResendLoginOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userResendLoginOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(userResendLoginOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = UserAuthSlice.actions;
export default UserAuthSlice.reducer;
