import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import ComponentHead from "@/components/ComponentHead";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAiAstrologers } from "@/redux/slice/aiChatSlice";

const FADE_MASK = {
  maskImage:
    "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
};

const AstrologerCard = ({ astro, onClick }) => {
  const expertiseName = astro.expertises?.[0]?.name.split(",")[0] ?? "";
  const price = astro.chat_price ? `₹${astro.chat_price}` : "";

  return (
    <div
      onClick={onClick}
      className="group inline-flex flex-row items-center gap-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer select-none border border-amber-200 hover:border-amber-400"
      style={{ whiteSpace: 'nowrap' }}
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100 flex-shrink-0 ring-2 ring-amber-200 group-hover:ring-amber-400 transition-all">
        <img
          src={astro.image}
          alt={astro.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col" style={{ whiteSpace: 'nowrap' }}>
        <span className="text-sm sm:text-lg font-semibold text-gray-800 group-hover:text-amber-600 transition-colors">
          {astro.name}
        </span>
        <span className="text-xs sm:text-sm text-gray-600 font-medium">
          Vedic
        </span>
        {expertiseName && (
          <span className="text-xs sm:text-sm text-gray-600 mt-0.5">
            Expertise: <span className="text-amber-500">{expertiseName}</span>
          </span>
        )}
        {price && (
          <span className="text-sm sm:text-base font-medium text-amber-500 mt-0.5">
            {price}
            <span className="text-xs text-amber-500 font-semibold">/msg</span>
          </span>
        )}
      </div>
    </div>
  );
};

const AiAstrologers = () => {
  const navigate = useNavigate();
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
    slidesPerView: 'auto',      // 👈 auto width based on slide content
    spaceBetween: 12,
    loop: data.length > 2,
    allowTouchMove: true,
  };

  return (
    <div className="w-full container py-6">
      <div className="container mx-auto px-4 mb-6">
        <ComponentHead
          heading="AI Astrologers"
          title="Connect with our expert AI astrologers for guidance"
        />
      </div>

      <div className="flex flex-col gap-6">
        {row1.length > 0 && (
          <div className="w-full" style={FADE_MASK}>
            <Swiper
              {...swiperCommon}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                reverseDirection: false,
              }}
              speed={4000}
              className="w-full"
            >
              {row1.map((astro, idx) => (
                <SwiperSlide
                  key={`r1-${idx}`}
                  className="w-auto flex-shrink-0"
                  style={{ display: 'inline-flex', width: 'auto' }}
                >
                  <AstrologerCard
                    astro={astro}
                    onClick={() => navigate(`/ai-astrologer/${astro.slug}`)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {row2.length > 0 && (
          <div className="w-full" style={FADE_MASK}>
            <Swiper
              {...swiperCommon}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                reverseDirection: true,
              }}
              speed={4000}
              className="w-full"
            >
              {row2.map((astro, idx) => (
                <SwiperSlide
                  key={`r2-${idx}`}                     // 👈 fixed key
                  className="w-auto flex-shrink-0"
                  style={{ display: 'inline-flex', width: 'auto' }}
                >
                  <AstrologerCard
                    astro={astro}
                    onClick={() => navigate(`/ai-astrologer/${astro.slug}`)}
                  />
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