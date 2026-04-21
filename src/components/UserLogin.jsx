// import { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { User } from "lucide-react";
// import { z } from "zod";
// import { useDispatch, useSelector } from "react-redux";
// import { userLogin, userProfile, userRegister } from "@/redux/slice/UserAuth";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import ForgotPassword from "./ForgotPasswordUser";
// import { fileToBase64 } from "@/hooks/fileToBase64";  
// import {  Camera, Upload, X } from "lucide-react";  
// // import LanguageSwitcher from "@/LanguageSwitcher";

// /* ---------------- ZOD SCHEMAS ---------------- */

// const loginSchema = z.object({
//   username: z.string().min(3, "Username is required"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// const signupSchema = z
//   .object({
//     name: z.string().min(2, "Name is required"),
//     email: z.string().email("Invalid email address"),
//     mobile: z.string().min(10, "Mobile must be at least 10 digits"),
//     country_code: z.string().min(1, "Country code is required"),
//     username: z.string().min(3, "Username is required"),
//     password: z.string().min(6, "Password must be at least 6 characters"),
//     confirmPassword: z.string().min(6, "Confirm your password"),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// /* ---------------- COMPONENT ---------------- */

// const UserLogin = ({ ele }) => {
//   const dispatch = useDispatch();
//   const { user, error, loading } = useSelector((state) => state.userAuth);
//   const navigate = useNavigate();
//   const [mode, setMode] = useState("login");
//   const [open, setOpen] = useState(false);
//   const [userType, setUserType] = useState("");

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     country_code: "",
//     mobile: "",
//     username: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [profileImage, setProfileImage] = useState(null);
// const [imagePreview, setImagePreview] = useState("");

//   const [errors, setErrors] = useState({
//     fields: {},
//     form: "",
//   });

//   /* ---------------- EFFECT ---------------- */

//   useEffect(() => {
//     if (user) {
//       setOpen(false);
//       setForm({
//         name: "",
//         email: "",
//         mobile: "",
//         country_code: "",
//         username: "",
//         password: "",
//         confirmPassword: "",
//       });
//     }
//   }, [user]);

