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
import { toast } from "react-toastify";
import { ChevronLeft, Plus, SendHorizontal, Wallet, X } from "lucide-react";
import { fetchWalletDetails } from "@/redux/slice/walletSlice";
import { openRechargeModal } from "@/redux/slice/uiSlice";
import MarkdownRenderer from "./MarkdownRenderer";
import { BeatLoader } from "react-spinners";


const AIChatBot = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { astrologerSlug, expertiseSlug } = useParams();
  const { isLoggedIn } = useSelector((state) => state.userAuth); 

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


  useEffect(() => {
    if (isLoggedIn && !sessionId && expertiseSlug && astrologerSlug) {
      dispatch(
        startSession({
          astrologerSlug: astrologerSlug,
          expertiseSlug: expertiseSlug,
        }),
      );
    }
  }, [dispatch, expertiseSlug, astrologerSlug]);

  //  Astrologer Details Fetch करें (visible after Refresh also )
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
      dispatch(fetchWalletDetails());
      setShowRechargeModal(false);
    } catch (err) {
      const errData = err;
      if (
        errData?.type == "wallet_error" ||
        errData?.type == "insufficient_balance" ||
        errData?.type == "free_limit_exceeded"
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
      // Refresh wallet balance after successful message
    dispatch(fetchWalletDetails());
      setShowRechargeModal(false);
    } catch (err) {
      const errData = err;
      if (
        errData?.type === "wallet_error" ||
        errData?.type === "free_limit_exceeded" ||
        errData?.type == "insufficient_balance"
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
              <Plus className="w-4 h-4 text-green-600 rounded border bg-amber-200 cursor-pointer" onClick={() => navigate("/dashboard/wallet")}/>
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
            <div className="flex-1 py-2 space-y-3">
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
                <div key={idx} className={`flex w-full mb-4 ${msg.sender === "user" ? "justify-end " : "justify-start"}`}>
                  <div className={`max-w-[90%] md:max-w-[80%] px-5 py-2 rounded-2xl ${msg.sender === "user" ? "bg-amber-400 text-gray-800 rounded-br-none shadow-sm mr-1 sm:mr-0" : "bg-white shadow-sm border border-gray-100 rounded-bl-sm"}`}>
                    {msg.sender === "user" ? (
                      <div className="text-sm text whitespace-pre-wrap leading-relaxed">{msg.message}</div>
                    ) : (
                      <MarkdownRenderer content={msg.message} />
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex w-full mb-4 ml-4 justify-start">
                  <div className="px-5 py-4 bg-white shadow-sm border border-gray-100 rounded-2xl rounded-bl-sm flex items-center justify-center min-w-[70px]">
                    <BeatLoader size={8} color="#f59e0b" margin={3} speedMultiplier={0.7} />
                  </div>
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
                      onClick={() => {
                        dispatch(openRechargeModal());
                        setShowRechargeModal(false);
                      }}
                      className="mt-6 w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2.5 px-4 rounded-xl transition-colors shadow-sm hover:shadow cursor-pointer"
                    >
                      Recharge Now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Input area */}
            <div className="sticky bottom-0 z-10  px-4 sm:px-20 bg-transparent backdrop-blur-xs flex-shrink-0">
              {!showCustomInput ? (
                //  When the input is hidden, this clickable prompt will appear.
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
                // When the input is open, the textarea and send button will be visible.
                <div className="flex gap-2 pb-4 items-center">
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
                    //  It should auto-focus when this appears.
                    autoFocus
                    className="flex-1 border rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white text-sm resize-none placeholder:text-xs field-sizing-content  max-h-32 overflow-y-auto scrollbar-hide"
                    disabled={!sessionId || isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!sessionId || isLoading}
                    className="bg-amber-500 rounded-full p-2 self-end hover:bg-amber-600 disabled:opacity-50 transition cursor-pointer "
                  >
                    <SendHorizontal strokeWidth={2} className="w-6 h-6 text-gray-700"/>
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
