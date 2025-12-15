import {
  Home, // Usar Home en lugar de LayoutDashboard para coincidir con la casita
  Users,
  Beef,
  Activity,
  Syringe,
  Milk,
  Egg,
  Scale,
  ClipboardList,
  Thermometer,
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

  // Menu items based on the user's design image
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Animales",
      url: "/animals",
      icon: Beef, // Using Beef (steak icon) or Leaf if preferred. Beef is semantic.
    },
    {
      title: "Usuarios",
      url: "/users",
      icon: Users,
    },
    {
      title: "Salud",
      url: "/health",
      icon: Activity,
    },
    {
      title: "Vacunación",
      url: "/vaccination",
      icon: Syringe,
    },
    {
      title: "Producción Leche",
      url: "/production/milk",
      icon: Milk,
    },
    {
      title: "Producción Huevos",
      url: "/production/eggs",
      icon: Egg,
    },
    {
      title: "Pesaje",
      url: "/weight",
      icon: Scale,
    },
    {
      title: "Reportes",
      url: "/reports",
      icon: ClipboardList,
    },
    {
      title: "Clima",
      url: "/climate",
      icon: Thermometer,
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
