// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
// import { ChevronDown, Menu, User } from "lucide-react"
// import { useEffect, useState } from "react"
// import { GiStarShuriken } from "react-icons/gi"
// import { useDispatch, useSelector } from "react-redux"
// import { Link, Navigate, useNavigate } from "react-router-dom"
// import logoastroremove from "../assets/logoastroremove.png"
// import { Button } from "./ui/button"
// import { ScrollArea } from "./ui/scroll-area"
// import UserLogin from "./UserLogin"
// import { getHoroscope } from "@/redux/slice/HoroscopesSlice"
// import { AstrologerLogout, AstrologerProfile } from "@/redux/slice/AstroAuth"
// import { userLogin, userLogout, userProfile } from "@/redux/slice/UserAuth"
// import LanguageSwitcher from "@/LanguageSwitcher";
// // Mobile Navigation Section Component
// const MobileNavSection = ({ navItems }) => {
//   const [openIndex, setOpenIndex] = useState(null)

//   const toggleMenu = (index) => {
//     setOpenIndex(openIndex === index ? null : index)
//   }

//   return (
//     <div className="space-y-1">
//       {navItems.map((item, index) => (
//         <div key={index}>
//           <div
//             className="flex items-center justify-between px-2 py-2 text-sm font-medium cursor-pointer rounded-md"
//             onClick={item.hasmenu ? () => toggleMenu(index) : undefined}
//           >
//             {!item.hasmenu ? (
//               <SheetClose asChild>
//                 <Link to={item.path} className="flex items-center">
//                   <GiStarShuriken className="text-primary size-4 me-2" />
//                   {item.name}
//                 </Link>
//               </SheetClose>
//             ) : (
//               <>
//                 <span className="flex items-center">
//                   <GiStarShuriken className="text-primary size-4 me-2" />
//                   {item.name}
//                 </span>
//                 <ChevronDown
//                   className={`h-4 w-4 transition-transform ${openIndex === index ? "rotate-180" : ""
//                     }`}
//                 />
//               </>
//             )}
//           </div>

//           {/* Dropdown with Transition */}
//           {item.hasmenu && (
//             <div
//               className={`overflow-hidden transition-all duration-200 ${openIndex === index ? "max-h-96" : "max-h-0"
//                 }`}
//             >
//               <div className="ml-4 mt-1 space-y-1 border-l border-accent pl-2">
//                 {item.menu.map((menuItem, menuIndex) => (
//                   <SheetClose asChild key={menuIndex}>
//                     <Link
//                       to={menuItem.path}
//                       className="flex px-2 py-1.5 text-sm rounded-md"
//                     >
//                       <GiStarShuriken className="text-primary size-4 me-2" />
//                       {menuItem.label}
//                     </Link>
//                   </SheetClose>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   )
// }

// const Header = () => {
//   const [openMenu, setOpenMenu] = useState({ row: null, index: null })
//   const [horosType, setHorosType] = useState([])
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const { astrologer } = useSelector((state) => state.astroAuth)
//   const { user } = useSelector((state) => state.userAuth)
//   const { horoscope } = useSelector((state) => state.horoscope)
//   const [role, setRole] = useState(localStorage.getItem("role_id"))
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//     const [scrolled, setScrolled] = useState(false)
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 10) {
//         setScrolled(true)
//       } else {
//         setScrolled(false)
//       }
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])
//   const moveToDashboard = () => {
//     setIsDropdownOpen(false)
//     navigate("/dashboard/profile")
//   }

//   useEffect(() => {
//     const storedRole = localStorage.getItem("role_id")
//     setRole(storedRole)
//   }, [])

//   const uprofile = async () => {
//     await dispatch(userProfile()).unwrap()
//   }

//   const astprofile = async () => {
//     await dispatch(AstrologerProfile()).unwrap()
//   }

//   useEffect(() => {
//     if (role == 2 && !astrologer) {
//       dispatch(AstrologerProfile())
//     }

//     if (role == 3 && !user) {
//       dispatch(userProfile())
//     }
//   }, [dispatch, role, astrologer, user])

