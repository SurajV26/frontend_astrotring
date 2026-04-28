import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { MoveRight, Phone, ShoppingBag } from "lucide-react";
import { IoIosChatbubbles } from "react-icons/io";
import { Link } from "react-router-dom";

import outercircle1 from "@/assets/outercircle1.png";
import innerganesh from "@/assets/innerganesh.png";
import { useTranslation } from "react-i18next";
// import bannerVideo from "@/assets/bannerVideo.mp4"
const Banner = () => {
  // const { t } = useTranslation();
  const { t, i18n } = useTranslation();
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isRTL = i18n.language === "ar";

  useEffect(() => {
    fetch("https://astro.astrotring.com/api/banners?type=astro")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data?.data?.length > 0) {
          const sorted = [...data.data].sort(
            (a, b) => a.sort_order - b.sort_order,
          );
          setBanners(sorted);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;

    const currentItem = banners[currentIndex];

    if (currentItem?.media_type === "image") {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, banners]);

  return (
    <section className="py-0 from-orange-50 via-yellow-100 to-red-100">
      <div className="w-full h-full mx-auto overflow-hidden border-8 border-white">
        {banners.length > 0 && (
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(${isRTL ? currentIndex * 100 : -currentIndex * 100}%)`,
            }}
          >
            {banners.map((item) => (
              <div key={item.id} className="w-full h-full flex-shrink-0">
                {item.media_type === "video" ? (
                  <video
                    src={item.media_url}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    onEnded={() =>
                      setCurrentIndex((prev) => (prev + 1) % banners.length)
                    }
                  />
                ) : (
                  <img
                    src={item.media_url}
                    alt="banner"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="container">
        <div
          className="
          flex flex-wrap
          justify-center
          gap-4 sm:gap-5 md:gap-6   /* spacing improved */
          px-4 sm:px-6
          py-3                      /* thoda kam vertical spacing */
        "
        >
          {/* 
          <Card className="relative w-[130px] sm:w-[170px] md:w-[210px] lg:w-[280px] border-0 font-medium group">
            <span className="absolute inset-0 transition-all duration-500 ease-out transform -skew-x-12 bg-gradient-to-r from-[#FFD54F] via-[#FFB300] to-[#F57C00] group-hover:skew-x-12" />
            <span className="absolute inset-0 transition-all duration-500 ease-out transform skew-x-12 opacity-90 bg-gradient-to-r from-[#FFF176] via-[#f9ce86] to-[#ffdbc7] group-hover:-skew-x-12" />

            <Link to="/talk-to-astrologer" className="relative z-10 block">
              <CardHeader className="flex items-center justify-between px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 lg:px-6 lg:py-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-10 lg:h-10 rounded-full bg-white/20 backdrop-blur-md transition-all duration-300 group-hover:scale-110">
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                  </span>

                  <div className="leading-tight">


                  
                    <div className="font-semibold text-[10px] sm:text-xs md:text-sm lg:text-lg">
                      Talk
                    </div>




                    <div className="text-[8px] sm:text-[10px] md:text-xs opacity-90">
                      Talk with astrologer
                    </div>
                  </div>
                </div>

                <MoveRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-all duration-300 group-hover:translate-x-2" />
              </CardHeader>
            </Link>
          </Card>

          <Card className="relative w-[130px] sm:w-[170px] md:w-[210px] lg:w-[280px] border-0 font-medium group">
            <span className="absolute inset-0 transition-all duration-500 ease-out transform -skew-x-12 bg-gradient-to-r from-[#FFD54F] via-[#FFB300] to-[#F57C00] group-hover:skew-x-12" />
            <span className="absolute inset-0 transition-all duration-500 ease-out transform skew-x-12 opacity-90 bg-gradient-to-r from-[#FFF176] via-[#f9ce86] to-[#ffdbc7] group-hover:-skew-x-12" />

            <Link
              to="https://store.adkrayons.com/product"
              target="_blank"
              className="relative z-10 block"
            >
              <CardHeader className="flex items-center justify-between px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 lg:px-6 lg:py-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-10 lg:h-10 rounded-full bg-white/20 backdrop-blur-md transition-all duration-300 group-hover:scale-110">
                    <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                  </span>

                  <div className="leading-tight">
                    <div className="font-semibold text-[10px] sm:text-xs md:text-sm lg:text-lg">
                      Store
                    </div>
                    <div className="text-[8px] sm:text-[10px] md:text-xs opacity-90">
                      Buy your products
                    </div>
                  </div>
                </div>

                <MoveRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-all duration-300 group-hover:translate-x-2" />
              </CardHeader>
            </Link>
          </Card> */}

          {/* <Link to="/talk-to-astrologer" data-twe-ripple-init data-twe-ripple-color="light" className="inline-flex items-center justify-between gap-3  w-[130px] sm:w-[170px] md:w-[210px] lg:w-[220px] rounded-lg bg-gradient-to-r from-[#FFD54F] via-[#FFB300] to-[#F57C00] px-3 py-2 sm:px-4 sm:py-3 text-black shadow-md transition-all duration-300 ease-in-out hover:bg-orange-600 hover:scale-105 hover:shadow-lg active:scale-95">
            <div className="flex items-center gap-2 sm:gap-3">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
              <div className="leading-tight">
                <div className="font-semibold text-[11px] sm:text-sm">Talk</div>
                <div className="text-[9px] sm:text-xs opacity-90">
                  Talk with astrologer
                </div>
              </div>
            </div>

            <MoveRight className="w-4 h-4 transition-transform duration-300 hover:translate-x-1" />
          </Link> */}
          <Link
            to="/talk-to-astrologer"
            data-twe-ripple-init
            data-twe-ripple-color="light"
            className="group relative inline-flex items-center justify-between gap-3
              w-[130px] sm:w-[170px] md:w-[210px] lg:w-[240px]
              rounded-xl px-3 py-2 sm:px-4 sm:py-3
              text-black font-medium
              bg-gradient-to-r from-[#FFD54F] via-[#FFB300] to-[#F57C00]
              shadow-md overflow-hidden
              transition-all duration-300 ease-in-out
              hover:scale-105 hover:shadow-[0_10px_25px_rgba(245,124,0,0.5)]"
          >
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition duration-300"></span>

            <div className="flex items-center gap-2 sm:gap-3 relative z-10">
              <span
                className="flex items-center justify-center
                  w-7 h-7 sm:w-8 sm:h-8
                  rounded-full bg-white/30 backdrop-blur-md
                  transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
              >
                <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>

              <div className="leading-tight">
                <div className="font-semibold text-[11px] sm:text-sm">
                  {t("talk")}
                </div>

                <div className="text-[9px] sm:text-xs opacity-90">
                  {t("talkWithAstrologer")}
                </div>
              </div>
            </div>

            <MoveRight className="relative z-10 w-4 h-4 transition-all duration-300 group-hover:translate-x-2" />
          </Link>

          <Link
            to="https://astrotring.shop"
            target="_blank"
            data-twe-ripple-init
            data-twe-ripple-color="light"
            className="group relative inline-flex items-center justify-between gap-3
              w-[130px] sm:w-[170px] md:w-[210px] lg:w-[240px]
              rounded-xl px-3 py-2 sm:px-4 sm:py-3
              text-black font-medium
              bg-gradient-to-r from-[#FFD54F] via-[#FFB300] to-[#F57C00]
              shadow-md overflow-hidden
              transition-all duration-300 ease-in-out
              hover:scale-105 hover:shadow-[0_10px_25px_rgba(245,124,0,0.5)]"
          >
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition duration-300"></span>

            <div className="flex items-center gap-2 sm:gap-3 relative z-10">
              <span
                className="flex items-center justify-center
                  w-7 h-7 sm:w-8 sm:h-8
                  rounded-full bg-white/30 backdrop-blur-md
                  transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
              >
                <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>

              <div className="leading-tight">
                <div className="font-semibold text-[11px] sm:text-sm">
                  {t("shop")}
                </div>

                <div className="text-[9px] sm:text-xs opacity-90">
                  {t("buyProducts")}
                </div>
              </div>
            </div>

            <MoveRight className="relative z-10 w-4 h-4 transition-all duration-300 group-hover:translate-x-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
