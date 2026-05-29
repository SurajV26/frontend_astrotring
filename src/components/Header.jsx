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
import { Link, useLocation, useNavigate } from "react-router-dom"; // changed this line
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import UserLogin from "./UserLogin";
import { getHoroscope } from "@/redux/slice/HoroscopesSlice";
import { AstrologerLogout, AstrologerProfile } from "@/redux/slice/AstroAuth";
import { userLogout, userProfile } from "@/redux/slice/UserAuth";
import logo from "../assets/logo.png"
import {servicesData} from "@/data/services/servicesData"
import {allMahuratData} from "@/components/common/MuhuratCard"

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
      behavior: "smooth"
    });
  }
}, [location.pathname]);

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

const doshData = servicesData.map((service) => ({
  label: service.title,
  path: `/services/${service.slug}`,
}));
const mahuratData = allMahuratData.map((mahurat)=>({
  label:mahurat.name,
  path:mahurat.link
}))

  const navigationItems = useMemo(
    () => [
      {
        name: "Horoscopes",
        path: "/findHoroschope/yearly",
        hasmenu: horosType.length > 0,
        menu: horosType,
      },
      {
        name: "Chat With Astrologer", 
        path: "/talk-to-astrologer",
        hasmenu: false,
      },
      
      {
        name: "Doshas",
        path: "/services/mangal-dosh",
        hasmenu: true,
        menu: doshData,
      },
      {
        name: "Muhurat",
        path: "/annaprashan-muhurat",
        hasmenu: true,
        menu: mahuratData,
      },
      {
        name: "Shop",
        path: "https://astrotring.shop",
        hasmenu: false,
      },
      {
        name: "Blogs",
        path: "/blogs",
        hasmenu: false,
      },
    
    ],
    [horosType]
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
            label: `${ele.type.charAt(0).toUpperCase() + ele.type.slice(1)} Horoscope`,
            path: `/findHoroschope/${ele.type.toLowerCase()}`,
          });
        }
      });

      setHorosType(horos);
    }
  }, [horoscope]);

  return (
    <header
      className={`sticky top-3 z-50 w-full sm:w-[90%] mx-auto transition-all duration-300 ease-in-out
      ${
        scrolled
          ? "bg-white/60 backdrop-blur-lg shadow-lg border sm:rounded-full sm:border-amber-500"
          : "bg-white/60 backdrop-blur-lg shadow-lg border sm:rounded-full sm:border-amber-500"
      }`}
    >
      <div className="container mx-auto px-4  flex py-2 items-center justify-between  gap-6">
         <Link to="/" className="text-sm font-medium hover:text-[#070707cc] transition-colors">
            <img src={logo} alt="Logo" className="h-8" />
          </Link>
        <div className="flex items-center space-x-6">
          

         
          

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
                    <ChevronDown className="h-3 w-3" />
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    target={item.name === "Shop" ? "_blank" : "_self"}
                    className="text-sm font-medium flex items-center transition-colors hover:text-[#070707cc]"
                  >
                    <GiStarShuriken className="text-primary size-4 me-2" />
                    {item.name}
                  </Link>
                )}

                {item.hasmenu &&
                  openMenu.row === 2 &&
                  openMenu.index === index && (
                    <div className="absolute left-0 top-full mt-0 min-w-56 w-max rounded-md border bg-popover p-1 shadow-md">
                      <ScrollArea className="max-h-96">
                        {item.menu.map((menuItem, idx) => (
                          <Link
                            key={idx}
                            to={menuItem.path}
                            className="px-3 py-2 text-sm rounded-sm flex whitespace-nowrap items-center hover:bg-primary/70 hover:text-black"
                          >
                            <GiStarShuriken className="size-4 me-2 shrink-0" />
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
                  {"Dashboard"}
                </DropdownMenuItem>

                <DropdownMenuItem onClick={logout}>
                  {"Logout"}
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
                <SheetTitle>
                 <SheetClose asChild>
                   <Link to="/" className="flex items-center space-x-2">
                     <span className="text-lg font-semibold">Home</span>
                  </Link>
                 </SheetClose>
               </SheetTitle>
              </SheetHeader>

              <ScrollArea className="h-[calc(100vh-8rem)] mt-6">

                <MobileNavSection navItems={navigationItems} />

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
                          {"Dashboard"}
                        </Button>
                      </SheetClose>

                      <SheetClose asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-red-500"
                          onClick={logout}
                        >
                          {"Logout"}
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