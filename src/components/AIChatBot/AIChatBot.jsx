import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import logo from "@/assets/logo.png";
import {
  startSession,
  startChat,
  sendChatMessage,
  closeSession,
  addUserMessageLocally,
  fetchChatHistory,
  fetchChatStatus,
  fetchAiAstrologerDetails,
  fetchAstrologerQuestions,
  clearAstrologerQuestions,
} from "@/redux/slice/aiChatSlice";
// import { api } from "@/redux/baseApi";
import { toast } from "react-toastify";
import { ChevronLeft, Plus, SendHorizontal, Wallet, X, Timer } from "lucide-react";
import { fetchWalletDetails } from "@/redux/slice/walletSlice";
import { openRechargeModal } from "@/redux/slice/uiSlice";
import MarkdownRenderer from "./MarkdownRenderer";
import { BeatLoader } from "react-spinners";
import UserLogin from "@/components/UserLogin";


const AIChatBot = () => {

  console.log("chatbotloading....................")
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { astrologerSlug, expertiseSlug } = useParams();
  const { isLoggedIn } = useSelector((state) => state.userAuth);

  const {
    sessionId,
    astrologerQuestions,
    isFetchingAstrologerQuestions,
    messages,
    isLoading,
    isStartingSession,
    astrologerDetails,
    followUpQuestions,
    chatBilling,
    chatFreeUsed,
    chatEndType,
    chatEndMessage,
    error,
  } = useSelector((state) => state.aiChat);
  const { details: walletDetails } = useSelector((state) => state.wallet);
  const walletBalance = walletDetails?.data?.balance || 0;

  // console.log("astrologer details", astrologerDetails);
  // console.log("chat messages", messages);
  // console.log("followUpQuestions", followUpQuestions);

  const [input, setInput] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [rechargeMessage, setRechargeMessage] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const bottomRef = useRef();

  // Show login modal if unauthenticated user tries to access chat
  useEffect(() => {
    if (!isLoggedIn) {
      setShowLogin(true);
    }
  }, [isLoggedIn]);

  // Refresh wallet balance periodically when chat is active
  useEffect(() => {
    if (!chatBilling?.isChatActive) {
      return;
    }

    const interval = setInterval(() => {
      dispatch(fetchWalletDetails());
    }, 10000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [chatBilling?.isChatActive, dispatch]);

  // Fetch chat status every 15 seconds for testing
  useEffect(() => {
    if (!sessionId) {
      return;
    }

    const interval = setInterval(() => {
      dispatch(fetchChatStatus(sessionId));
    }, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, [sessionId, dispatch]);

  // Stop timer and show recharge modal when chat is ended by backend
  useEffect(() => {
    if (!chatBilling?.isChatActive && chatEndType === "insufficient_balance" && chatEndMessage) {
      setElapsedSeconds(0);
      setRechargeMessage(chatEndMessage);
      setShowRechargeModal(true);
    }
  }, [chatBilling?.isChatActive, chatEndType, chatEndMessage]);


  // Get astrologer details (will remain visible even after refreshing)
  useEffect(() => {
    if (astrologerSlug) {
      dispatch(fetchAiAstrologerDetails(astrologerSlug));
    }
  }, [astrologerSlug, dispatch]);

  // Fetch astrologer questions separately
  useEffect(() => {
    if (astrologerSlug && expertiseSlug) {
      dispatch(fetchAstrologerQuestions({ astrologerSlug, expertiseSlug }));
    }
    return () => {
      dispatch(clearAstrologerQuestions());
    };
  }, [astrologerSlug, expertiseSlug, dispatch]);


  useEffect(() => {
    if (isLoggedIn && astrologerSlug && expertiseSlug) {
      dispatch(
        startSession({
          astrologerSlug,
          expertiseSlug,
        }),
      )
    }
  }, []);


  // Fetch the history once the sessionId is received.
  useEffect(() => {
    // console.log("sessionId in history effect1", sessionId);
    if (sessionId) {
      // console.log("sessionId in history effect2", sessionId);
      dispatch(fetchChatHistory(sessionId));
    }
  }, [sessionId]);


  useEffect(() => {
    if (!chatBilling?.isChatActive || !chatBilling?.chatActiveSince) {
      return;
    }

    const startTime = new Date(
      chatBilling.chatActiveSince
    ).getTime();

    const updateTimer = () => {
      const now = Date.now();

      const difference = Math.floor(
        (now - startTime) / 1000
      );

      setElapsedSeconds(Math.max(0, difference));
    };

    // Immediately calculate
    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [
    chatBilling?.isChatActive,
    chatBilling?.chatActiveSince,
  ]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    dispatch(fetchWalletDetails());
  }, [dispatch]);

  const handleQuestionClick = async (question) => {
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    }

    let currentSessionId = sessionId;

    // Create session if not exists
    if (!currentSessionId) {
      try {
        const result = await dispatch(
          startSession({
            astrologerSlug: astrologerSlug,
            expertiseSlug: expertiseSlug,
          })
        ).unwrap();
        currentSessionId = result.sessionId;
      } catch (err) {
        toast.error(err || "Failed to start session");
        return;
      }
    }

    // Start chat billing only if free quota is used
    if (!chatBilling?.isChatActive && chatFreeUsed) {
      try {
        await dispatch(startChat(currentSessionId)).unwrap();
      } catch (err) {
        const errData = err;
        // console.log("errData", errData);
        if (errData?.type == "insufficient_balance") {
          setRechargeMessage(errData?.message);
          setShowRechargeModal(true);
          return;
        }
        toast.error(err?.message || "Failed to start chat");
        return;
      }
    }

    dispatch(addUserMessageLocally(question));
    try {
      await dispatch(
        sendChatMessage({ sessionId: currentSessionId, message: question }),
      ).unwrap();
      setShowRechargeModal(false);
    } catch (err) {
      const errData = err;
      if (

        errData?.type == "insufficient_balance"

      ) {

        setRechargeMessage(errData?.message);

        setShowRechargeModal(true);
      } else {
        toast.error(errData?.message || "Failed to send message");
      }
    }
  };

  const handleSendMessage = async () => {
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    }
    const message = input.trim();
    if (!message) return;

    let currentSessionId = sessionId;

    // Create session if not exists
    if (!currentSessionId) {
      try {
        const result = await dispatch(
          startSession({
            astrologerSlug: astrologerSlug,
            expertiseSlug: expertiseSlug,
          })
        ).unwrap();
        currentSessionId = result.sessionId;
      } catch (err) {
        toast.error(err || "Failed to start session");
        return;
      }
    }

    // Start chat billing only if free quota is used
    if (!chatBilling?.isChatActive && chatFreeUsed) {
      try {
        await dispatch(startChat(currentSessionId)).unwrap();
      } catch (err) {
        const errData = err;
        if (errData?.type == "insufficient_balance") {
          setRechargeMessage(errData?.message);
          setShowRechargeModal(true);
          return;
        }
        toast.error(err || "Failed to start chat");
        return;
      }
    }

    dispatch(addUserMessageLocally(message));
    setInput("");
    try {
      await dispatch(sendChatMessage({ sessionId: currentSessionId, message })).unwrap();
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
        dispatch(fetchWalletDetails());
        toast.success("Chat ended successfully");
      } catch (err) {
        toast.error(err || "Something went wrong")
        // console.log("Close session error:", err);
      }
    }
  };



  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);

    const minutes = Math.floor(
      (totalSeconds % 3600) / 60,
    );

    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(
      minutes,
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
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
                onClick={() => {
                  navigate(-1);
                  handleManualCloseSession();
                }}
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

            {/* Center: Timer */}
            {chatBilling?.chatActiveSince && (
              <div className="flex-1 flex justify-center">
                <div className={`flex items-center gap-2 px-2 py-1 rounded-lg shadow-md border ${chatBilling?.isChatActive ? 'bg-white/90 border-amber-300' : 'bg-gray-100 border-gray-300'}`}>
                  <Timer className={`w-4 h-4 ${chatBilling?.isChatActive ? 'text-amber-600' : 'text-gray-500'}`} />
                  <span className="text-sm font-bold text-gray-700">
                    {formatTime(elapsedSeconds)}
                  </span>
                  
                </div>
              </div>
            )}

            {/* Right: Wallet Balance */}
            <div className=" flex items-center gap-1">
              <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded-lg shadow-sm">
                <Plus className="w-4 h-4 text-green-600 rounded border bg-amber-200 cursor-pointer" onClick={() => navigate("/dashboard/wallet")} />
                <Wallet className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-bold text-gray-800">
                  ₹{walletBalance}
                </span>
              </div>
              {chatBilling?.isChatActive && (
                <div className=" ">
                  <button
                    onClick={handleManualCloseSession}
                    className="px-2 py-1.5 rounded-lg text-xs font-semibold bg-red-100 text-red-600 hover:bg-red-200 cursor-pointer"
                  >
                    End Chat
                  </button>
                </div>
              )}
            </div>


          </div>

          <div className="flex-1 mt-2 flex flex-col overflow-y-auto">
            {/* Question chips */}
            <div className="grid grid-cols-1 md:grid-cols-2  gap-2 px-4 sm:px-10">
              {isFetchingAstrologerQuestions ? (
                <span className="text-xs text-gray-400 col-span-full text-center">
                  Loading questions...
                </span>
              ) : astrologerQuestions?.questions?.length > 0 ? (
                astrologerQuestions?.questions?.map((q, idx) => (
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
                    onClick={() => {
                      setShowRechargeModal(false);
                      setRechargeMessage("");
                    }}
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
                      {rechargeMessage || "Your wallet balance is low. Please recharge to continue."}
                    </p>
                    <button
                      onClick={() => {
                        dispatch(openRechargeModal());
                        setShowRechargeModal(false);
                        setRechargeMessage("");
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
                    <SendHorizontal strokeWidth={2} className="w-6 h-6 text-gray-700" />
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

      {showLogin && (
        <UserLogin
          defaultOpen={true}
          onOpenChange={(open) => setShowLogin(open)}
        />
      )}
    </div>
  );
};

export default AIChatBot;
