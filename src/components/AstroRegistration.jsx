{
  /* import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { X, ChevronLeft, ChevronRight, Check, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AstrologerRegister } from "@/redux/slice/AstroAuth";
import { Link, useNavigate } from "react-router-dom";

const languages = [
    { value: "english", label: "English" },
    { value: "hindi", label: "Hindi" },
    { value: "tamil", label: "Tamil" },
    { value: "punjabi", label: "Punjabi" },
    { value: "marathi", label: "Marathi" },
    { value: "gujarati", label: "Gujarati" },
    { value: "bengali", label: "Bengali" },
    { value: "french", label: "French" },
    { value: "odia", label: "Odia" },
    { value: "telugu", label: "Telugu" },
    { value: "kannada", label: "Kannada" },
    { value: "malayalam", label: "Malayalam" },
    { value: "sanskrit", label: "Sanskrit" },
    { value: "assamese", label: "Assamese" },
    { value: "german", label: "German" },
    { value: "spanish", label: "Spanish" },
    { value: "marwari", label: "Marwari" },
    { value: "manipuri", label: "Manipuri" },
    { value: "urdu", label: "Urdu" },
    { value: "sindhi", label: "Sindhi" },
    { value: "kashmiri", label: "Kashmiri" },
    { value: "bodo", label: "Bodo" },
    { value: "nepali", label: "Nepali" },
    { value: "konkani", label: "Konkani" },
    { value: "maithili", label: "Maithili" },
    { value: "arabic", label: "Arabic" },
    { value: "bhojpuri", label: "Bhojpuri" },
    { value: "dutch", label: "Dutch" },
    { value: "rajasthani", label: "Rajasthani" },
];

const categories = [
    { value: "love", label: "Love" },
    { value: "marriage", label: "Marriage" },
    { value: "health", label: "Health" },
    { value: "wealth", label: "Wealth" },
    { value: "education", label: "Education" },
    { value: "career", label: "Career" },
    { value: "legal", label: "Legal" },
    { value: "remedies", label: "Remedies" },
    { value: "finance", label: "Finance" },
    { value: "parents", label: "Parents" },
];

const expertiseOptions = [
    { value: "signature_reading", label: "Signature Reading" },
    { value: "vedic", label: "Vedic" },
    { value: "tarot", label: "Tarot" },
    { value: "kp", label: "KP" },
    { value: "numerology", label: "Numerology" },
    { value: "lal_kitab", label: "Lal Kitab" },
    { value: "psychic", label: "Psychic" },
    { value: "palmistry", label: "Palmistry" },
    { value: "cartomancy", label: "Cartomancy" },
    { value: "prashana", label: "Prashana" },
    { value: "loshu_grid", label: "Loshu Grid" },
    { value: "nadi", label: "Nadi" },
    { value: "face_reading", label: "Face Reading" },
    { value: "horary", label: "Horary" },
    { value: "life_coach", label: "Life Coach" },
    { value: "western", label: "Western" },
    { value: "gemology", label: "Gemology" },
    { value: "vastu", label: "Vastu" },
];

const steps = [
    { id: 1, title: "Personal Info", description: "Basic details" },
    { id: 2, title: "Professional", description: "Your expertise" },
    { id: 3, title: "Additional Details", description: "Complete profile" },
];

const AstroRegister = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.astroAuth);
    const [currentStep, setCurrentStep] = useState(1);
    const [countryCodes, setCountryCodes] = useState([]);
    const [loadingCountries, setLoadingCountries] = useState(true);

    const [form, setForm] = useState({
        name: "",
        email: "",
        country_code: "+91",
        mobile: "",
        username: "",
        password: "",
        confirmPassword: "",
        expertise: [],
        languages: [],
        categories: [],
        is_family_astrologer: "0",
        family_astrology_details: "",
        address: "",
        pincode: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchCountryCodes = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all?fields=name,idd,cca2');
                const data = await response.json();

                const codes = data
                    .filter(country => country.idd?.root && country.idd?.suffixes)
                    .map(country => {
                        const root = country.idd.root;
                        const suffixes = country.idd.suffixes;

                        if (suffixes.length === 1 && suffixes[0] === '') {
                            return {
                                value: root,
                                label: `${root} (${country.name.common})`,
                                country: country.name.common,
                                code: country.cca2
                            };
                        }

                        return {
                            value: `${root}${suffixes[0]}`,
                            label: `${root}${suffixes[0]} (${country.name.common})`,
                            country: country.name.common,
                            code: country.cca2
                        };
                    })
                    .sort((a, b) => a.country.localeCompare(b.country));

                const uniqueCodes = codes.filter((code, index, self) =>
                    index === self.findIndex((c) => c.value === code.value)
                );

                setCountryCodes(uniqueCodes);
                setLoadingCountries(false);
            } catch (error) {
                console.error('Error fetching country codes:', error);
                toast.error('Failed to load country codes');
                setLoadingCountries(false);
            }
        };

        fetchCountryCodes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleSelect = (name, value) => {
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleMultiSelect = (field, value) => {
        if (!form[field].includes(value)) {
            setForm((prev) => ({
                ...prev,
                [field]: [...prev[field], value],
            }));
            if (errors[field]) {
                setErrors(prev => ({ ...prev, [field]: "" }));
            }
        }
    };

    const removeMultiSelect = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: prev[field].filter((item) => item !== value),
        }));
    };

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            // Full Name validation
            if (!form.name.trim()) {
                newErrors.name = "Full name is required";
            } else if (form.name.trim().length < 3) {
                newErrors.name = "Full name must be at least 3 characters";
            }

            // Username validation
            if (!form.username.trim()) {
                newErrors.username = "Username is required";
            } else if (form.username.trim().length < 3) {
                newErrors.username = "Username must be at least 3 characters";
            } else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
                newErrors.username = "Username can only contain letters, numbers, and underscores";
            }

            // Email validation
            if (!form.email.trim()) {
                newErrors.email = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(form.email)) {
                newErrors.email = "Please enter a valid email address";
            }

            // Mobile validation
            if (!form.mobile.trim()) {
                newErrors.mobile = "Mobile number is required";
            } else if (!/^\d{10}$/.test(form.mobile)) {
                newErrors.mobile = "Mobile number must be exactly 10 digits";
            }

            // Password validation
            if (!form.password) {
                newErrors.password = "Password is required";
            } else if (form.password.length < 6) {
                newErrors.password = "Password must be at least 6 characters";
            } else if (form.password.length > 20) {
                newErrors.password = "Password must not exceed 20 characters";
            }

            // Confirm Password validation
            if (!form.confirmPassword) {
                newErrors.confirmPassword = "Please confirm your password";
            } else if (form.password !== form.confirmPassword) {
                newErrors.confirmPassword = "Passwords do not match";
            }
        }

        if (step === 2) {
            // Expertise validation
            if (form.expertise.length === 0) {
                newErrors.expertise = "Please select at least one area of expertise";
            }

            // Languages validation
            if (form.languages.length === 0) {
                newErrors.languages = "Please select at least one language";
            }

            // Categories validation
            if (form.categories.length === 0) {
                newErrors.categories = "Please select at least one category";
            }
        }

        if (step === 3) {
            // Family Astrologer validation
            if (!["0", "1"].includes(form.is_family_astrologer)) {
                newErrors.is_family_astrologer = "Please select an option";
            }

            // Family Astrology Details validation (if family astrologer is Yes)
            if (form.is_family_astrologer === "1") {
                if (!form.family_astrology_details.trim()) {
                    newErrors.family_astrology_details = "Family astrology details are required";
                } else if (form.family_astrology_details.trim().length < 20) {
                    newErrors.family_astrology_details = "Please provide at least 20 characters of details";
                } else if (form.family_astrology_details.length > 1000) {
                    newErrors.family_astrology_details = "Details must not exceed 1000 characters";
                }
            }

            // Address validation (optional but if provided, should have minimum length)
            if (form.address.trim() && form.address.trim().length < 10) {
                newErrors.address = "Address should be at least 10 characters if provided";
            }

            // Pincode validation (optional but if provided, should be valid)
            if (form.pincode.trim() && !/^\d{6}$/.test(form.pincode)) {
                newErrors.pincode = "Pincode must be 6 digits";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            toast.error("Please fix all errors before proceeding");
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep(currentStep)) {
            toast.error("Please fix all errors before submitting");
            return;
        }

        const submitData = {
            name: form.name.trim(),
            email: form.email.trim(),
            country_code: form.country_code,
            mobile: form.mobile.trim(),
            username: form.username.trim(),
            password: form.password,
            password_confirmation: form.confirmPassword,
            expertise: form.expertise,
            languages: form.languages,
            category: form.categories,
            is_family_astrologer: Number(form.is_family_astrologer),
            family_astrology_details: form.is_family_astrologer === "1" ? form.family_astrology_details.trim() : null,
            address: form.address.trim() || null,
            pincode: form.pincode.trim() || null,
        };

        try {
            await dispatch(AstrologerRegister(submitData)).unwrap();
            toast.success("Registration successful! Redirecting to login...");

            setTimeout(() => {
                navigate("/astro-login");
            }, 2000);
        } catch (error) {
            if (error?.message) {
                toast.error(error.message);
            } else if (error?.error) {
                toast.error(error.error);
            } else if (typeof error === 'string') {
                toast.error(error);
            } else {
                toast.error("Registration failed. Please try again.");
            }
            console.error("Registration error:", error);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-5">
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name *</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className={errors.name ? "border-red-500" : ""}
                                />
                                {errors.name && (
                                    <p className="text-xs text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="username">Username *</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="Choose a unique username"
                                    value={form.username}
                                    onChange={handleChange}
                                    className={errors.username ? "border-red-500" : ""}
                                />
                                {errors.username && (
                                    <p className="text-xs text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {errors.username}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address *</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    className={errors.email ? "border-red-500" : ""}
                                />
                                {errors.email && (
                                    <p className="text-xs text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Mobile Number *</Label>
                                <div className="flex gap-2">
                                    <Select
                                        value={form.country_code}
                                        onValueChange={(value) => handleSelect("country_code", value)}
                                        disabled={loadingCountries}
                                    >
                                        <SelectTrigger className="w-[140px]">
                                            <SelectValue placeholder="Code" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {countryCodes.map((code) => (
                                                <SelectItem key={code.code} value={code.value}>
                                                    {code.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Input
                                        name="mobile"
                                        placeholder="1234567890"
                                        value={form.mobile}
                                        maxLength={10}
                                        onChange={handleChange}
                                        className={`flex-1 ${errors.mobile ? "border-red-500" : ""}`}
                                    />
                                </div>
                                {errors.mobile && (
                                    <p className="text-xs text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {errors.mobile}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password *</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Min 6 characters"
                                    value={form.password}
                                    onChange={handleChange}
                                    className={errors.password ? "border-red-500" : ""}
                                />
                                {errors.password && (
                                    <p className="text-xs text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Re-enter password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    className={errors.confirmPassword ? "border-red-500" : ""}
                                />
                                {errors.confirmPassword && (
                                    <p className="text-xs text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <Label>Expertise *</Label>
                            <Select onValueChange={(value) => handleMultiSelect("expertise", value)}>
                                <SelectTrigger className={errors.expertise ? "border-red-500" : ""}>
                                    <SelectValue placeholder="Select your areas of expertise" />
                                </SelectTrigger>
                                <SelectContent>
                                    {expertiseOptions.map((exp) => (
                                        <SelectItem key={exp.value} value={exp.value}>
                                            {exp.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.expertise && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    {errors.expertise}
                                </p>
                            )}
                            {form.expertise.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {form.expertise.map((skill) => (
                                        <Badge
                                            key={skill}
                                            variant="secondary"
                                            className="px-3 py-1.5 bg-blue-100 text-blue-700 hover:bg-blue-200"
                                        >
                                            {expertiseOptions.find(e => e.value === skill)?.label || skill}
                                            <X
                                                className="w-3.5 h-3.5 ml-2 cursor-pointer"
                                                onClick={() => removeMultiSelect("expertise", skill)}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Languages *</Label>
                            <Select onValueChange={(value) => handleMultiSelect("languages", value)}>
                                <SelectTrigger className={errors.languages ? "border-red-500" : ""}>
                                    <SelectValue placeholder="Select languages you speak" />
                                </SelectTrigger>
                                <SelectContent>
                                    {languages.map((lang) => (
                                        <SelectItem key={lang.value} value={lang.value}>
                                            {lang.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.languages && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    {errors.languages}
                                </p>
                            )}
                            {form.languages.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {form.languages.map((lang) => (
                                        <Badge
                                            key={lang}
                                            variant="secondary"
                                            className="px-3 py-1.5 bg-green-100 text-green-700 hover:bg-green-200"
                                        >
                                            {languages.find(l => l.value === lang)?.label || lang}
                                            <X
                                                className="w-3.5 h-3.5 ml-2 cursor-pointer"
                                                onClick={() => removeMultiSelect("languages", lang)}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Categories *</Label>
                            <Select onValueChange={(value) => handleMultiSelect("categories", value)}>
                                <SelectTrigger className={errors.categories ? "border-red-500" : ""}>
                                    <SelectValue placeholder="Select consultation categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.categories && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    {errors.categories}
                                </p>
                            )}
                            {form.categories.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {form.categories.map((cat) => (
                                        <Badge
                                            key={cat}
                                            variant="secondary"
                                            className="px-3 py-1.5 bg-orange-100 text-orange-700 hover:bg-orange-200"
                                        >
                                            {categories.find(c => c.value === cat)?.label || cat}
                                            <X
                                                className="w-3.5 h-3.5 ml-2 cursor-pointer"
                                                onClick={() => removeMultiSelect("categories", cat)}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <Label>Are you a Family Astrologer? *</Label>
                            <Select
                                value={form.is_family_astrologer}
                                onValueChange={(value) => handleSelect("is_family_astrologer", value)}
                            >
                                <SelectTrigger className={errors.is_family_astrologer ? "border-red-500" : ""}>
                                    <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Yes</SelectItem>
                                    <SelectItem value="0">No</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.is_family_astrologer && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    {errors.is_family_astrologer}
                                </p>
                            )}
                        </div>

                        {form.is_family_astrologer === "1" && (
                            <div className="space-y-2">
                                <Label htmlFor="family_astrology_details">Family Astrology Details *</Label>
                                <Textarea
                                    id="family_astrology_details"
                                    name="family_astrology_details"
                                    placeholder="Describe your experience and expertise in family astrology..."
                                    value={form.family_astrology_details}
                                    onChange={handleChange}
                                    maxLength={1000}
                                    rows={4}
                                    className={`resize-none ${errors.family_astrology_details ? "border-red-500" : ""}`}
                                />
                                {errors.family_astrology_details && (
                                    <p className="text-xs text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {errors.family_astrology_details}
                                    </p>
                                )}
                                <p className="text-xs text-gray-500 text-right">
                                    {form.family_astrology_details.length}/1000 characters
                                </p>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="address">Full Address</Label>
                            <Textarea
                                id="address"
                                name="address"
                                placeholder="Enter your complete address (optional)"
                                value={form.address}
                                onChange={handleChange}
                                maxLength={500}
                                rows={3}
                                className={`resize-none ${errors.address ? "border-red-500" : ""}`}
                            />
                            {errors.address && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    {errors.address}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="pincode">Pincode</Label>
                            <Input
                                id="pincode"
                                name="pincode"
                                placeholder="110001 (optional)"
                                value={form.pincode}
                                maxLength={6}
                                onChange={handleChange}
                                className={errors.pincode ? "border-red-500" : ""}
                            />
                            {errors.pincode && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    {errors.pincode}
                                </p>
                            )}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    const progressPercentage = (currentStep / steps.length) * 100;

    return (
        <section>
            <div className="container">
                <div className="min-h-screen border rounded-2xl py-12">
                    <div className="mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-gray-900 mb-2">
                                Astrologer Registration
                            </h2>
                        </div>

                        <Card className="p-8 border-0">
                            <div className="mb-8">
                                <div className="flex justify-between mb-4">
                                    {steps.map((step) => (
                                        <div key={step.id} className="flex flex-col items-center flex-1">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${step.id < currentStep
                                                    ? "bg-green-500 text-white"
                                                    : step.id === currentStep
                                                        ? "bg-yellow-500 text-white"
                                                        : "bg-gray-200 text-gray-500"
                                                    }`}
                                            >
                                                {step.id < currentStep ? <Check className="w-5 h-5" /> : step.id}
                                            </div>
                                            <div className="text-center">
                                                <p className={`text-sm font-medium ${step.id <= currentStep ? "text-gray-900" : "text-gray-500"
                                                    }`}>
                                                    {step.title}
                                                </p>
                                                <p className="text-xs text-gray-500">{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Progress value={progressPercentage} className="h-2" />
                            </div>

                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                                    {steps[currentStep - 1].title}
                                </h2>
                                <p className="text-gray-600">
                                    Step {currentStep} of {steps.length}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-8">
                                    {renderStepContent()}
                                </div>

                                <div className="flex justify-between gap-4 pt-6 border-t">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={prevStep}
                                        disabled={currentStep === 1}
                                        className="min-w-[120px]"
                                    >
                                        <ChevronLeft className="w-4 h-4 mr-1" />
                                        Previous
                                    </Button>

                                    {currentStep < steps.length ? (
                                        <Button
                                            type="button"
                                            onClick={nextStep}
                                            className="min-w-[120px] bg-yellow-500 hover:bg-yellow-700"
                                        >
                                            Next
                                            <ChevronRight className="w-4 h-4 ml-1" />
                                        </Button>
                                    ) : (
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="min-w-[120px] bg-green-600 hover:bg-green-700"
                                        >
                                            {loading ? (
                                                <span className="flex items-center gap-2">
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    Submitting...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1">
                                                    <Check className="w-4 h-4" />
                                                    Submit
                                                </span>
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </form>

                            <p className="text-center text-sm text-gray-600 mt-6 pt-6 border-t">
                                Already have an account?{" "}
                                <Link to="/astro-login" className="text-black font-semibold hover:underline">
                                    Login here
                                </Link>
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AstroRegister;
*/
}

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Check, AlertCircle, Camera, Upload } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AstrologerRegister } from "@/redux/slice/AstroAuth";
import { Link, useNavigate } from "react-router-dom";
import { fileToBase64 } from "@/hooks/fileToBase64";

// Language options
const languages = [
  { value: "english", label: "English" },
  { value: "hindi", label: "Hindi" },
  { value: "tamil", label: "Tamil" },
  { value: "punjabi", label: "Punjabi" },
  { value: "marathi", label: "Marathi" },
  { value: "gujarati", label: "Gujarati" },
  { value: "bengali", label: "Bengali" },
  { value: "french", label: "French" },
  { value: "odia", label: "Odia" },
  { value: "telugu", label: "Telugu" },
  { value: "kannada", label: "Kannada" },
  { value: "malayalam", label: "Malayalam" },
  { value: "sanskrit", label: "Sanskrit" },
  { value: "assamese", label: "Assamese" },
  { value: "german", label: "German" },
  { value: "spanish", label: "Spanish" },
  { value: "marwari", label: "Marwari" },
  { value: "manipuri", label: "Manipuri" },
  { value: "urdu", label: "Urdu" },
  { value: "sindhi", label: "Sindhi" },
  { value: "kashmiri", label: "Kashmiri" },
  { value: "bodo", label: "Bodo" },
  { value: "nepali", label: "Nepali" },
  { value: "konkani", label: "Konkani" },
  { value: "maithili", label: "Maithili" },
  { value: "arabic", label: "Arabic" },
  { value: "bhojpuri", label: "Bhojpuri" },
  { value: "dutch", label: "Dutch" },
  { value: "rajasthani", label: "Rajasthani" },
];

// Category options
const categories = [
  { value: "love", label: "Love" },
  { value: "marriage", label: "Marriage" },
  { value: "health", label: "Health" },
  { value: "wealth", label: "Wealth" },
  { value: "education", label: "Education" },
  { value: "career", label: "Career" },
  { value: "legal", label: "Legal" },
  { value: "remedies", label: "Remedies" },
  { value: "finance", label: "Finance" },
  { value: "parents", label: "Parents" },
];

// Expertise options
const expertiseOptions = [
  { value: "signature_reading", label: "Signature Reading" },
  { value: "vedic", label: "Vedic" },
  { value: "tarot", label: "Tarot" },
  { value: "kp", label: "KP" },
  { value: "numerology", label: "Numerology" },
  { value: "lal_kitab", label: "Lal Kitab" },
  { value: "psychic", label: "Psychic" },
  { value: "palmistry", label: "Palmistry" },
  { value: "cartomancy", label: "Cartomancy" },
  { value: "prashana", label: "Prashana" },
  { value: "loshu_grid", label: "Loshu Grid" },
  { value: "nadi", label: "Nadi" },
  { value: "face_reading", label: "Face Reading" },
  { value: "horary", label: "Horary" },
  { value: "life_coach", label: "Life Coach" },
  { value: "western", label: "Western" },
  { value: "gemology", label: "Gemology" },
  { value: "vastu", label: "Vastu" },
];
const astrologerQualificationOptions = [
  { value: "self_learned", label: "Self Learned" },
  { value: "diploma", label: "Diploma in Astrology" },
  { value: "acharya", label: "Acharya in Astrology" },
  { value: "phd", label: "PhD in Astrology" },
];

const AstroRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, astrologer } = useSelector((state) => state.astroAuth);
  const [countryCodes, setCountryCodes] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registrationCode, setRegistrationCode] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    country_code: "+91",
    mobile: "",
    username: "",
    password: "",
    confirmPassword: "",
    expertise: [],
    languages: [],
    categories: [],
    experience: "",
    daily_available_hours: "",
    is_family_astrologer: "0",
    family_astrology_details: "",
    address: "",
    pincode: "",
    astro_education: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [errors, setErrors] = useState({});

  // Fetch country codes
  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,idd,cca2",
        );
        const data = await response.json();

        const codes = data
          .filter((country) => country.idd?.root && country.idd?.suffixes)
          .map((country) => {
            const root = country.idd.root;
            const suffixes = country.idd.suffixes;

            if (suffixes.length === 1 && suffixes[0] === "") {
              return {
                value: root,
                label: `${root} (${country.name.common})`,
                country: country.name.common,
                code: country.cca2,
              };
            }

            return {
              value: `${root}${suffixes[0]}`,
              label: `${root}${suffixes[0]} (${country.name.common})`,
              country: country.name.common,
              code: country.cca2,
            };
          })
          .sort((a, b) => a.country.localeCompare(b.country));

        const uniqueCodes = codes.filter(
          (code, index, self) =>
            index === self.findIndex((c) => c.value === code.value),
        );

        setCountryCodes(uniqueCodes);
        setLoadingCountries(false);
      } catch (error) {
        console.error("Error fetching country codes:", error);
        toast.error("Failed to load country codes");
        setLoadingCountries(false);
      }
    };

    fetchCountryCodes();
  }, []);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  // Image change handler with validation
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
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
        setProfileImage(base64);          // ✅ Base64 store
        setImagePreview(URL.createObjectURL(file));
      } catch (error) {
        toast.error("Failed to process image");
      }
    }
  };

  const handleSelect = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // const handleMultiSelect = (field, value) => {
  //     if (!form[field].includes(value)) {
  //         setForm((prev) => ({
  //             ...prev,
  //             [field]: [...prev[field], value],
  //         }));
  //         if (errors[field]) {
  //             setErrors(prev => ({ ...prev, [field]: "" }));
  //         }
  //     }
  // };
  const handleMultiSelect = (field, value) => {
    const maxItems = field === "astro_education" ? Infinity : 3;
    if (!form[field].includes(value) && form[field].length < maxItems) {
      setForm((prev) => ({
        ...prev,
        [field]: [...prev[field], value],
      }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    }
  };

  //   const removeMultiSelect = (field, value) => {
  //       setForm((prev) => ({
  //           ...prev,
  //           [field]: prev[field].filter((item) => item !== value),
  //       }));
  //   };

  const removeMultiSelect = (e, field, value) => {
    e.preventDefault(); // Prevent any default action
    e.stopPropagation(); // Stop event bubbling
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((item) => item !== value),
    }));
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Personal Info
    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (form.name.trim().length < 3) {
      newErrors.name = "Full name must be at least 3 characters";
    }

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    } else if (form.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
      newErrors.username =
        "Username can only contain letters, numbers, and underscores";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(form.mobile)) {
      newErrors.mobile = "Mobile number must be exactly 10 digits";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (form.password.length > 20) {
      newErrors.password = "Password must not exceed 20 characters";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Professional Info
    if (form.expertise.length === 0) {
      newErrors.expertise = "Please select at least one area of expertise";
    }

    if (form.languages.length === 0) {
      newErrors.languages = "Please select at least one language";
    }

    if (form.categories.length === 0) {
      newErrors.categories = "Please select at least one category";
    }

    if (!form.experience) {
      newErrors.experience = "Experience is required";
    } else if (isNaN(form.experience) || Number(form.experience) < 0) {
      newErrors.experience = "Please enter a valid number of years";
    }

    if (!form.daily_available_hours) {
      newErrors.daily_available_hours = "Daily available hours are required";
    } else if (
      isNaN(form.daily_available_hours) ||
      Number(form.daily_available_hours) < 1 ||
      Number(form.daily_available_hours) > 24
    ) {
      newErrors.daily_available_hours = "Please enter hours between 1 and 24";
    }

    // Family Astrologer
    if (!["0", "1"].includes(form.is_family_astrologer)) {
      newErrors.is_family_astrologer = "Please select an option";
    }

    if (form.is_family_astrologer === "1") {
      if (!form.family_astrology_details.trim()) {
        newErrors.family_astrology_details =
          "Family astrology details are required";
      } else if (form.family_astrology_details.trim().length < 20) {
        newErrors.family_astrology_details =
          "Please provide at least 20 characters of details";
      } else if (form.family_astrology_details.length > 1000) {
        newErrors.family_astrology_details =
          "Details must not exceed 1000 characters";
      }
    }

    // Address and Pincode (optional)
    if (form.address.trim() && form.address.trim().length < 10) {
      newErrors.address =
        "Address should be at least 10 characters if provided";
    }

    if (form.pincode.trim() && !/^\d{6}$/.test(form.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }
    // Astrology Qualification validation

    if (form.astro_education.length === 0) {
      newErrors.astro_education = "Please select your astrology qualification";
    }

    // TnC validation
    if (!termsAccepted) {
      newErrors.terms = "You must accept the Terms & Conditions to register.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all the fields correctly before submitting");
      return;
    }

    // ✅ JSON object banayein
    const submitData = {
      name: form.name.trim(),
      email: form.email.trim(),
      country_code: form.country_code,
      mobile: form.mobile.trim(),
      username: form.username.trim(),
      password: form.password,
      password_confirmation: form.confirmPassword,
      expertise: form.expertise,
      languages: form.languages,
      category: form.categories,
      experience: Number(form.experience),
      daily_available_hours: Number(form.daily_available_hours),
      is_family_astrologer: Number(form.is_family_astrologer),
      family_astrology_details: form.is_family_astrologer === "1" ? form.family_astrology_details.trim() : null,
      address: form.address.trim() || null,
      pincode: form.pincode.trim() || null,
      astro_education: form.astro_education,
      profile_image: profileImage || null,   // ✅ Base64 string  directly
      terms_accepted: termsAccepted ? 1 : 0,
    };

    try {
      const astroData = await dispatch(AstrologerRegister(submitData)).unwrap();
      setRegistrationCode(astroData?.code || astroData?.id || "N/A");
      setShowSuccessModal(true);
    } catch (error) {
      if (error?.message) {
        toast.error(error.message);
      } else if (error?.error) {
        toast.error(error.error);
      } else if (typeof error === "string") {
        toast.error(error);
      } else {
        toast.error("Registration failed. Please try again.");
      }
      console.error("Registration error:", error);
    }
  };

  return (
    <section className="py-10 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 min-h-screen">
      <div className="container max-w-4xl mx-auto px-4">
        <Card className="border-0 shadow-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-500 px-8 py-6">
            <h2 className="text-3xl font-bold text-white">
              Astrologer Registration
            </h2>
            <p className="text-orange-100">
              Join our community of expert astrologers
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={handleChange}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Username */}
                  <div className="space-y-2">
                    <Label htmlFor="username">Username *</Label>
                    <Input
                      id="username"
                      name="username"
                      placeholder="Choose a unique username"
                      value={form.username}
                      onChange={handleChange}
                      className={errors.username ? "border-red-500" : ""}
                    />
                    {errors.username && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.username}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Mobile number */}
                  <div className="space-y-2">
                    <Label>Mobile Number *</Label>
                    <div className="flex gap-2 ">
                      <Select
                        value={form.country_code}
                        onValueChange={(value) =>
                          handleSelect("country_code", value)
                        }
                        disabled={loadingCountries}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Code" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryCodes.map((code) => (
                            <SelectItem key={code.code} value={code.value}>
                              {code.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        name="mobile"
                        placeholder="1234567890"
                        value={form.mobile}
                        maxLength={10}
                        onChange={handleChange}
                        className={`flex-1 ${errors.mobile ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.mobile && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.mobile}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Min 6 characters"
                      value={form.password}
                      onChange={handleChange}
                      className={errors.password ? "border-red-500" : ""}
                    />
                    {errors.password && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Re-enter password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className={errors.confirmPassword ? "border-red-500" : ""}
                    />
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile Photo */}


              <div className="space-y-1.5 col-span-1 max-w-xs">
                <Label className="text-sm flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5" />
                  Profile Photo
                </Label>

                <div
                  onClick={() => document.getElementById('profile-upload')?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.add('border-yellow-500', 'bg-yellow-50');
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove('border-yellow-500', 'bg-yellow-50');
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove('border-yellow-500', 'bg-yellow-50');
                    const file = e.dataTransfer.files[0];
                    if (file) handleImageChange({ target: { files: [file] } });
                  }}
                  className={`
      relative border border-dashed rounded-lg p-4
      transition-all duration-200 cursor-pointer
      ${imagePreview
                      ? 'border-green-300 bg-green-50/30'
                      : 'border-gray-300 bg-gray-50 hover:border-yellow-400 hover:bg-yellow-50/30'
                    }
    `}
                >
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  {imagePreview ? (
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* ✅ Sirf mobile par truncate hoga, badi screen par poora dikhega */}
                        <span className="text-sm text-gray-600 truncate sm:truncate-none sm:whitespace-normal sm:overflow-visible max-w-[80px] sm:max-w-none">
                          Photo uploaded
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setProfileImage(null);
                          setImagePreview("");
                          document.getElementById('profile-upload').value = "";
                        }}
                        className="text-red-500 hover:text-red-700 p-1 flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm flex-wrap sm:flex-nowrap">
                      <Upload className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      {/* ✅ Sirf mobile par truncate hoga */}
                      <span className="text-gray-600 truncate sm:truncate-none sm:whitespace-normal flex-1 min-w-0">
                        Click or drag photo
                      </span>
                      <span className="text-gray-400 text-xs whitespace-nowrap flex-shrink-0">
                        (2MB max)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Professional Information
                </h3>
                <div className="grid md:grid-cols-2 gap-5">
                  {/* Experience */}
                  <div className="space-y-2">
                    <Label htmlFor="experience">
                      Experience{" "}
                      <span className="text-gray-500 text-xs">(In years)</span>{" "}
                      *
                    </Label>
                    <Input
                      id="experience"
                      name="experience"
                      type="number"
                      min="0"
                      step="1"
                      placeholder="e.g:5 (Minimum 1 year required)"
                      value={form.experience}
                      onChange={handleChange}
                      className={`w-full h-10 ${errors.experience ? "border-red-500" : ""}`}
                    />
                    {errors.experience && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.experience}
                      </p>
                    )}
                  </div>

                  {/* Daily Available Hours */}
                  <div className="space-y-2">
                    <Label htmlFor="daily_available_hours">
                      Daily Available Hours *
                    </Label>
                    <Input
                      id="daily_available_hours"
                      name="daily_available_hours"
                      type="number"
                      min="1"
                      max="24"
                      step="1"
                      placeholder="e.g:8 (Minimum 1 hour required)"
                      value={form.daily_available_hours}
                      onChange={handleChange}
                      className={`w-full h-10 ${errors.daily_available_hours ? "border-red-500" : ""}`}
                    />
                    {errors.daily_available_hours && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.daily_available_hours}
                      </p>
                    )}
                  </div>

                  {/* Expertise Multi-Select */}
                  <div className="space-y-2">
                    <Label>
                      Expertise{" "}
                      <span className="text-gray-500 text-xs">
                        (Choose only 3)
                      </span>{" "}
                      *
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleMultiSelect("expertise", value)
                      }
                      disabled={form.expertise.length >= 3}
                    >
                      <SelectTrigger
                        className={`w-full h-10 ${errors.expertise ? "border-red-500" : ""}`}
                      >
                        <SelectValue placeholder="Select your areas of expertise" />
                      </SelectTrigger>
                      <SelectContent>
                        {expertiseOptions.map((exp) => (
                          <SelectItem key={exp.value} value={exp.value}>
                            {exp.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.expertise && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.expertise}
                      </p>
                    )}
                    {form.expertise.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {form.expertise.map((skill) => (
                          <div className="relative">
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="px-3 py-1.5 bg-blue-100 text-blue-700 hover:bg-blue-200"
                            >
                              {expertiseOptions.find((e) => e.value === skill)
                                ?.label || skill}

                            </Badge>
                            <X
                              className="w-3.5 h-3.5 ml-2 cursor-pointer absolute -top-1 right-0  bg-blue-100 text-blue-700 hover:bg-blue-200   rounded-full p-0.5 shadow-sm z-10"
                              onClick={(e) =>
                                removeMultiSelect(e, "expertise", skill)
                              }
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Qualification multi-select */}

                  <div className="space-y-2">
                    <Label>Astrology Qualification *</Label>
                    <Select
                      onValueChange={(value) =>
                        handleMultiSelect("astro_education", value)
                      }
                    >
                      <SelectTrigger
                        className={`w-full h-10 ${errors.astro_education ? "border-red-500" : ""}`}
                      >
                        <SelectValue placeholder="Select your qualification" />
                      </SelectTrigger>
                      <SelectContent>
                        {astrologerQualificationOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.astro_education && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.astro_education}
                      </p>
                    )}

                    {/* Badges dikhane ke liye */}
                    {form.astro_education.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {form.astro_education.map((qual) => (
                          <div className="relative">
                            <Badge

                              key={qual}
                              variant="secondary"
                              className="px-3 py-1.5 bg-purple-100 text-purple-700 hover:bg-purple-200"
                            >
                              {astrologerQualificationOptions.find(
                                (q) => q.value === qual,
                              )?.label || qual}
                            </Badge>
                            <X
                              className="w-3.5 h-3.5  cursor-pointer absolute -top-1 right-0  bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-full p-0.5 shadow-sm z-10"
                              onClick={(e) =>
                                removeMultiSelect(e, "astro_education", qual)
                              }
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Languages Multi-Select */}
                  <div className="space-y-2">
                    <Label>
                      Languages{" "}
                      <span className="text-gray-500 text-xs">
                        (Choose only 3)
                      </span>{" "}
                      *
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleMultiSelect("languages", value)
                      }
                      disabled={form.languages.length >= 3}
                    >
                      <SelectTrigger
                        className={`w-full h-10 ${errors.languages ? "border-red-500" : ""}`}
                      >
                        <SelectValue placeholder="Select languages you speak" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.languages && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.languages}
                      </p>
                    )}
                    {form.languages.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {form.languages.map((lang) => (
                          <div className="relative">
                            <Badge
                              key={lang}
                              variant="secondary"
                              className="px-3 py-1.5 bg-green-100 text-green-700 hover:bg-green-200"
                            >
                              {languages.find((l) => l.value === lang)?.label ||
                                lang}
                            </Badge>
                            <X
                              className="w-3.5 h-3.5  cursor-pointer absolute -top-1 right-0 bg-green-100 text-green-700 hover:bg-green-200  rounded-full p-0.5 shadow-sm z-10"
                              onClick={(e) =>
                                removeMultiSelect(e, "languages", lang)
                              }
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Categories Multi-Select */}
                  <div className="space-y-2">
                    <Label>
                      Categories{" "}
                      <span className="text-gray-500 text-xs">
                        (Choose only 3)
                      </span>{" "}
                      *
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleMultiSelect("categories", value)
                      }
                      disabled={form.categories.length >= 3}
                    >
                      <SelectTrigger
                        className={`w-full h-10 ${errors.categories ? "border-red-500" : ""}`}
                      >
                        <SelectValue placeholder="Select consultation categories" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.categories && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.categories}
                      </p>
                    )}
                    {form.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {form.categories.map((cat) => (
                          <div className="relative">
                            <Badge
                              key={cat}
                              variant="secondary"
                              className="px-3 py-1.5 bg-orange-100 text-orange-700 hover:bg-orange-200 "
                            >
                              {categories.find((c) => c.value === cat)?.label ||
                                cat}

                            </Badge>
                            <X
                              className="w-3.5 h-3.5 absolute -top-1 right-0  cursor-pointer bg-orange-100 text-orange-700 hover:bg-orange-200 rounded-full p-0.5 shadow-sm z-10"
                              onClick={(e) =>
                                removeMultiSelect(e, "categories", cat)
                              }
                            />
                          </div>
                        ))}

                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Additional Details
                </h3>
                <div className="space-y-4">
                  {/* Family Astrologer */}
                  <div className="space-y-2">
                    <Label>Is there an astrologer in your family? *</Label>
                    <Select
                      value={form.is_family_astrologer}
                      onValueChange={(value) =>
                        handleSelect("is_family_astrologer", value)
                      }
                    >
                      <SelectTrigger
                        className={
                          errors.is_family_astrologer ? "border-red-500" : ""
                        }
                      >
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Yes</SelectItem>
                        <SelectItem value="0">No</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.is_family_astrologer && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.is_family_astrologer}
                      </p>
                    )}
                  </div>

                  {/* Family Astrology Details (conditional) */}
                  {form.is_family_astrologer === "1" && (
                    <div className="space-y-2">
                      <Label htmlFor="family_astrology_details">
                        Family Astrology Details *
                      </Label>
                      <Textarea
                        id="family_astrology_details"
                        name="family_astrology_details"
                        placeholder="Describe your experience and expertise in family astrology..."
                        value={form.family_astrology_details}
                        onChange={handleChange}
                        maxLength={1000}
                        rows={4}
                        className={`resize-none ${errors.family_astrology_details ? "border-red-500" : ""}`}
                      />
                      {errors.family_astrology_details && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.family_astrology_details}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 text-right">
                        {form.family_astrology_details.length}/1000 characters
                      </p>
                    </div>
                  )}

                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address">Full Address</Label>
                    <Textarea
                      id="address"
                      name="address"
                      placeholder="Enter your complete address (optional)"
                      value={form.address}
                      onChange={handleChange}
                      maxLength={500}
                      rows={3}
                      className={`resize-none ${errors.address ? "border-red-500" : ""}`}
                    />
                    {errors.address && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* Pincode */}
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      placeholder="110001 (optional)"
                      value={form.pincode}
                      maxLength={6}
                      onChange={handleChange}
                      className={errors.pincode ? "border-red-500" : ""}
                    />
                    {errors.pincode && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.pincode}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.3 cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-xs text-gray-600" style={{ fontSize: '12px', color: '#4b5563' }}>
                    I have read and agree to the{" "}
                    <Link
                      to="/astrologer-serviceProvider-TnC"
                      target="_blank"
                      className="text-amber-600 hover:underline"
                    >
                      Terms & Conditions
                    </Link>{" "}

                  </label>
                </div>
                {errors.terms && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.terms}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-10 py-6 text-lg bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {/* <Check className="w-5 h-5" /> */}
                      Complete Your Registration
                    </span>
                  )}
                </Button>
              </div>
            </form>

            {/* Success Modal pop up for verification is in process notifaction */}
            {showSuccessModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Registration in Process
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Your registration is currently under verification process, please wait for some time.
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Your registration token is:{" "}
                    <span className="font-mono font-semibold text-orange-700">{registrationCode}</span>
                  </p>
                  <div className="flex justify-end cursor-pointer">
                    <button
                      onClick={() => navigate("/")}
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                    >
                      Go to Home
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600 mt-6 pt-6 border-t">
              Already have an account?{" "}
              <Link
                to="/astro-login"
                className="text-orange-600  hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default AstroRegister;
