import faviconlogo from "@/assets/favicon.png";
import { Mail, MapPin, Phone } from "lucide-react";
import { TiSocialFacebook } from "react-icons/ti";
import { Link } from "react-router-dom";
import { SlSocialInstagram } from "react-icons/sl";
import { TiSocialTwitter } from "react-icons/ti";
import { TiSocialYoutube } from "react-icons/ti";
import { FaAnglesRight } from "react-icons/fa6";
import { getHoroscope } from "@/redux/slice/HoroscopesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Footer = () => {
  const { horoscope } = useSelector((state) => state.horoscope);
  const [horosType, setHorosType] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!horoscope) {
      const fetchHoroscopes = async () => {
        try {
          await dispatch(getHoroscope()).unwrap();
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchHoroscopes();
    }
  }, [horoscope, dispatch]);

  /* ------------------ GENERATE HOROSCOPE TYPES MENU ------------------ */
  useEffect(() => {
    if (horoscope?.length > 0) {
      try {
        const horosSet = new Set();
        const horos = [];

        horoscope.forEach((ele) => {
          if (ele.type && !horosSet.has(ele.type)) {
            if (ele.type.toLowerCase() === "weekly") {
              return;
            }
            horosSet.add(ele.type);
            horos.push({
              label:
                ele.type.charAt(0).toUpperCase() +
                ele.type.slice(1) +
                " Horoscope",
              path: `/findHoroschope/${ele.type.toLowerCase()}`,
            });
          }
        });

        setHorosType(horos);
      } catch (error) {
        console.log(error.message);
      }
    }
  }, [horoscope]);

  return (
    <footer className="bg-accent-foreground pt-10 pb-0">
      <div className="container">
        <div>
          <div className="border-b border-gray-500 pb-4 mb-4">
            <Link to="/">
              <img
                src={faviconlogo}
                className="xl:h-15 md:h-12  h-10 mb-2"
                alt=""
              />
            </Link>
            <div className="space-y-2">
              <h2 className="text-white border-b-2 border-b-primary/80 inline-block pb-1 font-semibold text-lg ">
                About Astrotring
              </h2>
              <p className="text-white text-sm! ">
                AstroTring is your ultimate destination for accurate Vedic
                astrology predictions, offering personalized Kundli analysis,
                horoscope matching, and real-time guidance on love, marriage,
                career, health, and finance. Powered by AI-driven insights and
                expert astrologers, we decode your birth chart to reveal your
                cosmic blueprint and life's true purpose. From live call and
                chat consultations to detailed astrology reports, AstroTring
                makes ancient Vedic wisdom accessible anytime, anywhere. Our
                verified astrologers provide authentic remedies, compatibility
                readings, and date-of-birth predictions to help you make
                confident, well-guided life decisions. Rooted in tradition and
                driven by technology, AstroTring bridges the timeless wisdom of
                the cosmos with the clarity you need to navigate modern life.
              </p>
            </div>
          </div>

          <div className="grid xl:grid-cols-4 md:grid-cols-3  grid-cols-1 gap-4 pb-10">
            <div className="space-y-5">
              <div>
                <h2 className="text-white border-b-2 border-b-primary/80 inline-block pb-1 font-semibold text-lg ">
                  Horoscope
                </h2>

                <ul className="mt-2">
                  {horosType.map((horos) => (
                    <li
                      key={horos.path}
                      className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2  "
                    >
                      <Link to={horos.path}>
                        <FaAnglesRight className="me-2 inline" />{" "}
                        {horos.label}{" "}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-white border-b-2 border-b-primary/80 inline-block pb-1 font-semibold text-lg ">
                  Shubh Muhurat 2026
                </h2>

                <ul className="mt-2">
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to="/annanprashan-muhurat">
                      <FaAnglesRight className="me-2 inline" /> Annanprashan
                      Muhurat 2026
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to="/aamkaran-muhurat">
                      <FaAnglesRight className="me-2 inline" /> Naamkaran
                      Muhurat 2026
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to="/car-bike-muhurat">
                      <FaAnglesRight className="me-2 inline" /> Car/Bike Muhurat
                      2026
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to="/marriage-muhurat">
                      <FaAnglesRight className="me-2 inline" /> Marriage Muhurat
                      2026
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to="/bhumiPuja-muhurat">
                      <FaAnglesRight className="me-2 inline" /> Bhoomi Pujan
                      Muhurat 2026
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to="/griha-pravesh-muhurat">
                      <FaAnglesRight className="me-2 inline" /> Griha Pravesh
                      Muhurat 2026
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to="/mundan-muhurat">
                      <FaAnglesRight className="me-2 inline" /> Mundan Muhurat
                      2026
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <h2 className="text-white border-b-2 border-b-primary/80 inline-block pb-1 font-semibold text-lg ">
                  Important Links
                </h2>

                <ul className="mt-2">
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={"https://store.astrotring.com"}>
                      <FaAnglesRight className="me-2 inline" /> Store
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={"/talk-to-astrologer"}>
                      <FaAnglesRight className="me-2 inline" /> Chat / Call with
                      Astrologer
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Astrotring
                      Reviews
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Ascendant Sign
                      Gemstone
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Nakshatras
                      Constellations
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Numerology
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Mantras
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Astrological
                      remedies for job promotion
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-white border-b-2 border-b-primary/80 inline-block pb-1 font-semibold text-lg ">
                  Shop our products
                </h2>

                <ul className="mt-2">
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Evil Eye
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Rudraksha
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Karungali
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Buy
                      Gemstones{" "}
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Pyrite
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Selenite
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Rudraksha
                      Bracelet For Men
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Rudraksha
                      Bracelet For Women
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Murtis and Idols
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Raw Pyrite Stone
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Money Magnet
                      Bracelet
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Joint Pain Oil
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <h2 className="text-white border-b-2 border-b-primary/80 inline-block pb-1 font-semibold text-lg ">
                  Astrologer
                </h2>
                <ul className="mt-2">
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={"/astro-login"}>
                      <FaAnglesRight className="me-2 inline" /> Astrologer Login
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={"/astro-register"}>
                      <FaAnglesRight className="me-2 inline" /> Astrologer
                      Registration
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-white border-b-2 border-b-primary/80 inline-block pb-1 font-semibold text-lg ">
                  Important Links
                </h2>

                <ul className="mt-2">
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Collaboration
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Tarot
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Zodiac Signs
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Vastu Shastra
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Love Calculator
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Guru Purnima
                      2026
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Astrotring
                      Sitemap
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <h2 className="text-white border-b-2 border-b-primary/80 inline-block pb-1 font-semibold text-lg ">
                  Corporate Info
                </h2>
                <ul className="mt-2">
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Refund &
                      Cancellation Policy
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Terms &
                      Conditions
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Privacy Policy
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Disclaimer
                    </Link>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2">
                    <Link to={""}>
                      <FaAnglesRight className="me-2 inline" /> Pricing Policy
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-white border-b-2 border-b-primary/80 inline-block pb-1 font-semibold text-lg ">
                  Contact us
                </h2>
                <ul className="mt-2">
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2 flex gap-2 items-center">
                    <MapPin className="border-2 border-secondary shrink-0 size-9 p-1.5 rounded-full" />
                    <p>
                      711, Plot A09, ITL Towers, Netaji Subhash Place,
                      Pitampura, Delhi 110034
                    </p>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2 flex items-center gap-2">
                    <Mail className="border-2 border-secondary shrink-0 size-9 p-1.5 rounded-full" />
                    <p>reachus@krayons.co.in</p>
                  </li>
                  <li className="text-white text-sm mb-2   transition-all duration-300 hover:translate-x-2 flex items-center gap-2">
                    <Phone className="border-2 border-secondary shrink-0 size-9 p-1.5 rounded-full" />
                    <p>+91 23465 12356</p>
                  </li>
                </ul>
                <h2 className="text-white border-b-2 border-b-primary/80 inline-block pb-1 font-semibold text-lg ">
                  Social Links
                </h2>
                <div className="flex gap-3 mt-3">
                  <Link>
                    <div className="border border-white rounded-full text-white h-10 w-10 grid place-items-center ">
                      <TiSocialFacebook className="size-7 " />
                    </div>
                  </Link>
                  <Link>
                    <div className="border border-white rounded-full text-white h-10 w-10 grid place-items-center ">
                      <SlSocialInstagram className="size-5 " />
                    </div>
                  </Link>
                  <Link>
                    <div className="border border-white rounded-full text-white h-10 w-10 grid place-items-center ">
                      <TiSocialTwitter className="size-6 " />
                    </div>
                  </Link>
                  <Link>
                    <div className="border border-white rounded-full text-white h-10 w-10 grid place-items-center ">
                      <TiSocialYoutube className="size-5 " />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black text-white text-center py-5 mt-5">
        © {new Date().getFullYear()} Astrotring. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
