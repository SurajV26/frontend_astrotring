import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import ComponentHead from "@/components/ComponentHead";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAiAstrologers } from "@/redux/slice/aiChatSlice";
import { AiAstrologerCard } from "./AiAstrologerCard";

const FADE_MASK = {
  maskImage:
    "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
};

const AiAstrologers = () => {
  const dispatch = useDispatch();
  const { allAiAstrologers, isFetchingAllAiAstrologers } = useSelector(
    (state) => state.aiChat,
  );

  useEffect(() => {
    dispatch(fetchAllAiAstrologers());
  }, [dispatch]);

  if (isFetchingAllAiAstrologers || !allAiAstrologers) {
    return (
      <div className="w-full bg-gradient-to-b from-amber-50 to-white py-6 flex justify-center items-center min-h-[300px]">
        <p className="text-gray-500">Loading astrologers...</p>
      </div>
    );
  }

  const data = Array.isArray(allAiAstrologers) ? allAiAstrologers : [];
  if (data.length === 0) {
    return (
      <div className="w-full bg-gradient-to-b from-amber-50 to-white py-6 flex justify-center items-center min-h-[300px]">
        <p className="text-gray-500">No astrologers found.</p>
      </div>
    );
  }

  const half = Math.ceil(data.length / 2);
  const row1 = data.slice(0, half);
  const row2 = data.slice(half);

  const swiperCommon = {
    modules: [Autoplay],
    slidesPerView: "auto", // 👈 auto width based on slide content
    spaceBetween: 12,
    loop: data.length > 2,
    allowTouchMove: true,
  };

  return (
    <div className="w-full container py-6">
      <div className=" mx-auto px-4 mb-6">
        <ComponentHead
          heading="AI Astrologers"
          title="Connect with our expert AI astrologers for guidance"
        />
      </div>

      <div className="flex flex-col gap-6" >
        {row1.length > 0 && (
          <div className="w-full" >
            <Swiper
              {...swiperCommon}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                reverseDirection: false,
                pauseOnMouseEnter: true,
              }}
              speed={10000}
              className="w-full"
            >
              {row1.map((astro, idx) => (
                <SwiperSlide
                  key={`r1-${idx}`}
                  className="w-auto flex-shrink-0"
                  style={{ display: "inline-flex", width: "auto" }}
                >
                  <AiAstrologerCard astro={astro} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {row2.length > 0 && (
          <div className="w-full" >
            <Swiper
              {...swiperCommon}
              autoplay={{
                delay: 1,
                disableOnInteraction: false,
                reverseDirection: true,
                pauseOnMouseEnter: true,
              }}
              speed={10000}
              className="w-full"
            >
              {row2.map((astro, idx) => (
                <SwiperSlide
                  key={`r2-${idx}`} //  fixed key
                  className="w-auto flex-shrink-0"
                  style={{ display: "inline-flex", width: "auto" }}
                >
                  <AiAstrologerCard astro={astro} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiAstrologers;
