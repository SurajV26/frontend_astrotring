import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import logo from "@/assets/logo.png";
import {
  startSession,
  sendChatMessage,
  closeSession,
  addUserMessageLocally,
  fetchAiAstrologerDetails,
  clearAstrologerDetails,
} from "@/redux/slice/aiChatSlice";
// import { api } from "@/redux/baseApi";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "react-toastify";
import { X } from "lucide-react";

const AIChatBot = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { astrologerSlug, expertiseSlug } = useParams();

  const {
    sessionId,
    sessionQuestions,
    messages,
    isLoading,
    isStartingSession,
    astrologerDetails,
    error,
  } = useSelector((state) => state.aiChat);

  // console.log("astrologerQuestions", astrologerQuestions);

  const [input, setInput] = useState("");
  const [showRechargeModal, setShowRechargeModal] = useState(false);

  // Active expertise tab (slug)
  const [activeExpertiseSlug, setActiveExpertiseSlug] = useState(null);

  const bottomRef = useRef();

  // const location = useLocation();
  // { astrologerName, astrologerSlug, expertises: [{id, name, slug}] }
  // const astrologerData = location.state;

  // Set first expertise as default on mount
  // useEffect(() => {
  //   if (astrologerData?.expertises?.length > 0 && !activeExpertiseSlug) {
  //     setActiveExpertiseSlug(astrologerData.expertises[0].slug);
  //   }
  // }, [astrologerData]);

  // Fetch questions whenever active expertise changes
  // useEffect(() => {
  //   if (astrologerData?.astrologerSlug && activeExpertiseSlug) {
  //     dispatch(
  //       fetchAstrologerQuestions({
  //         astrologerSlug: astrologerData.astrologerSlug,
  //         expertiseSlug: activeExpertiseSlug,
  //       }),
  //     );
  //   }
  //   return () => {
  //     dispatch(clearAstrologerQuestions());
  //   };
  // }, [dispatch, astrologerData?.astrologerSlug, activeExpertiseSlug]);

  useEffect(() => {
    if (astrologerSlug) {
      dispatch(fetchAiAstrologerDetails(astrologerSlug));
    }
    return () => {
      dispatch(clearAstrologerDetails());
    };
  }, [astrologerSlug, dispatch]);

  useEffect(() => {
    if (expertiseSlug && astrologerSlug) {
      dispatch(
        startSession({
          astrologerSlug: astrologerSlug,
          expertiseSlug: expertiseSlug,
        }),
      );
    }
  }, [dispatch, expertiseSlug, astrologerSlug]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Helper: ensure session exists
  // const ensureSession = async () => {
  //   if (sessionId) return sessionId;
  //   setIsStartingSession(true);
  //   try {
  //     const topicName = astrologerData?.astrologerName
  //       ? `Chat with ${astrologerData.astrologerName}`
  //       : "AI Astrologer";
  //     const response = await api.post("/user/ai-chat/start-session", {
  //       topic: topicName,
  //     });
  //     const id = response.data?.session_id || response.data?.data?.id;
  //     if (!id) throw new Error("No session ID returned");
  //     setSessionId(id);
  //     return id;
  //   } catch (err) {
  //     toast.error("Failed to start session");
  //     return null;
  //   } finally {
  //     setIsStartingSession(false);
  //   }
  // };

  // Handle Question chip click
  // const handleQuestionClick = async (question) => {
  //   const currentSessionId = await ensureSession();
  //   if (!currentSessionId) return;

  //   setMessages((prev) => [...prev, { sender: "user", message: question }]);
  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     const response = await api.post("/user/ai-chat/send-message", {
  //       session_id: currentSessionId,
  //       message: question,
  //     });
  //     const reply =
  //       response.data?.reply ||
  //       response.data?.message ||
  //       "Sorry, I couldn't reply.";
  //     setMessages((prev) => [...prev, { sender: "assistant", message: reply }]);
  //     setShowRechargeModal(false);
  //   } catch (err) {
  //     const errData = err.response?.data;
  //     if (
  //       errData?.type === "wallet_error" ||
  //       errData?.type === "free_limit_exceeded"
  //     ) {
  //       setShowRechargeModal(true);
  //     } else {
  //       toast.error(errData?.message || "Failed to send message");
  //     }
  //     setMessages((prev) => [
  //       ...prev,
  //       { sender: "assistant", message: "Sorry, something went wrong." },
  //     ]);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleQuestionClick = async (question) => {
    if (!sessionId) {
      toast.error("No active session. Please wait.");
      return;
    }
    dispatch(addUserMessageLocally(question));
    try {
      await dispatch(
        sendChatMessage({ sessionId, message: question }),
      ).unwrap();
      setShowRechargeModal(false);
    } catch (err) {
      const errData = err;
      if (
        errData?.type === "wallet_error" ||
        errData?.type === "free_limit_exceeded"
      ) {
        setShowRechargeModal(true);
      } else {
        toast.error(errData?.message || "Failed to send message");
      }
    }
  };

  // Send typed message
  // const handleSendMessage = async () => {
  //   const message = input.trim();
  //   if (!message || !sessionId) return;

  //   setMessages((prev) => [...prev, { sender: "user", message }]);
  //   setInput("");
  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     const response = await api.post("/user/ai-chat/send-message", {
  //       session_id: sessionId,
  //       message,
  //     });
  //     const reply =
  //       response.data?.reply ||
  //       response.data?.message ||
  //       "Sorry, I couldn't reply.";
  //     setMessages((prev) => [...prev, { sender: "assistant", message: reply }]);
  //     setShowRechargeModal(false);
  //   } catch (err) {
  //     const errData = err.response?.data;
  //     if (
  //       errData?.type === "wallet_error" ||
  //       errData?.type === "free_limit_exceeded"
  //     ) {
  //       setShowRechargeModal(true);
  //     } else {
  //       toast.error(errData?.message || "Failed to send message");
  //     }
  //     setMessages((prev) => [
  //       ...prev,
  //       { sender: "assistant", message: "Sorry, something went wrong." },
  //     ]);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSendMessage = async () => {
    const message = input.trim();
    if (!message || !sessionId) return;
    dispatch(addUserMessageLocally(message));
    setInput("");
    try {
      await dispatch(sendChatMessage({ sessionId, message })).unwrap();
      setShowRechargeModal(false);
    } catch (err) {
      const errData = err;
      if (
        errData?.type === "wallet_error" ||
        errData?.type === "free_limit_exceeded"
      ) {
        setShowRechargeModal(true);
      } else {
        toast.error(errData?.message || "Failed to send message");
      }
    }
  };

  // Close session
  const handleManualCloseSession = async () => {
    if (sessionId) {
      try {
        await dispatch(closeSession(sessionId)).unwrap();
      } catch (err) {
        console.error("Close session error:", err);
      }
    }
  };

  // console.log(sessionQuestions);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex w-full h-screen">
        {/* Left Advertisement */}
        <div className="hidden lg:flex lg:flex-col flex-1 items-center justify-center gap-4">
          <a
            href="https://astrotring.shop/product/metal-dhan-yog-bracelet-with-free-raw-selenite-plate"
            target="_blank"
            rel="noopener noreferrer"
            className="relative block w-[50%] h-full overflow-hidden shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow"
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
            className="relative block w-[50%] h-full overflow-hidden shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow"
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
        <div className="flex-1 flex flex-col sm:min-w-4xl mx-auto w-full shadow-2xl overflow-hidden bg-white">
          {/* Header */}
          <div className="flex justify-between border-2 border-gray-300 p-2 flex-shrink-0 bg-amber-400">
            <Link to="/">
              <img src={logo} alt="logo" className="h-10" />
            </Link>

            {/* Astrologer name if available */}
            {astrologerDetails?.name && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">
                  Chatting with {astrologerDetails.name}
                </span>
              </div>
            )}

            {sessionId && (
              <div className="flex justify-end">
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
            {/* Question chips */}
            <div className="grid grid-cols-2  gap-2 px-4 sm:px-10">
              {isStartingSession ? (
                <span className="text-xs text-gray-400 col-span-full text-center">
                  Loading questions...
                </span>
              ) : sessionQuestions?.length > 0 ? (
                sessionQuestions?.map((q, idx) => (
                  <button
                    key={q.id ?? idx}
                    onClick={() =>
                      handleQuestionClick(q.question ?? q.name ?? q)
                    }
                    className="py-2 px-3 rounded-lg text-sm font-medium cursor-pointer transition bg-amber-200 text-black hover:bg-amber-500 hover:text-white text-left"
                  >
                    {q.question}
                  </button>
                ))
              ) : (
                <span className="text-xs text-gray-400 col-span-full text-center">
                  {astrologerDetails
                    ? "No questions available for this expertise."
                    : "Select a Astrologer."}
                </span>
              )}
            </div>

            {/* Messages area */}
            <div className="flex-1 p-4 space-y-3">
              {!sessionId && messages.length === 0 && (
                <div className="text-center text-gray-400 mt-20">
                  {astrologerDetails
                    ? `Click a question above to start chatting with ${astrologerDetails.name}.`
                    : "Select a question above to start chatting."}
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
              className="w-full h-full object-fill"
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
              className="w-full h-full object-fill"
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
