// import faviconlogo from "@/assets/logo.png";
// import { Mail, MapPin, Phone } from "lucide-react";
// import { Link } from "react-router-dom";
// import { FaAnglesRight, FaApple, FaGooglePlay } from "react-icons/fa6";
// import {
//   TiSocialFacebook,
//   TiSocialTwitter,
//   TiSocialYoutube,
// } from "react-icons/ti";
// import { SlSocialInstagram } from "react-icons/sl";
// import { getHoroscope } from "@/redux/slice/HoroscopesSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";

// const Footer = () => {
//   const {t}=useTranslation();
//   const { horoscope } = useSelector((state) => state.horoscope);
//   const [horosType, setHorosType] = useState([]);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!horoscope) {
//       dispatch(getHoroscope());
//     }
//   }, [horoscope, dispatch]);

//   useEffect(() => {
//     if (horoscope?.length > 0) {
//       const set = new Set();
//       const list = [];

//       horoscope.forEach((ele) => {
//         if (ele.type && !set.has(ele.type)) {
//           if (ele.type.toLowerCase() === "weekly") return;

//           set.add(ele.type);

//           list.push({
//             label:
//               ele.type.charAt(0).toUpperCase() +
//               ele.type.slice(1) +
//               " Horoscope",
//             path: `/staticHoroschopes/${ele.type.toLowerCase()}`,
//           });
//         }
//       });

//       setHorosType(list);
//     }
//   }, [horoscope]);

//   return (
//     <footer className="bg-gradient-to-b from-yellow-50 to-yellow-200 text-black pt-10">
//       <div className="mx-auto px-2 md:px-10">
//         <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10 pb-12">
//           {/* ABOUT */}
//           <div>
//             <Link to="/">
//               <img src={faviconlogo} className="h-12 mb-4" alt="" />
//             </Link>

//             <p className="text-sm leading-relaxed">
//               AstroTring offers accurate Vedic astrology insights including
//               kundli matching, horoscope predictions, and expert astrologer
//               consultations to guide important life decisions. Our platform
//               blends ancient astrological wisdom with modern technology to
//               provide guidance on love, marriage, career, health, and finance.
//             </p>
//           </div>

//           {/* HOROSCOPE */
//           /* SHUBH MUHURAT */}
//           <div>
//             <div>
//               <h4 className="font-semibold text-lg border-b border-yellow-500 pb-1 inline-block">
//                 Horoscope
//               </h4>

//               <ul className="mt-4 space-y-2">
//                 {horosType.map((horos) => (
//                   <li key={horos.path}>
//                     <Link
//                       to={horos.path}
//                       className="flex items-center gap-2 text-sm transition-all duration-200 hover:text-primary hover:translate-x-1"
//                     >
//                       <FaAnglesRight />
//                       {horos.label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <h4 className="font-semibold text-lg border-b border-yellow-500 pb-1 mt-6 inline-block">
//               Shubh Muhurat {new Date().getFullYear()}
//             </h4>

//             <ul className="mt-4 space-y-2 text-sm">
//               <li>
//                 <Link
//                   to="/annanprashan-muhurat"
//                   className="flex items-center gap-2 hover:text-primary hover:translate-x-1 transition"
//                 >
//                   <FaAnglesRight /> Annanprashan Muhurat
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   to="/aamkaran-muhurat"
//                   className="flex items-center gap-2 hover:text-primary hover:translate-x-1 transition"
//                 >
//                   <FaAnglesRight /> Naamkaran Muhurat
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   to="/car-bike-muhurat"
//                   className="flex items-center gap-2 hover:text-primary hover:translate-x-1 transition"
//                 >
//                   <FaAnglesRight /> Car/Bike Muhurat
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   to="/marriage-muhurat"
//                   className="flex items-center gap-2 hover:text-primary hover:translate-x-1 transition"
//                 >
//                   <FaAnglesRight /> Marriage Muhurat
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   to="/bhumiPuja-muhurat"
//                   className="flex items-center gap-2 hover:text-primary hover:translate-x-1 transition"
//                 >
//                   <FaAnglesRight /> Bhoomi Pujan Muhurat
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   to="/griha-pravesh-muhurat"
//                   className="flex items-center gap-2 hover:text-primary hover:translate-x-1 transition"
//                 >
//                   <FaAnglesRight /> Griha Pravesh Muhurat
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   to="/mundan-muhurat"
//                   className="flex items-center gap-2 hover:text-primary hover:translate-x-1 transition"
//                 >
//                   <FaAnglesRight /> Mundan Muhurat
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* ASTROLOGER + CORPORATE */}
//           <div>
//             <h4 className="font-semibold text-lg border-b border-yellow-500 pb-1 inline-block">
//               Astrologer
//             </h4>

