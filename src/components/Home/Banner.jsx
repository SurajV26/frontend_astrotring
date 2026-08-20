import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Check,
  MoveRight,
} from "lucide-react";


import HeroTaramandal from "./HeroTaramandal";

const Banner = () => {
  const navigate = useNavigate();

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
          <div className="w-full md:w-1/2">

            {/* Heading */}
            <h1 className="max-w-xl text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
              ASK. DISCOVER.{" "}
              <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 bg-clip-text text-transparent">
                UNDERSTAND.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-sm font-medium uppercase tracking-[0.22em] text-gray-400 sm:text-base">
              AI Astrology Chat
            </p>

            {/* Features */}
            <div className="mt-8 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">

              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-400/15">
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
              className="group mt-9 inline-flex cursor-pointer items-center gap-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3.5 text-sm font-semibold text-gray-900 shadow-[0_8px_25px_rgba(245,158,11,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(245,158,11,0.25)] active:scale-[0.98] sm:px-7 sm:py-4 sm:text-base"
            >


              <span>Start Free Chat</span>

              <MoveRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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