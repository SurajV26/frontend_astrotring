import React from "react";

const BannerSlider = () => {
  const items = [
    "Free Kundli",
    "Kundli Matching",
    "Compatibility",
    "Horoscopes",
    "Chat / Call to Astrologer",
  ];

  return (
    <>
      <style>
        {`
          .scrollleft {
            animation: scrollleft 25s linear infinite;
          }

          .scrollright {
            animation: scrollright 25s linear infinite;
          }

          @keyframes scrollleft {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          @keyframes scrollright {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(50%);
            }
          }
        `}
      </style>

      <div className="w-full overflow-hidden py-2 sm:py-3 md:py-4 bg-gradient-to-r from-yellow-200/90 via-orange-400/80 to-amber-300/90 backdrop-blur-md mt-4">
        <div
          className="flex w-max items-center scrollleft"
        >
          {[...items, ...items, ...items].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center
              gap-2 sm:gap-3 md:gap-4
              mx-3 sm:mx-4 md:mx-6
              px-2 sm:px-3 md:px-4
              py-1.5 sm:py-2 md:py-3
              text-white
              text-xs sm:text-sm md:text-base lg:text-lg
              whitespace-nowrap rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 22"
                className="fill-current w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary"
              >
                <path d="M17.78 11.302c-1.648-.392-4.2-1.1-5.606-2.389C10.496 7.37 9.629 2.813 9.18.234a.289.289 0 0 0-.568.007c-.4 2.646-1.267 7.425-3.181 9.052a12.531 12.531 0 0 1-5.2 2.052.28.28 0 0 0 0 .55c1.663.385 4.268 1.151 5.79 2.675 1.435 1.44 2.172 4.984 2.553 7.194a.289.289 0 0 0 .568-.007c.348-2.2 1.043-5.743 2.456-7.187 1.581-1.613 4.437-2.368 6.182-2.719a.281.281 0 0 0 0-.549Z" />
              </svg>

              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BannerSlider;
