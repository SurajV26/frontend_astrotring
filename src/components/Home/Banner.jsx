
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MessageCircle, ShoppingBag } from "lucide-react";

import UserLogin from "../UserLogin";
import HeroTaramandal from "./HeroTaramandal";

const Banner = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.userAuth);
  const [showLogin, setShowLogin] = useState(false);

  const handleChatClick = () => {
    if (isLoggedIn) {
      navigate("/ai-chat");
    } else {
      setShowLogin(true);
    }
  };

  useEffect(() => {
    if (isLoggedIn && showLogin) {
      navigate("/ai-chat");
      setShowLogin(false);
    }
  }, [isLoggedIn, showLogin, navigate]);

  return (
    <>
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-amber-50/80 to-amber-100 py-10 sm:py-12 lg:py-16 xl:py-20">
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-orange-300/15 blur-3xl" />

        <div className="relative z-10 mx-auto w-full l px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="flex flex-col-reverse items-center justify-between gap-8 lg:flex-row lg:gap-10 xl:gap-14">
            {/* Left Content */}
            <div className="w-full text-center lg:w-[48%] lg:text-left xl:w-[50%]">
              <h1 className="mb-5 text-[28px] font-bold leading-[1.25] tracking-tight text-gray-900 sm:text-3xl sm:leading-[1.3] lg:mb-6 lg:text-5xl xl:text-6xl">
                <span className="whitespace-nowrap">
                  Chat With{" "}
                  <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 bg-clip-text text-transparent">
                    Astrologers
                  </span>
                </span>
                <br />
                right now.
              </h1>

              <p className="mx-auto mb-8 max-w-lg text-base font-medium leading-7 text-gray-500 sm:text-lg sm:leading-8 lg:mx-0 lg:mb-10">
                Know about astrology, zodiac signs, retrogrades, and more!
                Your world becomes clear once you understand how the universe influences it.
              </p>

              <div className="flex w-full flex-row items-center justify-center gap-3 sm:gap-4 lg:justify-start">
                <button
                  onClick={handleChatClick}
                  className="group relative flex flex-1 cursor-pointer items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-3 text-[15px] font-semibold text-black/75 shadow-lg shadow-amber-500/25 transition-all duration-300 hover:-translate-y-1 hover:from-amber-500 hover:to-orange-600 hover:shadow-xl hover:shadow-amber-500/35 active:scale-[0.98] sm:flex-none sm:gap-2 sm:px-8 sm:py-4 sm:text-lg"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <MessageCircle className="relative h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
                  <span className="relative md:hidden">Chat Now</span>
                  <span className="relative hidden md:inline">Chat with AI Astrologer</span>
                </button>

                <a
                  href="https://astrotring.shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 cursor-pointer sm:flex-none"
                >
                  <button className="flex w-full cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-full border-2 border-amber-500 bg-white/90 px-4 py-3 text-[15px] font-semibold text-amber-600 shadow-md shadow-amber-500/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-600 hover:bg-amber-50 hover:text-amber-700 hover:shadow-lg active:scale-[0.98] sm:gap-2 sm:px-8 sm:py-4 sm:text-lg">
                    <ShoppingBag className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
                    <span>Shop Now</span>
                  </button>
                </a>
              </div>
            </div>

            {/* Right — celestial wheel */}
            <div className="flex w-full items-center justify-center overflow-visible lg:w-1/2 lg:min-h-[540px] lg:justify-center">
              <div className="scale-[0.55] sm:scale-75 lg:hidden">
                <HeroTaramandal compact />
              </div>
              <div className="hidden lg:block">
                <HeroTaramandal />
              </div>
            </div>
          </div>
        </div>
      </section>

      {showLogin && (
        <UserLogin
          defaultOpen={true}
          onOpenChange={(open) => {
            setShowLogin(open);
            if (!open && isLoggedIn) {
              navigate("/ai-chat");
            }
          }}
        />
      )}
    </>
  );
};

export default Banner;
