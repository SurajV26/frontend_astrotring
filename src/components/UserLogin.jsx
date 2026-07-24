import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReactSelect from "react-select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { userProfile, userRegister } from "@/redux/slice/UserAuth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import ForgotPassword from "./ForgotPasswordUser";
import {
  userSendLoginOtp,
  userVerifyLoginOtp,
  userResendLoginOtp,
} from "@/redux/slice/UserAuth";
import { useCountryCodes } from "@/hooks/useCountryCodes";

/* ---------------- ZOD SCHEMAS ---------------- */

const loginMobileSchema = z.object({
  mobile: z.string().min(10, "Mobile must be at least 10 digits"),
});

const loginOtpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits"),
});

const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  country_code: z.string().min(1, "Country code required"),
  mobile: z.string().min(10, "Mobile must be at least 10 digits"),
  dob: z.string().min(1, "Date of birth required"),
  birth_time: z.string().min(1, "Time of birth required"),
  birth_place: z.string().min(1, "Place of birth required"),
  gender: z.string().min(1, "Gender required"),
  marital_status: z.string().min(1, "Marital status required"),
  occupation: z.string().min(1, "Occupation required"),
  terms_accepted: z.number().optional(),
});

/* ---------------- COMPONENT ---------------- */

const UserLogin = ({ ele, defaultOpen = false, onOpenChange }) => {
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.userAuth);
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [open, setOpen] = useState(defaultOpen);
  const [userType, setUserType] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Login OTP states
  const [loginStep, setLoginStep] = useState("mobile");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const { countryCodes, loading: loadingCodes } = useCountryCodes();

  // Signup form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    country_code: "+91",
    mobile: "",
    dob: "",
    birth_time: "",
    birth_place: "",
    gender: "male",
    occupation: "",
    marital_status: "unmarried",
  });

  const [errors, setErrors] = useState({ fields: {}, form: "" });

  /* ---------------- EFFECT ---------------- */
  useEffect(() => {
    if (user) {
      setOpen(false);
      setForm({
        name: "",
        email: "",
        country_code: "+91",
        mobile: "",
        dob: "",
        birth_time: "",
        birth_place: "",
        gender: "",
        marital_status: "",
        occupation: "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000,
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      fields: { ...prev.fields, [name]: undefined },
      form: "",
    }));
  };

  // OTP Login handlers
  const handleSendOtp = async (e) => {
    e.preventDefault();

    const result = loginMobileSchema.safeParse({ mobile: mobileNumber });

    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    if (!mobileNumber || mobileNumber.length < 10) {
      toast.error("Please enter a valid mobile number");
      return;
    }
    setOtpLoading(true);
    try {
      await dispatch(userSendLoginOtp(mobileNumber)).unwrap();
      toast.success("OTP sent to your mobile");
      setLoginStep("otp");
      setResendCooldown(30);
    } catch (err) {
      toast.error(err || "Failed to send OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const result = loginOtpSchema.safeParse({ otp: otpValue });
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    if (!otpValue || otpValue.length < 6) {
      toast.error("Please enter the OTP");
      return;
    }
    setOtpLoading(true);
    try {
      await dispatch(
        userVerifyLoginOtp({ mobile: mobileNumber, otp: otpValue }),
      ).unwrap();
      toast.success("Login successful");
      await dispatch(userProfile()).unwrap();
      setOpen(false);
    } catch (err) {
      toast.error(err || "Invalid OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  // resend otp handler
  const handleResendOtp = async () => {
    if (resendCooldown > 0) return; // safety
    setOtpLoading(true);
    try {
      await dispatch(userResendLoginOtp(mobileNumber)).unwrap();
      toast.success("OTP resent");
      setResendCooldown(30);
    } catch (err) {
      toast.error(err || "Failed to resend OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  // Signup handler
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      setErrors({
        fields: {
          terms: ["You must accept the Terms & Conditions to sign up."],
        },
        form: "",
      });
      return;
    }

    const parsed = signupSchema.safeParse(form);

    if (!parsed.success) {
      console.log("Zod errors:", parsed.error.flatten().fieldErrors);
      setErrors({
        fields: parsed.error.flatten().fieldErrors,
        form: "Please fix the errors above",
      });
      return;
    }

    const submitData = {
      name: parsed.data.name,
      email: parsed.data.email,
      country_code: parsed.data.country_code,
      mobile: parsed.data.mobile,
      dob: parsed.data.dob,
      birth_time: parsed.data.birth_time,
      birth_place: parsed.data.birth_place,
      gender: parsed.data.gender,
      marital_status: parsed.data.marital_status,
      occupation: parsed.data.occupation,
      terms_accepted: termsAccepted ? 1 : 0,
    };

    try {
      await dispatch(userRegister(submitData)).unwrap();
      toast.success("Registration successful. Please login.");
      setMode("login");
    } catch (err) {
      setErrors({
        fields: {},
        form: err,
      });
    }
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
    if (onOpenChange) onOpenChange(newOpen);
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="flex items-center gap-3">
      <Dialog open={open} onOpenChange={handleOpenChange}>
        {!defaultOpen && (
          <DialogTrigger asChild>
            <Button className="flex gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-3xl shadow-lg hover:shadow-xl transition-all">
              <User />
              {ele?.name || "Account"}
            </Button>
          </DialogTrigger>
        )}

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-2xl text-black">
              {mode === "login" ? "Login" : "Create Account"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {mode === "login"
                ? "Login to your account"
                : "Create a new account"}
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[70vh] overflow-y-auto pl-1 scrollbar-hide">
            {(errors.form || error) && (
              <p className="text-red-600 text-sm text-center">
                {errors.form || error}
              </p>
            )}

            {/* ===================== LOGIN (OTP) ===================== */}
            {mode === "login" && (
              <div className="space-y-4 mt-4 ">
                {loginStep === "mobile" ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-mobile">Mobile Number</Label>
                      <Input
                        id="login-mobile"
                        type="tel"
                        placeholder="Enter Your Mobile Number"
                        value={mobileNumber}
                        onChange={(e) =>
                          setMobileNumber(
                            e.target.value.replace(/\D/g, "").slice(0, 10),
                          )
                        }
                        required
                        className="focus:ring-2 focus:ring-amber-400 transition"
                      />
                    </div>
                    {/* <div className="text-right cursor-pointer">
                      <span
                        onClick={() => {
                          setMode("forgot");
                          setUserType("user");
                        }}
                        className="text-orange-600 text-sm hover:underline"
                      >
                        Forgot Password?
                      </span>
                    </div> */}
                    <Button
                      type="submit"
                      disabled={otpLoading || mobileNumber.length < 10}
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
                    >
                      {otpLoading ? "Sending..." : "Send OTP"}
                    </Button>
                    <p className="text-center text-sm text-gray-500">
                      Don't have an account?{" "}
                      <span
                        onClick={() => {
                          setMode("signup");
                          setErrors({ fields: {}, form: "" });
                        }}
                        className="text-amber-600 font-medium hover:underline cursor-pointer"
                      >
                        Sign Up
                      </span>
                    </p>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-otp">Enter OTP</Label>
                      <Input
                        id="login-otp"
                        type="text"
                        placeholder="6-digit OTP"
                        value={otpValue}
                        onChange={(e) =>
                          setOtpValue(
                            e.target.value.replace(/\D/g, "").slice(0, 6),
                          )
                        }
                        required
                        className="focus:ring-2 focus:ring-amber-400 transition"
                      />
                      {/* <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-gray-400">
                          OTP sent to {mobileNumber}
                        </p>
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          disabled={resendCooldown > 0 || otpLoading}
                          className="text-sm text-amber-600 hover:underline disabled:opacity-50"
                        >
                          {resendCooldown > 0
                            ? `Resend in ${resendCooldown}s`
                            : "Resend OTP"}
                        </button>
                      </div> */}
                    </div>
                    <p className="text-xs text-gray-400">
                      OTP sent to {mobileNumber}
                    </p>

                    <Button
                      type="submit"
                      disabled={otpLoading || otpValue.length < 4}
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
                    >
                      {otpLoading ? "Verifying..." : "Verify & Login"}
                    </Button>
                    <button
                      type="button"
                      onClick={() => setLoginStep("mobile")}
                      className="text-sm text-amber-600 hover:underline block w-full text-center"
                    >
                      ← Change mobile number
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* ===================== SIGNUP ===================== */}
            {mode === "signup" && (
              <form onSubmit={handleSignup} className="space-y-3 mt-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="focus:ring-2 focus:ring-amber-400 transition"
                  />
                  {errors.fields.name && (
                    <p className="text-red-500 text-xs">
                      {errors.fields.name[0]}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="focus:ring-2 focus:ring-amber-400 transition"
                  />
                  {errors.fields.email && (
                    <p className="text-red-500 text-xs">
                      {errors.fields.email[0]}
                    </p>
                  )}
                </div>

                {/* Country Code + Mobile */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="country_code">
                      Country <span className="hidden sm:block">Code</span>{" "}
                    </Label>
                    <ReactSelect
                    
                      id="country_code"
                      options={countryCodes?.map((code) => ({
                        value: code.value,
                        label: code.label,
                      }))}
                      value={
                        countryCodes?.find(
                          (code) => code.value === form.country_code,
                        )
                          ? {
                              value: form.country_code,
                              label: countryCodes.find(
                                (c) => c.value === form.country_code,
                              )?.label,
                            }
                          : null
                      }
                      onChange={(option) => {
                        handleChange({
                          target: {
                            name: "country_code",
                            value: option?.value || "",
                          },
                        });
                      }}
                      placeholder="country code..."
                      isLoading={loadingCodes}
                      className="react-select-container"
                      classNamePrefix="react-select"
                      formatOptionLabel={(option, { context }) => {
                        //  Show only value in the input (context === 'value')
                      if (context === "value") {
      // Input में: Mobile पर सिर्फ Value, बड़े पर Full Label
      return (<div className="flex items-center justify-center">
        <span className="block sm:hidden">{option.value}</span>
        <span className="hidden sm:block">{option.label}</span></div>
      );
    }
                        //  Show full label in dropdown menu
                        return option.label; // e.g., "+91 (IN)"
                      }}
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderColor: "#d1d5db",
                          boxShadow: "none",
                          "&:hover": { borderColor: "#f59e0b" },
                          borderRadius: "0.5rem",

                          minWidth: "80px",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          textAlign: "center",
                        }),
                        menu: (base) => ({
                          ...base,
                          zIndex: 9999,
                          width: "200px",
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isSelected
                            ? "#f59e0b"
                            : state.isFocused
                              ? "#fef3c7"
                              : "white",
                          color: state.isSelected ? "white" : "#374151",
                          "&:active": { backgroundColor: "#f59e0b" },
                          fontSize: "0.75rem",
                        }),
                      }}
                    />
                    {errors.fields.country_code && (
                      <p className="text-red-500 text-xs">
                        {errors.fields.country_code[0]}
                      </p>
                    )}
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      placeholder="9876543210"
                      value={form.mobile}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        if (val.length <= 10) {
                          handleChange({
                            target: { name: "mobile", value: val },
                          });
                        }
                      }}
                      required
                      className="focus:ring-2 focus:ring-amber-400 transition"
                    />
                    {errors.fields.mobile && (
                      <p className="text-red-500 text-xs">
                        {errors.fields.mobile[0]}
                      </p>
                    )}
                  </div>
                </div>

                {/* Gender + DOB */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      name="gender"
                      value={form.gender}
                      onValueChange={(val) =>
                        handleChange({ target: { name: "gender", value: val } })
                      }
                    >
                      <SelectTrigger
                        id="gender"
                        className="focus:ring-1 focus:ring-amber-400 w-full"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.fields.gender && (
                      <p className="text-red-500 text-xs">
                        {errors.fields.gender[0]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      name="dob"
                      type="date"
                      value={form.dob}
                      onChange={handleChange}
                      required
                      className="focus:ring-1 focus:ring-amber-400 transition"
                    />
                    {errors.fields.dob && (
                      <p className="text-red-500 text-xs">
                        {errors.fields.dob[0]}
                      </p>
                    )}
                  </div>
                </div>

                {/* Birth Time + Birth Place */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="birth_time">Time of Birth</Label>
                    <Input
                      id="birth_time"
                      name="birth_time"
                      type="time"
                      step="1"
                      value={form.birth_time}
                      onChange={handleChange}
                      className="focus:ring-2 focus:ring-amber-400 transition"
                    />
                    {errors.fields.birth_time && (
                      <p className="text-red-500 text-xs">
                        {errors.fields.birth_time[0]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birth_place">Place of Birth</Label>
                    <Input
                      id="birth_place"
                      name="birth_place"
                      placeholder="City, State"
                      value={form.birth_place}
                      onChange={handleChange}
                      className="focus:ring-2 focus:ring-amber-400 transition"
                    />
                    {errors.fields.birth_place && (
                      <p className="text-red-500 text-xs">
                        {errors.fields.birth_place[0]}
                      </p>
                    )}
                  </div>
                </div>

                {/* Marital Status + Occupation */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="marital_status">Marital Status</Label>
                    <Select
                      name="marital_status"
                      value={form.marital_status}
                      onValueChange={(val) =>
                        handleChange({
                          target: { name: "marital_status", value: val },
                        })
                      }
                    >
                      <SelectTrigger
                        id="marital_status"
                        className="focus:ring-1 focus:ring-amber-400 w-full"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unmarried">Unmarried</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.fields.marital_status && (
                      <p className="text-red-500 text-xs">
                        {errors.fields.marital_status[0]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                      id="occupation"
                      name="occupation"
                      placeholder="e.g. Software Engineer"
                      value={form.occupation}
                      onChange={handleChange}
                      className="focus:ring-2 focus:ring-amber-400 transition"
                    />
                    {errors.fields.occupation && (
                      <p className="text-red-500 text-xs">
                        {errors.fields.occupation[0]}
                      </p>
                    )}
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="cursor-pointer accent-amber-600"
                    />
                    <p htmlFor="terms" className="text-xs text-gray-600">
                      I have read and agree to the{" "}
                      <Link
                        to="/terms-conditions"
                        target="_blank"
                        className="text-amber-600 hover:underline"
                      >
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy-policy"
                        target="_blank"
                        className="text-amber-600 hover:underline"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </div>
                  {errors.fields.terms && (
                    <p className="text-red-500 text-xs">
                      {errors.fields.terms}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {loading ? "Creating account..." : "Sign Up"}
                </Button>

                <p className="text-center text-sm text-gray-500">
                  Already have an account?{" "}
                  <span
                    onClick={() => {
                      setMode("login");
                      setErrors({ fields: {}, form: "" });
                    }}
                    className="text-amber-600 font-medium hover:underline cursor-pointer"
                  >
                    Login
                  </span>
                </p>
              </form>
            )}

            {/* ===================== FORGOT PASSWORD ===================== */}
            {mode === "forgot" && (
              <ForgotPassword
                onSuccess={() => setMode("login")}
                onCancel={() => setMode("login")}
                userType={userType}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserLogin;
