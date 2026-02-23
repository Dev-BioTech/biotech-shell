import {
  Home,
  Beef,
  Activity,
  Utensils,
  Heart,
  DollarSign,
  Package,
  Leaf,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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

  const items = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Animales", url: "/animals", icon: Beef },
    { title: "Salud", url: "/health", icon: Activity },
    { title: "Alimentación", url: "/feeding", icon: Utensils },
    { title: "Reproducción", url: "/reproduction", icon: Heart },
    { title: "Comercial", url: "/commercial", icon: DollarSign },
    { title: "Inventario", url: "/inventory", icon: Package },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* ── Logo ── */}
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

      {/* ── Nav items ── */}
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

      {/* ── BioTech Pro banner ── */}
      <SidebarFooter className="p-3">
        <div className="group-data-[collapsible=icon]:hidden rounded-2xl bg-gradient-to-br from-green-600 to-emerald-700 p-4 shadow-lg">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Sparkles className="h-3 w-3 text-green-200" />
            <span className="text-[10px] font-bold text-green-200 uppercase tracking-widest">
              BioTech Pro
            </span>
          </div>
          <p className="text-xs text-green-100 leading-snug mb-3">
            Optimiza tu producción con reportes avanzados de IA.
          </p>
          <button className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold rounded-xl transition-all group">
            Saber más
            <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
