import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { MoveRight, Phone, ShoppingBag } from "lucide-react";
import { IoIosChatbubbles } from "react-icons/io";
import { Link } from "react-router-dom";

const BannerCopy = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
              transform: `translateX(${-currentIndex * 100}%)`,
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

      {/*
            <div className="container">


                <div
                    className="flex flex-wrap justify-center gap-4 sm:gap-5 md:gap-6 px-4 sm:px-6 py-3"
                >



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
                                    Talk
                                </div>

                                <div className="text-[9px] sm:text-xs opacity-90">
                                    Talk with astrologer
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
                                    Shop
                                </div>

                                <div className="text-[9px] sm:text-xs opacity-90">
                                    Buy your products
                                </div>
                            </div>
                        </div>

                        <MoveRight className="relative z-10 w-4 h-4 transition-all duration-300 group-hover:translate-x-2" />
                    </Link>
                </div>


            </div>


*/}
    </section>
  );
};

export default BannerCopy;
