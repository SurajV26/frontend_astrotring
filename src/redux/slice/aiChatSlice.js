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

// New API: /api/ai-astrologers/{astrologer_slug}/expertises/{expertise_slug}/questions- not using right now because question is arriving in start session
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
      const sessionId = response.data?.session_id || response.data?.data?.id;
      const chatFreeUsed = response?.data?.chat_free_used || response.data?.data?.chat_free_used;
      if (!sessionId) throw new Error("No session ID returned");
      return { sessionId, chatFreeUsed };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const closeSession = createAsyncThunk(
  "aiChat/closeSession",
  async (sessionId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/user/ai-chat/stop-chat/${sessionId}`);

      console.log("CLOSE SESSION RESPONSE:", response);
      return sessionId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to close session",
      );
    }
  },
);


export const startChat = createAsyncThunk(
  "aiChat/startChat",
  async (sessionId, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/user/ai-chat/start-chat/${sessionId}`,
      );

      console.log("START CHAT RESPONSE:", response.data);

      return response.data;
    } catch (error) {
      console.error("START CHAT ERROR:", error.response?.data);

      return rejectWithValue(
        error.response?.data?.message || "Failed to start chat",
      );
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
      const remainingQuestions = response.data?.remaining_questions || [];
      const chatFreeUsed = response.data?.chat_free_used || response.data?.data?.chat_free_used;
      return { reply, remainingQuestions, chatFreeUsed };
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const fetchChatHistory = createAsyncThunk(
  "aiChat/fetchHistory",
  async (sessionId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/user/ai-chat/history/${sessionId}`);
      console.log("history", response);
      return response.data.data; // मान लें कि data में messages array है
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch history",
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
  followUpQuestions: [],
  chatFreeUsed: false, 

  isHistoryLoading: false,
  chatHistory:{},

  chatBilling: {
  chatActiveSince: null,
  freeMinutes: 0,
  pricePerMinute: 0,
  isChatActive: false,
},

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
        state.messages = []; // clear old messages
      })
      .addCase(startSession.fulfilled, (state, action) => {
        state.isStartingSession = false;
        state.sessionId = action.payload.sessionId;
        state.chatFreeUsed = action.payload.chatFreeUsed;
      })
      .addCase(startSession.rejected, (state, action) => {
        state.isStartingSession = false;
        state.sessionId = null;
      })
      .addCase(sendChatMessage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.followUpQuestions = [];
      })
      // send message
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages.push({
          sender: "assistant",
          message: action.payload.reply,
        });
        // 🔥 नया: Remaining Questions को SessionQuestions में Set करें
        if (
          action.payload.remainingQuestions &&
          action.payload.remainingQuestions.length > 0
        ) {
          state. followUpQuestions  = action.payload.remainingQuestions;
        }
        // Update chatFreeUsed from API response
        if (action.payload.chatFreeUsed !== undefined) {
          state.chatFreeUsed = action.payload.chatFreeUsed;
        }
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to send message";
        state.followUpQuestions = [];
        state.messages.push({
          sender: "assistant",
          message: action.payload?.message || "Sorry, something went wrong. Please try again.",
        });
      })
      // close session
      .addCase(closeSession.fulfilled, (state) => {
        state.sessionId = null;
        state.chatBilling.isChatActive = false;
        // Keep chatActiveSince to persist timer for potential resume
      })
      .addCase(closeSession.rejected, (state, action) => {
        console.error("Close session error:", action.payload);
      })

      // chat history
      .addCase(fetchChatHistory.pending, (state) => {
        state.isHistoryLoading = true;
        state.error = null;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.isHistoryLoading = false;
        // मान लें कि API से मिला data: { messages: [...], sessionId, ... }
        state.messages = action.payload.messages || [];
        state.chatHistory = action.payload || {};

        // यदि API sessionId भी दे तो उसे set करें (optional)
        // state.sessionId = action.payload.sessionId;
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.isHistoryLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      // ----- start chat billing -----
.addCase(startChat.pending, (state) => {
  state.error = null;
})

.addCase(startChat.fulfilled, (state, action) => {
  state.chatBilling.chatActiveSince =
    action.payload.chat_active_since;

  state.chatBilling.freeMinutes =
    action.payload.free_minutes;

  state.chatBilling.pricePerMinute =
    action.payload.price_per_minute;

  state.chatBilling.isChatActive =
    action.payload.status;
})

.addCase(startChat.rejected, (state, action) => {
  state.error =
    action.payload?.message || "Failed to start chat";

  state.chatBilling.isChatActive = false;
})
  },
});

export const {
  clearError,
  clearAstrologerDetails,
  clearAstrologerQuestions,
  addUserMessageLocally,
} = aiChatSlice.actions;
export default aiChatSlice.reducer;
