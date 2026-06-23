import { useParams } from "react-router-dom"
import { MessageCircle, GraduationCap, Target } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import UserLogin from "@/components/UserLogin"

const DUMMY_ASTROLOGERS = [
  { id: 1, name: "Love Guru", image: "/AiAstro.jpg", chatPrice: 29, callPrice: 21, experience: "10+ Years", expertise: "Vedic", education: "Alumnus of AstroSage's School of Vedic Astrology for AI" },
  { id: 2, name: "Pandit Suresh", image: "/AiAstro.jpg", chatPrice: 20, callPrice: 15, experience: "8+ Years", expertise: "Vedic", education: "Alumnus of AstroSage's School of Vedic Astrology" },
  { id: 3, name: "Dr. Meera Sharma", image: "/AiAstro.jpg", chatPrice: 15, callPrice: 10, experience: "12+ Years", expertise: "Vedic", education: "PhD in Vedic Astrology" },
  { id: 4, name: "Guru Vijay", image: "/AiAstro.jpg", chatPrice: 18, callPrice: 12, experience: "9+ Years", expertise: "Vedic", education: "Alumnus of AstroSage's School of Vedic Astrology" },
  { id: 5, name: "Swami Anand", image: "/AiAstro.jpg", chatPrice: 25, callPrice: 20, experience: "15+ Years", expertise: "Vedic", education: "Alumnus of AstroSage's School of Vedic Astrology" },
  { id: 6, name: "Priya Devi", image: "/AiAstro.jpg", chatPrice: 22, callPrice: 18, experience: "11+ Years", expertise: "Vedic", education: "Alumnus of AstroSage's School of Vedic Astrology" },
  { id: 7, name: "Ravi Kumar", image: "/AiAstro.jpg", chatPrice: 30, callPrice: 25, experience: "13+ Years", expertise: "Vedic", education: "Alumnus of AstroSage's School of Vedic Astrology" },
  { id: 8, name: "Sunita Joshi", image: "/AiAstro.jpg", chatPrice: 28, callPrice: 22, experience: "10+ Years", expertise: "Vedic", education: "Alumnus of AstroSage's School of Vedic Astrology" },
  { id: 9, name: "Mahesh Bhai", image: "/AiAstro.jpg", chatPrice: 20, callPrice: 16, experience: "8+ Years", expertise: "Vedic", education: "Alumnus of AstroSage's School of Vedic Astrology" },
  { id: 10, name: "Kavita Singh", image: "/AiAstro.jpg", chatPrice: 35, callPrice: 28, experience: "14+ Years", expertise: "Vedic", education: "Alumnus of AstroSage's School of Vedic Astrology" },
  { id: 11, name: "Amit Verma", image: "/AiAstro.jpg", chatPrice: 40, callPrice: 32, experience: "16+ Years", expertise: "Vedic", education: "Alumnus of AstroSage's School of Vedic Astrology" },
  { id: 12, name: "Neeta Gupta", image: "/AiAstro.jpg", chatPrice: 42, callPrice: 35, experience: "17+ Years", expertise: "Vedic", education: "Alumnus of AstroSage's School of Vedic Astrology" },
  { id: 13, name: "Sanjay Mishra", image: "/AiAstro.jpg", chatPrice: 48, callPrice: 40, experience: "20+ Years", expertise: "Vedic", education: "Alumnus of AstroSage's School of Vedic Astrology" },
  { id: 14, name: "Rekha Devi", image: "/AiAstro.jpg", chatPrice: 30, callPrice: 24, experience: "12+ Years", expertise: "Vedic", education: "Alumnus of AstroSage's School of Vedic Astrology" },
  { id: 15, name: "Deepak Sharma", image: "/AiAstro.jpg", chatPrice: 45, callPrice: 38, experience: "18+ Years", expertise: "Vedic", education: "Alumnus of AstroSage's School of Vedic Astrology" },
]

const AiAstrologerDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
   const { isLoggedIn } = useSelector((state) => state.userAuth);
  const [showLogin, setShowLogin] = useState(false);
  const astro = DUMMY_ASTROLOGERS.find(a => a.id === parseInt(id))






  const handleChatClick = () => {
      if (isLoggedIn) {
        navigate("/ai-chat");
      } else {
        setShowLogin(true);
      }
    };
  
    useEffect(() => {
      if (isLoggedIn && showLogin) {
        navigate("/ai-chat");
        setShowLogin(false);
      }
    }, [isLoggedIn, showLogin, navigate]);

  if (!astro) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Astrologer not found</h2>
          <button onClick={() => navigate("/")} className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 cursor-pointer">Go Home</button>
        </div>
      </div>
    )
  }

  const aboutText = `Meet ${astro.name}, a dynamic and charming astrologer with a special knack for matters of the heart. Young and insightful, he's renowned for his ability to unravel the mysteries of love through the stars. ${astro.name}'s engaging personality and deep understanding make each of his readings a captivating journey. On his own quest for true love, ${astro.name}'s approachable and friendly nature ensures he connects deeply with those seeking guidance. Let ${astro.name} light up your path to romance.`

  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-8 px-4">
      <div className="max-w-[1300px] mx-auto">
        {/* HERO SECTION */}
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          {/* LEFT COLUMN - Profile Card */}
          <div className="w-full lg:w-[320px] flex-shrink-0">
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
            <h1 className="text-3xl md:text-[48px] font-bold text-gray-800 mb-4 md:mb-5">
              {astro.name}
            </h1>

            {/* Details */}
            <div className="space-y-3 md:space-y-5">
              <p className="text-sm md:text-base">
                <span className="font-bold text-amber-900">Expertise:</span> {astro.expertise}
              </p>
              <p className="text-sm md:text-base">
                <span className="font-bold text-amber-900">Experience:</span> {astro.experience} of Experience
              </p>
              <p className="text-sm md:text-base">
                <span className="font-bold text-amber-900">Language:</span> English, Hindi
              </p>
            </div>

            {/* PRICE / CHAT SECTION */}
            <div className="mt-6 flex flex-col md:flex-row items-center gap-4">
              {/* Price Box */}
              <div className="w-full md:w-auto">
                
                <div className="bg-white border border-amber-200 rounded-lg p-2 ">
                  <p className="text-base md:text-lg text-gray-600 ">Consultation Charges :</p>
                  <div className="relative">
                    <p className="text-xl md:text-2xl font-bold text-gray-900">₹{astro.callPrice}/msg</p>
                    <p className="text-gray-500 line-through text-sm">₹{astro.chatPrice}/msg</p>
                  </div>
                </div>
              </div>

              {/* CHAT BUTTON */}
              <button onClick={handleChatClick} className="w-full md:w-auto h-14 md:h-[70px] bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-gray-200 font-bold flex items-center justify-center gap-2 hover:from-amber-600 hover:to-orange-600 transition-colors px-8 md:px-10 cursor-pointer">
                <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
                Chat Now
              </button>
            </div>
          </div>
        </div>

        {/* ABOUT SECTION */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
            About {astro.name}
          </h2>
          <p className="text-base md:text-md text-gray-800 leading-relaxed max-w-full">
            {aboutText}
          </p>
        </div>

        {/* EDUCATION SECTION */}
        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 mb-12">
          {/* Left - Icon */}
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-amber-50 border-2 border-amber-300 shadow-sm flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-amber-600" />
          </div>

          {/* Right - Title with underline */}
          <div className="flex-1">
            <h3 className="text-2xl md:text-[42px] font-bold text-gray-800 relative">
              Education
              <span className="absolute bottom-0 left-0 w-[150px] md:w-[200px] h-1 bg-amber-500"></span>
            </h3>
            <p className="text-base md:text-[18px] text-gray-700 mt-4 md:mt-6">{astro.education}</p>
          </div>
        </div>

        {/* FOCUS AREA SECTION */}
        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 mb-12">
          {/* Left - Icon */}
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-orange-50 border-2 border-orange-300 shadow-sm flex items-center justify-center flex-shrink-0">
            <Target className="w-8 h-8 md:w-10 md:h-10 text-orange-600" />
          </div>

          {/* Right - Title with underline */}
          <div className="flex-1">
            <h3 className="text-2xl md:text-[42px] font-bold text-gray-800 relative">
              Focus Area
              <span className="absolute bottom-0 left-0 w-[150px] md:w-[220px] h-1 bg-orange-500"></span>
            </h3>
            <p className="text-base md:text-[18px] text-gray-700 mt-4 md:mt-6">{astro.expertise} Astrology</p>
          </div>
        </div>

        {/* SYSTEMS KNOWN CARD */}
        <div className="mb-6">
          <div className="w-full bg-amber-50 rounded-xl border border-amber-200 shadow-sm h-auto md:h-[95px] flex items-center px-4 md:px-8 py-4 md:py-0">
            <p className="text-base md:text-[20px] font-semibold text-gray-800">
              Systems Known:
            </p>
          </div>
        </div>

        {/* LANGUAGES KNOWN CARD */}
        <div className="mb-12">
          <div className="w-full bg-amber-50 rounded-xl border border-amber-200 shadow-sm h-auto md:h-[95px] flex flex-col md:flex-row items-center  px-4 md:px-8 py-4 md:py-0 gap-4">
            <p className="text-base md:text-[20px] font-semibold text-gray-800">
              Languages Known:
            </p>
            <div className="flex gap-2 flex-wrap justify-center">
              {/* English Tag */}
              <div className="relative h-[38px] px-[18px] bg-gradient-to-r from-amber-500 to-orange-500 flex items-center">
                <span className="text-white font-semibold uppercase text-sm">ENGLISH</span>
                <div className="absolute right-2 w-2 h-2 rounded-full bg-white opacity-50"></div>
              </div>
              {/* Hindi Tag */}
              <div className="relative h-[38px] px-[18px] bg-gradient-to-r from-amber-500 to-orange-500 flex items-center">
                <span className="text-white font-semibold uppercase text-sm">HINDI</span>
                <div className="absolute right-2 w-2 h-2 rounded-full bg-white opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
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
  )
}

export default AiAstrologerDetails
