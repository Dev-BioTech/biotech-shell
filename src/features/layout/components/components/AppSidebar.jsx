import {
  Home,
  Beef,
  Activity,
  Utensils,
  Heart,
  DollarSign,
  Package,
  Leaf,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../../../../components/ui/sidebar";
import { useAuthStore } from "../../../../shared/store/authStore";

export function AppSidebar({ ...props }) {
  const { user } = useAuthStore();
  const location = useLocation();

  // Menu items - Only implemented modules with endpoints
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Animales",
      url: "/animals",
      icon: Beef,
    },
    {
      title: "Salud",
      url: "/health",
      icon: Activity,
    },
    {
      title: "Alimentación",
      url: "/feeding",
      icon: Utensils,
    },
    {
      title: "Reproducción",
      url: "/reproduction",
      icon: Heart,
    },
    {
      title: "Comercial",
      url: "/commercial",
      icon: DollarSign,
    },
    {
      title: "Inventario",
      url: "/inventory",
      icon: Package,
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-green-600 text-sidebar-primary-foreground">
                  <Leaf className="size-4 text-white" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">BioTech Farm</span>
                  <span className="truncate text-xs">Gestión Agrícola</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
