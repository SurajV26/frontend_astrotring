import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import logo from "@/assets/logo.png";
import {
  startSession,
  sendChatMessage,
  closeSession,
  addUserMessageLocally,
  fetchChatHistory,
  fetchAiAstrologerDetails,
} from "@/redux/slice/aiChatSlice";
// import { api } from "@/redux/baseApi";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "react-toastify";
import { ChevronLeft, Wallet, X } from "lucide-react";
import { fetchWalletDetails } from "@/redux/slice/walletSlice";
import { openRechargeModal } from "@/redux/slice/uiSlice";

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
    followUpQuestions,

    error,
  } = useSelector((state) => state.aiChat);
  const { details: walletDetails } = useSelector((state) => state.wallet);
  const walletBalance = walletDetails?.balance || 0;

  console.log("astrologer details", astrologerDetails);
  console.log("chat messages", messages);
  console.log("followUpQuestions", followUpQuestions);

  const [input, setInput] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showRechargeModal, setShowRechargeModal] = useState(false);

  const bottomRef = useRef();

  // AIChatBot.jsx के अंदर, सभी useState के नीचे यह function डालें
  const formatMarkdownText = (text) => {
    if (!text) return text;

    let formatted = text
      // 1. Numbered List (1., 2., 3.) से पहले newline डालें
      .replace(/(\d+\.\s+)/g, "\n$1")
      // 2. Bullet List (*, -) से पहले newline डालें (अगर भविष्य में आए)
      .replace(/(\*\s+)/g, "\n$1")
      // 3. अगर 3 से ज्यादा newline आ जाएं तो उन्हें 2 में बदल दें (साफ-सफाई)
      .replace(/\n{3,}/g, "\n\n");

    return formatted.trimStart();
  };

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

  //  Astrologer Details Fetch करें (Refresh के बाद भी दिखे)
  useEffect(() => {
    if (astrologerSlug) {
      dispatch(fetchAiAstrologerDetails(astrologerSlug));
    }
  }, [astrologerSlug, dispatch]);

  //  जब sessionId आ जाए, तो history fetch करें
  useEffect(() => {
    if (sessionId) {
      dispatch(fetchChatHistory(sessionId));
    }
  }, [sessionId, dispatch]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    dispatch(fetchWalletDetails());
  }, [dispatch]);

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
          <div className="flex flex-wrap items-center justify-between gap-2 p-2 border-2 border-gray-300 bg-amber-400">
            {/* Left: Back + Logo + Astrologer Info */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <ChevronLeft
                size={24}
                strokeWidth={2.5}
                className="text-gray-500 cursor-pointer"
                onClick={() => navigate(-1)}
              />
              <div className="flex flex-col items-start">
                <Link to="/">
                  <img
                    src={logo}
                    alt="logo"
                    className="h-8 sm:h-10 w-auto max-w-[100px] sm:max-w-[150px] object-contain"
                  />
                </Link>
                {astrologerDetails?.name && (
                  <div className="flex items-center gap-1 text-[9px] pl-1">
                    <span className="w-1 h-1 bg-green-500 rounded-full inline-block animate-pulse"></span>
                    <span className="text-green-600 font-medium">Online</span>
                    <span className="text-gray-600 font-medium ml-1">
                      • {astrologerDetails.name}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Wallet Balance */}
            <div className="flex-shrink-0">
              <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded-lg shadow-sm">
                <Wallet className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-bold text-gray-800">
                  ₹{walletBalance}
                </span>
              </div>
            </div>

            {sessionId && (
              <div className="flex-shrink-0 hidden">
                <button
                  onClick={handleManualCloseSession}
                  className="p-1.5 sm:p-2 rounded-lg text-xs font-medium bg-red-100 text-red-600 hover:bg-red-200 "
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
              {/* {sessionId && messages.length === 0 && (
                <div className="text-center text-xs text-gray-400 mt-10">
                  Choose a question from above, or type your question below to
                  ask.
                </div>
              )} */}

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
                    <div className="prose prose-sm max-w-none prose-p:my-2 prose-pre:bg-gray-900 prose-code:text-red-500">
                      <Markdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          // 🟢 Ordered List (Numbered) को सुंदर बनाएँ
                          ol: ({ node, children, ...props }) => (
                            <ol
                              className="list-decimal pl-5 my-2 space-y-1"
                              {...props}
                            >
                              {children}
                            </ol>
                          ),
                          // 🟢 Unordered List (Bullet) को सुंदर बनाएँ
                          ul: ({ node, children, ...props }) => (
                            <ul
                              className="list-disc pl-5 my-2 space-y-1"
                              {...props}
                            >
                              {children}
                            </ul>
                          ),
                          // 🟢 List Items को थोड़ा Padding दें
                          li: ({ node, children, ...props }) => (
                            <li className="text-sm text-gray-800" {...props}>
                              {children}
                            </li>
                          ),
                          // 🟢 Bold Text को Highlight करें
                          strong: ({ node, children, ...props }) => (
                            <strong
                              className="font-bold text-amber-700"
                              {...props}
                            >
                              {children}
                            </strong>
                          ),
                          // 🟢 Paragraphs के बीच थोड़ा Gap दें
                          p: ({ node, children, ...props }) => (
                            <p className="mb-2 leading-relaxed" {...props}>
                              {children}
                            </p>
                          ),
                          // 🔵 Links (पहले से है, वैसा ही रखें)
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
                        {/* 🔥 यहाँ पर `formatMarkdownText` Function Apply करें */}
                        {formatMarkdownText(msg.message)}
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
              {/* Follow-up Questions (Reply के नीचे) */}
              {messages.length > 0 && followUpQuestions.length > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-400 mb-2 font-medium">
                    💡 You can aslo ask:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {followUpQuestions.map((q, idx) => (
                      <button
                        key={q.id ?? idx}
                        onClick={() =>
                          handleQuestionClick(q.question ?? q.name ?? q)
                        }
                        className="py-1.5 px-3 rounded-full text-xs font-medium cursor-pointer transition bg-gray-100 text-gray-700 hover:bg-amber-400 hover:text-white border border-gray-200"
                      >
                        {q.question}
                      </button>
                    ))}
                  </div>
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
                      onClick={() => dispatch(openRechargeModal())}
                      className="mt-6 w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2.5 px-4 rounded-xl transition-colors shadow-sm hover:shadow cursor-pointer"
                    >
                      Recharge Now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Input area */}
            <div className="py-4 px-4 sm:px-20 bg-white  flex-shrink-0">
              {!showCustomInput ? (
                // 🟢 जब Input छिपा है, तो यह Clickable Prompt दिखेगा
                <div
                  onClick={() => setShowCustomInput(true)}
                  className="w-full  px-4 py-4 text-center text-sm text-gray-500 "
                >
                  Choose a question from above, or{" "}
                  <span className="font-medium text-amber-500 cursor-pointer">
                    click here
                  </span>{" "}
                  to type your own question.
                </div>
              ) : (
                // 🔵 जब Input खुला है, तो Textarea और Send Button दिखेगा
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
                    // 🟢 जब यह दिखे, तो Auto-Focus हो जाए
                    autoFocus
                    className="flex-1 border rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white text-sm resize-none placeholder:text-xs"
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