//   /* ---------------- HANDLERS ---------------- */

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({
//       ...prev,
//       fields: { ...prev.fields, [name]: undefined },
//       form: "",
//     }));
//   };
//   // Image handler 
// const handleImageChange = async (e) => {
//   const file = e.target.files[0];
//   if (file) {
//     if (!file.type.startsWith("image/")) {
//       toast.error("Please select an image file");
//       return;
//     }
//     if (file.size > 2 * 1024 * 1024) {
//       toast.error("Image size must be less than 2MB");
//       return;
//     }

//     try {
//       const base64 = await fileToBase64(file);   // ✅ utility use ki
//       setProfileImage(base64);
//       setImagePreview(URL.createObjectURL(file));
//     } catch (error) {
//       toast.error("Failed to process image");
//     }
//   }
// };
// // Remove image - ise add karo
// const removeImage = () => {
//   setProfileImage(null);
//   setImagePreview("");
//   document.getElementById("user-profile-upload").value = "";
// };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const parsed = loginSchema.safeParse({
//       username: form.username,
//       password: form.password,
//     });

//     if (!parsed.success) {
//       setErrors({
//         fields: parsed.error.flatten().fieldErrors,
//         form: "Please fix the errors below",
//       });
//       return;
//     }

//     // console.log("parsed data from userlogin",parsed.data)

//     try {
//       await dispatch(userLogin(parsed.data)).unwrap();
//       toast.success("You are logged in");
//       await dispatch(userProfile()).unwrap();
//       setOpen(false);
//     } catch (err) {
//       setErrors({
//         fields: {},
//         form: typeof err === "string" ? err : "Something went wrong",
//       });
//     }
//   };


// const handleSignup = async (e) => {
//   e.preventDefault();

//   const parsed = signupSchema.safeParse(form);

//   if (!parsed.success) {
//     setErrors({
//       fields: parsed.error.flatten().fieldErrors,
//       form: "Please fix the errors below",
//     });
//     return;
//   }

//   // ✅ JSON object banayein 
//   const submitData = {
//     name: parsed.data.name,
//     email: parsed.data.email,
//     country_code: parsed.data.country_code,
//     mobile: parsed.data.mobile,
//     username: parsed.data.username,
//     password: parsed.data.password,
//     password_confirmation: parsed.data.confirmPassword,
//     profile_image: profileImage || null,   // ✅ Base64 string yahan directly
//   };

//   try {
//     await dispatch(userRegister(submitData)).unwrap();
//     toast.success("Register successful, please login");
//     setMode("login");
//     setProfileImage(null);
//     setImagePreview("");
//   } catch (err) {
//     setErrors({
//       fields: {},
//       form: typeof err === "string" ? err : "Something went wrong",
//     });
//   }
// };
//   /* ---------------- UI ---------------- */

//   return (
//     <div className="flex items-center gap-3">
//       {/* User Dialog */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogTrigger asChild>
//           <Button className="flex gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-3xl shadow-lg hover:shadow-xl transition-all">
//             <User />
//             {ele?.name || "Account"}
//           </Button>
//         </DialogTrigger>

//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle className="text-center">
//               <h2 className="text-2xl text-black">
//                 {mode === "login" ? "Login" : "Create Account"}
//               </h2>
//             </DialogTitle>
//             <DialogDescription className="sr-only">
//               {mode === "login"
//                 ? "Enter your username and password to login"
//                 : "Fill the form to create a new account"}
//             </DialogDescription>
//           </DialogHeader>

//           {(errors.form || error) && (
//             <p className="text-red-600 text-sm text-center">
//               {errors.form || error}
//             </p>
//           )}

//           {/* LOGIN FORM */}
//           {mode === "login" && (
//             <form onSubmit={handleLogin} className="space-y-4 mt-4">
//               <div className="space-y-2 ">
//                 <Label>Username</Label>
//                 <Input
//                   name="username"
//                   placeholder="Enter your username"
//                   onChange={handleChange}
//                 />
//                 {errors.fields.username && (
//                   <p className="text-red-600 text-sm">
//                     {errors.fields.username[0]}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2 ">
//                 <Label>Password</Label>
//                 <Input
//                   type="password"
//                   name="password"
//                   placeholder="Enter your password"
//                   onChange={handleChange}
//                 />
//                 {errors.fields.password && (
//                   <p className="text-red-600 text-sm">
//                     {errors.fields.password[0]}
//                   </p>
//                 )}
//               </div>
//               <div className="text-right cursor-pointer">
//                 <span
//                   onClick={() => {
//                     setMode("forgot")
//                     setUserType("user")
//                     ;
//                   }}
//                   className="text-orange-600 text-sm hover:underline"
//                 >
//                   Forgot Password?
//                 </span>
//               </div>

//               <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all" disabled={loading}>
//                 {loading ? "Logging in..." : "Login"}
//               </Button>

//               <p className="text-center text-sm">
//                 Don't have an account?{" "}
//                 <span
//                   className=" cursor-pointer text-orange-600  hover:underline"
//                   onClick={() => {
//                     setMode("signup");
//                     setErrors({ fields: {}, form: "" });
//                   }}
//                 >
//                   Sign Up
//                 </span>
//               </p>
//             </form>
//           )}

//           {/* SIGNUP FORM */}
//           {mode === "signup" && (
//             <form onSubmit={handleSignup} className="space-y-3 mt-4">
//               <Input name="name" placeholder="Name" onChange={handleChange} />
//               <Input name="email" placeholder="Email" onChange={handleChange} />
//               <div className="flex gap-2">
//                 <Input
//                   name="country_code"
//                   placeholder="+91"
//                   className="w-1/3"
//                   onChange={handleChange}
//                 />
//                 <Input
//                   name="mobile"
//                   placeholder="Mobile"
//                   className="w-2/3"
//                   onChange={handleChange}
//                 />
//               </div>
//               <Input
//                 name="username"
//                 placeholder="Username"
//                 onChange={handleChange}
//               />
//               {/* ✅ YEH PHOTO UPLOAD FIELD - isko email aur mobile ke beech ya kahi bhi add kar do */}
//     <div className="space-y-1.5">
//       <Label className="text-sm flex items-center gap-1.5">
//         <Camera className="w-3.5 h-3.5" />
//         Profile Photo (Optional)
//       </Label>
//       <div
//         onClick={() => document.getElementById('user-profile-upload')?.click()}
//         onDragOver={(e) => {
//           e.preventDefault();
//           e.currentTarget.classList.add('border-yellow-500', 'bg-yellow-50');
//         }}
//         onDragLeave={(e) => {
//           e.preventDefault();
//           e.currentTarget.classList.remove('border-yellow-500', 'bg-yellow-50');
//         }}
//         onDrop={(e) => {
//           e.preventDefault();
//           e.currentTarget.classList.remove('border-yellow-500', 'bg-yellow-50');
//           const file = e.dataTransfer.files[0];
//           if (file) handleImageChange({ target: { files: [file] } });
//         }}
//         className={`
//           relative border border-dashed rounded-lg p-3
//           transition-all duration-200 cursor-pointer
//           ${imagePreview
//             ? 'border-green-300 bg-green-50/30'
//             : 'border-gray-300 bg-gray-50 hover:border-yellow-400 hover:bg-yellow-50/30'
//           }
//         `}
//       >
//         <input
//           id="user-profile-upload"
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           className="hidden"
//         />

//         {imagePreview ? (
//           <div className="flex items-center justify-between gap-2">
//             <div className="flex items-center gap-2 min-w-0">
//               <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
//                 <img
//                   src={imagePreview}
//                   alt="Preview"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <span className="text-xs text-gray-600 truncate max-w-[100px]">
//                 Photo uploaded
//               </span>
//             </div>
//             <button
//               type="button"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 removeImage();
//               }}
//               className="text-red-500 hover:text-red-700 p-0.5"
//             >
//               <X className="w-3.5 h-3.5" />
//             </button>
//           </div>
//         ) : (
//           <div className="flex items-center gap-2 text-xs">
//             <Upload className="w-4 h-4 text-gray-400" />
//             <span className="text-gray-600 truncate">Click or drag photo</span>
//             <span className="text-gray-400 whitespace-nowrap">(2MB)</span>
//           </div>
//         )}
//       </div>
//     </div>
//               <Input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 onChange={handleChange}
//               />
//               <Input
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="Confirm Password"
//                 onChange={handleChange}
//               />

//               <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all" disabled={loading}>
//                 {loading ? "Creating..." : "Sign Up"}
//               </Button>

//               <p className="text-center text-sm">
//                 Already have an account?{" "}
//                 <span
//                   className=" cursor-pointer text-orange-600  hover:underline"
//                   onClick={() => {
//                     setMode("login");
//                     setErrors({ fields: {}, form: "" });
//                   }}
//                 >
//                   Login
//                 </span>
//               </p>
//             </form>
//           )}

//           {mode === "forgot" && (
//             <ForgotPassword
//               onSuccess={() => {
//                 setMode("login");
//               }}
//               onCancel={() => setMode("login")}
//               userType ={userType}
//             />
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default UserLogin;



// import { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { User } from "lucide-react";
// import { z } from "zod";
// import { useDispatch, useSelector } from "react-redux";
// import { userLogin, userProfile, userRegister } from "@/redux/slice/UserAuth";
// import { toast } from "react-toastify";

// const loginSchema = z.object({
//   username: z.string().min(3),
//   password: z.string().min(6),
// });

// const signupSchema = z
//   .object({
//     name: z.string().min(2),
//     email: z.string().email(),
//     mobile: z.string().min(10),
//     country_code: z.string().min(1),
//     username: z.string().min(3),
//     password: z.string().min(6),
//     confirmPassword: z.string().min(6),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// const UserLogin = ({ ele }) => {
//   const dispatch = useDispatch();
//   const { user, loading } = useSelector((state) => state.userAuth);

//   const [mode, setMode] = useState("login");
//   const [open, setOpen] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     country_code: "",
//     mobile: "",
//     username: "",
//     password: "",
//     confirmPassword: "",
//   });

//   useEffect(() => {
//     if (user) {
//       setOpen(false);
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const parsed = loginSchema.safeParse({
//       username: form.username,
//       password: form.password,
//     });
//     if (!parsed.success) return;

//     await dispatch(userLogin(parsed.data)).unwrap();
//     await dispatch(userProfile()).unwrap();
//     toast.success("Logged in successfully");
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     const parsed = signupSchema.safeParse(form);
//     if (!parsed.success) return;

//     const { confirmPassword, ...submitData } = parsed.data;
//     await dispatch(userRegister(submitData)).unwrap();
//     toast.success("Account created");
//     setMode("login");
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button className="flex gap-2">
//           <User />
//           {ele?.name || "Account"}
//         </Button>
//       </DialogTrigger>

//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>
//             {mode === "login" ? "Login" : "Create Account"}
//           </DialogTitle>
//           <DialogDescription className="sr-only">
//             Authentication form
//           </DialogDescription>
//         </DialogHeader>

//         {mode === "login" ? (
//           <form onSubmit={handleLogin} className="space-y-4 mt-4">
//             <Input name="username" placeholder="Username" onChange={handleChange} />
//             <Input type="password" name="password" placeholder="Password" onChange={handleChange} />
//             <Button className="w-full" disabled={loading}>
//               {loading ? "Logging..." : "Login"}
//             </Button>
//             <p
//               className="text-sm text-center cursor-pointer underline"
//               onClick={() => setMode("signup")}
//             >
//               Create Account
//             </p>
//           </form>
//         ) : (
//           <form onSubmit={handleSignup} className="space-y-3 mt-4">
//             <Input name="name" placeholder="Name" onChange={handleChange} />
//             <Input name="email" placeholder="Email" onChange={handleChange} />
//             <Input name="country_code" placeholder="+91" onChange={handleChange} />
//             <Input name="mobile" placeholder="Mobile" onChange={handleChange} />
//             <Input name="username" placeholder="Username" onChange={handleChange} />
//             <Input type="password" name="password" placeholder="Password" onChange={handleChange} />
//             <Input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
//             <Button className="w-full" disabled={loading}>
//               {loading ? "Creating..." : "Sign Up"}
//             </Button>
//             <p
//               className="text-sm text-center cursor-pointer underline"
//               onClick={() => setMode("login")}
//             >
//               Already have an account?
//             </p>
//           </form>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default UserLogin;
// UserLogin.jsx


import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userProfile, userRegister } from "@/redux/slice/UserAuth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import ForgotPassword from "./ForgotPasswordUser";
import { fileToBase64 } from "@/hooks/fileToBase64";
import { Camera, Upload, X } from "lucide-react";
import { useTranslation } from "react-i18next";

/* ---------------- ZOD SCHEMAS ---------------- */

const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

const signupSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    mobile: z.string().min(10),
    country_code: z.string().min(1),
    username: z.string().min(3),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
  });

/* ---------------- COMPONENT ---------------- */

const UserLogin = ({ ele }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.userAuth);
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [open, setOpen] = useState(false);
  const [userType, setUserType] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    country_code: "",
    mobile: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({ fields: {}, form: "" });

  /* ---------------- EFFECT ---------------- */

  useEffect(() => {
    if (user) {
      setOpen(false);
      setForm({
        name: "",
        email: "",
        mobile: "",
        country_code: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, fields: { ...prev.fields, [name]: undefined }, form: "" }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error(t("invalidImage"));
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error(t("imageSizeLimit"));
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      setProfileImage(base64);
      setImagePreview(URL.createObjectURL(file));
    } catch {
      toast.error(t("imageProcessingFailed"));
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setImagePreview("");
    document.getElementById("user-profile-upload").value = "";
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const parsed = loginSchema.safeParse({ username: form.username, password: form.password });

    if (!parsed.success) {
      setErrors({
        fields: parsed.error.flatten().fieldErrors,
        form: t("fixErrors"),
      });
      return;
    }

    try {
      await dispatch(userLogin(parsed.data)).unwrap();
      toast.success(t("You are logged in"));
      await dispatch(userProfile()).unwrap();
      setOpen(false);
    } catch {
      setErrors({ fields: {}, form: t("somethingWentWrong") });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      setErrors({
        fields: { terms: ["You must accept the Terms & Conditions to sign up."] },
        form: ""
      });
      return;
    }
    const parsed = signupSchema.safeParse(form);

    if (!parsed.success) {
      setErrors({ fields: parsed.error.flatten().fieldErrors, form: t("fixErrors") });
      return;
    }


    const submitData = {
      ...parsed.data,
      password_confirmation: parsed.data.confirmPassword,
      profile_image: profileImage || null,
      terms_accepted: termsAccepted ? 1 : 0,
    };

    try {
      await dispatch(userRegister(submitData)).unwrap();
      toast.success(t("Register successful, please login"));
      setMode("login");
      setProfileImage(null);
      setImagePreview("");
    } catch {
      setErrors({ fields: {}, form: t("somethingWentWrong") });
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="flex items-center gap-3">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-3xl shadow-lg hover:shadow-xl transition-all">
            <User />
            {ele?.name || t("account")}
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-2xl text-black">
              {mode === "login" ? t("login") : t("createAccount")}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {mode === "login" ? t("loginDesc") : t("signupDesc")}
            </DialogDescription>
          </DialogHeader>

          {(errors.form || error) && (
            <p className="text-red-600 text-sm text-center">{errors.form || error}</p>
          )}

          {mode === "login" && (
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>{t("username")}</Label>
                <Input name="username" placeholder={t("Enter Your Username")} onChange={handleChange} />
                {errors.fields.username && <p className="text-red-600 text-sm">{errors.fields.username[0]}</p>}
              </div>

              <div className="space-y-2">
                <Label>{t("password")}</Label>
                <Input type="password" name="password" placeholder={t("Enter Your Password")} onChange={handleChange} />
                {errors.fields.password && <p className="text-red-600 text-sm">{errors.fields.password[0]}</p>}
              </div>

              <div className="text-right cursor-pointer">
                <span
                  onClick={() => { setMode("forgot"); setUserType("user"); }}
                  className="text-orange-600 text-sm hover:underline"
                >
                  {t("forgotPassword")}
                </span>
              </div>

              <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all" disabled={loading}>
                {loading ? t("loggingIn") : t("login")}
              </Button>

              <p className="text-center text-sm">
                {t("dontHaveAccount")}{" "}
                <span onClick={() => { setMode("signup"); setErrors({ fields: {}, form: "" }); }} className="cursor-pointer text-orange-600 hover:underline">
                  {t("signUp")}
                </span>
              </p>
            </form>
          )}

          {mode === "signup" && (
            <form onSubmit={handleSignup} className="space-y-3 mt-4">
              <Input name="name" placeholder={t("Enter Your Name")} onChange={handleChange} />
               <Input
                name="username"
                placeholder="Enter Your Username"
                onChange={handleChange}
              />
              <Input name="email" placeholder={t("email")} onChange={handleChange} />
              <div className="flex gap-2">
                <Input name="country_code" placeholder="+91" className="w-1/3" onChange={handleChange} />
                <Input name="mobile" placeholder={t("mobile")} className="w-2/3" onChange={handleChange} />
              </div>

              {/* Profile Photo Upload */}
              <div className="space-y-1.5">
                <Label className="text-sm flex text-gray-800  items-center gap-1.5">
                  {t("profilePhoto")}
                </Label>
                <div
                  onClick={() => document.getElementById('user-profile-upload')?.click()}
                  className={`relative border border-dashed rounded-lg p-3 cursor-pointer transition-all duration-200 ${imagePreview ? "border-green-300 bg-green-50/30" : "border-gray-300 bg-gray-50 hover:border-yellow-400 hover:bg-yellow-50/30"
                    }`}
                >
                  <input id="user-profile-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  {imagePreview ? (
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xs text-gray-600 truncate max-w-[100px]">{t("photoUploaded")}</span>
                      </div>
                      <button type="button" onClick={(e) => { e.stopPropagation(); removeImage(); }} className="text-red-500 hover:text-red-700 p-0.5">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs">
                      <Upload className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 truncate">{t("clickOrDragPhoto")}</span>
                      <span className="text-gray-400 whitespace-nowrap">(2MB)</span>
                    </div>
                  )}
                </div>
              </div>

              <Input type="password" name="password" placeholder={t("password")} onChange={handleChange} />
              <Input type="password" name="confirmPassword" placeholder={t("confirmPassword")} onChange={handleChange} />

              {/* Terms & Conditions Checkbox */}
              <div className="space-y-1">
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-xs text-gray-600" style={{ fontSize: '12px', color: '#4b5563' }}>
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
                  </label>
                </div>
                {errors.fields.terms && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.fields.terms}
                  </p>
                )}
              </div>

              <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all" disabled={loading}>
                {loading ? t("creating") : t("signUp")}
              </Button>

              <p className="text-center text-sm">
                {t("alreadyHaveAccount")}{" "}
                <span onClick={() => { setMode("login"); setErrors({ fields: {}, form: "" }); }} className="cursor-pointer text-orange-600 hover:underline">
                  {t("login")}
                </span>
              </p>
            </form>
          )}

          {mode === "forgot" && (
            <ForgotPassword onSuccess={() => setMode("login")} onCancel={() => setMode("login")} userType={userType} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserLogin;