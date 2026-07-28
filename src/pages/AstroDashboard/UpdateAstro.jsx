import React, { useState, useEffect, useRef } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Star,
  Languages,
  Award,
  Clock,
  Shield,
  Globe,
  Save,
  X,
  Heart,
  Sparkles,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { AstrologerProfile, AstrologerUpdate } from "@/redux/slice/AstroAuth";
import { userProfile, userUpdate } from "@/redux/slice/UserAuth";
import { fileToBase64 } from "@/hooks/fileToBase64"; // ✅ import
import axios from "axios";

// Move FormField component OUTSIDE
import { toast } from "react-toastify";
const FormField = ({
  label,
  name,
  type = "text",
  placeholder,
  icon: Icon,
  required = false,
  className = "",
  value,
  onChange,
}) => {
  // console.log("type",type)
  // console.log("value",type)
  return (
    <div className="space-y-2">
      <Label
        htmlFor={name}
        className="flex items-center gap-2 text-sm font-medium text-slate-700"
      >
        {Icon && <Icon className="w-4 h-4 text-slate-500" />}
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={type !== "date" ? value : value?.split("T")[0]}
        onChange={onChange}
        lang="en-GB"
        className={cn(
          "border-slate-200 focus:border-indigo-400 focus:ring-indigo-200",
          className,
        )}
      />
    </div>
  );
};

// Move MultiSelect component OUTSIDE with maxSelection limit
const MultiSelect = ({
  options,
  selected,
  setSelected,
  label,
  icon: Icon,
  maxSelection = null,
}) => {
  const handleToggle = (option) => {
    setSelected((prev) => {
      if (prev.includes(option)) {
        // Remove if already selected
        return prev.filter((i) => i !== option);
      } else {
        // Add only if under max limit
        if (maxSelection && prev.length >= maxSelection) {
          return prev; // Don't add if limit reached
        }
        return [...prev, option];
      }
    });
  };

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
        {Icon && <Icon className="w-4 h-4 text-slate-500" />}
        {label}
        {maxSelection && (
          <span className="text-xs text-slate-500 font-normal">
            ({selected.length}/{maxSelection} selected)
          </span>
        )}
      </Label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          const isDisabled =
            !isSelected && maxSelection && selected.length >= maxSelection;

          return (
            <Badge
              key={option}
              variant={isSelected ? "default" : "outline"}
              className={cn(
                "capitalize transition-all",
                isSelected
                  ? "bg-primary text-black hover:bg-orange-400 cursor-pointer hover:scale-105"
                  : isDisabled
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:border-primary hover:bg-indigo-50 cursor-pointer hover:scale-105",
              )}
              onClick={() => !isDisabled && handleToggle(option)}
            >
              {option}
              {isSelected && <Sparkles className="ml-1 w-3 h-3" />}
            </Badge>
          );
        })}
      </div>
      <p className="text-xs text-slate-500 italic">
        {maxSelection
          ? `Select up to ${maxSelection} options`
          : "Click to select / deselect"}
      </p>
    </div>
  );
};

function UpdateAstro() {
  const { astrologer, loading: astroLoading } = useSelector(
    (state) => state.astroAuth,
  );
  const { user, loading: userLoading } = useSelector((state) => state.userAuth);

  const [role, setRole] = useState(localStorage.getItem("role_id"));
  const dispatch = useDispatch();
  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];

  //   if (file) {
  //     setProfileFile(file);
  //     setPreviewImage(URL.createObjectURL(file));
  //   }
  // };

// 🔥 BIRTH PLACE AUTOCOMPLETE के लिए नए STATES (formData वाले useState के नीचे डालें)
const [birthPlaceInput, setBirthPlaceInput] = useState("");        // Input में दिखने वाला टेक्स्ट (String)
const [placeSuggestions, setPlaceSuggestions] = useState([]);      // API से आए सुझाव (Array)
const [showSuggestions, setShowSuggestions] = useState(false);     // Dropdown खुला/बंद (Boolean)
const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false); // Loading स्पिनर
const debounceTimerRef = useRef(null);        // 300ms वाला Timer Ref (Debounce के लिए)
const suggestionRef = useRef(null);           // Dropdown के बाहर क्लिक पकड़ने के लिए Ref







// 🔥 Dropdown के बाहर क्लिक करने पर बंद करें
useEffect(() => {
  const handleClickOutside = (event) => {
    if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

// 🔥 API से सुझाव लाने का Function
const fetchPlaceSuggestions = async (query) => {
  if (!query || query.length < 2) {
    setPlaceSuggestions([]);
    setShowSuggestions(false);
    return;
  }
  setIsLoadingSuggestions(true);
  try {
    const response = await axios.get(
      `https://jagannatha-hora-359167915530.europe-west1.run.app/location/autocomplete?q=${encodeURIComponent(query)}`
    );
    const data = response.data;
    setPlaceSuggestions(data.results || []);
    setShowSuggestions(true);
  } catch (error) {
    console.error("Failed to fetch place suggestions:", error);
    setPlaceSuggestions([]);
    toast.error("Failed to load suggestions.");
  } finally {
    setIsLoadingSuggestions(false);
  }
};





// 🔥 जब यूजर इनपुट में टाइप करे
const handleBirthPlaceChange = (e) => {
  const value = e.target.value;
  setBirthPlaceInput(value);

  // पुराना सेलेक्टेड Place (Object) हटाओ, ताकि पुराना Data न भेजा जाए
  setFormData((prev) => ({ ...prev, birthPlace: null }));

  // Debounce Timer
  if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
  debounceTimerRef.current = setTimeout(() => {
    fetchPlaceSuggestions(value);
  }, 300);
};




// 🔥 जब यूजर सुझाव (Dropdown) पर क्लिक करे
const handlePlaceSelect = (place) => {
  // 1. Input में Display Name दिखाओ (जैसे "New Delhi, Delhi, India")
  setBirthPlaceInput(place.displayName);
  
  // 2. Dropdown बंद करो
  setShowSuggestions(false);
  setPlaceSuggestions([]);

  // 3. 🚀 formData.birthPlace में पूरा Object सेट करो!
  // (अब यह String नहीं, बल्कि { displayName, latitude, longitude... } होगा)
  setFormData((prev) => ({ ...prev, birthPlace: place }));
};



  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validation (optional)
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size must be less than 2MB");
        return;
      }

      try {
        const base64 = await fileToBase64(file);
        setProfileImageBase64(base64);
        setPreviewImage(URL.createObjectURL(file)); // preview ke liye
      } catch (error) {
        toast.error("Failed to process image");
      }
    }
  };
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    countryCode: "+91",
    gender: "",
    dob: "",
    birthPlace: "",
    birthTime: "",
    about: "",
    address: "",
    pincode: "",
    experience: "",
    chatPrice: "",
    callPrice: "",
  });

  const [selectedExpertise, setSelectedExpertise] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedQualification, setSelectedQualification] = useState([]);

  const expertiseOptions = [
    "tarot",
    "vastu",
    "numerology",
    "palmistry",
    "vedic",
    "astrology",
    "horoscope",
  ];
  const languageOptions = [
    "english",
    "hindi",
    "bengali",
    "tamil",
    "telugu",
    "marathi",
    "gujarati",
  ];
  const categoryOptions = [
    "love",
    "marriage",
    "health",
    "career",
    "finance",
    "family",
    "education",
  ];
  const qualificationOptions = [
    { value: "self_learned", label: "Self Learned" },
    { value: "diploma", label: "Diploma in Astrology" },
    { value: "acharya", label: "Acharya in Astrology" },
    { value: "phd", label: "PhD in Astrology" },
  ];
  // qualification ke value ko lebel and lebel ko value me convert karne ke liye kyuki backend ko value send karna hai jab bhi user label par click kare

  const qualificationValueToLabel = Object.fromEntries(
    qualificationOptions.map((opt) => [opt.value, opt.label]),
  );
  const qualificationLabelToValue = Object.fromEntries(
    qualificationOptions.map((opt) => [opt.label, opt.value]),
  );

  // ham aise bhi kar sakte hain but future me agar koi value add karenge to yaha bhi change karna padega isliye upar wala use kar rahe hain

  //   const qualificationValueToLabel = {
  //   "self_learned": "Self Learned",
  //   "diploma": "Diploma in Astrology",
  //   "acharya": "Acharya in Astrology",
  //   "phd": "PhD in Astrology"
  // };
  // const qualificationLabelToValue = {
  //   "Self Learned": "self_learned",
  //   "Diploma in Astrology": "diploma",
  //   "Acharya in Astrology": "acharya",
  //   "PhD in Astrology": "phd"
  // };

  // Determine which data to use based on role
  const isAstrologer = role === "2";
  const currentProfile = isAstrologer ? astrologer : user;
  const loading = isAstrologer ? astroLoading : userLoading;
  console.log("current profile", currentProfile);

  useEffect(() => {
    if (currentProfile) {
      setFormData({
        name: currentProfile?.name || "",
        username: currentProfile?.username || "",
        email: currentProfile?.email || "",
        mobile: currentProfile?.mobile || "",
        countryCode: currentProfile?.country_code || "+91",
        gender: currentProfile?.gender || "",
        dob: currentProfile?.dob || "",
        birthPlace: currentProfile?.birth_place || "",
        birthTime: currentProfile?.birth_time || "",
        about: currentProfile?.about || "",
        address: currentProfile?.address || "",
        pincode: currentProfile?.pincode || "",
        experience: currentProfile?.experience?.toString() || "",
        chatPrice: currentProfile?.chat_price || "",
        callPrice: currentProfile?.call_price || "",
      });

    if (currentProfile?.birth_place) {
      if (typeof currentProfile.birth_place === "object" && currentProfile.birth_place.place) {
        setBirthPlaceInput(currentProfile.birth_place?.place);
      } else if (typeof currentProfile.birth_place === "string") {
        setBirthPlaceInput(currentProfile.birth_place);
      }
    } else {
      setBirthPlaceInput(""); // अगर कोई डेटा नहीं है तो खाली करो
    }


      // Only set these for astrologers
      if (isAstrologer) {
        setSelectedExpertise(currentProfile?.expertise || []);
        setSelectedLanguages(currentProfile?.languages || []);
        setSelectedCategories(currentProfile?.category || []);
        const values = currentProfile?.astro_education || [];
        const labels = values
          .map((v) => qualificationValueToLabel[v])
          .filter(Boolean);
        setSelectedQualification(labels);
      }
    }
  }, [currentProfile, isAstrologer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async () => {
  //   const fd = new FormData();

  //   fd.append("name", formData.name);
  //   fd.append("username", formData.username);
  //   fd.append("email", formData.email);
  //   fd.append("mobile", formData.mobile);
  //   fd.append("country_code", formData.countryCode);
  //   fd.append("gender", formData.gender);
  //   fd.append("dob", formData.dob);
  //   fd.append("birth_place", formData.birthPlace);
  //   fd.append("birth_time", formData.birthTime);
  //   fd.append("about", formData.about);
  //   fd.append("address", formData.address);
  //   fd.append("pincode", formData.pincode);

  //   if (profileFile) {
  //     fd.append("profile_image", profileFile);
  //   }

  //   try {
  //     if (isAstrologer) {
  //       fd.append("experience", parseInt(formData.experience) || 0);
  //       fd.append("chat_price", parseFloat(formData.chatPrice) || 0);
  //       fd.append("call_price", parseFloat(formData.callPrice) || 0);

  //       selectedExpertise.forEach((i) => fd.append("expertise[]", i));
  //       selectedLanguages.forEach((i) => fd.append("languages[]", i));
  //       selectedCategories.forEach((i) => fd.append("category[]", i));

  //       await dispatch(AstrologerUpdate(fd)).unwrap();
  //       await dispatch(AstrologerProfile()).unwrap();
  //     } else {
  //       await dispatch(userUpdate(fd)).unwrap();
  //       await dispatch(userProfile()).unwrap();
  //     }

  //     console.log("Profile updated successfully");
  //   } catch (error) {
  //     console.error("Update failed:", error);
  //   }
  // };

  const handleSubmit = async () => {
    // ✅ JSON object banayein
    const updateData = {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      mobile: formData.mobile,
      country_code: formData.countryCode,
      gender: formData.gender,
      dob: formData.dob,
      birth_place: formData.birthPlace,
      birth_time: formData.birthTime,
      about: formData.about,
      address: formData.address,
      pincode: formData.pincode,
      profile_image: profileImageBase64 || null, // ✅ Base64 string
    };

    if (isAstrologer) {
      updateData.experience = parseInt(formData.experience) || 0;
      updateData.chat_price = parseFloat(formData.chatPrice) || 0;
      updateData.call_price = parseFloat(formData.callPrice) || 0;
      updateData.expertise = selectedExpertise;
      updateData.languages = selectedLanguages;
      updateData.category = selectedCategories;
      updateData.astro_education = selectedQualification.map(
        (label) => qualificationLabelToValue[label],
      );
    }

    try {
      if (isAstrologer) {
        await dispatch(AstrologerUpdate(updateData)).unwrap();
        await dispatch(AstrologerProfile()).unwrap();
      } else {
        await dispatch(userUpdate(updateData)).unwrap();
        await dispatch(userProfile()).unwrap();
      }
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed");
    }
  };
  const handleCancel = () => {
    if (confirm("Are you sure you want to discard changes?")) {
      window.history.back();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-1 items-center justify-center">
        <div className="text-center">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 space-y-2">
          <h2 className="font-semibild flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            Update Your Profile
          </h2>
          <p className="text-slate-600">
            {isAstrologer
              ? "Keep your professional & cosmic details up to date"
              : "Keep your personal information up to date"}
          </p>
        </div>

        <div className="mb-8 flex">
          <Card className="w-full max-w-md border-0 p-1">
            <CardContent className="pt-6 p-0">
              <div className="flex items-center gap-4">
                <div className="relative w-fit">
                  <label
                    htmlFor="profileUpload"
                    className="relative cursor-pointer group block rounded-full overflow-hidden"
                  >
                    <Avatar className="w-20 h-20  border-4 border-primary/20 transition-transform duration-300 group-hover:scale-105">
                      <AvatarImage
                        src={previewImage || currentProfile?.profile_image}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-orange-500 text-white text-2xl">
                        {currentProfile?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <span className="text-white text-xs font-medium flex flex-col items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 7h2l2-3h10l2 3h2v11H3V7z"
                          />
                          <circle cx="12" cy="13" r="3" />
                        </svg>
                        Change
                      </span>
                    </div>
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    id="profileUpload"
                    onChange={handleImageChange}
                  />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {formData.name}
                  </h2>
                  <p className="text-slate-500 text-md!">
                    @{formData.username}
                  </p>
                  {isAstrologer && (
                    <Badge className="m-1 bg-primary/20 text-primary border-primary">
                      Astrologer
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-2 pt-0 border-primary/50 shadow-lg overflow-visible ">
            <CardHeader className="bg-primary/70 py-2 ">
              <CardTitle className="flex items-center gap-2 ">
                <User className="w-5 h-5 text-primary-forground" />
                Personal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  label="Full Name"
                  name="name"
                  placeholder="Enter full name"
                  icon={User}
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <FormField
                  label="Username"
                  name="username"
                  placeholder="Enter username"
                  icon={User}
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <User className="w-4 h-4 text-slate-500" />
                    Gender
                  </Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(v) =>
                      setFormData((p) => ({ ...p, gender: v }))
                    }
                  >
                    <SelectTrigger className="border-slate-200 w-full focus:border-indigo-400 focus:ring-indigo-200">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               
                {/* <FormField
                  label="Birth Place"
                  name="birthPlace"
                  placeholder="City, State"
                  icon={MapPin}
                  value={formData.birthPlace}
                  onChange={handleInputChange}
                /> */}


                {/* 🔥🔥🔥 NEW: BIRTH PLACE - AUTOCOMPLETE (पुराने FormField की जगह) 🔥🔥🔥 */}
<div className="space-y-2 relative" ref={suggestionRef}>
  <Label htmlFor="birthPlace" className="flex items-center gap-2 text-sm font-medium text-slate-700">
    <MapPin className="w-4 h-4 text-slate-500" />
    Birth Place
  </Label>
  <Input
    id="birthPlace"
    placeholder="Birth Place"
    autoComplete="off"
    value={birthPlaceInput} //  यह String है
    onChange={handleBirthPlaceChange}
    onFocus={() => {
      // अगर पहले से suggestions हैं, तो फोकस करने पर दिखा दो
      if (birthPlaceInput.length >= 2 && placeSuggestions.length > 0) {
        setShowSuggestions(true);
      }
    }}
    className="focus:ring-2 focus:ring-amber-400 transition"
  />

  {/* ✅ Dropdown (Suggestions Box) */}
  {showSuggestions && (
    <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
      {isLoadingSuggestions ? (
        <div className="p-3 text-center text-gray-500 text-sm">Loading...</div>
      ) : placeSuggestions.length > 0 ? (
        placeSuggestions.map((place, index) => (
          <div
            key={index}
            className="px-4 py-2 hover:bg-amber-50 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
            onClick={() => handlePlaceSelect(place)} // 🟢 Select पर Object सेट होगा
          >
            <div className="font-medium text-gray-800 text-sm">{place.displayName}</div>
            <div className="text-xs text-gray-500">{place.country} {place.state && `• ${place.state}`}</div>
          </div>
        ))
      ) : (
        <div className="p-3 text-center text-gray-400 text-sm">No places found</div>
      )}
    </div>
  )}
</div>

 <FormField
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  icon={Calendar}
                  value={formData.dob}
                  onChange={handleInputChange}
                />
                <FormField
                  label="Birth Time"
                  name="birthTime"
                  type="time"
                  step="1"
                  icon={Clock}
                  value={formData.birthTime}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 pt-0 border-primary/50 shadow-lg overflow-hidden">
            <CardHeader className="bg-primary/70 py-2">
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  icon={Mail}
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <Phone className="w-4 h-4 text-slate-500" />
                    Mobile Number
                    <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={formData.countryCode}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          countryCode: e.target.value,
                        }))
                      }
                      className="w-24 border-slate-200 focus:border-indigo-400 focus:ring-indigo-200"
                    />
                    <Input
                      name="mobile"
                      placeholder="9876543210"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="flex-1 border-slate-200 focus:border-indigo-400 focus:ring-indigo-200"
                    />
                  </div>
                </div>

                <FormField
                  label="Address"
                  name="address"
                  placeholder="Full address"
                  icon={MapPin}
                  value={formData.address}
                  onChange={handleInputChange}
                />
                <FormField
                  label="Pincode"
                  name="pincode"
                  placeholder="123456"
                  icon={MapPin}
                  value={formData.pincode}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          {isAstrologer && (
            <Card className="border-2 pt-0 border-primary/50 shadow-lg overflow-hidden">
              <CardHeader className="bg-primary/70 py-2">
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Professional & Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  label="Years of Experience"
                  name="experience"
                  type="number"
                  placeholder="5"
                  icon={Award}
                  value={formData.experience}
                  onChange={handleInputChange}
                />

                <MultiSelect
                  options={expertiseOptions}
                  selected={selectedExpertise}
                  setSelected={setSelectedExpertise}
                  label="Areas of Expertise"
                  icon={Star}
                  maxSelection={3}
                />

                <MultiSelect
                  options={languageOptions}
                  selected={selectedLanguages}
                  setSelected={setSelectedLanguages}
                  label="Languages Known"
                  icon={Languages}
                  maxSelection={3}
                />

                <MultiSelect
                  options={categoryOptions}
                  selected={selectedCategories}
                  setSelected={setSelectedCategories}
                  label="Consultation Categories"
                  icon={Globe}
                  maxSelection={3}
                />
                <MultiSelect
                  options={qualificationOptions.map((opt) => opt.label)} // MultiSelect expects array of strings
                  selected={selectedQualification}
                  setSelected={setSelectedQualification}
                  label="Astrology Qualification"
                  icon={Award}
                  maxSelection={null} // allow multiple (as per registration)
                />
              </CardContent>
            </Card>
          )}

          <Card className="border-2 pt-0 border-primary/50 shadow-lg overflow-hidden">
            <CardHeader className="bg-primary/70 py-2">
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                About You
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className="space-y-2 mb-4">
                <Label
                  htmlFor="about"
                  className="text-sm font-medium text-slate-700"
                >
                  {isAstrologer
                    ? "Professional Bio & Approach"
                    : "About Yourself"}
                  <p className="text-xs text-slate-500 italic">
                    {isAstrologer
                      ? "Appears on your public profile — make it warm and authentic"
                      : "Tell us a bit about yourself"}
                  </p>
                </Label>
                <Textarea
                  id="about"
                  name="about"
                  rows={6}
                  placeholder={
                    isAstrologer
                      ? "Share your journey, philosophy, and what makes your practice special..."
                      : "Share a bit about yourself, your interests, and what brings you here..."
                  }
                  value={formData.about}
                  onChange={handleInputChange}
                  className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-200 resize-none"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white backdrop-blur-md border-t border-gray-200 shadow-2xl py-4 px-4 sm:px-8">
          <div className="max-w-5xl mx-auto flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="min-w-32 hover:bg-slate-50"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="min-w-32 bg-primary text-black hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-200/40"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateAstro;
