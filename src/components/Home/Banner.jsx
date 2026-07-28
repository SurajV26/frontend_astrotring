
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MessageCircle, ShoppingBag } from "lucide-react";

import UserLogin from "../UserLogin";
import HeroTaramandal from "./HeroTaramandal";

const Banner = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.userAuth);

  const wheelContainerRef = useRef(null);
  const [wheelSize, setWheelSize] = useState(400);




  useEffect(() => {
    const el = wheelContainerRef.current;
    if (!el) return;

    const updateWheelSize = () => {
      if (window.innerWidth < 768) return;
      const width = el.getBoundingClientRect().width;
      if (width <= 0) return;
      const fitted = Math.min(450, Math.max(260, width - 8));
      setWheelSize(fitted);
    };

    updateWheelSize();
    const observer = new ResizeObserver(updateWheelSize);
    observer.observe(el);
    window.addEventListener("resize", updateWheelSize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateWheelSize);
    };
  }, []);

  return (
    <>
      <section className="relative w-full overflow-hidden  py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16">

        <div className="relative z-10 mx-auto w-full  px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-6 lg:gap-10">
            {/* Left — full width on small, 50% from md */}
            <div className="w-full text-center md:w-1/2 md:text-left">
              <h1 className="mb-4 text-[1.65rem] font-bold leading-[1.28] tracking-tight text-gray-900 sm:text-3xl sm:leading-[1.3] md:mb-5 md:text-[1.75rem] md:leading-tight lg:mb-6 lg:text-4xl xl:text-5xl 2xl:text-6xl">
                <span className="inline sm:whitespace-nowrap">
                  Chat With{" "}
                  <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 bg-clip-text text-transparent">
                    Astrologers
                  </span>
                </span>
                <br />
                right now.
              </h1>

              <p className="mx-auto mb-6 max-w-lg text-sm font-medium leading-relaxed text-gray-500 sm:text-base sm:leading-7 md:mx-0 md:mb-8 md:text-[0.95rem] lg:mb-10 lg:text-lg lg:leading-8">
                Know about astrology, zodiac signs, retrogrades, and more!
                Your world becomes clear once you understand how the universe influences it.
              </p>

              <div className="flex w-full  items-stretch justify-center gap-3 flex-row ">
                <button
                  onClick={()=>{navigate("/chat/all-ai-astrologer")}}
                  className="group relative flex flex-1 cursor-pointer items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-2.5 text-sm font-semibold text-black/75 shadow-lg shadow-amber-500/25 transition-all duration-300 hover:-translate-y-1 hover:from-amber-500 hover:to-orange-600 hover:shadow-xl hover:shadow-amber-500/35 active:scale-[0.98] sm:px-6 sm:py-3 sm:text-[15px] md:px-5 md:py-2.5 md:text-sm lg:px-8 lg:py-4 lg:text-lg"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <MessageCircle className="relative h-4 w-4 shrink-0 lg:h-5 lg:w-5" />
                  <span className="relative lg:hidden">Chat Now</span>
                  <span className="relative hidden lg:inline">Chat with AI Astrologer</span>
                </button>

                <a
                  href="https://astrotring.shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 cursor-pointer"
                >
                  <button className="flex w-full cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-full border-2 border-amber-500 bg-white/90 px-4 py-2.5 text-sm font-semibold text-amber-600 shadow-md shadow-amber-500/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-600 hover:bg-amber-50 hover:text-amber-700 hover:shadow-lg active:scale-[0.98] sm:px-6 sm:py-3 sm:text-[15px] md:px-5 md:py-2.5 md:text-sm lg:px-8 lg:py-4 lg:text-lg">
                    <ShoppingBag className="h-4 w-4 shrink-0 lg:h-5 lg:w-5" />
                    <span>Shop Now</span>
                  </button>
                </a>
              </div>
            </div>

            {/* Right — hidden below md (small screens only), 50% from md up */}
            <div
              ref={wheelContainerRef}
              className="hidden w-full items-center justify-center overflow-visible md:flex md:w-1/2 md:min-h-[280px] lg:min-h-[360px] xl:min-h-[420px]"
            >
              <HeroTaramandal wheelSize={wheelSize} />
            </div>
          </div>
        </div>
      </section>

     
    </>
  );
};

export default Banner;
