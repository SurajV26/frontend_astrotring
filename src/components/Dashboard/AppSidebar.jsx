import { Calendar, HistoryIcon, Home, Inbox, Search, Settings, Wallet } from "lucide-react";
import faviconlogo from "@/assets/favicon.png";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";

const items = [
    { title: "Profile", url: "/dashboard/profile", icon: Home },
    { title: "Update Profile", url: "/dashboard/update-astro", icon: Inbox },
    { title: "Wallet / Account", url: "/dashboard/wallet", icon: Wallet },
    { title: "Widhdrowl History", url: "/dashboard/widhdrow-history", icon: HistoryIcon },
    
];

export function AppSidebar() {
    const { open, openMobile } = useSidebar()
    return (
        <Sidebar collapsible="icon" className={"border-0"}  >
            <SidebarHeader className={"bg-yellow-50  "}>
                <SidebarMenu >
                    <SidebarMenuItem >
                        <NavLink to="/" end className={"flex justify-center pt-2"}>
                            <img
                                src={faviconlogo}
                                className="h-8 w-8 rounded-md"
                                alt="Logo"
                            />
                            {openMobile && <span className="ml-2 font-bold text-lg">Astrotring</span> || open && <span className="ml-2 font-bold text-lg">Astrotring</span>}
                        </NavLink>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className={"bg-yellow-50 "}>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>

                            {/* ✅ MENU ITEMS */}
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild >
                                        <NavLink
                                            to={item.url}
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 rounded-md px-3 py-2 transition
                        ${isActive
                                                    ? "bg-sedondary text-black"
                                                    : "hover:bg-primary"
                                                }`
                                            }
                                        >
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