//   const logout = async () => {
//     setIsDropdownOpen(false)

//     try {
//       const role = Number(localStorage.getItem("role_id"))

//       if (role === 2) {
//         await dispatch(AstrologerLogout()).unwrap()
//       } else if (role === 3) {
//         await dispatch(userLogout()).unwrap()
//       }

//       // clear local session
//       localStorage.removeItem("token")
//       localStorage.removeItem("role_id")

//     } catch (err) {
//       console.log("Logout error:", err)
//     }
//   }

//   // Mock user data for design
//   const mockUser = {
//     username: "John Doe",
//     avatar: null
//   }

//   // Navigation items with dynamic horoscope menu
//   const navigationItems = [
//     {
//       name: "Horoscopes",
//       path: "/best-astrologers",
//       type: "link",
//       hasmenu: horosType.length > 0,
//       menu: horosType
//     },
//     {
//       name: "Chat / Call to Astrologer",
//       path: "/talk-to-astrologer",
//       type: "link",
//       hasmenu: false
//     },
//     {
//       name: "Store",
//       path: "https://store.adkrayons.com/product",
//       type: "link",
//       hasmenu: false
//     },
//     {
//       name: "Blogs",
//       path: "/blogs",
//       type: "link",
//       hasmenu: false
//     },
//   ]

//   /* ------------------ FETCH HOROSCOPES ------------------ */
//   useEffect(() => {
//     if (!horoscope) {
//       const fetchHoroscopes = async () => {
//         try {
//           await dispatch(getHoroscope()).unwrap()
//         } catch (error) {
//           console.log(error.message)
//         }
//       }
//       fetchHoroscopes()
//     }
//   }, [horoscope, dispatch])

//   /* ------------------ GENERATE HOROSCOPE TYPES MENU ------------------ */
//   useEffect(() => {
//     if (horoscope?.length > 0) {
//       try {
//         const horosSet = new Set()
//         const horos = []

//         horoscope.forEach((ele) => {
//           if (ele.type && !horosSet.has(ele.type)) {
//             horosSet.add(ele.type)
//             horos.push({
//               label: ele.type.charAt(0).toUpperCase() + ele.type.slice(1) + " Horoscope",
//               path: `/horoscopes/${ele.type.toLowerCase()}`
//             })
//           }
//         })

//         setHorosType(horos)
//       } catch (error) {
//         console.log(error.message)
//       }
//     }
//   }, [horoscope])

//   return (
//     <header
//       className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out
//       ${scrolled
//           ? "bg-white/60 backdrop-blur-lg shadow-lg border-b border-white/20"
//           : "bg-white"
//         }`}
//     >
//       <div className="container flex h-16 items-center justify-between  ">
//         {/* LOGO */}
//         <Link to="/" className="flex items-center space-x-2 ">
//           <img src={logoastroremove} alt="Logo" className="h-7 w-auto" />
//         </Link>

//         {/* DESKTOP MENU */}
//         <nav className="hidden lg:flex items-center space-x-6">
//           {navigationItems.map((item, index) => (
//             <div
//               key={index}
//               className="relative"
//               onMouseEnter={() => item.hasmenu && setOpenMenu({ row: 2, index })}
//               onMouseLeave={() => item.hasmenu && setOpenMenu({ row: null, index: null })}
//             >
//               {item.hasmenu ? (
//                 <button className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
//                   <GiStarShuriken className="text-primary size-4 me-2" />
//                   <span>{item.name}</span>
//                   <ChevronDown className="h-4 w-4" />
//                 </button>
//               ) : (
//                 <Link
//                   to={item.path}
//                   target={item.name === "Store" ? "_blank" : "_self"}

//                   className="text-sm font-medium flex items-center transition-colors hover:text-primary"
//                 >
//                   <GiStarShuriken className="text-primary size-4 me-2" />
//                   {item.name}
//                 </Link>
//               )}

