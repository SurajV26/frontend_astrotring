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
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "react-toastify";
import { X } from "lucide-react";

const AIChatBot = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    selectedTopic,
    topics,
    isFetchingTopics,
    sessionId,
    messages,
    isLoading,
    error,
    // errorType,
  } = useSelector((state) => state.aiChat);

  const [input, setInput] = useState("");

  const [showRechargeModal, setShowRechargeModal] = useState(false);
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
      await dispatch(
        fetchChatHistory({ sessionId: result.payload, topic: newTopic }),
      );
    }
  };

  // Send message
  // const handleSendMessage = async () => {
  //   const message = input.trim();
  //   if (!message || !sessionId) return;
  //   dispatch(addUserMessageLocally(message));
  //   setInput("");
  //   await dispatch(sendChatMessage({ sessionId, message }));
  // };
const handleSendMessage = async () => {
  const message = input.trim();
  if (!message || !sessionId) return;

  dispatch(addUserMessageLocally(message));
  setInput("");

  try {
    await dispatch(sendChatMessage({ sessionId, message })).unwrap();
    // Success – clear recharge modal if open
    setShowRechargeModal(false);
  } catch (err) {
    console.log("Send error:", err);
    // Both wallet and free-limit errors → show recharge modal
    if (err.type === "wallet_error" || err.type === "free_limit_exceeded") {
      setShowRechargeModal(true);
    } else {
      toast.error(err.message || "Failed to send message");
    }
  }
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
      <div className="flex-1 flex flex-col sm:mt-4 shadow-2xl mb-2 mx-auto w-full sm:w-4xl sm:rounded-t-xl overflow-hidden bg-white">
        <div className="flex justify-between border-2 border-gray-300 sm:rounded-t-xl p-2 flex-shrink-0 bg-amber-400 ">
          <img src="/upperLogo.jpeg" alt="logo" className="h-10 " />
          {sessionId && (
            <div className="flex justify-end mb-2">
              <button
                onClick={handleManualCloseSession}
                className="p-2 rounded-lg text-xs font-medium bg-red-100 text-red-600 hover:bg-red-200"
              >
                ❌ Close Session
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 mt-2 flex flex-col overflow-y-auto">
          {/* Topic selector chips */}
          <div className=" flex flex-col gap-2 items-center">
            {isFetchingTopics ? (
              <span className="text-xs text-gray-400">Loading topics...</span>
            ) : (
              topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => handleTopicSwitch(topic.name)}
                  className={`block w-[50%] text-center  py-2 rounded-lg text-sm font-medium cursor-pointer ${
                    selectedTopic === topic.name
                      ? "bg-amber-500 text-white"
                      : "bg-amber-200 text-black  hover:bg-amber-500"
                  }`}
                >
                  {topic.name}
                </button>
              ))
            )}
          </div>

          {/* Messages area */}
          <div className="flex-1  p-4 space-y-3">
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
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <span
                  className={`inline-block px-4 py-2 rounded-lg max-w-[80%] text-xs ${
                    msg.sender === "user"
                      ? "bg-amber-400 text-white"
                      : "bg-white border border-gray-300 text-gray-900"
                  }`}
                >
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: ({ href }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          {href}
                        </a>
                      ),
                    }}
                  >
                    {msg.message}
                  </Markdown>
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
         

          {/* Recharge Modal */}
{/* Recharge Modal - Lightweight & Elegant */}
{showRechargeModal && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative animate-in fade-in zoom-in duration-200">
      {/* Close button (X) */}
      <button
        onClick={() => setShowRechargeModal(false)}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>

        <div className="flex flex-col items-center text-center">
        {/* Warning / Alert Icon */}
        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

      

        <h3 className="text-lg font-semibold text-gray-800">Insufficient wallet balance</h3>
        <p className="text-sm text-gray-500 mt-1">Your wallet balance is low. Please recharge to continue.</p>

        <button
          onClick={() => navigate("/dashboard/wallet")}
          className="mt-6 w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2.5 px-4 rounded-xl transition-colors shadow-sm hover:shadow"
        >
          Recharge Now
        </button>
      </div>
    </div>
  </div>
)}
          {/* Input area */}
          <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Type your question..."
                rows={1}
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-sm resize-none"
                disabled={!sessionId || isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!sessionId || isLoading}
                className="bg-amber-500 text-white px-5 py-2 rounded-lg hover:bg-amber-600 disabled:opacity-50 transition text-sm cursor-pointer"
              >
                Send
              </button>
            </div>
            {error && (
              <p className="text-xs text-center text-red-500 mt-1">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatBot;
