import aries from "../../assets/zodiacSigns/aries.png";
import aquarius from "../../assets/zodiacSigns/aquarius.png";
import cancer from "../../assets/zodiacSigns/cancer.png";
import capricorn from "../../assets/zodiacSigns/capricorn.png";
import gemini from "../../assets/zodiacSigns/gemini.png";
import leo from "../../assets/zodiacSigns/leo.png";
import libra from "../../assets/zodiacSigns/libra.png";
import pisces from "../../assets/zodiacSigns/pisces.png";
import sagittarius from "../../assets/zodiacSigns/sagittarius.png";
import scorpio from "../../assets/zodiacSigns/scorpio.png";
import taurus from "../../assets/zodiacSigns/taurus.png";
import virgo from "../../assets/zodiacSigns/virgo.png";

import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getMonthlyHoroscope,
  getYearlyHoroscope,
} from "@/data/staticHoroscopesDataMonthlyAndYearly/staticHoroscopesDataMonthlyAndYearly";
import { useTranslation } from "react-i18next";

const ZODIAC_SIGNS = [
  { name: "aries", display: "Aries", img: aries },
  { name: "taurus", display: "Taurus", img: taurus },
  { name: "gemini", display: "Gemini", img: gemini },
  { name: "cancer", display: "Cancer", img: cancer },
  { name: "leo", display: "Leo", img: leo },
  { name: "virgo", display: "Virgo", img: virgo },
  { name: "libra", display: "Libra", img: libra },
  { name: "scorpio", display: "Scorpio", img: scorpio },
  { name: "sagittarius", display: "Sagittarius", img: sagittarius },
  { name: "capricorn", display: "Capricorn", img: capricorn },
  { name: "aquarius", display: "Aquarius", img: aquarius },
  { name: "pisces", display: "Pisces", img: pisces },
];

const TIME_PERIOD_INFO = {
  monthly: {
    title: "March 2026 Monthly Horoscope",
    description: "What the stars have in store for you this month",
    getData: getMonthlyHoroscope,
  },
  yearly: {
    title: "2026 Yearly Horoscope",
    description: "What the stars have in store for you this year",
    getData: getYearlyHoroscope,
  },
};