//               {/* DROPDOWN */}
//               {item.hasmenu && openMenu.row === 2 && openMenu.index === index && (
//                 <div className="absolute left-0 top-full mt-0 w-56 rounded-md border bg-popover p-1 shadow-md">
//                   <ScrollArea className="max-h-96">
//                     {item.menu.map((menuItem, idx) => (
//                       <Link
//                         key={idx}
//                         to={menuItem.path}
//                         className="px-3 py-2 text-sm rounded-sm flex items-center hover:bg-primary/70 hover:text-black"
//                       >
//                         <GiStarShuriken className="size-4 me-2" />
//                         {menuItem.label}
//                       </Link>
//                     ))}
//                   </ScrollArea>
//                 </div>
//               )}
//             </div>
//           ))}
//  <LanguageSwitcher />
//           {/* AUTH SECTION - DESKTOP */}
//           <div>
//             {
//               (astrologer?.name || user?.name) ? (
//                 <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" className="relative h-8 w-8 rounded-full">
//                       <Avatar className="h-8 w-8">
//                         <AvatarImage
//                           src={user ? user?.profile_image : astrologer?.profile_image}
//                           alt={mockUser.username}
//                         />
//                         <AvatarFallback>
//                           {/* {mockUser.username.charAt(0).toUpperCase()} */}
//                           {(astrologer?.name || user?.name)?.charAt(0).toUpperCase()}

//                         </AvatarFallback>
//                       </Avatar>
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent className="w-56" align="end" forceMount>
//                     <DropdownMenuLabel className="font-normal">

//                       <div className="flex flex-col space-y-1">
//                         <p className="text-sm font-medium leading-none">
//                           {astrologer?.name || user?.name}
//                         </p>
//                       </div>

//                     </DropdownMenuLabel>
//                     <DropdownMenuSeparator />

//                     <DropdownMenuItem
//                       className="cursor-pointer"
//                       onClick={() => moveToDashboard()}
//                     >
//                       Dashboard
//                     </DropdownMenuItem>

//                     <DropdownMenuItem
//                       className="cursor-pointer"
//                       onClick={() => logout()}
//                     >
//                       Logout
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               ) :
//                 (
//                   <UserLogin />
//                 )
//             }
//           </div>
//         </nav>

//         {/* MOBILE MENU */}
//         <Sheet>
//           <SheetTrigger asChild className="lg:hidden">
//             <Button variant="ghost" size="icon">
//               <Menu className="h-5 w-5" />
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="right" className="w-80">
//             <SheetHeader>
//               <SheetTitle>
//                 <SheetClose asChild>
//                   <Link to="/" className="flex items-center space-x-2">
//                     <img src={logoastroremove} alt="Logo" className="h-8 w-auto" />
//                   </Link>
//                 </SheetClose>
//               </SheetTitle>
//             </SheetHeader>
//             <ScrollArea className="h-[calc(100vh-8rem)] mt-6">
//               <MobileNavSection navItems={navigationItems} />

//               {/* USER SECTION - MOBILE */}
//               <div className="mt-4 px-2 space-y-2">
//                 {(astrologer?.name || user?.name) && (
//                   <div className="flex items-center gap-3 p-2 border rounded-md">
//                     <Avatar className="h-10 w-10">
//                       <AvatarImage
//                         src={user ? user?.profile_image : astrologer?.profile_image}
//                         alt={mockUser.username}
//                       />
//                       <AvatarFallback>
//                         {(astrologer?.name || user?.name)?.charAt(0).toUpperCase()}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div className="flex-1">
//                       <p className="text-sm font-medium"> {astrologer?.name || user?.name}</p>
//                     </div>
//                   </div>
//                 )
//                 }
//                 {(astrologer?.name || user?.name) &&
//                   (<SheetClose asChild>
//                     <Button variant="outline" onClick={() => moveToDashboard()} className="w-full bg-primary rounded-full">
//                       Dashboard
//                     </Button>
//                   </SheetClose>)}
//                 {(!astrologer && !user) &&
//                   (<UserLogin />)}

