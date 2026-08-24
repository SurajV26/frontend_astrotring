import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Check,
  MoveRight,
} from "lucide-react";


import HeroTaramandal from "./HeroTaramandal";
import { useDispatch, useSelector } from "react-redux";

const Banner = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allAiAstrologers, isFetchingAllAiAstrologers } = useSelector(
    (state) => state.aiChat,
  );

  const allAiAstrologersSlice = allAiAstrologers?.slice(0, 3);

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

  const features = [
    "Career Guidance",
    "Business Growth",
    "Future Clarity",
    "Relationships",
  ];

  return (
    <section className="relative w-full overflow-hidden py-10 sm:py-12 md:py-14 lg:py-16">

      <div className="mx-auto w-full px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16">

        <div className="flex flex-col items-center md:flex-row md:gap-8 lg:gap-12">

          {/* ================= LEFT ================= */}
          <div className="relative w-full md:w-1/2 flex flex-col items-start z-10">
            {/* Soft decorative background glow */}
            <div className="absolute -left-16 -top-16 -z-10 h-72 w-72 rounded-full bg-amber-100/30 blur-3xl sm:h-96 sm:w-96 pointer-events-none"></div>

            {/* Active Status Badge */}
            <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-full border border-gray-200/80 bg-white/80 backdrop-blur-md w-fit mb-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all hover:border-amber-200">
              {/* 1. Pulse Active Dot */}
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>

              {/* 2. Status Text */}
              <span className="text-gray-700 text-xs sm:text-sm font-medium tracking-wide">
                AI Astrologers 
              </span>

              {/* 3. Overlapping Avatars Stack */}
              <div className="flex items-center -space-x-1.5 ml-1">
                {allAiAstrologersSlice?.map((astro, i) => (
                  <img
                    key={i}
                    src={astro.image}
                    alt="Astrologer profile"
                    className="w-5.5 h-5.5 sm:w-6.5 sm:h-6.5 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-gray-100"
                  />
                ))}
              </div>
            </div>

            {/* Heading */}
            <h1 className="max-w-xl text-4xl font-extrabold leading-[1.1] tracking-[-0.03em] text-gray-900 sm:text-5xl md:text-4.5xl lg:text-5xl xl:text-6.5xl">
              ASK. DISCOVER.{" "}
              <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 bg-clip-text text-transparent">
                UNDERSTAND.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent sm:text-sm">
              AI Astrology Chat
            </p>

            {/* Features */}
            <div className="mt-8 grid grid-cols-2 gap-y-4 sm:grid-cols-2 sm:gap-x-6 w-full max-w-lg">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-400/35">
                    <Check
                      className="h-4 w-4 text-amber-600"
                      strokeWidth={2}
                    />
                  </span>

                  <span className="text-sm font-light tracking-wide text-gray-600 sm:text-base">
                    {feature}
                  </span>
                </div>
              ))}

            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={() => navigate("/chat/all-ai-astrologer")}
              className="group mt-9 inline-flex cursor-pointer items-center gap-3 rounded-full bg-gradient-to-r from-amber-300 to-orange-400 px-6 py-3.5 text-sm font-semibold text-gray-900 hover:scale-[0.98] sm:px-7 sm:py-4 sm:text-base"
            >


              <span>Start Free Chat</span>

              <MoveRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </button>

          </div>

          {/* ================= RIGHT ================= */}
          <div
            ref={wheelContainerRef}
            className="hidden w-full items-center justify-center overflow-visible md:flex md:w-1/2 md:min-h-[300px] lg:min-h-[380px] xl:min-h-[440px]"
          >
            <HeroTaramandal wheelSize={wheelSize} />
          </div>

        </div>

      </div>

    </section>
  );
};

export default Banner;