const StaticHoroscopesMonthlyAndYearly = () => {
  const { t } = useTranslation();
  const { timePeriod, zodiac } = useParams();
  const currentTimePeriod =
    timePeriod && TIME_PERIOD_INFO[timePeriod] ? timePeriod : "monthly";
  const selectedZodiac = zodiac || "aries";

  const horoscopeData = useMemo(() => {
    const getData = TIME_PERIOD_INFO[currentTimePeriod]?.getData;
    return getData ? getData(selectedZodiac) : null;
  }, [currentTimePeriod, selectedZodiac]);

  const timeInfo = TIME_PERIOD_INFO[currentTimePeriod];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* LEFT COLUMN - horoscope details - mobile में पहले */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 md:p-8 order-1 lg:order-1">

            {/* header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-orange-800 mb-2">
                {timeInfo?.title || "Horoscope"}
              </h1>
              <div className="w-20 h-0.5 bg-orange-200 mx-auto rounded-full my-4"></div>
              <p className="text-gray-600 text-sm md:text-base">
                {timeInfo?.description || "What the stars have in store for you"}
              </p>
            </div>

            {horoscopeData ? (
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-100">
                  {horoscopeData.title}
                </h2>

                <p className="text-gray-600 mb-8 leading-relaxed text-sm md:text-base">
                  {horoscopeData.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* career */}
                  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-orange-700 mb-3 flex items-center gap-2">
                      <span className="text-xl">💼</span> Career
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{horoscopeData.career}</p>
                    {currentTimePeriod === "monthly" && horoscopeData.favourable_dates?.career && (
                      <div className="mt-4">
                        <span className="text-xs font-medium text-orange-600 uppercase tracking-wider">
                          Best dates:
                        </span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {horoscopeData.favourable_dates.career.map((date) => (
                            <span
                              key={date}
                              className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-medium border border-orange-100"
                            >
                              {date} Mar
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* finance */}
                  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-orange-700 mb-3 flex items-center gap-2">
                      <span className="text-xl">💰</span> Finance
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{horoscopeData.finance}</p>
                    {currentTimePeriod === "monthly" && horoscopeData.favourable_dates?.finance && (
                      <div className="mt-4">
                        <span className="text-xs font-medium text-orange-600 uppercase tracking-wider">
                          Best dates:
                        </span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {horoscopeData.favourable_dates.finance.map((date) => (
                            <span
                              key={date}
                              className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-medium border border-orange-100"
                            >
                              {date} Mar
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* love */}
                  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-orange-700 mb-3 flex items-center gap-2">
                      <span className="text-xl">❤️</span> Love
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{horoscopeData.love}</p>
                    {currentTimePeriod === "monthly" && horoscopeData.favourable_dates?.love && (
                      <div className="mt-4">
                        <span className="text-xs font-medium text-orange-600 uppercase tracking-wider">
                          Best dates:
                        </span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {horoscopeData.favourable_dates.love.map((date) => (
                            <span
                              key={date}
                              className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-medium border border-orange-100"
                            >
                              {date} Mar
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* health */}
                  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-orange-700 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧘</span> Health
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{horoscopeData.health}</p>
                  </div>
                </div>

                {/* Watch Out Section - shown after all cards */}
                {horoscopeData.watch_out && (
                  <div className="mt-8 p-5 bg-red-50 border-l-4 border-amber-500 rounded-xl shadow-sm">
                    <div className="flex items-start gap-3">
                      {/* <span className="text-xl">⚠️</span> */}
                      <div>
                        <h4 className="font-semibold text-red-700 mb-1">Watch out</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {horoscopeData.watch_out}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-400">
                No horoscope data found for {zodiac}.
              </div>
            )}
          </div>



          {/* RIGHT COLUMN - zodiac signs - desktop */}

          <div className="lg:col-span-1 order-2 lg:order-2 bg-gray-80">
            {/* Desktop view - sticky column */}
            <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto hidden lg:block bg-white rounded-2xl shadow-2xl border border-gray-100 p-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

              <h2 className="text-lg font-semibold text-orange-800 mb-4 px-2">
                Zodiac Signs
              </h2>

              <div className="space-y-2">
                {ZODIAC_SIGNS.map((sign) => (
                  <Link
                    key={sign.name}
                    to={`/staticHoroschopes/${currentTimePeriod}/${sign.name}`}
                    className={`flex items-center gap-3 p-2 rounded-xl transition-all duration-200 ${selectedZodiac === sign.name
                      ? "bg-yellow-50 border border-amber-500 shadow-sm"
                      : "hover:bg-yellow-100 border border-gray-300"
                      }`}
                  >
                    <div className={`w-15 h-15 rounded-full flex-shrink-0 ${selectedZodiac === sign.name
                      ? "bg-orange-100"
                      : "bg-gray-100"
                      }`}>
                      <img
                        src={sign.img}
                        alt={sign.display}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className={`font-medium text-sm ${selectedZodiac === sign.name
                      ? "text-orange-800"
                      : "text-gray-900"
                      }`}>
                      {sign.display}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="bg-yellow-100 mt-6 p-6 rounded-2xl shadow">
                <h4 className="font-semibold mb-2">Need Personal Kundli Analysis?</h4>
                <p className="text-sm mb-3">
                  Get detailed horoscope consultation from expert astrologers.
                </p>
                <Link
                  to="/talk-to-astrologer"
                  className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-600 transition"
                >
                  Book Consultation
                </Link>
              </div>
            </div>

            {/* Mobile view - grid layout (3 columns) */}
            <div className="lg:hidden mt-6">
              <h2 className="text-lg font-semibold text-orange-800 mb-4">
                Zodiac Signs
              </h2>

              <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {ZODIAC_SIGNS.map((sign) => (
                  <Link
                    key={sign.name}
                    to={`/staticHoroschopes/${currentTimePeriod}/${sign.name}`}
                    className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${selectedZodiac === sign.name
                      ? "bg-yellow-50 border border-amber-500 shadow-sm"
                      : "bg-white border border-gray-200 hover:bg-gray-50"
                      }`}
                  >
                    <div className={`w-24 h-24 rounded-full p-1.5 mb-2 ${selectedZodiac === sign.name
                      ? "bg-orange-100"
                      : "bg-gray-100"
                      }`}>
                      <img
                        src={sign.img}
                        alt={sign.display}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className={`text-xs font-medium text-center ${selectedZodiac === sign.name
                      ? "text-orange-800"
                      : "text-gray-700"
                      }`}>
                      {sign.display}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Consultation box for mobile */}
              <div className="bg-yellow-100 mt-6 p-5 rounded-2xl shadow">
                <h4 className="font-semibold mb-2 text-sm">Need Personal Kundli Analysis?</h4>
                <p className="text-xs mb-3 text-gray-700">
                  Get detailed horoscope consultation from expert astrologers.
                </p>
                <Link
                  to={"/talk-to-astrologer"}
                  className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-yellow-600 transition w-full text-center"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticHoroscopesMonthlyAndYearly;



// import aries from "../../assets/zodiacSigns/aries.png";
// import aquarius from "../../assets/zodiacSigns/aquarius.png";
// import cancer from "../../assets/zodiacSigns/cancer.png";
// import capricorn from "../../assets/zodiacSigns/capricorn.png";
// import gemini from "../../assets/zodiacSigns/gemini.png";
// import leo from "../../assets/zodiacSigns/leo.png";
// import libra from "../../assets/zodiacSigns/libra.png";
// import pisces from "../../assets/zodiacSigns/pisces.png";
// import sagittarius from "../../assets/zodiacSigns/sagittarius.png";
// import scorpio from "../../assets/zodiacSigns/scorpio.png";
// import taurus from "../../assets/zodiacSigns/taurus.png";
// import virgo from "../../assets/zodiacSigns/virgo.png";

// import React, { useMemo } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";

// import {
//   getMonthlyHoroscope,
//   getYearlyHoroscope,
// } from "@/data/staticHoroscopesDataMonthlyAndYearly/staticHoroscopesDataMonthlyAndYearly";

// const ZODIAC_SIGNS = [
//   { name: "aries", img: aries },
//   { name: "taurus", img: taurus },
//   { name: "gemini", img: gemini },
//   { name: "cancer", img: cancer },
//   { name: "leo", img: leo },
//   { name: "virgo", img: virgo },
//   { name: "libra", img: libra },
//   { name: "scorpio", img: scorpio },
//   { name: "sagittarius", img: sagittarius },
//   { name: "capricorn", img: capricorn },
//   { name: "aquarius", img: aquarius },
//   { name: "pisces", img: pisces },
// ];

// const StaticHoroscopesMonthlyAndYearly = () => {

//   const { t } = useTranslation();

//   const { timePeriod, zodiac } = useParams();

//   const currentTimePeriod = timePeriod === "yearly" ? "yearly" : "monthly";

//   const selectedZodiac = zodiac || "aries";

//   const horoscopeData = useMemo(() => {
//     const getData =
//       currentTimePeriod === "monthly"
//         ? getMonthlyHoroscope
//         : getYearlyHoroscope;

//     return getData ? getData(selectedZodiac) : null;
//   }, [currentTimePeriod, selectedZodiac]);

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">

//       <div className="max-w-7xl mx-auto">

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

//           {/* LEFT COLUMN */}

//           <div className="lg:col-span-3 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 md:p-8">

//             {/* header */}

//             <div className="text-center mb-8">

//               <h1 className="text-3xl md:text-4xl font-bold text-orange-800 mb-2">

//                 {currentTimePeriod === "monthly"
//                   ? t("time.monthlyTitle")
//                   : t("time.yearlyTitle")}

//               </h1>

//               <div className="w-20 h-0.5 bg-orange-200 mx-auto rounded-full my-4"></div>

//               <p className="text-gray-600 text-sm md:text-base">

//                 {currentTimePeriod === "monthly"
//                   ? t("time.monthlyDesc")
//                   : t("time.yearlyDesc")}

//               </p>

//             </div>

//             {horoscopeData ? (

//               <div>

//                 <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-100">

//                   {t("horoscopeData.title")}

//                 </h2>

//                 <p className="text-gray-600 mb-8 leading-relaxed text-sm md:text-base">

//                    {t("horoscopeData.description")}

//                 </p>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//                   {/* Career */}

//                   <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">

//                     <h3 className="text-lg font-semibold text-orange-700 mb-3 flex items-center gap-2">

//                       <span className="text-xl">💼</span>

//                       {t("section.career")}

//                     </h3>

//                     <p className="text-gray-600 text-sm leading-relaxed">

//                       {/* {horoscopeData.career} */}
//                           {t("aries.career")}

//                     </p>

//                     {currentTimePeriod === "monthly" &&
//                       horoscopeData.favourable_dates?.career && (

//                         <div className="mt-4">

//                           <span className="text-xs font-medium text-orange-600 uppercase tracking-wider">

//                             {t("bestDates")}

//                           </span>

//                           <div className="flex flex-wrap gap-2 mt-2">

//                             {horoscopeData.favourable_dates.career.map((date) => (

//                               <span
//                                 key={date}
//                                 className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-medium border border-orange-100"
//                               >
//                                 {date} Mar
//                               </span>

//                             ))}

//                           </div>

//                         </div>

//                       )}

//                   </div>

//                   {/* Finance */}

//                   <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">

//                     <h3 className="text-lg font-semibold text-orange-700 mb-3 flex items-center gap-2">

//                       <span className="text-xl">💰</span>

//                       {t("section.finance")}

//                     </h3>

//                     <p className="text-gray-600 text-sm leading-relaxed">

//                       {/* {horoscopeData.finance} */}
//                          {t("aries.finance")}

//                     </p>
//                       {currentTimePeriod === "monthly" && horoscopeData.favourable_dates?.finance && (
//                       <div className="mt-4">
//                         <span className="text-xs font-medium text-orange-600 uppercase tracking-wider">
//                         {t("bestDates")}
//                         </span>
//                         <div className="flex flex-wrap gap-2 mt-2">
//                           {horoscopeData.favourable_dates.finance.map((date) => (
//                             <span
//                               key={date}
//                               className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-medium border border-orange-100"
//                             >
//                               {date} Mar
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                   </div>

//                   {/* Love */}

//                   <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">

//                     <h3 className="text-lg font-semibold text-orange-700 mb-3 flex items-center gap-2">

//                       <span className="text-xl">❤️</span>

//                       {t("section.love")}

//                     </h3>

//                     <p className="text-gray-600 text-sm leading-relaxed">

//                       {/* {horoscopeData.love} */}
//                       {t("aries.love")}
//                     </p>
//                        {currentTimePeriod === "monthly" && horoscopeData.favourable_dates?.love && (
//                       <div className="mt-4">
//                         <span className="text-xs font-medium text-orange-600 uppercase tracking-wider">
//                         {t("bestDates")}
//                         </span>
//                         <div className="flex flex-wrap gap-2 mt-2">
//                           {horoscopeData.favourable_dates.love.map((date) => (
//                             <span
//                               key={date}
//                               className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-medium border border-orange-100"
//                             >
//                               {date} Mar
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                   </div>

//                   {/* Health */}

//                   <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">

//                     <h3 className="text-lg font-semibold text-orange-700 mb-3 flex items-center gap-2">

//                       <span className="text-xl">🧘</span>

//                       {t("section.health")}

//                     </h3>

//                     <p className="text-gray-600 text-sm leading-relaxed">

//                       {/* {horoscopeData.health} */}
//                           {t("aries.health")}

//                     </p>

//                   </div>

//                 </div>

//               </div>

//             ) : (

//               <div className="text-center py-10 text-gray-400">

//                 {t("noData")} {t(`zodiac.${selectedZodiac}`)}

//               </div>

//             )}

//           </div>

//           {/* RIGHT COLUMN */}

//           <div className="lg:col-span-1">

//             <div className="lg:sticky lg:top-24 hidden lg:block bg-white rounded-2xl shadow-2xl border border-gray-100 p-4">

//               <h2 className="text-lg font-semibold text-orange-800 mb-4 px-2">

//                 {t("zodiacSigns")}

//               </h2>

//               <div className="space-y-2">

//                 {ZODIAC_SIGNS.map((sign) => (

//                   <Link
//                     key={sign.name}
//                     to={`/staticHoroschopes/${currentTimePeriod}/${sign.name}`}
//                     className={`flex items-center gap-3 p-2 rounded-xl ${
//                       selectedZodiac === sign.name
//                         ? "bg-yellow-50 border border-amber-500"
//                         : "hover:bg-yellow-100 border border-gray-300"
//                     }`}
//                   >

//                     <div className="w-14 h-14 rounded-full bg-gray-100">

//                       <img
//                         src={sign.img}
//                         alt={sign.name}
//                         className="w-full h-full object-contain"
//                       />

//                     </div>

//                     <span className="font-medium text-sm">

//                       {t(`zodiac.${sign.name}`)}

//                     </span>

//                   </Link>

//                 ))}

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default StaticHoroscopesMonthlyAndYearly;