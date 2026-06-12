import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import {
  fetchTopics,
  addUserMessageLocally,
  closeSession,
  sendChatMessage,
  startSession,
  fetchChatHistory,
} from "@/redux/slice/aiChatSlice";

const AIChatBot = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedTopic, topics, isFetchingTopics, sessionId, messages, isLoading, error } = useSelector(
    (state) => state.aiChat
  );

  const [input, setInput] = useState("");
  const bottomRef = useRef();

  // Fetch topics on mount
  useEffect(() => {
    dispatch(fetchTopics());
  }, [dispatch]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle topic switch (called when user clicks a topic button)
  const handleTopicSwitch = async (newTopic) => {
    if (newTopic === selectedTopic) return;
    const result = await dispatch(startSession(newTopic));
    if (startSession.fulfilled.match(result)) {
      await dispatch(fetchChatHistory({ sessionId: result.payload, topic: newTopic }));
    }
  };

  // Send message
  const handleSendMessage = async () => {
    const message = input.trim();
    if (!message || !sessionId) return;
    dispatch(addUserMessageLocally(message));
    setInput("");
    await dispatch(sendChatMessage({ sessionId, message }));
  };

  // Manual close session
  const handleManualCloseSession = async () => {
    if (sessionId) {
      await dispatch(closeSession(sessionId));
      // Optionally reset selectedTopic in UI? Not needed, topics will still show but no active session.
      // You may want to set selectedTopic to null in slice – but that's handled in closeSession.fulfilled.
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-repeat bg-[url('/chatbg.png')]">
      <Header />
      <div className="flex-1 flex flex-col mt-6 shadow-2xl mb-4 mx-auto w-2xl rounded-t-2xl overflow-hidden bg-white">
        <div className="text-center border-2 border-gray-300 rounded-t-2xl py-4 flex-shrink-0">
          <img src="/lowerLogo.png" alt="logo" className="h-8 mx-auto" />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Topic selector chips */}
          <div className="border-b border-gray-200 bg-white px-4 py-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {isFetchingTopics ? (
              <span className="text-xs text-gray-400">Loading topics...</span>
            ) : (
              topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => handleTopicSwitch(topic.name)}
                  className={`inline-block px-3 py-1 mx-1 rounded-full text-sm cursor-pointer ${
                    selectedTopic === topic.name
                      ? "bg-amber-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {topic.name}
                </button>
              ))
            )}
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {!selectedTopic && messages.length === 0 && (
              <div className="text-center text-gray-400 mt-20">
                Select a topic above to start chatting.
              </div>
            )}
            {selectedTopic && messages.length === 0 && (
              <div className="text-center text-gray-400 mt-20">
                Start chatting about {selectedTopic}
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`inline-block px-4 py-2 rounded-lg max-w-[80%] text-sm ${
                    msg.sender === "user"
                      ? "bg-amber-500 text-white"
                      : "bg-white border border-gray-300 text-gray-800"
                  }`}
                >
                  {msg.message}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <span className="inline-block px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-500 text-sm">
                  Typing...
                </span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
            {sessionId && (
              <div className="flex justify-end mb-2">
                <button
                  onClick={handleManualCloseSession}
                  className="px-4 py-2 rounded-full text-xs font-medium bg-red-100 text-red-600 hover:bg-red-200"
                >
                  ❌ Close Session
                </button>
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your question..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-sm"
                disabled={!sessionId || isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!sessionId || isLoading}
                className="bg-amber-600 text-white px-5 py-2 rounded-lg hover:bg-amber-700 disabled:opacity-50 transition text-sm"
              >
                Send
              </button>
            </div>
            {error && <p className="text-xs text-center text-red-500 mt-1">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatBot;