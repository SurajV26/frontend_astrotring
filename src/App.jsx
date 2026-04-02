import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./layout/Layout";

// import Astrodetails from './pages/AstrologerDetails'
import { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AstroLayout from "./layout/AstroLayout";
import { AstrologerProfile, GetAllAstrologer } from "./redux/slice/AstroAuth";
import Astrodetails from "./components/Astrodetails";
import { userProfile } from "./redux/slice/UserAuth";
import Annanprashan from "./pages/FooterMahurat/Annanprashan";
import Namkaran from "./pages/FooterMahurat/Namkaran";
import CarBike from "./pages/FooterMahurat/CarBike";
import Marriage from "./pages/FooterMahurat/Marriage";
import BhumiPuja from "./pages/FooterMahurat/BhumiPuja";
import GrihaPravesh from "./pages/FooterMahurat/GrihaPravesh";
import Mundan from "./pages/FooterMahurat/Mundan";
// import AstrologerServiceProviderTermsAndConditionsPage from "./pages/legal/AstrologerServiceProviderTermsAndConditionsPage";



// import BlogPage from "./pages/BlogPage";

const Home = lazy(() => import("./pages/Home"));
const FreeKundli = lazy(() => import("./pages/kundli/FreeKundli"));
const Blog = lazy(() => import("./pages/Blog/Blog"));
const BlogDetails = lazy(() => import("./pages/Blog/BlogDetails"));
const ChatWithAstro = lazy(() => import("./pages/chatwithAstro/ChatWithAstro"));
const CallwithAstro = lazy(() => import("./pages/callwithAstro/callwithAstro"));
const AstrologerDetails = lazy(() => import("./pages/AstrologerDetails"));
const AstroLogin = lazy(() => import("./components/AstroLogin"));
const AstroRegister = lazy(() => import("./components/AstroRegistration"));
const HoroscopeDetails = lazy(
  () => import("./components/Horoscopes/HoroscopeDetails"),
);


const Horoscopes = lazy(() => import("./pages/Horoscopes"));
const StaticHoroscopesMonthlyAndYearly = lazy(
  () =>
    import("./pages/staticHoroscopesMonthlyAndYearly/StaticHoroscopesMonthlyAndYearly"),
);
const UpdateUser = lazy(() => import("./components/Home/UpdateUser"));
const ForgotPassword = lazy(() => import("./components/ForgotPasswordUser"));
const ForgotPasswordAstro = lazy(
  () => import("./components/ForgotPasswordAstro"),
);

const Dashboard = lazy(() => import("./pages/AstroDashboard/Dashboard"));
const UpdateAstro = lazy(() => import("./pages/AstroDashboard/UpdateAstro"));
const Wallet = lazy(() => import("./pages/AstroDashboard/Wallet"));
const WidhdrowHistory = lazy(
  () => import("./pages/AstroDashboard/WidhdrowHistory"),
);
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));


// all policies are lazy loaded
const DisclaimerPage = lazy(() => import("./pages/legal/DisclaimerPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/legal/PrivacyPolicyPage"));
const RefundPolicyPage = lazy(() => import("./pages/legal/RefundPolicyPage"));
const ShippingPolicyPage = lazy(() => import("./pages/legal/ShippingPolicyPage"));
const TermsAndConditionsPage = lazy(() => import("./pages/legal/TermsAndConditionsPage"));
const AstrologerServiceProviderTermsAndConditionsPage = lazy(() => import("./pages/legal/AstrologerServiceProviderTermsAndConditionsPage"));

const App = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { astrologer } = useSelector((state) => state.astroAuth);
  const { user } = useSelector((state) => state.userAuth);
  const [role, setRole] = useState(localStorage.getItem("role_id"));

  useEffect(() => {
    const storedRole = localStorage.getItem("role_id");
    setRole(storedRole);
  }, []);

  useEffect(() => {
    if (role == 2 && !astrologer) {
      dispatch(AstrologerProfile());
    }

    if (role == 3 && !user) {
      dispatch(userProfile());
    }
  }, [dispatch, role, astrologer, user]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [path]);
  useEffect(() => {
    if (!path.includes("/staticHoroschopes/") && !path.includes("/services")) {
      window.scrollTo(0, 0);
    }
  }, [path]);

  const fatchAstrologers = async () => {
    await dispatch(GetAllAstrologer()).unwrap();
  };

  useEffect(() => {
    fatchAstrologers();
  }, [dispatch]);

  return (
    <>
      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/free-kundli" element={<FreeKundli />} />
            <Route path="/update-user" element={<UpdateUser />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/forgot-password-astro"
              element={<ForgotPasswordAstro />}
            />
            {/* <Route path='/chat-with-astrologer' element={<ChatWithAstro />} /> */}
            <Route path="/talk-to-astrologer" element={<CallwithAstro />} />
            <Route path="/astro-details/:id" element={<Astrodetails />} />
            <Route path="/horoscopes/:date?" element={<Horoscopes />} />
            <Route
              path="/horoscopes/:time/:horos"
              element={<HoroscopeDetails />}
            />
            <Route
              path="/staticHoroschopes/:timePeriod/:zodiac?"
              element={<StaticHoroscopesMonthlyAndYearly />}
            />


            {/* all policies are here */}
            <Route path="/refund-policy" element={<RefundPolicyPage />} />
            <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-conditions" element={<TermsAndConditionsPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/astrologer-serviceProvider-TnC" element={<AstrologerServiceProviderTermsAndConditionsPage />} />



{/* astro route */}
            <Route path="/astro-login" element={<AstroLogin />} />
            <Route path="/astro-register" element={<AstroRegister />} />
            {/* <Route path="/blogs" element={<Blog />} />
            <Route path="/blogs/:id" element={<BlogDetails />} /> */}
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blogs/:slug" element={<BlogDetails />} />
            <Route path="/services/:slug?" element={<ServiceDetail />} />

            {/* all muhurt's are here */}
            <Route path="/annanprashan-muhurat" element={<Annanprashan />} />
            <Route path="/aamkaran-muhurat" element={<Namkaran />} />
            <Route path="/car-bike-muhurat" element={<CarBike />} />
            <Route path="/marriage-muhurat" element={<Marriage />} />
            <Route path="/bhumiPuja-muhurat" element={<BhumiPuja />} />
            <Route path="/griha-pravesh-muhurat" element={<GrihaPravesh />} />
            <Route path="/mundan-muhurat" element={<Mundan />} />
          </Route>
{/* Dashboard starts from here */}
          <Route path="/dashboard" element={<AstroLayout />}>
            <Route path="/dashboard/profile" element={<Dashboard />} />
            <Route path="/dashboard/update-astro" element={<UpdateAstro />} />
            <Route path="/dashboard/wallet" element={<Wallet />} />
            <Route
              path="/dashboard/widhdrow-history"
              element={<WidhdrowHistory />}
            />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
