"use client";

import React from "react";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const Slider = ({ children, slideCount }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const maxSlidesPerView = Math.max(2, slideCount || 1);
  const minSlidesRequired = maxSlidesPerView * 2;
  const shouldLoop = children?.length >= minSlidesRequired;

  return (
    <div className="relative mb-4">
      {/* Prev Button */}
      <button
        ref={prevRef}
        className="absolute lg:-left-8 -left-2 top-1/2 z-10 -translate-y-1/2
        bg-primary text-black shadow-md rounded-full w-10 h-10
        md:flex hidden items-center justify-center"
      >
        <FaArrowLeft />
      </button>

      {/* Next Button */}
      <button
        ref={nextRef}
        className="absolute lg:-right-8 -right-2 top-1/2 z-10 -translate-y-1/2
        bg-primary text-black shadow-md rounded-full w-10 h-10
        md:flex hidden items-center justify-center"
      >
        <FaArrowRight />
      </button>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        loop={shouldLoop}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: slideCount },
        }}
      >
        {children &&
          children.map((child, index) => (
            <SwiperSlide key={index}>{child}</SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Slider;
