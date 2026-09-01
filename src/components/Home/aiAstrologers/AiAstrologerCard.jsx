import React from "react";
import { useNavigate } from "react-router-dom";

export const AiAstrologerCard = ({ astro, className = "" }) => {
  const navigate = useNavigate();
  const expertiseName = astro.expertises?.[0]?.name.split(",")[0] ?? "";
  const price = astro.chat_price ? `₹${astro.chat_price}` : "";

  return (
    <div
      onClick={() => navigate(`/ai-astrologer/${astro.slug}`)}
       className={`group inline-flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer select-none border border-amber-200 hover:border-amber-400 ${className}`}
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100 flex-shrink-0 ring-2 ring-amber-200 group-hover:ring-amber-400 transition-all">
        <img
          src={astro.image}
          alt={astro.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col min-w-0 ">
        <span className="text-sm sm:text-lg font-semibold text-gray-800 group-hover:text-amber-600 transition-colors truncate">
          {astro.name}
        </span>
        <span className="text-xs sm:text-sm text-gray-600 font-medium">
          Vedic
        </span>
        {expertiseName && (
          <span className="text-xs sm:text-sm text-gray-600 mt-0.5 truncate">
            Expertise: <span className="text-amber-500">{expertiseName}</span>
          </span>
        )}
        {price && (
          <span className="text-sm sm:text-base font-medium text-amber-500 mt-0.5 whitespace-nowrap">
            {price}
            <span className="text-xs text-amber-500 font-semibold">/min</span>
          </span>
        )}
      </div>
    </div>
  );
};