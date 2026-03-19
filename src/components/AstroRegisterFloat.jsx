import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AstroRegisterFloat = () => {
  const boxRef = useRef(null);
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const navigate = useNavigate();

  const handleStart = (clientX, clientY) => {
    isDragging.current = true;
    const rect = boxRef.current.getBoundingClientRect();
    offset.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const handleMove = (clientX, clientY) => {
    if (!isDragging.current) return;

    boxRef.current.style.left = `${clientX - offset.current.x}px`;
    boxRef.current.style.top = `${clientY - offset.current.y}px`;
  };

  const handleEnd = () => {
    isDragging.current = false;
    if (boxRef.current) {
      boxRef.current.style.cursor = "grab";
    }
  };

  useEffect(() => {
    const move = (e) => handleMove(e.clientX, e.clientY);

    const touchMove = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", handleEnd);

    document.addEventListener("touchmove", touchMove);
    document.addEventListener("touchend", handleEnd);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", handleEnd);

      document.removeEventListener("touchmove", touchMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, []);

  return (
    <div
      ref={boxRef}
      style={{ touchAction: "none" }}
      onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
      onTouchStart={(e) => {
        const touch = e.touches[0];
        handleStart(touch.clientX, touch.clientY);
      }}
      className="fixed left-4 top-[40%] sm:top-[15%] z-[9999] cursor-grab"
    >
      <div
        className="backdrop-blur-md bg-white/20 border border-yellow-400/30 
          rounded-xl px-3 py-2 w-[160px] sm:w-[180px] text-center 
          shadow-md hover:scale-105 transition-all duration-300"
      >
        <h6 className="text-[10px] sm:text-xs font-bold uppercase mb-1 text-gray-800">
          ✨ Join as Astrologer
        </h6>

        <p className="text-[10px] sm:text-[11px] text-gray-600 mb-2 leading-tight">
          Start your journey with AstroTring
        </p>

        <button
          onClick={() => navigate("/astro-register")}
          className="bg-gradient-to-r from-yellow-400 to-orange-400 
          hover:from-yellow-500 hover:to-orange-500 
          text-white text-[10px] sm:text-xs font-semibold 
          px-3 py-1.5 rounded-full shadow transition"
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

export default AstroRegisterFloat;