//                 {(astrologer?.name || user?.name) &&
//                   (<SheetClose asChild>
//                     <Button variant="destructive" className="w-full rounded-2xl" onClick={() => logout()}>
//                       Logout
//                     </Button>
//                   </SheetClose>)}
//               </div>
//             </ScrollArea>
//           </SheetContent>
//         </Sheet>
//       </div >
//     </header >
//   )
// }

// export default Header

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { ChevronDown, Menu } from "lucide-react";
// import { useEffect, useState } from "react";
// import { GiStarShuriken } from "react-icons/gi";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "./ui/button";
// import { ScrollArea } from "./ui/scroll-area";
// import UserLogin from "./UserLogin";
// import { getHoroscope } from "@/redux/slice/HoroscopesSlice";
// import { AstrologerLogout, AstrologerProfile } from "@/redux/slice/AstroAuth";
// import { userLogout, userProfile } from "@/redux/slice/UserAuth";
// import LanguageSwitcher from "@/components/LanguageSwitcher";

// Mobile Navigation Section Component (unchanged)
// const MobileNavSection = ({ navItems }) => {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleMenu = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <div className="space-y-1">
//       {navItems.map((item, index) => (
//         <div key={index}>
//           <div
//             className="flex items-center justify-between px-2 py-2 text-sm font-medium cursor-pointer rounded-md"
//             onClick={item.hasmenu ? () => toggleMenu(index) : undefined}
//           >
//             {!item.hasmenu ? (
//               <SheetClose asChild>
//                 <Link to={item.path} className="flex items-center">
//                   <GiStarShuriken className="text-primary size-4 me-2" />
//                   {item.name}
//                 </Link>
//               </SheetClose>
//             ) : (
//               <>
//                 <span className="flex items-center">
//                   <GiStarShuriken className="text-primary size-4 me-2" />
//                   {item.name}
//                 </span>
//                 <ChevronDown
//                   className={`h-4 w-4 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
//                 />
//               </>
//             )}
//           </div>

