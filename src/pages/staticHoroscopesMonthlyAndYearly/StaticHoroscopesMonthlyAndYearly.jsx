// src/pages/StaticHoroscopesMonthlyAndYearly.jsx
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getHoroscope,
  getHoroscopeById,
  clearCurrentHoroscope,
} from '@/redux/slice/HoroscopesSlice';

// Zodiac images (unchanged)
import aries from '../../assets/zodiacSigns/aries.png';
import aquarius from '../../assets/zodiacSigns/aquarius.png';
import cancer from '../../assets/zodiacSigns/cancer.png';
import capricorn from '../../assets/zodiacSigns/capricorn.png';
import gemini from '../../assets/zodiacSigns/gemini.png';
import leo from '../../assets/zodiacSigns/leo.png';
import libra from '../../assets/zodiacSigns/libra.png';
import pisces from '../../assets/zodiacSigns/pisces.png';
import sagittarius from '../../assets/zodiacSigns/sagittarius.png';
import scorpio from '../../assets/zodiacSigns/scorpio.png';
import taurus from '../../assets/zodiacSigns/taurus.png';
import virgo from '../../assets/zodiacSigns/virgo.png';

const ZODIAC_SIGNS = [
  { name: 'aries', display: 'Aries', img: aries },
  { name: 'taurus', display: 'Taurus', img: taurus },
  { name: 'gemini', display: 'Gemini', img: gemini },
  { name: 'cancer', display: 'Cancer', img: cancer },
  { name: 'leo', display: 'Leo', img: leo },
  { name: 'virgo', display: 'Virgo', img: virgo },
  { name: 'libra', display: 'Libra', img: libra },
  { name: 'scorpio', display: 'Scorpio', img: scorpio },
  { name: 'sagittarius', display: 'Sagittarius', img: sagittarius },
  { name: 'capricorn', display: 'Capricorn', img: capricorn },
  { name: 'aquarius', display: 'Aquarius', img: aquarius },
  { name: 'pisces', display: 'Pisces', img: pisces },
];

const TIME_PERIOD_INFO = {
  monthly: {
    title: 'April 2025 Monthly Horoscope',
    description: 'What the stars have in store for you this month',
  },
  yearly: {
    title: '2026 Yearly Horoscope',
    description: 'What the stars have in store for you this year',
  },
};

// Map section keys to emoji icons
const sectionIcons = {
  career: '💼',
  finance: '💰',
  love: '❤️',
  health: '🧘',
  family: '👨‍👩‍👧‍👦',
  students: '🎓',
  // default for any other key
  default: '📖'
};

