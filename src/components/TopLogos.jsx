// import { useEffect, useState } from 'react';
// import lowerLogo from "/lowerLogo.jpeg";
// import upperLogo from "/upperLogo.jpeg";

// const TopLogos = () => {
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsVisible(window.scrollY <= 5000);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <div
//       className={`
//         w-full
//         overflow-hidden
//         transition-all
//         duration-500
//         ease-in-out
        
//         ${isVisible ? 'max-h-48 ' : 'max-h-0 py-0'}
//       `}
//     >
//       <div className="flex flex-col items-center justify-center bg-gradient-to-b from-yellow-50 to-white ">
        
//         {/* Upper rotating logo - responsive size */}
//         <div className="animate-spin-slow  mb-1 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20">
//           <img 
//             src={upperLogo} 
//             alt="upper" 
//             className="w-full h-full object-contain"
//           />
//         </div>

//         {/* Lower static logo - responsive size */}
//         <div className="text-sm font-semibold text-gray-700 ">
//           <img 
//             src={lowerLogo} 
//             alt="lower" 
//             className="h-8 sm:h-10 md:h-12 w-auto object-contain"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TopLogos;


import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import lowerLogo from "/lowerLogo.jpeg";
import upperLogo from "/upperLogo.jpeg";

const messages = [
  {
    text: "Join Our Community of Expert Astrologers",
    link: "/offer-page"
  },
  {
    text: "विशेषज्ञ ज्योतिषियों के हमारे समुदाय से जुड़ें",
    link: "/offer-page"
  },
  {
    text: "Exclusive Introductory Offers – Limited Time For New Users",
    link: "/offer-page"
  },
  {
    text: "विशेष प्रारंभिक ऑफ़र – नए उपयोगकर्ताओं के लिए सीमित समय के लिए",
    link: "/offer-page"
  },
  {
    text: "Special Introductory Deals to Begin Your Astro Journey",
    link: "/offer-page"
  },
  {
    text: "अपनी ज्योतिष यात्रा शुरू करने के लिए विशेष प्रारंभिक ऑफ़र",
    link: "/findHoroschope/monthly"
  },
  {
    text: "Begin Your Astro Journey with Exclusive Introductory Offers",
    link: "/offer-page"
  },
  {
    text: "विशेष प्रारंभिक ऑफ़र के साथ अपनी ज्योतिष यात्रा शुरू करें",
    link: "/blogs"
  }
];

const TopLogos = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY <= 5000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const handleNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setIndex((prev) => (prev + 1) % messages.length);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setIndex((prev) => (prev - 1 + messages.length) % messages.length);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div
      className={`w-full overflow-hidden transition-all duration-500 ease-in-out
      ${isVisible ? "max-h-72" : "max-h-0 py-0"}`}
    >
      {/* Slider Patti */}
      <div className="w-full bg-black flex items-center px-3 py-2 shadow-lg">

        <button
          onClick={handlePrev}
          className="p-1 rounded-full text-white hover:bg-white/20 transition mr-2"
        >
          <ChevronLeft size={22} />
        </button>

        <div className="overflow-hidden flex-1">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className="min-w-full text-center text-[11px] sm:text-xs md:text-sm font-normal tracking-wide text-white"
              >
                <a
                  href={msg.link}
                  className="text-white hover:text-yellow-400 transition"
                >
                  {msg.text}
                </a>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="p-1 rounded-full text-white hover:bg-white/20 transition ml-2"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Logo Section */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-b from-yellow-50 to-white pt-6 ">

        <div className="animate-spin-slow mb-2 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20">
          <img
            src={upperLogo}
            alt="upper"
            className="w-full h-full object-contain"
          />
        </div>

        <img
          src={lowerLogo}
          alt="lower"
          className="h-8 sm:h-10 md:h-12 w-auto object-contain"
        />

      </div>
    </div>
  );
};

export default TopLogos;
