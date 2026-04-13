import React from 'react';
import { Link } from 'react-router-dom';


import ariesImg from '../../assets/zodiacSigns/aries.png';
import aquariusImg from '../../assets/zodiacSigns/aquarius.png';
import cancerImg from '../../assets/zodiacSigns/cancer.png';
import capricornImg from '../../assets/zodiacSigns/capricorn.png';
import geminiImg from '../../assets/zodiacSigns/gemini.png';
import leoImg from '../../assets/zodiacSigns/leo.png';
import libraImg from '../../assets/zodiacSigns/libra.png';
import piscesImg from '../../assets/zodiacSigns/pisces.png';
import sagittariusImg from '../../assets/zodiacSigns/sagittarius.png';
import scorpioImg from '../../assets/zodiacSigns/scorpio.png';
import taurusImg from '../../assets/zodiacSigns/taurus.png';
import virgoImg from '../../assets/zodiacSigns/virgo.png';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';


// const zodiacSigns = [
//   { name: 'Aries', img: ariesImg, path: '/findHoroschope/monthly/aries' },
//   { name: 'Aquarius', img: aquariusImg, path: '/findHoroschope/monthly/aquarius' },
//   { name: 'Cancer', img: cancerImg, path: '/findHoroschope/monthly/cancer' },
//   { name: 'Capricorn', img: capricornImg, path: '/findHoroschope/monthly/capricorn' },
//   { name: 'Gemini', img: geminiImg, path: '/findHoroschope/monthly/gemini' },
//   { name: 'Leo', img: leoImg, path: '/findHoroschope/monthly/leo' },
//   { name: 'Libra', img: libraImg, path: '/findHoroschope/monthly/libra' },
//   { name: 'Pisces', img: piscesImg, path: '/findHoroschope/monthly/pisces' },
//   { name: 'Sagittarius', img: sagittariusImg, path: '/findHoroschope/monthly/sagittarius' },
//   { name: 'Scorpio', img: scorpioImg, path: '/findHoroschope/monthly/scorpio' },
//   { name: 'Taurus', img: taurusImg, path: '/findHoroschope/monthly/taurus' },
//   { name: 'Virgo', img: virgoImg, path: '/findHoroschope/monthly/virgo' },
  
// ];


const zodiacSigns = [
  { key: 'aries', img: ariesImg, path: '/findHoroschope/monthly/aries' },
  { key: 'aquarius', img: aquariusImg, path: '/findHoroschope/monthly/aquarius' },
  { key: 'cancer', img: cancerImg, path: '/findHoroschope/monthly/cancer' },
  { key: 'capricorn', img: capricornImg, path: '/findHoroschope/monthly/capricorn' },
  { key: 'gemini', img: geminiImg, path: '/findHoroschope/monthly/gemini' },
  { key: 'leo', img: leoImg, path: '/findHoroschope/monthly/leo' },
  { key: 'libra', img: libraImg, path: '/findHoroschope/monthly/libra' },
  { key: 'pisces', img: piscesImg, path: '/findHoroschope/monthly/pisces' },
  { key: 'sagittarius', img: sagittariusImg, path: '/findHoroschope/monthly/sagittarius' },
  { key: 'scorpio', img: scorpioImg, path: '/findHoroschope/monthly/scorpio' },
  { key: 'taurus', img: taurusImg, path: '/findHoroschope/monthly/taurus' },
  { key: 'virgo', img: virgoImg, path: '/findHoroschope/monthly/virgo' },
];

const ZodiacPredictions = () => {

const {t}=useTranslation();
  const { horoscope, loading } = useSelector((state) => state.horoscope);

  return (
    <section className="py-10 bg-gradient-to-b from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <h3 className=" font-bold text-center mb-12  bg-clip-text ">
         {t("monthlyPrediction")}
        </h3>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-6">
          {/* {zodiacSigns.map((sign) => (
            <Link
              key={sign.name}
              to={sign.path}
              className="group flex flex-col items-center p-3 rounded-xl bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100 p-1">
                {sign.img ? (
                  <img
                    src={sign.img}
                    alt={sign.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center text-purple-800 font-bold text-xl">
                    {sign.name.charAt(0)}
                  </div>
                )}
              </div>
              <span className="mt-2 text-sm md:text-base font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
                {sign.name}
              </span>
            </Link>
          ))} */}
{zodiacSigns.map((sign) => (
  <Link
    key={sign.key}
    to={sign.path}
    className="group flex flex-col items-center p-3 rounded-xl bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
  >
    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100 p-1">
      <img
        src={sign.img}
        alt={t(`zodiac.${sign.key}`)}
        className="w-full h-full object-cover rounded-full"
      />
    </div>

    <span className="mt-2 text-sm md:text-base font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
      {t(`zodiac.${sign.key}`)}
    </span>
  </Link>
))}

        </div>
      </div>
    </section>
  );
};

export default ZodiacPredictions;