"use client";

import * as React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Home,
  Settings,
  Leaf,
  LogOut,
  Users,
  Activity,
  Milk,
  Egg,
  Syringe,
  Weight,
  ThermometerSun,
  ClipboardList,
} from "lucide-react";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { useAuthStore } from "../../../../shared/store/authStore";

const data = {
  user: {
    name: "Usuario Demo",
    email: "user@biotech.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "General",
      url: "#",
      icon: Home,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: Home,
        },
        {
          title: "Seleccionar Finca",
          url: "/farm-selector",
          icon: Leaf,
        },
      ],
    },
    {
      title: "Gestión",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Animales",
          url: "/animals",
          icon: Users,
        },
        {
          title: "Alimentación",
          url: "/feeding",
          icon: Activity,
        },
        {
          title: "Sanidad",
          url: "/health",
          icon: Syringe,
        },
      ],
    },
    {
      title: "Producción",
      url: "#",
      icon: Milk,
      items: [
        {
          title: "Producción de Leche",
          url: "/milk-production",
          icon: Milk,
        },
        {
          title: "Producción de Huevos",
          url: "/egg-production",
          icon: Egg,
        },
      ],
    },
    {
      title: "Control",
      url: "#",
      icon: Activity,
      items: [
        {
          title: "Control de Peso",
          url: "/weight-control",
          icon: Weight,
        },
        {
          title: "Inventario",
          url: "/inventory",
          icon: ClipboardList,
        },
        {
          title: "Clima",
          url: "/weather",
          icon: ThermometerSun,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    // Forzar recarga para limpiar estado
    window.location.href = "/login";
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-green-600 text-white">
                  <Leaf className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">BioTech Farm</span>
                  <span className="truncate text-xs">Gestión Ganadera</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.url}
                      tooltip={item.title}
                    >
                      <Link to={item.url}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