//           {item.hasmenu && (
//             <div
//               className={`overflow-hidden transition-all duration-200 ${openIndex === index ? "max-h-96" : "max-h-0"}`}
//             >
//               <div className="ml-4 mt-1 space-y-1 border-l border-accent pl-2">
//                 {item.menu.map((menuItem, menuIndex) => (
//                   <SheetClose asChild key={menuIndex}>
//                     <Link
//                       to={menuItem.path}
//                       className="flex px-2 py-1.5 text-sm rounded-md"
//                     >
//                       <GiStarShuriken className="text-primary size-4 me-2" />
//                       {menuItem.label}
//                     </Link>
//                   </SheetClose>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// const Header = () => {
//   const [openMenu, setOpenMenu] = useState({ row: null, index: null });
//   const [horosType, setHorosType] = useState([]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const { astrologer } = useSelector((state) => state.astroAuth);
//   const { user } = useSelector((state) => state.userAuth);
//   const { horoscope } = useSelector((state) => state.horoscope);
//   const [role, setRole] = useState(localStorage.getItem("role_id"));
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const moveToDashboard = () => {
//     setIsDropdownOpen(false);
//     navigate("/dashboard/profile");
//   };

//   useEffect(() => {
//     const storedRole = localStorage.getItem("role_id");
//     setRole(storedRole);
//   }, []);

//   useEffect(() => {
//     if (role == 2 && !astrologer) {
//       dispatch(AstrologerProfile());
//     }
//     if (role == 3 && !user) {
//       dispatch(userProfile());
//     }
//   }, [dispatch, role, astrologer, user]);

//   const logout = async () => {
//     setIsDropdownOpen(false);
//     try {
//       const role = Number(localStorage.getItem("role_id"));
//       if (role === 2) {
//         await dispatch(AstrologerLogout()).unwrap();
//       } else if (role === 3) {
//         await dispatch(userLogout()).unwrap();
//       }
//       localStorage.removeItem("token");
//       localStorage.removeItem("role_id");
//     } catch (err) {
//       console.log("Logout error:", err);
//     }
//   };

//   const mockUser = {
//     username: "John Doe",
//     avatar: null,
//   };

//   const navigationItems = [
//     {
      // name: "Horoscopes",
      // path: "/best-astrologers",
      // type: "link",
      // hasmenu: horosType.length > 0,
      // menu: horosType,
//     },
//     {
//       name: "Chat / Call to Astrologer",
//       path: "/talk-to-astrologer",
//       type: "link",
//       hasmenu: false,
//     },
//     {
//       name: "Store",
//       path: "https://store.astrotring.com",
//       type: "link",
//       hasmenu: false,
//     },
//     {
//       name: "Blogs",
//       path: "/blogs",
//       type: "link",
//       hasmenu: false,
//     },
//   ];

//   useEffect(() => {
//     if (!horoscope) {
//       const fetchHoroscopes = async () => {
//         try {
//           await dispatch(getHoroscope()).unwrap();
//         } catch (error) {
//           console.log({ error });
//         }
//       };
//       fetchHoroscopes();
//     }
//   }, [horoscope, dispatch]);

//   useEffect(() => {
//     if (horoscope?.length > 0) {
//       try {
//         const horosSet = new Set();
//         const horos = [];
//         horoscope.forEach((ele) => {
//           if (ele.type && !horosSet.has(ele.type)) {
//             // filhaal ke liye weekly wala horoschope ko skip kar raha hu kyuki hamare pass abhi week ka data nhi hai
//             if (ele.type.toLowerCase() === "weekly") {
//               return;
//             }

//             horosSet.add(ele.type);
//             horos.push({
//               label:
//                 ele.type.charAt(0).toUpperCase() +
//                 ele.type.slice(1) +
//                 " Horoscope",
//               path: `/findHoroschope/${ele.type.toLowerCase()}`,
//             });
//           }
//         });
//         setHorosType(horos);
//       } catch (error) {
//         console.log(error.message);
//       }
//     }
//   }, [horoscope]);

//   return (
//     <header
//       className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out
//       ${
//         scrolled
//           ? "bg-white/60 backdrop-blur-lg shadow-lg border-b border-white/20"
//           : "bg-white"
//       }`}
//     >
//       <div className="container mx-auto px-4 md:px-10 flex h-16 items-center justify-between   md:justify-center  gap-2.5 ">
//         {/* Left side: Home link + desktop navigation */}
//         <div className="flex items-center space-x-6 ">
//           <GiStarShuriken className="text-primary size-4 me-2 hidden md:block" />
//           <Link
//             to="/"
//             className="text-sm font-medium hover:text-[#070707cc]  transition-colors"
//           >
//             Home
//           </Link>
//           <nav className="hidden lg:flex items-center space-x-6">
//             {navigationItems.map((item, index) => (
//               <div
//                 key={index}
//                 className="relative"
//                 onMouseEnter={() =>
//                   item.hasmenu && setOpenMenu({ row: 2, index })
//                 }
//                 onMouseLeave={() =>
//                   item.hasmenu && setOpenMenu({ row: null, index: null })
//                 }
//               >
//                 {item.hasmenu ? (
//                   <button className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-[#070707cc] ">
//                     <GiStarShuriken className="text-primary size-4 me-2" />
//                     <span>{item.name}</span>
//                     <ChevronDown className="h-4 w-4" />
//                   </button>
//                 ) : (
//                   <Link
//                     to={item.path}
//                     target={item.name === "Store" ? "_blank" : "_self"}
//                     className="text-sm font-medium flex items-center transition-colors hover:text-[#070707cc] "
//                   >
//                     <GiStarShuriken className="text-primary size-4 me-2" />
//                     {item.name}
//                   </Link>
//                 )}

//                 {item.hasmenu &&
//                   openMenu.row === 2 &&
//                   openMenu.index === index && (
//                     <div className="absolute left-0 top-full mt-0 w-56 rounded-md border bg-popover p-1 shadow-md">
//                       <ScrollArea className="max-h-96">
//                         {item.menu.map((menuItem, idx) => (
//                           <Link
//                             key={idx}
//                             to={menuItem.path}
//                             className="px-3 py-2 text-sm rounded-sm flex items-center hover:bg-primary/70 hover:text-black"
//                           >
//                             <GiStarShuriken className="size-4 me-2" />
//                             {menuItem.label}
//                           </Link>
//                         ))}
//                       </ScrollArea>
//                     </div>
//                   )}
//               </div>
//             ))}
//           </nav>
//         </div>

//         {/* Right side: LanguageSwitcher + Auth (hidden on mobile) */}
//         <div className="hidden lg:flex items-center space-x-4 ">
//           <LanguageSwitcher className="bg-transparent text-sm font-normal" />
//           <div>
//             {astrologer?.name || user?.name ? (
//               <DropdownMenu
//                 open={isDropdownOpen}
//                 onOpenChange={setIsDropdownOpen}
//               >
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     className="relative h-8 w-8 rounded-full"
//                   >
//                     <Avatar className="h-8 w-8">
//                       <AvatarImage
//                         src={
//                           user ? user?.profile_image : astrologer?.profile_image
//                         }
//                         alt={mockUser.username}
//                       />
//                       <AvatarFallback>
//                         {(astrologer?.name || user?.name)
//                           ?.charAt(0)
//                           .toUpperCase()}
//                       </AvatarFallback>
//                     </Avatar>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent className="w-56" align="end" forceMount>
//                   <DropdownMenuLabel className="font-normal">
//                     <div className="flex flex-col space-y-1">
//                       <p className="text-sm font-medium leading-none">
//                         {astrologer?.name || user?.name}
//                       </p>
//                     </div>
//                   </DropdownMenuLabel>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem
//                     className="cursor-pointer"
//                     onClick={moveToDashboard}
//                   >
//                     Dashboard
//                   </DropdownMenuItem>
//                   <DropdownMenuItem className="cursor-pointer" onClick={logout}>
//                     Logout
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               <UserLogin />
//             )}
//           </div>
//         </div>

//         {/* Mobile menu button (visible on mobile) */}
//         <Sheet>
//           <SheetTrigger asChild className="lg:hidden">
//             <Button variant="ghost" size="icon">
//               <Menu className="h-5 w-5" />
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="right" className="w-80">
//             <SheetHeader>
//               <SheetTitle>
//                 <SheetClose asChild>
//                   <Link to="/" className="flex items-center space-x-2">
//                     <span className="text-lg font-semibold">Home</span>
//                   </Link>
//                 </SheetClose>
//               </SheetTitle>
//             </SheetHeader>
//             <ScrollArea className="h-[calc(100vh-8rem)] mt-6">
//               <MobileNavSection navItems={navigationItems} />

//               {/* Add LanguageSwitcher inside mobile menu */}
//               <div className="mt-4 px-2">
//                 <LanguageSwitcher className="w-full justify-start bg-transparent text-sm font-normal" />
//               </div>

//               {/* User section in mobile menu */}
//               <div className="mt-4 px-2 space-y-2">
//                 {(astrologer?.name || user?.name) && (
//                   <div className="flex items-center gap-3 p-2 border rounded-md">
//                     <Avatar className="h-10 w-10">
//                       <AvatarImage
//                         src={
//                           user ? user?.profile_image : astrologer?.profile_image
//                         }
//                         alt={mockUser.username}
//                       />
//                       <AvatarFallback>
//                         {(astrologer?.name || user?.name)
//                           ?.charAt(0)
//                           .toUpperCase()}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div className="flex-1">
//                       <p className="text-sm font-medium">
//                         {astrologer?.name || user?.name}
//                       </p>
//                     </div>
//                   </div>
//                 )}
//                 {(astrologer?.name || user?.name) && (
//                   <SheetClose asChild>
//                     <Button
//                       variant="outline"
//                       onClick={moveToDashboard}
//                       className="w-full bg-primary rounded-full"
//                     >
//                       Dashboard
//                     </Button>
//                   </SheetClose>
//                 )}
//                 {!astrologer && !user && <UserLogin />}
//                 {(astrologer?.name || user?.name) && (
//                   <SheetClose asChild>
//                     <Button
//                       variant="destructive"
//                       className="w-full rounded-2xl"
//                       onClick={logout}
//                     >
//                       Logout
//                     </Button>
//                   </SheetClose>
//                 )}
//               </div>
//             </ScrollArea>
//           </SheetContent>
//         </Sheet>
//       </div>
//     </header>
//   );
// };

// export default Header;




// Header.jsx



import React, { useState, useEffect, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDown, Menu } from "lucide-react";
import { GiStarShuriken } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import UserLogin from "./UserLogin";
import { getHoroscope } from "@/redux/slice/HoroscopesSlice";
import { AstrologerLogout, AstrologerProfile } from "@/redux/slice/AstroAuth";
import { userLogout, userProfile } from "@/redux/slice/UserAuth";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const MobileNavSection = ({ navItems }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleMenu = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-1">
      {navItems.map((item, index) => (
        <div key={index}>
          <div
            className="flex items-center justify-between px-2 py-2 text-sm font-medium cursor-pointer rounded-md"
            onClick={item.hasmenu ? () => toggleMenu(index) : undefined}
          >
            {!item.hasmenu ? (
              <SheetClose asChild>
                <Link to={item.path} className="flex items-center">
                  <GiStarShuriken className="text-primary size-4 me-2" />
                  {item.name}
                </Link>
              </SheetClose>
            ) : (
              <>
                <span className="flex items-center">
                  <GiStarShuriken className="text-primary size-4 me-2" />
                  {item.name}
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </>
            )}
          </div>

          {item.hasmenu && (
            <div
              className={`overflow-hidden transition-all duration-200 ${
                openIndex === index ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="ml-4 mt-1 space-y-1 border-l border-accent pl-2">
                {item.menu.map((menuItem, menuIndex) => (
                  <SheetClose asChild key={menuIndex}>
                    <Link
                      to={menuItem.path}
                      className="flex px-2 py-1.5 text-sm rounded-md"
                    >
                      <GiStarShuriken className="text-primary size-4 me-2" />
                      {menuItem.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const Header = () => {
  const { t, i18n } = useTranslation();
  const [openMenu, setOpenMenu] = useState({ row: null, index: null });
  const [horosType, setHorosType] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { astrologer } = useSelector((state) => state.astroAuth);
  const { user } = useSelector((state) => state.userAuth);
  const { horoscope } = useSelector((state) => state.horoscope);
  const [role, setRole] = useState(localStorage.getItem("role_id"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
useEffect(() => {
  if (location.pathname.includes("findHoroschope")) {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }
}, [location.pathname]);
  useEffect(() => {
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const logout = async () => {
    setIsDropdownOpen(false);
    try {
      const role = Number(localStorage.getItem("role_id"));
      if (role === 2) {
        await dispatch(AstrologerLogout()).unwrap();
      } else if (role === 3) {
        await dispatch(userLogout()).unwrap();
      }
      localStorage.removeItem("token");
      localStorage.removeItem("role_id");
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  const moveToDashboard = () => {
    setIsDropdownOpen(false);
    navigate("/dashboard/profile");
  };

  const navigationItems = useMemo(
    () => [
      {
        name: t("horoscopes"),
        path: "/best-astrologers",
        hasmenu: horosType.length > 0,
        menu: horosType,
      },
      {
        name: t("chatAstrologer"),
        path: "/talk-to-astrologer",
        hasmenu: false,
      },
      {
        name: t("shop"),
        path: "https://astrotring.shop",
        hasmenu: false,
      },
      {
        name: t("blogs"),
        path: "/blogs",
        hasmenu: false,
      },
    ],
    [t, horosType]
  );

  useEffect(() => {
    if (!horoscope) {
      dispatch(getHoroscope());
    }
  }, [horoscope, dispatch]);

  // ⭐ Updated Horoscope Menu with Translation
  useEffect(() => {
    if (horoscope?.length > 0) {
      const horosSet = new Set();
      const horos = [];

      horoscope.forEach((ele) => {
        if (ele.type && !horosSet.has(ele.type)) {
          if (ele.type.toLowerCase() === "weekly") return;

          horosSet.add(ele.type);

          horos.push({
            label: `${t(ele.type.toLowerCase())} ${t("horoscope")}`,
            path: `/findHoroschope/${ele.type.toLowerCase()}`,
          });
        }
      });

      setHorosType(horos);
    }
  }, [horoscope, t]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out
      ${
        scrolled
          ? "bg-white/60 backdrop-blur-lg shadow-lg border-b border-white/20"
          : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4 md:px-10 flex h-16 items-center justify-between md:justify-center gap-2.5">
        <div className="flex items-center space-x-6">
          <GiStarShuriken className="text-primary size-4 me-2 hidden md:block" />

          <Link to="/" className="text-sm font-medium hover:text-[#070707cc] transition-colors">
            {t("home")}
          </Link>

          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() =>
                  item.hasmenu && setOpenMenu({ row: 2, index })
                }
                onMouseLeave={() =>
                  item.hasmenu && setOpenMenu({ row: null, index: null })
                }
              >
                {item.hasmenu ? (
                  <button className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-[#070707cc]">
                    <GiStarShuriken className="text-primary size-4 me-2" />
                    <span>{item.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    target={item.name === t("shop") ? "_blank" : "_self"}
                    className="text-sm font-medium flex items-center transition-colors hover:text-[#070707cc]"
                  >
                    <GiStarShuriken className="text-primary size-4 me-2" />
                    {item.name}
                  </Link>
                )}

                {item.hasmenu &&
                  openMenu.row === 2 &&
                  openMenu.index === index && (
                    <div className="absolute left-0 top-full mt-0 w-56 rounded-md border bg-popover p-1 shadow-md">
                      <ScrollArea className="max-h-96">
                        {item.menu.map((menuItem, idx) => (
                          <Link
                            key={idx}
                            to={menuItem.path}
                            className="px-3 py-2 text-sm rounded-sm flex items-center hover:bg-primary/70 hover:text-black"
                          >
                            <GiStarShuriken className="size-4 me-2" />
                            {menuItem.label}
                          </Link>
                        ))}
                      </ScrollArea>
                    </div>
                  )}
              </div>
            ))}
          </nav>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <LanguageSwitcher className="bg-transparent text-sm font-normal" />

          {astrologer?.name || user?.name ? (
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user ? user?.profile_image : astrologer?.profile_image}
                    />
                    <AvatarFallback>
                      {(astrologer?.name || user?.name)
                        ?.charAt(0)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  {astrologer?.name || user?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={moveToDashboard}>
                  {t("dashboard")}
                </DropdownMenuItem>

                <DropdownMenuItem onClick={logout}>
                  {t("logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <UserLogin />
          )}
        </div>

        <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-80">

              <SheetHeader>
                <SheetTitle>{t("")}</SheetTitle>
              </SheetHeader>

              <ScrollArea className="h-[calc(100vh-8rem)] mt-6">

                <MobileNavSection navItems={navigationItems} />

                <div className="mt-4 px-2">
                  <LanguageSwitcher className="w-full justify-start" />
                </div>

                {/* Mobile Account */}
                <div className="mt-3  p-1 space-y-2">

                  {astrologer?.name || user?.name ? (

                    <>
                      <div className="flex items-center gap-3 px-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={user ? user?.profile_image : astrologer?.profile_image}
                          />
                          <AvatarFallback>
                            {(astrologer?.name || user?.name)?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        <span className="text-sm font-medium">
                          {astrologer?.name || user?.name}
                        </span>
                      </div>

                      <SheetClose asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={moveToDashboard}
                        >
                          {t("dashboard")}
                        </Button>
                      </SheetClose>

                      <SheetClose asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-red-500"
                          onClick={logout}
                        >
                          {t("logout")}
                        </Button>
                      </SheetClose>

                    </>

                  ) : (
                    <UserLogin />
                  )}

                </div>

              </ScrollArea>
            </SheetContent>
          </Sheet>
      </div>
    </header>
  );
};

export default Header;