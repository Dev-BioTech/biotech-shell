import {
  Home,
  Beef,
  Activity,
  Utensils,
  Heart,
  DollarSign,
  Package,
} from "lucide-react";

export const menuItems = [
  {
    id: 1,
    label: "Dashboard",
    icon: Home,
    path: "/dashboard",
    badge: null,
  },
  {
    id: 2,
    label: "Animales",
    icon: Beef,
    path: "/animals",
    badge: null,
  },
  {
    id: 3,
    label: "Salud",
    icon: Activity,
    path: "/health",
    badge: null,
  },
  {
    id: 4,
    label: "Alimentación",
    icon: Utensils,
    path: "/feeding",
    badge: null,
  },
  {
    id: 5,
    label: "Reproducción",
    icon: Heart,
    path: "/reproduction",
    badge: null,
  },
  {
    id: 6,
    label: "Comercial",
    icon: DollarSign,
    path: "/commercial",
    badge: null,
  },
  {
    id: 7,
    label: "Inventario",
    icon: Package,
    path: "/inventory",
    badge: null,
  },
];