//             <ul className="mt-4 space-y-2 text-sm">
//               <li>
//                 <Link
//                   to="/astro-login"
//                   className="flex items-center gap-2 hover:text-primary hover:translate-x-1 transition"
//                 >
//                   <FaAnglesRight /> Astrologer Login
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   to="/astro-register"
//                   className="flex items-center gap-2 hover:text-primary hover:translate-x-1 transition"
//                 >
//                   <FaAnglesRight /> Astrologer Registration
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   to="/blogs"
//                   className="flex items-center gap-2 hover:text-primary hover:translate-x-1 transition"
//                 >
//                   <FaAnglesRight /> Astrology Blogs
//                 </Link>
//               </li>
//             </ul>

//             <h4 className="font-semibold text-lg border-b border-yellow-500 pb-1 inline-block mt-6">
//               Corporate Info
//             </h4>

//             <ul className="mt-4 space-y-2 text-sm">
//               <li>
//                 <Link
//                   to="/refund-policy"
//                   className="flex items-center gap-2 hover:text-primary hover:translate-x-1 transition"
//                 >
//                   <FaAnglesRight /> Refund & Cancellation
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   to="/terms-conditions"
//                   className="flex items-center gap-2 hover:text-primary hover:translate-x-1 transition"
//                 >
//                   <FaAnglesRight /> Terms & Conditions
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   to="/privacy-policy"
//                   className="flex items-center gap-2 hover:text-primary hover:translate-x-1 transition"
//                 >
//                   <FaAnglesRight /> Privacy Policy
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   to="/disclaimer"
//                   className="flex items-center gap-2 hover:text-primary hover:translate-x-1 transition"
//                 >
//                   <FaAnglesRight /> Disclaimer
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   to="/shipping-policy"
//                   className="flex items-center gap-2 hover:text-primary hover:translate-x-1 transition"
//                 >
//                   <FaAnglesRight /> Shipping Policy
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* CONTACT */}
//           <div>
//             <h4 className="font-semibold text-lg border-b border-yellow-500 pb-1 inline-block">
//               Contact Us
//             </h4>

//             <p className="text-sm text-black leading-relaxed mt-4 space-y-4">
//               We are available 24x7 on chat support, click to start chat
//             </p>

//             <div className="mt-4 space-y-4">
//               <div className="flex items-center gap-3 text-sm text-black ">
//                 <a
//                   href="mailto:mail@astrotring.com"
//                   className="flex items-center gap-3 text-sm text-black hover:text-primary transition"
//                 >
//                   <Mail className="size-8 border border-gray-900 p-1.5 rounded-full" />
//                   <span className="underline  hover:text-bg-yellow-200 transition px-1 rounded duration-300 hover:translate-x-1">
//                     mail@astrotring.com
//                   </span>
//                 </a>
//               </div>
//             </div>

//             <div className="flex gap-3 mt-6">
//               <div className="w-9 h-9 flex items-center justify-center border border-gray-400 rounded-full transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary cursor-pointer">
//                 <TiSocialFacebook size={18} />
//               </div>

//               <div className="w-9 h-9 flex items-center justify-center border border-gray-400 rounded-full transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary cursor-pointer">
//                 <SlSocialInstagram size={18} />
//               </div>

//               <div className="w-9 h-9 flex items-center justify-center border border-gray-400 rounded-full transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary cursor-pointer">
//                 <TiSocialTwitter size={18} />
//               </div>

//               <div className="w-9 h-9 flex items-center justify-center border border-gray-400 rounded-full transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary cursor-pointer">
//                 <TiSocialYoutube size={18} />
//               </div>
//             </div>

//             <h3 className="mt-6 font-semibold text-black text-lg">
//               Download Our App
//             </h3>

//             <div className="flex flex-col sm:flex-row gap-3 mt-4">
//               {/* GOOGLE PLAY */}

//               <a
//                 href="#"
//                 target="_blank"
//                 className="flex items-center justify-center gap-3 bg-black text-white
//                   rounded-lg px-5 py-2.5
//                   hover:bg-gray-800 transition-all duration-300
//                   hover:scale-105 shadow-md"
//               >
//                 <img
//                   src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg"
//                   alt="Google Play"
//                   className="w-4 h-4"
//                 />
//                 <div className="flex flex-col leading-tight text-left">
//                   <span className="text-sm font-semibold">Google Play</span>
//                 </div>
//               </a>

//               {/* APP STORE */}

