import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../baseApi";

export const submitAiAstrologerReview = createAsyncThunk(
  "aiAstrologerReview/submit",
  async ({ astrologer_id, review, rating }, { getState, rejectWithValue }) => {
    const { token, isLoggedIn } = getState().userAuth;

    if (!isLoggedIn || !token) {
      return rejectWithValue("Please log in to submit a review.");
    }

    try {
      const res = await api.post(
        "/user/astrologer/review",
        { astrologer_id, rating, review },
        { headers: { "Content-Type": "application/json" } },
      );
      if (res.data?.status === false) {
        return rejectWithValue(res.data.message || "Review submission failed");
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Review submission failed",
      );
    }
  },
);

export const fetchAllAiAstrologerReviews = createAsyncThunk(
  "aiAstrologerReview/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/astrologer/reviews");
      if (res.data?.status === false) {
        return rejectWithValue(res.data.message || "Failed to load reviews");
      }
      // Keep the review list; the homepage does not need pagination metadata.
      return res.data?.data?.reviews?.data ?? [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load reviews");
    }
  },
);

export const fetchAiAstrologerReviewsById = createAsyncThunk(
  "aiAstrologerReview/fetchById",
  async (astrologerId, { rejectWithValue }) => {
    if (!Number.isInteger(Number(astrologerId)) || Number(astrologerId) <= 0) {
      return rejectWithValue("A valid astrologer ID is required.");
    }

    try {
      const res = await api.get("/astrologer/reviews", {
        params: { astrologer_id: astrologerId },
      });
      if (res.data?.status === false) {
        return rejectWithValue(res.data.message || "Failed to load astrologer reviews");
      }
      return {
        reviews: res.data?.data?.reviews?.data ?? [],
        rating: res.data?.data?.rating ?? null,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load astrologer reviews");
    }
  },
);

const initialState = {
  loading: false,
  error: null,
  allReviews: null,
  allReviewsLoading: false,
  allReviewsError: null,
  astrologerReviews: null,
  astrologerRating: null,
  astrologerReviewsId: null,
  astrologerReviewsLoading: false,
  astrologerReviewsError: null,
  astrologerReviewsRequestId: null,
};

const aiAstrologerReviewSlice = createSlice({
  name: "aiAstrologerReview",
  initialState,
  reducers: {
    clearReviewError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitAiAstrologerReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitAiAstrologerReview.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitAiAstrologerReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllAiAstrologerReviews.pending, (state) => {
        state.allReviewsLoading = true;
        state.allReviewsError = null;
      })
      .addCase(fetchAllAiAstrologerReviews.fulfilled, (state, action) => {
        state.allReviewsLoading = false;
        state.allReviews = action.payload;
      })
      .addCase(fetchAllAiAstrologerReviews.rejected, (state, action) => {
        state.allReviewsLoading = false;
        state.allReviewsError = action.payload || action.error.message;
      })
      .addCase(fetchAiAstrologerReviewsById.pending, (state, action) => {
        state.astrologerReviewsId = action.meta.arg;
        state.astrologerReviewsLoading = true;
        state.astrologerReviewsError = null;
        state.astrologerReviews = null;
        state.astrologerRating = null;
        state.astrologerReviewsRequestId = action.meta.requestId;
      })
      .addCase(fetchAiAstrologerReviewsById.fulfilled, (state, action) => {
        // Ignore an older response after switching astrologers.
        if (state.astrologerReviewsRequestId !== action.meta.requestId) return;
        state.astrologerReviewsLoading = false;
        state.astrologerReviews = action.payload?.reviews ?? [];
        state.astrologerRating = action.payload?.rating ?? null;
        state.astrologerReviewsRequestId = null;
      })
      .addCase(fetchAiAstrologerReviewsById.rejected, (state, action) => {
        if (state.astrologerReviewsRequestId !== action.meta.requestId) return;
        state.astrologerReviewsLoading = false;
        state.astrologerReviewsError = action.payload || action.error.message;
        state.astrologerReviewsRequestId = null;
      });
  },
});

export const { clearReviewError } = aiAstrologerReviewSlice.actions;
export default aiAstrologerReviewSlice.reducer;

