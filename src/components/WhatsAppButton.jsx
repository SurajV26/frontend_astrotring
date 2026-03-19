import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { HiChatBubbleBottomCenterText } from "react-icons/hi2";

const WhatsAppButton = () => {
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .wa-fade {
          animation: fadeIn 0.4s ease;
        }

        @media (max-width: 640px) {
          .wa-container {
            bottom: 70px !important;
            right: 15px !important;
          }
        }
      `}</style>

      <div className="wa-container fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
        {/* Bubble */}
        {showBubble && (
          <div className="wa-fade bg-gradient-to-r from-yellow-50 to-orange-100 px-4 py-2 rounded-xl shadow text-xs sm:text-sm max-w-[220px]">
            <span className="font-semibold">✨ Need help?</span>
            <br />
            <span className="text-gray-600">Chat with our support team</span>
          </div>
        )}

        {/* Button */}
        <a
          href="https://wa.me/919485628238?text=Hi%20I%20need%20help"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group"
        >
          <div className="relative flex items-center justify-center">
            {/* Pulse */}
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50 animate-ping"></span>

            {/* Button */}
            <div className="relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center">
              <FaWhatsapp size={20} />
            </div>
          </div>
        </a>
      </div>
    </>
  );
};

export default WhatsAppButton;
