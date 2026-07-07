import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../baseApi";

// ---------- Thunks ----------

export const fetchAllAiAstrologers = createAsyncThunk(
  "aiChat/fetchAllAiAstrologers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/ai-astrologers");
      console.log("allAiAstrologers", response);
      const allAiAstrologers = response.data?.data ?? [];
      return allAiAstrologers;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load AI astrologers",
      );
    }
  },
);

export const fetchAiAstrologerDetails = createAsyncThunk(
  "aiChat/fetchAiAstrologerDetails",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await api.get(`/ai-astrologers/${slug}`);
      console.log("aiAstrologerDetails", response);
      const astrologerDetails = response.data?.data ?? null;
      return astrologerDetails;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load AI astrologer details",
      );
    }
  },
);

// New API: /api/ai-astrologers/{astrologer_slug}/expertises/{expertise_slug}/questions
export const fetchAstrologerQuestions = createAsyncThunk(
  "aiChat/fetchAstrologerQuestions",
  async ({ astrologerSlug, expertiseSlug }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/ai-astrologer-expertise/${expertiseSlug}/questions`,
      );
      const questions = response.data?.data ?? [];
      console.log("astrologerQuestions", questions);
      return questions;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load astrologer questions",
      );
    }
  },
);

export const startSession = createAsyncThunk(
  "aiChat/startSession",
  async ({ astrologerSlug, expertiseSlug }, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/ai-chat/start-session", {
        astrologer_slug: astrologerSlug,
        expertise_slug: expertiseSlug,
      });
      //  console.log("FULL SESSION RESPONSE:", response.data);
      const sessionId = response.data?.session_id || response.data?.data?.id;
      const questions =
         response.data?.data?.questions || response.data?.questions || [];

       
      if (!sessionId) throw new Error("No session ID returned");
      //  console.log("SESSION ID:", sessionId);
      // console.log("QUESTIONS:", questions);
      return { sessionId, questions };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const sendChatMessage = createAsyncThunk(
  "aiChat/sendMessage",
  async ({ sessionId, message }, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/ai-chat/send-message", {
        session_id: sessionId,
        message,
      });
      const reply =
        response.data?.reply ||
        response.data?.message ||
        "Sorry, I couldn't reply.";
      return { reply };
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const closeSession = createAsyncThunk(
  "aiChat/closeSession",
  async (sessionId, { rejectWithValue }) => {
    try {
      await api.post(`/user/ai-chat/close-session/${sessionId}`);
      return sessionId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to close session",
      );
    }
  },
);
// ---------- Initial State ----------
const initialState = {
  allAiAstrologers: null,
  isFetchingAllAiAstrologers: false,

  astrologerDetails: null,
  isFetchingAstrologerDetails: false,

  // Questions for a specific astrologer + expertise
  astrologerQuestions: [],
  isFetchingAstrologerQuestions: false,

  sessionId: null,
  messages: [],
  isLoading: false,
  isStartingSession: false,
  sessionQuestions: [],

  error: null,
};

// ---------- Slice ----------
const aiChatSlice = createSlice({
  name: "aiChat",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAstrologerDetails: (state) => {
      state.astrologerDetails = null;
    },
    clearAstrologerQuestions: (state) => {
      state.astrologerQuestions = [];
    },
     addUserMessageLocally: (state, action) => {
    state.messages.push({ sender: "user", message: action.payload });
  },
  },
  extraReducers: (builder) => {
    builder
      // ----- all ai astrologers -----
      .addCase(fetchAllAiAstrologers.pending, (state) => {
        state.isFetchingAllAiAstrologers = true;
        state.error = null;
      })
      .addCase(fetchAllAiAstrologers.fulfilled, (state, action) => {
        state.isFetchingAllAiAstrologers = false;
        state.allAiAstrologers = action.payload;
      })
      .addCase(fetchAllAiAstrologers.rejected, (state, action) => {
        state.isFetchingAllAiAstrologers = false;
        state.error = action.payload;
      })
      // ----- astrologer details -----
      .addCase(fetchAiAstrologerDetails.pending, (state) => {
        state.isFetchingAstrologerDetails = true;
        state.error = null;
      })
      .addCase(fetchAiAstrologerDetails.fulfilled, (state, action) => {
        state.isFetchingAstrologerDetails = false;
        state.astrologerDetails = action.payload;
      })
      .addCase(fetchAiAstrologerDetails.rejected, (state, action) => {
        state.isFetchingAstrologerDetails = false;
        state.error = action.payload;
      })
      // ----- astrologer questions -----
      .addCase(fetchAstrologerQuestions.pending, (state) => {
        state.isFetchingAstrologerQuestions = true;
        state.error = null;
      })
      .addCase(fetchAstrologerQuestions.fulfilled, (state, action) => {
        state.isFetchingAstrologerQuestions = false;
        state.astrologerQuestions = action.payload;
      })
      .addCase(fetchAstrologerQuestions.rejected, (state, action) => {
        state.isFetchingAstrologerQuestions = false;
        state.astrologerQuestions = [];
        state.error = action.payload;
      })

      // start session
      .addCase(startSession.pending, (state) => {
        state.isStartingSession = true;
        state.error = null;
        state.messages = []; // clear old messages
        state.sessionQuestions = []; // clear old questions
      })
      .addCase(startSession.fulfilled, (state, action) => {
        state.isStartingSession = false;
        state.sessionId = action.payload.sessionId;
        state.sessionQuestions = action.payload.questions; // store questions
      })
      .addCase(startSession.rejected, (state, action) => {
        state.isStartingSession = false;
        state.error = action.payload;
        state.sessionId = null;
        state.sessionQuestions = [];
      })
      .addCase(sendChatMessage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // send message
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages.push({
          sender: "assistant",
          message: action.payload.reply,
        });
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to send message";
        state.messages.push({
          sender: "assistant",
          message: "Sorry, something went wrong. Please try again.",
        });
      })
      // close sessiom
      .addCase(closeSession.fulfilled, (state) => {
        state.sessionId = null;
        state.messages = [];
        state.sessionQuestions = [];
      })
      .addCase(closeSession.rejected, (state, action) => {
        console.error("Close session error:", action.payload);
      });
  },
});

export const { clearError, clearAstrologerDetails, clearAstrologerQuestions,addUserMessageLocally } =
  aiChatSlice.actions;
export default aiChatSlice.reducer;
