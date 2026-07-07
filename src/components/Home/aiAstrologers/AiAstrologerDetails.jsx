import { useParams, useNavigate } from "react-router-dom";
import { MessageCircle, GraduationCap, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserLogin from "@/components/UserLogin";
import { fetchAiAstrologerDetails, clearAstrologerDetails } from "@/redux/slice/aiChatSlice";
import Loader from "@/components/common/Loader";

const AiAstrologerDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.userAuth);
  const { astrologerDetails: astro, isFetchingAstrologerDetails, error } = useSelector((state) => state.aiChat);

  const [showLogin, setShowLogin] = useState(false);

  // console.log("astro", astro)

  useEffect(() => {
    if (slug) {
      dispatch(fetchAiAstrologerDetails(slug));
    }

  
  }, [slug, dispatch]);

  // Pass slug + all expertise slugs so AIChatBot can fetch questions from API
  const chatState = astro
    ? {
        astrologerName: astro.name,
        astrologerSlug: astro.slug,
        expertises: astro.expertises ?? [], // array of { id, name, slug }
      }
    : null;

  const handleChatClick = () => {
    if (isLoggedIn) {
      navigate(`/ai-chat/${astro.slug}/${astro.expertises?.[0]?.slug}`);
    } else {
      setShowLogin(true);
    }
  };

  useEffect(() => {
    if (isLoggedIn && showLogin && astro) {
      navigate(`/ai-chat/${astro.slug}/${astro.expertises?.[0]?.slug}`, { state: chatState });
      setShowLogin(false);
    }
  }, [isLoggedIn, showLogin, navigate, astro, chatState]);

  if (isFetchingAstrologerDetails) {
    return (
      <Loader message="Loading astrologer details..."/>
    );
  }

  if (error || !astro) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Astrologer not found</h2>
          <p className="text-gray-500 mt-2">{error || "The astrologer you are looking for does not exist."}</p>
          <button onClick={() => navigate("/")} className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 cursor-pointer">Go Home</button>
        </div>
      </div>
    );
  }



  return (
    <>
      <div className="relative min-h-screen mt-4 bg-gradient-to-t from-amber-100 to-white py-8 px-4 sm:px-10">
        <div className="w-full mx-auto">
          {/* HERO SECTION */}
          <div className="flex flex-col sm:flex-row gap-6 mb-8">
            {/* LEFT COLUMN - Profile Card */}
            <div className="w-full sm:w-[320px] flex-shrink-0">
              <div className="bg-white border border-amber-200 rounded-xl p-4">
                {/* Astrologer Image - Full Container */}
                <div className="relative">
                  <img
                    src={astro.image}
                    alt={astro.name}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                  {/* Green online status dot */}
                  <div className="absolute top-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Details */}
            <div className="flex-1">
              {/* Title */}
              <h1 className="text-3xl sm:text-[48px] font-bold text-gray-800 mb-4 md:mb-5">
                {astro.name}
              </h1>

              {/* Details */}
              <div className="space-y-3 md:space-y-5">
                <p className="text-sm sm:text-base">
                  <span className="font-bold text-amber-900">Expertise:</span>{" "}
                  {astro.expertises[0].name}
                </p>
                <p className="text-sm sm:text-base">
                  <span className="font-bold text-amber-900">Experience:</span> {astro.experience || "N/A"} of Experience
                </p>
                <p className="text-sm sm:text-base">
                  <span className="font-bold text-amber-900">Language:</span> {astro.language || "English, Hindi"}
                </p>
              </div>

              {/* PRICE / CHAT SECTION */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Chat Rate Box */}
                <div className="bg-white border border-amber-200 rounded-lg p-3 min-w-[140px] flex items-center gap-2 sm:flex-col sm:gap-0 sm:text-center">
                  <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">Chat Rate : </p>
                  <p className="text-xl md:text-2xl font-bold text-amber-600">
                    ₹{astro.chat_price ?? "—"}
                    <span className="text-xs font-normal text-gray-400">/msg</span>
                  </p>
                </div>

                {/* CHAT BUTTON */}
                <button
                  onClick={handleChatClick}
                  className="w-full sm:w-auto h-14 md:h-[70px] bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white font-bold flex items-center justify-center gap-2 hover:from-amber-600 hover:to-orange-600 transition-colors px-8 md:px-10 cursor-pointer shadow-md"
                >
                  <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
                  Chat Now
                </button>
              </div>
            </div>
          </div>

          {/* ABOUT SECTION */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
              About {astro.name}
            </h2>
            <p className="text-base md:text-md text-gray-800 leading-relaxed max-w-full whitespace-pre-wrap">
              {astro.about}
            </p>
          </div>

          {/* EDUCATION SECTION */}
          {astro.education && (
            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 mb-12">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-amber-50 border-2 border-amber-300 shadow-sm flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-[42px] font-bold text-gray-800 relative">
                  Education
                  <span className="absolute bottom-0 left-0 w-[150px] md:w-[200px] h-1 bg-amber-500"></span>
                </h3>
                <p className="text-base md:text-[18px] text-gray-700 mt-4 md:mt-6">{astro.education}</p>
              </div>
            </div>
          )}

          {/* FOCUS AREA SECTION */}
          <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 mb-12">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-orange-50 border-2 border-orange-300 shadow-sm flex items-center justify-center flex-shrink-0">
              <Target className="w-8 h-8 md:w-10 md:h-10 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl md:text-[42px] font-bold text-gray-800 relative">
                Focus Area
                <span className="absolute bottom-0 left-0 w-[150px] md:w-[220px] h-1 bg-orange-500"></span>
              </h3>
              <div className="flex flex-wrap gap-2 mt-4 md:mt-6">
                {astro.expertises.map(
                  (tag, i) => (
                    <span
                      key={i}
                      className="text-sm font-semibold text-amber-900 bg-amber-100 border border-amber-300 rounded-full px-3 py-1"
                    >
                      {tag.name}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>



          {/* LANGUAGES KNOWN CARD */}
          <div className="mb-12">
            <div className="w-full bg-amber-50 rounded-xl border border-amber-200 shadow-sm h-auto md:h-[95px] flex flex-col md:flex-row items-center  px-4 md:px-8 py-4 md:py-0 gap-4">
              <p className="text-base md:text-[20px] font-semibold text-gray-800">
                Languages Known:
              </p>
              <div className="flex gap-2 flex-wrap justify-center">
                {astro.language ? astro.language.split(',').map((lang, idx) => (
                  <div key={idx} className="relative h-[38px] px-[18px] bg-gradient-to-r from-amber-500 to-orange-500 flex items-center">
                    <span className="text-white font-semibold uppercase text-sm">{lang.trim()}</span>
                    <div className="absolute right-2 w-2 h-2 rounded-full bg-white opacity-50"></div>
                  </div>
                )) : (
                  <>
                    <div className="relative h-[38px] px-[18px] bg-gradient-to-r from-amber-500 to-orange-500 flex items-center">
                      <span className="text-white font-semibold uppercase text-sm">ENGLISH</span>
                      <div className="absolute right-2 w-2 h-2 rounded-full bg-white opacity-50"></div>
                    </div>
                    <div className="relative h-[38px] px-[18px] bg-gradient-to-r from-amber-500 to-orange-500 flex items-center">
                      <span className="text-white font-semibold uppercase text-sm">HINDI</span>
                      <div className="absolute right-2 w-2 h-2 rounded-full bg-white opacity-50"></div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

          <div className="hidden lg:inline absolute  top-8 right-10">
          <a
            href="https://astrotring.shop/product/metal-dhan-yog-bracelet-with-free-raw-selenite-plate"
            target="__blank"
            rel="noopener noreferrer"
            className="relative block w-full h-96 overflow-hidden shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-transform duration-300 hover:scale-[1.02] "
          >
            <img
              src="/ad5.jpeg"
              alt="Advertisement"
              className="w-full h-full object-fill"
            />
            <span className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full">
              Ad
            </span>
          </a>
         
        </div>
      </div>

      {showLogin && (
        <UserLogin
          defaultOpen={true}
          onOpenChange={(open) => {
            setShowLogin(open);
            if (!open && isLoggedIn) {
              navigate("/ai-chat");
            }
          }}
        />
      )}

    </>
  );
};

export default AiAstrologerDetails;
