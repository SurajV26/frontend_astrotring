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
import { ChevronLeft, X } from "lucide-react";

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
            <div className="flex justify-center items-center gap-2">
              <ChevronLeft
                size={20}
                className="text-gray-700 cursor-pointer"
                onClick={() => navigate(-1)}
              />
              <Link to="/">
                <img src={logo} alt="logo" className="h-10" />
              </Link>
            </div>

            {/* Astrologer name if available */}
            {astrologerDetails?.name && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">
                  Chatting with {astrologerDetails.name}
                </span>
              </div>
            )}

            {sessionId && (
              <div className="flex justify-end ">
                <button
                  onClick={handleManualCloseSession}
                  className="p-2 rounded-lg text-xs font-medium bg-red-100 text-red-600 hover:bg-red-200 hidden"
                >
                  ❌ Close Session
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 mt-2 flex flex-col overflow-y-auto">
            {/* Question chips */}
            <div className="grid grid-cols-1 md:grid-cols-2  gap-2 px-4 sm:px-10">
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
                    className="py-2 rounded-md text-xs text-center font-normal cursor-pointer transition bg-amber-200 text-black hover:bg-amber-500 hover:text-white "
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
                <div className="text-center text-xs text-gray-400 mt-10">
                  Choose a question from above, or type your question below to
                  ask.
                </div>
              )}

              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <span
                    className={`inline-block px-4 rounded-md max-w-[80%] ${
                      msg.sender === "user"
                        ? "bg-amber-400 text-white"
                        : "bg-white border border-gray-100"
                    }`}
                  >
                    <div className="prose prose-xs max-w-none prose-p:my-2 prose-pre:bg-gray-900 prose-code:text-red-500">
                      <Markdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline hover:text-blue-800"
                            >
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {msg.message}
                      </Markdown>
                    </div>
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <span className="inline-block px-4 py-2 bg-white border border-gray-100 rounded-md text-gray-500 text-xs">
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
            <div className="py-4 px-4 sm:px-20 bg-white  border-gray-200 flex-shrink-0">
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
                  className="flex-1 border rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white text-sm resize-none placeholder:text-xs "
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
