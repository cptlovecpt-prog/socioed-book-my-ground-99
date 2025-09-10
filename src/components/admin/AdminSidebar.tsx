import { NavLink, useLocation } from "react-router-dom";
import {
  Calendar,
  Home,
  Building2,
  ChevronLeft,
  ChevronRight,
  Image,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/admin", icon: Home },
  { title: "Manage Banners", url: "/admin/banners", icon: Image },
  { title: "Manage Facilities", url: "/admin/facilities", icon: Building2 },
  { title: "Manage Bookings", url: "/admin/bookings", icon: Calendar },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/admin") {
      return currentPath === "/admin";
    }
    return currentPath.startsWith(path);
  };

  const getNavClassName = (active: boolean) =>
    active 
      ? "bg-[#941bac] text-white font-medium hover:bg-[#941bac]" 
      : "hover:bg-[#941bac] hover:text-white";

  return (
    <Sidebar collapsible="icon" className={state === "collapsed" ? "w-14" : "w-60"}>
      <div className="flex items-center justify-between h-14 px-2 border-b">
        <SidebarTrigger className="h-8 w-8 p-1">
          {state === "collapsed" ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </SidebarTrigger>
      </div>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
               {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClassName(isActive(item.url))}
                    >
                      <item.icon className={`h-4 w-4 ${isActive(item.url) ? 'text-white' : ''}`} />
                      {state !== "collapsed" && <span>{item.title}</span>}
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