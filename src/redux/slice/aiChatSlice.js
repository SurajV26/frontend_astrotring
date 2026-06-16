import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../baseApi";

// ---------- Thunks ----------

export const fetchTopics = createAsyncThunk(
  "aiChat/fetchTopics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/ai-chat/topics");

      console.log("fetchTopicsai", response);
      const topics = response.data?.data ?? [];
      return topics;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load topics",
      );
    }
  },
);

export const startSession = createAsyncThunk(
  "aiChat/startSession",
  async (topic, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/ai-chat/start-session", { topic });

      console.log("startSessionai", response);
      const sessionId = response.data?.session_id || response.data?.data?.id;
      if (!sessionId) throw new Error("No session ID returned");
      return sessionId;
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

      console.log("sendChatMessageai",response)
      const reply =
        response.data?.reply ||
        response.data?.message ||
        "Sorry, I couldn't reply.";
      return { reply };
    } catch (error) {
      return rejectWithValue(
        error.response?.data,
      );
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

export const fetchChatHistory = createAsyncThunk(
  "aiChat/fetchHistory",
  async ({ sessionId, topic }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/user/ai-chat/history/${sessionId}`);

      console.log("historyai", response);
      let history =
        response.data?.data?.messages || response.data?.messages || [];
      // Ensure history is an array
      if (!Array.isArray(history)) history = [];
      return { sessionId, messages: history, topic };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load history",
      );
    }
  },
);

// ---------- Initial State ----------
const initialState = {
  topics: [],
  selectedTopic: null,
  sessionId: null,
  messages: [], // always an array
  isLoading: false, // for send message
  isStartingSession: false,
  isFetchingTopics: false,
  error: null,
  isLoadingHistory: false,
};

// ---------- Slice ----------
const aiChatSlice = createSlice({
  name: "aiChat",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.messages = [];
    },
    clearError: (state) => {
      state.error = null;
    },
    resetChat: (state) => {
      state.selectedTopic = null;
      state.sessionId = null;
      state.messages = [];
      state.error = null;
    },
    addUserMessageLocally: (state, action) => {
      state.messages.push({ sender: "user", message: action.payload });
    },
  },
  extraReducers: (builder) => {
    builder
      // ----- Fetch Topics -----
      .addCase(fetchTopics.pending, (state) => {
        state.isFetchingTopics = true;
        state.error = null;
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.isFetchingTopics = false;
        state.topics = action.payload;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.isFetchingTopics = false;
        state.error = action.payload;
      })

      // ----- Start Session -----
      .addCase(startSession.pending, (state) => {
        state.isStartingSession = true;
        state.error = null;
      })
      .addCase(startSession.fulfilled, (state, action) => {
        state.isStartingSession = false;
        state.sessionId = action.payload;
        state.selectedTopic = action.meta.arg;
        // Do NOT clear messages – history will overwrite
      })
      .addCase(startSession.rejected, (state, action) => {
        state.isStartingSession = false;
        state.error = action.payload;
      })

      // ----- Send Message -----
      .addCase(sendChatMessage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages.push({
          sender: "assistant",
          message: action.payload.reply,
        });
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message;
        state.messages.push({
          sender: "assistant",
          message: "Sorry, something went wrong. Please try again.",
        });
      })

      // ----- Close Session -----
      .addCase(closeSession.fulfilled, (state) => {
        state.sessionId = null;
        state.selectedTopic = null;
        // Keep messages? Usually we don't clear on close, but user may want to see history.
        // If you want to clear, uncomment below:
        // state.messages = [];
      })
      .addCase(closeSession.rejected, (state, action) => {
        console.error("Close session error:", action.payload);
      })

      // ----- Fetch Chat History -----
      .addCase(fetchChatHistory.pending, (state) => {
        state.isLoadingHistory = true;
        state.error = null;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.isLoadingHistory = false;
        state.sessionId = action.payload.sessionId;
        state.messages = action.payload.messages; // already an array
        state.selectedTopic = action.payload.topic;
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.isLoadingHistory = false;
        state.error = action.payload;
        
        state.messages = []; // fallback to empty array
      });
  },
});

export const { clearMessages, clearError, resetChat, addUserMessageLocally } =
  aiChatSlice.actions;
export default aiChatSlice.reducer;
