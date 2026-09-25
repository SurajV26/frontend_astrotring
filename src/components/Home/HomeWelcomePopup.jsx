import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sun, UserRound, X } from "lucide-react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import logo from "@/assets/logo.png";

const POPUP_DELAY_MS = 5000;
const STORAGE_KEY = "astrotring:home-welcome-seen:v5";
let shownThisSession = false;

const HomeWelcomePopup = () => {
  const { isLoggedIn } = useSelector((state) => state.userAuth);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const navigateAfterClose = useRef(false);
  const reduceMotion = useReducedMotion();
  const bubbleAnimation = (delay) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 12, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: {
      duration: reduceMotion ? 0 : 0.45,
      delay: reduceMotion ? 0 : delay,
      ease: "easeOut",
    },
  });

  useEffect(() => {
    if (isLoggedIn || shownThisSession) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // The in-memory flag also prevents repeats when storage is unavailable.
    }

    let timer;
    const showWhenAvailable = () => {
      // Do not interrupt another modal or open in a background tab.
      if (
        document.visibilityState !== "visible" ||
        document.querySelector('[role="dialog"], [role="alertdialog"]')
      ) {
        timer = window.setTimeout(showWhenAvailable, 2000);
        return;
      }
      shownThisSession = true;
      try {
        sessionStorage.setItem(STORAGE_KEY, "true");
      } catch {
        // Continue normally if browser storage is blocked.
      }
      setOpen(true);
    };

    timer = window.setTimeout(showWhenAvailable, POPUP_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [isLoggedIn]);

  const handleChatClick = () => {
    navigateAfterClose.current = true;
    setOpen(false);
  };

  // Finish closing the popup before changing pages to avoid flicker.
  const handlePopupClosed = (event) => {
    if (!navigateAfterClose.current) return;
    event.preventDefault();
    navigateAfterClose.current = false;
    navigate("/chat/all-ai-astrologer");
  };

  return (
    <Dialog open={open && !isLoggedIn} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        onCloseAutoFocus={handlePopupClosed}
        className="block max-h-[90dvh] overflow-y-auto rounded-3xl border border-white/80 bg-gradient-to-br from-[#fff9e8] via-amber-50/95 to-white p-0 shadow-[0_24px_90px_rgba(0,0,0,0.22)] selection:bg-amber-300 selection:text-amber-950 motion-reduce:animate-none sm:max-w-[min(820px,calc(100%-3rem))]"
      >
        <DialogClose
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-gray-500 transition hover:bg-amber-100 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          aria-label="Close welcome offer"
        >
          <X className="h-4 w-4" />
        </DialogClose>
        <div className="relative isolate grid overflow-hidden rounded-3xl sm:min-h-[390px] sm:grid-cols-2">
          <div className="relative z-10 px-7 pb-6 pt-7 sm:px-9 sm:py-9">
            <img
              src={logo}
              alt="Astrotring"
              className="mb-6 h-9 w-auto max-w-[160px] object-contain object-left"
            />
            <DialogTitle className="font-normal tracking-tight text-gray-900">
              <span className="block text-[25px] leading-snug tracking-[-0.025em] sm:text-[28px]">
                Get Your First Question
              </span>
              <span className="mt-1 block text-[72px] font-extrabold leading-none tracking-[-0.045em] text-gray-900 sm:text-[80px]">
                FREE<span className="text-amber-500">.</span>
              </span>
            </DialogTitle>
            <DialogDescription className="mt-4 text-[15px]! leading-relaxed text-gray-500">
              Chat with expert astrologers, get clarity for your life.
            </DialogDescription>
            <Motion.div
              {...bubbleAnimation(0.2)}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className="mt-6 w-fit"
            >
              <button
                type="button"
                onClick={handleChatClick}
                className="group inline-flex min-h-12 items-center justify-between gap-10 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3 text-base font-semibold text-gray-900 shadow-[0_6px_18px_rgba(245,158,11,0.22)] transition-shadow hover:shadow-[0_8px_24px_rgba(245,158,11,0.32)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600"
              >
                Chat Now{" "}
                <ArrowRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
                  aria-hidden="true"
                />
              </button>
            </Motion.div>
          </div>
          <div
            className="relative flex flex-col justify-center gap-4 px-6 pb-7 pt-2 sm:py-12 sm:pl-0 sm:pr-7"
            aria-label="Example conversation with an AI astrologer"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[65%] top-1/2 -z-10 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2"
            >
              <Motion.div
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
                className="relative h-full w-full rounded-full border border-amber-200/60"
              >
                {[82, 55].map((size) => (
                  <div
                    key={size}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-300/60"
                    style={{ width: `${size}%`, height: `${size}%` }}
                  />
                ))}
                {[0, 60, 120].map((angle) => (
                  <div
                    key={angle}
                    className="absolute left-0 top-1/2 h-px w-full bg-amber-200/50"
                    style={{ transform: `rotate(${angle}deg)` }}
                  />
                ))}
                <div className="absolute left-1/2 top-1/2 h-[54%] w-[54%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-50" />
              </Motion.div>
            </div>
            <Motion.div
              {...bubbleAnimation(0.35)}
              className="flex items-start justify-end gap-2"
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-600 text-gray-200"
                aria-hidden="true"
              >
                <UserRound className="h-4 w-4" />
              </span>
              <div className="relative rounded-[20px] rounded-br-md bg-gray-900 px-4 py-3 text-white after:absolute after:-right-2 after:bottom-4 after:h-4 after:w-4 after:rotate-45 after:bg-gray-900 sm:px-4">
                <p className="text-sm">Which career path suits me?</p>
                <p className="mt-2 text-right text-[10px] text-gray-400">You</p>
              </div>
            </Motion.div>
            <Motion.div
              {...bubbleAnimation(0.85)}
              className="flex items-center gap-2 sm:-ml-3"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-300 bg-amber-400 text-amber-950"
                aria-hidden="true"
              >
                <Sun className="h-5 w-5" />
              </span>
              <div className="relative max-w-[340px] rounded-[20px] rounded-bl-md bg-gradient-to-r from-amber-200 to-amber-400 px-4 py-4 text-gray-900 shadow-[0_8px_24px_rgba(245,158,11,0.18)] after:absolute after:-left-2 after:bottom-4 after:h-4 after:w-4 after:rotate-45 after:bg-amber-200 sm:px-4">
                <p className="text-sm leading-relaxed">
                  Let's explore your strengths. What do you love doing?
                </p>
                <p className="mt-2 text-right text-[10px] text-amber-900">
                  Astrotring AI
                </p>
              </div>
            </Motion.div>
            <Motion.div
              {...bubbleAnimation(1.4)}
              className="flex items-start justify-end gap-2"
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-600 text-gray-200"
                aria-hidden="true"
              >
                <UserRound className="h-4 w-4" />
              </span>
              <div className="relative rounded-[20px] rounded-br-md bg-gray-900 px-4 py-3 text-white after:absolute after:-right-2 after:bottom-4 after:h-4 after:w-4 after:rotate-45 after:bg-gray-900 sm:px-4">
                <p className="text-sm">Creating something new!</p>
                <p className="mt-2 text-right text-[10px] text-gray-400">You</p>
              </div>
            </Motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HomeWelcomePopup;