// Reusable section card component
const SectionCard = ({ title, text, dates, isMonthly }) => {
  if (!text) return null;
  const icon = sectionIcons[title.toLowerCase()] || sectionIcons.default;
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-orange-700 mb-3 flex items-center gap-2">
        <span className="text-xl">{icon}</span> {title.charAt(0).toUpperCase() + title.slice(1)}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
      {isMonthly && dates && dates.length > 0 && (
        <div className="mt-4">
          <span className="text-xs font-medium text-orange-600 uppercase tracking-wider">Best dates:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {dates.map((date) => (
              <span key={date} className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-medium border border-orange-100">
                {date} Mar
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const StaticHoroscopesMonthlyAndYearly = () => {
  const { timePeriod, zodiac } = useParams();
  const dispatch = useDispatch();

  const currentTimePeriod = timePeriod === 'yearly' ? 'yearly' : 'monthly';
  const selectedZodiac = zodiac || 'aries';

  // Redux state selectors
  const idMap = useSelector((state) => state.horoscope.idMap);
  const currentHoroscope = useSelector((state) => state.horoscope.currentHoroscope);
  const loading = useSelector((state) => state.horoscope.loading);
  const error = useSelector((state) => state.horoscope.error);

  // Fetch all horoscopes once to build ID map
  useEffect(() => {
    if (Object.keys(idMap).length === 0) {
      dispatch(getHoroscope());
    }
  }, [dispatch, idMap]);

  // When period or zodiac changes, fetch the specific horoscope by ID
  useEffect(() => {
    const key = `${currentTimePeriod}-${selectedZodiac}`;
    const id = idMap[key];
    if (id) {
      dispatch(getHoroscopeById(id));
    } else if (Object.keys(idMap).length > 0) {
      dispatch(clearCurrentHoroscope());
    }
  }, [currentTimePeriod, selectedZodiac, idMap, dispatch]);

  const timeInfo = TIME_PERIOD_INFO[currentTimePeriod];

  // Build dynamic sections from API data
  const horoscopeData = currentHoroscope
    ? {
        title: currentHoroscope.title,
        description: currentHoroscope.overview,
        sections: Object.entries(currentHoroscope.sections || {})
          .filter(([_, section]) => section?.text && section.text.trim() !== '')
          .map(([key, section]) => ({
            key,
            title: key.charAt(0).toUpperCase() + key.slice(1),
            text: section.text,
            dates: section.dates || null,
          })),
        watch_out: currentHoroscope.warning || null,
      }
    : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 md:p-8 order-1 lg:order-1">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-orange-800 mb-2">
                {timeInfo?.title || 'Horoscope'}
              </h1>
              <div className="w-20 h-0.5 bg-orange-200 mx-auto rounded-full my-4"></div>
              <p className="text-gray-600 text-sm md:text-base">
                {timeInfo?.description || 'What the stars have in store for you'}
              </p>
            </div>

            {loading && (
              <div className="text-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-600 mx-auto mb-4"></div>
                <p className="text-gray-500">Loading horoscope...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-10 text-red-500">
                <p>Error: {error}</p>
                <button
                  onClick={() => {
                    const key = `${currentTimePeriod}-${selectedZodiac}`;
                    const id = idMap[key];
                    if (id) dispatch(getHoroscopeById(id));
                  }}
                  className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                >
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && horoscopeData && (
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-100">
                  {horoscopeData.title}
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed text-sm md:text-base">
                  {horoscopeData.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {horoscopeData.sections.map((section) => (
                    <SectionCard
                      key={section.key}
                      title={section.title}
                      text={section.text}
                      dates={section.dates}
                      isMonthly={currentTimePeriod === 'monthly'}
                    />
                  ))}
                </div>

                {horoscopeData.watch_out && (
                  <div className="mt-8 p-5 bg-red-50 border-l-4 border-amber-500 rounded-xl shadow-sm">
                    <div className="flex items-start gap-3">
                      <div>
                        <h4 className="font-semibold text-red-700 mb-1">Watch out</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">{horoscopeData.watch_out}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!loading && !error && !horoscopeData && Object.keys(idMap).length > 0 && (
              <div className="text-center py-10 text-gray-400">
                No horoscope data found for {selectedZodiac}.
              </div>
            )}
          </div>

          {/* RIGHT COLUMN - zodiac signs (unchanged) */}
          <div className="lg:col-span-1 order-2 lg:order-2 bg-gray-80">
            {/* Desktop view */}
            <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto hidden lg:block bg-white rounded-2xl shadow-2xl border border-gray-100 p-4">
              <h2 className="text-lg font-semibold text-orange-800 mb-4 px-2">Zodiac Signs</h2>
              <div className="space-y-2">
                {ZODIAC_SIGNS.map((sign) => (
                  <Link
                    key={sign.name}
                    to={`/findHoroschope/${currentTimePeriod}/${sign.name}`}
                    className={`flex items-center gap-3 p-2 rounded-xl transition-all duration-200 ${
                      selectedZodiac === sign.name
                        ? 'bg-yellow-50 border border-amber-500 shadow-sm'
                        : 'hover:bg-yellow-100 border border-gray-300'
                    }`}
                  >
                    <div className={`w-15 h-15 rounded-full flex-shrink-0 ${selectedZodiac === sign.name ? 'bg-orange-100' : 'bg-gray-100'}`}>
                      <img src={sign.img} alt={sign.display} className="w-full h-full object-contain" />
                    </div>
                    <span className={`font-medium text-sm ${selectedZodiac === sign.name ? 'text-orange-800' : 'text-gray-900'}`}>
                      {sign.display}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="bg-yellow-100 mt-6 p-6 rounded-2xl shadow">
                <h4 className="font-semibold mb-2">Need Personal Kundli Analysis?</h4>
                <p className="text-sm mb-3">Get detailed horoscope consultation from expert astrologers.</p>
                <Link to="/talk-to-astrologer" className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-600 transition">
                  Book Consultation
                </Link>
              </div>
            </div>

            {/* Mobile view */}
            <div className="lg:hidden mt-6">
              <h2 className="text-lg font-semibold text-orange-800 mb-4">Zodiac Signs</h2>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {ZODIAC_SIGNS.map((sign) => (
                  <Link
                    key={sign.name}
                    to={`/findHoroschope/${currentTimePeriod}/${sign.name}`}
                    className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${
                      selectedZodiac === sign.name
                        ? 'bg-yellow-50 border border-amber-500 shadow-sm'
                        : 'bg-white border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-24 h-24 rounded-full p-1.5 mb-2 ${selectedZodiac === sign.name ? 'bg-orange-100' : 'bg-gray-100'}`}>
                      <img src={sign.img} alt={sign.display} className="w-full h-full object-contain" />
                    </div>
                    <span className={`text-xs font-medium text-center ${selectedZodiac === sign.name ? 'text-orange-800' : 'text-gray-700'}`}>
                      {sign.display}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="bg-yellow-100 mt-6 p-5 rounded-2xl shadow">
                <h4 className="font-semibold mb-2 text-sm">Need Personal Kundli Analysis?</h4>
                <p className="text-xs mb-3 text-gray-700">Get detailed horoscope consultation from expert astrologers.</p>
                <Link to="/talk-to-astrologer" className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-yellow-600 transition w-full text-center">
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