import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    LogOut,
    MenuIcon,
    Settings,
    User,
    Home 
   
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSidebar } from '../ui/sidebar';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { AstrologerLogout, AstrologerProfile } from "@/redux/slice/AstroAuth";
import { toast } from "react-toastify";
import { userLogout, userProfile } from "@/redux/slice/UserAuth";


const NavbarAstro = () => {
    const { toggleSidebar } = useSidebar();
    const dispatch = useDispatch()

    // const  astrologer  = useSelector((state) => console.log(state));
    const { astrologer, isAuthenticated } = useSelector((state) => state.astroAuth);
    const { user, isLoggedIn } = useSelector((state) => state.userAuth)
    const [role, setRole] = useState(localStorage.getItem("role_id"))
    const navigate = useNavigate()



    useEffect(() => {
        const storedRole = localStorage.getItem("role_id")
        setRole(storedRole)
    }, [])

console.log("astro data",astrologer)
console.log("user data",user)



    useEffect(() => {
        if (role == 2 && !astrologer && isAuthenticated) {
             console.log("🚀 Dispatching astroProfile! in astronav");
            dispatch(AstrologerProfile())
        }

        if (role == 3 && !user && isLoggedIn) {
             console.log("🚀 Dispatching userProfile! in astronav");
            dispatch(userProfile())
        }
    }, [dispatch, role, astrologer, user])




    const logout = async () => {
        

        try {
            if (role == 2) {
                await dispatch(AstrologerLogout()).unwrap()
            }
            if (role == 3) {
                await dispatch(userLogout()).unwrap()
            }

            localStorage.removeItem("token")
            localStorage.removeItem("role_id")
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <nav className="  bg-yellow-50 sticky   top-0 z-50">
            <div className="container mx-auto  px-4">
                <div className="flex h-14   items-center justify-between">
                    {/* Logo */}
                    <div className="flex  items-center gap-8">

                        <Button
                            variant="ghost"
                            size="icon"
                            className="    mr-2"
                            onClick={toggleSidebar}
                        >
                            <MenuIcon className="h-5 w-5" />
                        </Button>

                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">
                        {/* Notifications */}
                    

                        {/* User Profile */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={user ? user?.profile_image : astrologer?.profile_image} />
                                        <AvatarFallback className="bg-purple-600 text-white">
                                            {user ? user?.name?.charAt(0).toUpperCase():astrologer?.name.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-auto">
                                <DropdownMenuLabel>
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium">{(astrologer?.name) || (user?.name)}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {(astrologer?.email) || (user?.email)}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem asChild>
                                    <Link to="/" className="flex items-center cursor-pointer">
                                        <Home className="mr-2 h-4 w-4" />
                                        Back To Home
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={()=>logout()}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                </div>
            </div>
        </nav >
    );
};

export default NavbarAstro;