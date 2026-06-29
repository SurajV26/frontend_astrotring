import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import {
  fetchTopics,
  addUserMessageLocally,
  closeSession,
  sendChatMessage,
  startSession,
  fetchChatHistory,
  fetchExpertiseQuestions,
} from "@/redux/slice/aiChatSlice";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import Loader from "../common/Loader";

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
  } = useSelector((state) => state.aiChat);

  const [input, setInput] = useState("");
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const bottomRef = useRef();

  const location = useLocation();
  const astrologerData = location.state; // { astrologerName, expertise }

  // Fetch topics on mount
  useEffect(() => {
    if (astrologerData?.expertise) {
      dispatch(fetchExpertiseQuestions({
        astrologerName: astrologerData.astrologerName,
        expertise: astrologerData.expertise,
      }));
    } else {
      dispatch(fetchTopics());
    }
  }, [dispatch, astrologerData]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle Question click
  const handleQuestionClick = async (question) => {
    let currentSessionId = sessionId;
    // If no session exists, start a new one
    if (!currentSessionId) {
      const topicName = astrologerData?.astrologerName ? `Chat with ${astrologerData.astrologerName}` : "AI Astrologer";
      const result = await dispatch(startSession(topicName));
      if (startSession.fulfilled.match(result)) {
        currentSessionId = result.payload;
      } else {
        return;
      }
    }

    // Immediately send the clicked question as a message
    dispatch(addUserMessageLocally(question));
    try {
      await dispatch(sendChatMessage({ sessionId: currentSessionId, message: question })).unwrap();
      setShowRechargeModal(false);
    } catch (err) {
      console.log("Send error:", err);
      if (err.type === "wallet_error" || err.type === "free_limit_exceeded") {
        setShowRechargeModal(true);
      } else {
        toast.error(err.message || "Failed to send message");
      }
    }
  };

  // Send message
  const handleSendMessage = async () => {
    const message = input.trim();
    if (!message || !sessionId) return;

    dispatch(addUserMessageLocally(message));
    setInput("");

    try {
      await dispatch(sendChatMessage({ sessionId, message })).unwrap();
      setShowRechargeModal(false);
    } catch (err) {
      console.log("Send error:", err);
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
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden ">
      <div className="flex w-full h-screen">
        {/* Left Advertisement */}
        <div className="hidden lg:flex lg:flex-col flex-1 items-center justify-center gap-4">
          <a
            href="https://astrotring.shop/product/metal-dhan-yog-bracelet-with-free-raw-selenite-plate"
            target="_blank"
            rel="noopener noreferrer"
            className="relative block w-[50%] h-full  overflow-hidden shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow"
          >
            <img
              src="/ad1.jpeg"
              alt="Advertisement"
              className="w-full h-full object-fill"
            />
            <span className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full">
              Ad
            </span>
          </a>
          <a
            href="https://astrotring.shop/product/couple-pyrite-combos-pyrite-bracelets-with-pyrite-anklet"
            target="_blank"
            rel="noopener noreferrer"
            className="relative block w-[50%] h-full  overflow-hidden shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow"
          >
            <img
              src="/ad4.jpeg"
              alt="Advertisement"
              className="w-full h-full object-fill"
            />
            <span className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full">
              Ad
            </span>
          </a>
        </div>

        {/* Chat Box Container */}

        <div className="flex-1 flex flex-col sm:min-w-4xl mx-auto w-full  shadow-2xl  overflow-hidden bg-white">
          {/* Internal Header */}
          <div className="flex justify-between border-2 border-gray-300  p-2 flex-shrink-0 bg-amber-400">
            <Link to="/">
              <img src={logo} alt="logo" className="h-10" />
            </Link>
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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 px-4 sm:px-10">
              {isFetchingTopics ? (
                <span className="text-xs text-gray-400 col-span-full text-center">
                  Loading topics...
                </span>
              ) : (
                topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => handleQuestionClick(topic.name)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium cursor-pointer transition bg-amber-200 text-black hover:bg-amber-500 hover:text-white`}
                  >
                    {topic.name}
                  </button>
                ))
              )}
            </div>

            {/* Messages area */}
            <div className="flex-1 p-4 space-y-3">
              {!sessionId && messages.length === 0 && (
                <div className="text-center text-gray-400 mt-20">
                  {astrologerData ? `Click a question above to start chatting with ${astrologerData.astrologerName}.` : "Select a topic above to start chatting."}
                </div>
              )}
              {sessionId && messages.length === 0 && (
                <div className="text-center text-gray-400 mt-20">
                  Start chatting
                </div>
              )}
             
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
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
            {showRechargeModal && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative animate-in fade-in zoom-in duration-200">
                  <button
                    onClick={() => setShowRechargeModal(false)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="flex flex-col items-center text-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Insufficient wallet balance
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Your wallet balance is low. Please recharge to continue.
                    </p>
                    <button
                      onClick={() => navigate("/dashboard/wallet")}
                      className="mt-6 w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2.5 px-4 rounded-xl transition-colors shadow-sm hover:shadow cursor-pointer"
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

        {/* Right Advertisement */}
        <div className="hidden lg:flex lg:flex-col flex-1 items-center justify-center gap-4">
          <a
            href="https://astrotring.shop/product/money-magnet-bracelet"
            target="_blank"
            rel="noopener noreferrer"
            className="relative block w-[50%] h-full overflow-hidden shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow"
          >
            <img
              src="/ad2.jpeg"
              alt="Advertisement"
              className="w-full h-full object-fill "
            />
            <span className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full">
              Ad
            </span>
          </a>
          <a
            href="https://astrotring.shop/product/pyrite-bracelet"
            target="_blank"
            rel="noopener noreferrer"
            className="relative block w-[50%] h-full overflow-hidden shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow"
          >
            <img
              src="/ad3.jpeg"
              alt="Advertisement"
              className="w-full h-full object-fill "
            />
            <span className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full">
              Ad
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AIChatBot;
