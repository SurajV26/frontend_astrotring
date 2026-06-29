import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import ComponentHead from "@/components/ComponentHead";
import { DUMMY_ASTROLOGERS } from "@/data/dummyAiastrologers/dummyAiastrologers";

const AstrologerCard = ({ astro, onClick }) => {
  const expertiseTags = Array.isArray(astro.expertise)
    ? astro.expertise
    : [astro.expertise];

  return (
    <div
      title={astro.name + "\n" + expertiseTags.join(", ")}
      onClick={onClick}
      className="group flex flex-col items-center transition-all duration-300 hover:-translate-y-1 cursor-pointer select-none h-full"
    >
      {/* Image — same as ZodiacPredictions */}
      <div className="w-30 h-30 sm:w-40 sm:h-40 rounded-full overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100">
        <img
          src={astro.image}
          alt={astro.name}
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Name — same as ZodiacPredictions */}
      <span className="mt-2 text-sm md:text-base font-medium text-gray-700 group-hover:text-purple-600 transition-colors text-center truncate w-full ">
        {astro.name}
      </span>

      {/* Expertise — comma separated in parentheses */}
      <span className="text-[10px] text-gray-500 text-center leading-snug mt-0.5 line-clamp-1 ">
        ({expertiseTags.join(", ")})
      </span>
    </div>
  );
};


const AiAstrologers = () => {
  const navigate = useNavigate();

  const half = Math.ceil(DUMMY_ASTROLOGERS.length / 2);
  const row1 = DUMMY_ASTROLOGERS.slice(0, half);
  const row2 = DUMMY_ASTROLOGERS.slice(half);

  const swiperCommon = {
    modules: [Autoplay],
    spaceBetween: 6,
    loop: true,
    allowTouchMove: true,
    breakpoints: {
      0: { slidesPerView: 2 },
      480: { slidesPerView: 3 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 5 },
      1280: { slidesPerView: 6 },
    },
  };

  return (
    <div className="w-full container bg-gradient-to-b from-amber-50 to-white py-6 overflow-hidden">
      <div className="container">
        <ComponentHead
          heading="AI Astrologers"
          title="Connect with our expert AI astrologers for guidance"
        />
      </div>

      <div className="mt-6 flex flex-col items-center gap-4 md:gap-6">
        {/* ROW 1 — Left to Right */}
        <Swiper
          {...swiperCommon}
          autoplay={{ delay: 0, disableOnInteraction: false, reverseDirection: false }}
          speed={3000}
          className="w-full"
        >
          {row1.map((astro, idx) => (
            <SwiperSlide key={`r1-${idx}`}>
              <AstrologerCard
                astro={astro}
                onClick={() => navigate(`/ai-astrologer/${astro.id}`)}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ROW 2 — Right to Left */}
        <Swiper
          {...swiperCommon}
          autoplay={{ delay: 0, disableOnInteraction: false, reverseDirection: true }}
          speed={3500}
          className="w-full"
        >
          {row2.map((astro, idx) => (
            <SwiperSlide key={`r2-${idx}`}>
              <AstrologerCard
                astro={astro}
                onClick={() => navigate(`/ai-astrologer/${astro.id}`)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default AiAstrologers;