//               <a
//                 href="#"
//                 target="_blank"
//                 className="flex items-center justify-center gap-3 bg-black text-white
//                   rounded-lg px-5 py-2.5
//                   hover:bg-gray-800 transition-all duration-300
//                   hover:scale-105 shadow-md"
//               >
//                 <FaApple size={20} />
//                 <div className="flex flex-col leading-tight text-left">
//                   <span className="text-sm font-semibold">App Store</span>
//                 </div>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-black text-center text-white py-4">
//         © {new Date().getFullYear()} Astrotring. All Rights Reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import faviconlogo from "@/assets/logo.png";
import { Trans } from "react-i18next";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { FaAnglesRight, FaApple } from "react-icons/fa6";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialYoutube,
} from "react-icons/ti";
import { SlSocialInstagram } from "react-icons/sl";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getHoroscope } from "@/redux/slice/HoroscopesSlice";

const Footer = () => {
  const { t } = useTranslation();
  const { horoscope } = useSelector((state) => state.horoscope);
  const [horosType, setHorosType] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!horoscope) {
      dispatch(getHoroscope());
    }
  }, [horoscope, dispatch]);

  //   useEffect(() => {
  //     if (horoscope?.length > 0) {
  //       const set = new Set();
  //       const list = [];
  //       horoscope.forEach((ele) => {
  //         if (ele.type && !set.has(ele.type)) {
  //           if (ele.type.toLowerCase() === "weekly") return;
  //           set.add(ele.type);
  //           list.push({
  //           label: t(`footer.${ele.type.toLowerCase()}HoroscopeLabel`, {
  //   defaultValue: ele.type.charAt(0).toUpperCase() + ele.type.slice(1) + " Horoscope",
  // }),
  //             path: `/staticHoroschopes/${ele.type.toLowerCase()}`,
  //           });
  //         }
  //       });
  //       setHorosType(list);
  //     }
  //   }, [horoscope, t]);
  useEffect(() => {
    if (horoscope?.length > 0) {
      const set = new Set();
      const list = [];

      horoscope.forEach((ele) => {
        if (ele.type && !set.has(ele.type)) {
          if (ele.type.toLowerCase() === "weekly") return;

          set.add(ele.type);

          const type = ele.type.toLowerCase();

          list.push({
            label: t(`footer.horoscopeTypes.${type}`, {
              defaultValue:
                ele.type.charAt(0).toUpperCase() +
                ele.type.slice(1) +
                " Horoscope",
            }),
            path: `/staticHoroschopes/${type}`,
          });
        }
      });

      setHorosType(list);
    }
  }, [horoscope, t]);
  return (
    <footer className="bg-gradient-to-b from-yellow-50 to-yellow-200 text-black pt-10">
      <div className="mx-auto px-2 md:px-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10 pb-12">
          {/* ABOUT */}
          <div>
            <Link to="/">
              <img src={faviconlogo} className="h-12 mb-4" alt="Logo" />
            </Link>
            <p className="text-sm leading-relaxed">{t("footer.aboutText")}</p>
          </div>

          {/* HOROSCOPE + SHUBH MUHURAT */}
          <div>
            <h4 className="font-semibold text-lg border-b border-yellow-500 pb-1 inline-block">
              {t("footer.horoscope")}
            </h4>

            <ul className="mt-4 space-y-2 text-sm">
              {horosType.map((horos) => (
                <li key={horos.path}>
                  <Link
                    to={horos.path}
                    className="flex items-center gap-2 hover:text-primary transition-all duration-200 hover:translate-x-1"
                  >
                    <FaAnglesRight /> {horos.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold text-lg border-b border-yellow-500 pb-1 mt-6 inline-block">
              {t("footer.shubhMuhurat", { year: new Date().getFullYear() })}
            </h4>

            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  to="/annanprashan-muhurat"
                  className="flex items-center gap-2 hover:text-primary transition-all duration-200 hover:translate-x-1"
                >
                  <FaAnglesRight /> {t("footer.annanprashanMuhurat")}
                </Link>
              </li>
              <li>
                <Link
                  to="/aamkaran-muhurat"
                  className="flex items-center gap-2 hover:text-primary transition-all duration-200 hover:translate-x-1"
                >
                  <FaAnglesRight /> {t("footer.naamkaranMuhurat")}
                </Link>
              </li>
              <li>
                <Link
                  to="/car-bike-muhurat"
                  className="flex items-center gap-2 hover:text-primary transition-all duration-200 hover:translate-x-1"
                >
                  <FaAnglesRight /> {t("footer.carBikeMuhurat")}
                </Link>
              </li>
              <li>
                <Link
                  to="/marriage-muhurat"
                  className="flex items-center gap-2 hover:text-primary transition-all duration-200 hover:translate-x-1"
                >
                  <FaAnglesRight /> {t("footer.marriageMuhurat")}
                </Link>
              </li>
              <li>
                <Link
                  to="/bhumiPuja-muhurat"
                  className="flex items-center gap-2 hover:text-primary transition-all duration-200 hover:translate-x-1"
                >
                  <FaAnglesRight /> {t("footer.bhoomiPujanMuhurat")}
                </Link>
              </li>
              <li>
                <Link
                  to="/griha-pravesh-muhurat"
                  className="flex items-center gap-2 hover:text-primary transition-all duration-200 hover:translate-x-1"
                >
                  <FaAnglesRight /> {t("footer.grihaPraveshMuhurat")}
                </Link>
              </li>
              <li>
                <Link
                  to="/mundan-muhurat"
                  className="flex items-center gap-2 hover:text-primary transition-all duration-200 hover:translate-x-1"
                >
                  <FaAnglesRight /> {t("footer.mundanMuhurat")}
                </Link>
              </li>
            </ul>
          </div>

          {/* ASTROLOGER + CORPORATE */}
          <div>
            <h4 className="font-semibold text-lg border-b border-yellow-500 pb-1 inline-block">
              {t("footer.astrologer")}
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  to="/astro-login"
                  className="flex items-center gap-2 hover:text-primary transition-all duration-200 hover:translate-x-1"
                >
                  <FaAnglesRight /> {t("footer.astroLogin")}
                </Link>
              </li>
              <li>
                <Link
                  to="/astro-register"
                  className="flex items-center gap-2 hover:text-primary transition-all duration-200 hover:translate-x-1"
                >
                  <FaAnglesRight /> {t("footer.astroRegister")}
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="flex items-center gap-2 hover:text-primary transition-all duration-200 hover:translate-x-1"
                >
                  <FaAnglesRight /> {t("footer.blogs")}
                </Link>
              </li>
            </ul>

            <h4 className="font-semibold text-lg border-b border-yellow-500 pb-1 mt-6 inline-block">
              {t("footer.corporateInfo")}
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  to="/refund-policy"
                  className="flex items-center gap-2 hover:text-primary transition-all duration-200 hover:translate-x-1"
                >
                  <FaAnglesRight /> {t("footer.refundPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-conditions"
                  className="flex items-center gap-2 hover:text-primary transition-all duration-200 hover:translate-x-1"
                >
                  <FaAnglesRight /> {t("footer.termsConditions")}
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="flex items-center gap-2 hover:text-primary transition-all duration-200 hover:translate-x-1"
                >
                  <FaAnglesRight /> {t("footer.privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  to="/disclaimer"
                  className="flex items-center gap-2 hover:text-primary transition-all duration-200 hover:translate-x-1"
                >
                  <FaAnglesRight /> {t("footer.disclaimer")}
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping-policy"
                  className="flex items-center gap-2 hover:text-primary transition-all duration-200 hover:translate-x-1"
                >
                  <FaAnglesRight /> {t("footer.shippingPolicy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold text-lg border-b border-yellow-500 pb-1 inline-block">
              {t("footer.contactUs")}
            </h4>

            {/* <p className="text-sm text-black leading-relaxed mt-4 space-y-4">
              {t("footer.contactText")}
            </p> */}
            <p className="text-sm text-black leading-relaxed mt-4">
              <Trans
                i18nKey="footer.contactText"
                components={{
                  whatsapp: (
                    <a
                      href="https://wa.me/919485628238?text=Hi%20I%20need%20help"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:text-yellow-600"
                    />
                  ),
                }}
              />
            </p>

            <div className="mt-4">
              <a
                href="mailto:mail@astrotring.com"
                className="flex items-center gap-3 text-sm text-black hover:text-primary"
              >
                <Mail className="size-8 border border-gray-900 p-1.5 rounded-full" />
                mail@astrotring.com
              </a>
            </div>

            <div className="flex gap-3 mt-6">
              <TiSocialFacebook
                size={18}
                className="hover:text-primary cursor-pointer"
              />
              <SlSocialInstagram
                size={18}
                className="hover:text-primary cursor-pointer"
              />
              <TiSocialTwitter
                size={18}
                className="hover:text-primary cursor-pointer"
              />
              <TiSocialYoutube
                size={18}
                className="hover:text-primary cursor-pointer"
              />
            </div>

            <h4 className="mt-6 font-semibold text-black text-lg">
              {t("footer.downloadApp")}
            </h4>

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <a
                href="#"
                target="_blank"
                className="flex items-center justify-center gap-3 bg-black text-white rounded-lg px-5 py-2.5 hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-md"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg"
                  alt="Google Play"
                  className="w-4 h-4"
                />
                <span className="text-sm font-semibold">
                  {t("footer.googlePlay")}
                </span>
              </a>

              <a
                href="#"
                target="_blank"
                className="flex items-center justify-center gap-3 bg-black text-white rounded-lg px-5 py-2.5 hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-md"
              >
                <FaApple size={20} />
                <span className="text-sm font-semibold">
                  {t("footer.appStore")}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black text-center text-white py-4">
        © {new Date().getFullYear()} Astrotring. {t("footer.allRightsReserved")}
      </div>
    </footer>
  );
};

export default Footer;
