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
import { useEffect, useState } from "react";
import { GiStarShuriken } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import UserLogin from "./UserLogin";
import { getHoroscope } from "@/redux/slice/HoroscopesSlice";
import { AstrologerLogout, AstrologerProfile } from "@/redux/slice/AstroAuth";
import { userLogout, userProfile } from "@/redux/slice/UserAuth";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import logoastroremove from "../assets/logoastroremove.png"; // ✅ अपना logo यहाँ लगाओ

// Mobile Navigation Section Component (unchanged)
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
                  className={`h-4 w-4 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                />
              </>
            )}
          </div>

          {item.hasmenu && (
            <div
              className={`overflow-hidden transition-all duration-200 ${openIndex === index ? "max-h-96" : "max-h-0"}`}
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const moveToDashboard = () => {
    setIsDropdownOpen(false);
    navigate("/dashboard/profile");
  };

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

  const navigationItems = [
    {
      name: "Horoscopes",
      path: "/best-astrologers",
      type: "link",
      hasmenu: horosType.length > 0,
      menu: horosType,
    },
    {
      name: "Chat / Call to Astrologer",
      path: "/talk-to-astrologer",
      type: "link",
      hasmenu: false,
    },
    {
      name: "Store",
      path: "https://store.astrotring.com/product",
      type: "link",
      hasmenu: false,
    },
    {
      name: "Blogs",
      path: "/blogs",
      type: "link",
      hasmenu: false,
    },
  ];

  useEffect(() => {
    if (!horoscope) {
      const fetchHoroscopes = async () => {
        try {
          await dispatch(getHoroscope()).unwrap();
        } catch (error) {
          console.log({ error });
        }
      };
      fetchHoroscopes();
    }
  }, [horoscope, dispatch]);

  useEffect(() => {
    if (horoscope?.length > 0) {
      try {
        const horosSet = new Set();
        const horos = [];
        horoscope.forEach((ele) => {
          if (ele.type && !horosSet.has(ele.type)) {
            horosSet.add(ele.type);
            horos.push({
              label:
                ele.type.charAt(0).toUpperCase() +
                ele.type.slice(1) +
                " Horoscope",
              path: `/horoscopes/${ele.type.toLowerCase()}`,
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
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out
        ${scrolled
          ? "bg-white/60 backdrop-blur-lg shadow-lg border-b border-white/20"
          : "bg-white border-b border-gray-100"
        }`}
    >
        <Link to={"/findHoroschope/monthly"}><button>month</button></Link>
      <Link to={"/findHoroschope/yearly"}><button>year</button></Link>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* 1️⃣ LEFT SIDE - LOGO */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img 
              src={logoastroremove} 
              alt="Astrotring"
              className="h-6 sm:h-10  lg:h-8 w-auto object-contain"
            />
          </Link>

          {/* 2️⃣ CENTER - DESKTOP NAVIGATION (hidden on mobile) */}
          <nav className="hidden lg:flex items-center justify-center flex-1 gap-8 xl:gap-10">
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
        <button className="flex items-center gap-1.5 text-sm xl:text-base font-medium transition-colors hover:text-primary">
          <GiStarShuriken className="text-primary size-4 xl:size-5" />
          <span>{item.name}</span>
          <ChevronDown className="h-4 w-4 xl:h-5 xl:w-5" />
        </button>
      ) : (
        <Link
          to={item.path}
          target={item.name === "Store" ? "_blank" : "_self"}
          className="flex items-center gap-1.5 text-sm xl:text-base font-medium transition-colors hover:text-primary"
        >
          <GiStarShuriken className="text-primary size-4 xl:size-5" />
          {item.name}
        </Link>
      )}

      {item.hasmenu &&
        openMenu.row === 2 &&
        openMenu.index === index && (
          <div className="absolute left-0 top-full mt-2 w-56 xl:w-64 rounded-md border bg-white shadow-lg p-1 z-50">
            <ScrollArea className="max-h-96">
              {item.menu.map((menuItem, idx) => (
                <Link
                  key={idx}
                  to={menuItem.path}
                  className="flex items-center gap-2 px-3 py-2 text-sm xl:text-base rounded-md hover:bg-primary/10 transition-colors"
                >
                  <GiStarShuriken className="size-4 xl:size-5 text-primary" />
                  {menuItem.label}
                </Link>
              ))}
            </ScrollArea>
          </div>
        )}
    </div>
  ))}
</nav>

          {/* 3️⃣ RIGHT SIDE - Language, Account, Mobile Menu */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
            
            {/* Language Switcher - visible on all devices (except maybe very small) */}
            <LanguageSwitcher />

            {/* Account Button - ALWAYS VISIBLE outside mobile menu */}
            <div className="flex items-center">
              {astrologer?.name || user?.name ? (
                <DropdownMenu
                  open={isDropdownOpen}
                  onOpenChange={setIsDropdownOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-full p-0"
                    >
                      <Avatar className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9">
                        <AvatarImage
                          src={
                            user ? user?.profile_image : astrologer?.profile_image
                          }
                          alt={user?.name || astrologer?.name}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs sm:text-sm">
                          {(astrologer?.name || user?.name)
                            ?.charAt(0)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 sm:w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-xs sm:text-sm font-medium leading-none">
                          {astrologer?.name || user?.name}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-xs sm:text-sm"
                      onClick={moveToDashboard}
                    >
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-xs sm:text-sm" onClick={logout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <UserLogin />
              )}
            </div>

            {/* Mobile Menu Button - only visible on mobile/tablet */}
            <Sheet>
              <SheetTrigger asChild>
                
                <Button  variant="ghost" size="icon" className="lg:hidden h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16">
                  <Menu className="h-8 w-8 sm:h-8 sm:w-8 md:h-8 md:w-8" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85%] sm:w-80 p-0">
                <SheetHeader className="p-4 sm:p-6 pb-2">
                  <SheetTitle>
                    <SheetClose asChild>
                      <Link to="/" className="flex items-center gap-2">
                        <img 
                          src={logoastroremove} 
                          alt="Astrotring"
                          className="h-6 sm:h-8 w-auto object-contain"
                        />
                      </Link>
                    </SheetClose>
                  </SheetTitle>
                </SheetHeader>
                
                <ScrollArea className="h-[calc(100vh-8rem)] px-4 sm:px-6">
                  {/* Mobile Navigation - all items here */}
                  <MobileNavSection navItems={navigationItems} />

                  {/* Language Switcher for mobile (inside menu) */}
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
                    <LanguageSwitcher className="w-full justify-start bg-transparent text-sm font-normal" />
                  </div>

                  {/* User section in mobile menu - but this is optional since button is already outside */}
                  {(astrologer?.name || user?.name) && (
                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-2">Quick access</p>
                      <SheetClose asChild>
                        <Button
                          variant="outline"
                          onClick={moveToDashboard}
                          className="w-full justify-start gap-2 text-sm"
                        >
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={user?.profile_image || astrologer?.profile_image} />
                            <AvatarFallback className="text-xs">
                              {(astrologer?.name || user?.name)?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span>Dashboard</span>
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-2 mt-2 text-red-600 hover:text-red-700 hover:bg-red-50 text-sm"
                          onClick={logout}
                        >
                          Logout
                        </Button>
                      </SheetClose>
                    </div>
                  )}
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;