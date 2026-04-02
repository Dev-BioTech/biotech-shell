import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Chatbot } from "@features/chatbot/components";
import { useAuthStore } from "@shared/store/authStore";
import { Separator } from "@components/ui/separator";
import {
  Bell,
  Building2,
  CheckCheck,
  AlertTriangle,
  Info,
  X,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Zap,
  Clock,
  ShieldAlert,
  BarChart2,
  Cpu,
} from "lucide-react";
import { useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ─── Notificaciones iniciales ─────────────────────────────────────────────────
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: "success",
    title: "Ciclo de riego completado en Invernad...",
    time: "Hace 5 min",
    read: false,
    icon: CheckCheck,
    color: "text-emerald-500",
    dot: "bg-emerald-500",
  },
  {
    id: 2,
    type: "error",
    title: "Nivel crítico de nutrientes en Sector C",
    time: "Hace 15 min",
    read: false,
    icon: AlertTriangle,
    color: "text-red-500",
    dot: "bg-red-500",
  },
  {
    id: 3,
    type: "info",
    title: "Mantenimiento programado: Sensores Ph",
    time: "Hace 1 hora",
    read: false,
    icon: Clock,
    color: "text-blue-500",
    dot: "bg-blue-500",
  },
  {
    id: 4,
    type: "warning",
    title: "Acceso detectado fuera de horario",
    time: "Hace 3 horas",
    read: true,
    icon: ShieldAlert,
    color: "text-amber-500",
    dot: "bg-amber-500",
  },
  {
    id: 5,
    type: "success",
    title: "Reporte semanal de producción listo",
    time: "Hace 5 horas",
    read: true,
    icon: BarChart2,
    color: "text-emerald-500",
    dot: "bg-emerald-500",
  },
  {
    id: 6,
    type: "warning",
    title: "Fluctuación de voltaje en Sala de Control",
    time: "Hace 6 horas",
    read: true,
    icon: Cpu,
    color: "text-amber-500",
    dot: "bg-amber-500",
  },
];

// Cuántas se muestran inicialmente
const INITIAL_VISIBLE = 4;

const Layout = ({ children }) => {
  const { isAuthenticated, user, selectedFarm, logout } = useAuthStore();
  const navigate = useNavigate();

  // ── Notificaciones ──
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [showAll, setShowAll] = useState(false);
  const notifBtnRef = useRef(null);
  const notifPanelRef = useRef(null);

  // ── Menú usuario ──
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userBtnRef = useRef(null);
  const userPanelRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const visibleNotifs = showAll
    ? notifications
    : notifications.slice(0, INITIAL_VISIBLE);

  // Cerrar al hacer clic afuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      const inNotifBtn = notifBtnRef.current?.contains(e.target);
      const inNotifPanel = notifPanelRef.current?.contains(e.target);
      const inUserBtn = userBtnRef.current?.contains(e.target);
      const inUserPanel = userPanelRef.current?.contains(e.target);

      if (!inNotifBtn && !inNotifPanel) setShowNotifications(false);
      if (!inUserBtn && !inUserPanel) setShowUserMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setShowUserMenu(false);
    logout();
    window.dispatchEvent(new Event("auth-change"));
    window.location.href = "/";
  };

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const dismissNotification = (id, e) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

  if (!isAuthenticated) return <>{children}</>;

  const displayName =
    user?.name || user?.fullName || user?.email?.split("@")[0] || "Usuario";
  const userEmail = user?.email || "";
  const userRole = user?.role || user?.roles?.[0] || "Operador";
  const userInitial = displayName[0]?.toUpperCase() || "U";

  // Variantes de animación del panel
  const panelVariants = {
    hidden: { opacity: 0, scale: 0.96, y: -8 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 28 },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      y: -8,
      transition: { duration: 0.15, ease: "easeInOut" },
    },
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="m-0 p-0 rounded-none shadow-none border-none overflow-hidden">
        {/* ── Header ── */}
        <header className="flex h-16 shrink-0 items-center gap-2 bg-background px-4 sticky top-0 z-[60]">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />

          {/* Título + granja activa */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 min-w-0 flex-shrink">
            <span className="font-medium text-foreground truncate max-w-[100px] sm:max-w-none">
              BioTech Farm
            </span>
            {selectedFarm && (
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-gray-300">/</span>
                <button
                  onClick={() => navigate("/farm-selector")}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 text-[10px] sm:text-xs font-bold transition-all border border-green-200 truncate"
                  title="Cambiar de granja"
                >
                  <Building2 className="h-3.5 w-3.5 shrink-0" />
                  <div className="flex flex-col items-start leading-none truncate">
                    <span className="max-w-[80px] sm:max-w-[120px] truncate">
                      {selectedFarm.name}
                    </span>
                    {selectedFarm.location && (
                      <span className="text-[9px] text-gray-400 font-normal truncate hidden md:inline">
                        {selectedFarm.location}
                      </span>
                    )}
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* ── Zona derecha ── */}
          <div className="ml-auto flex items-center gap-1">
            {/* ── Notificaciones ── */}
            <div className="relative">
              <button
                ref={notifBtnRef}
                onClick={() => {
                  setShowNotifications((v) => !v);
                  setShowUserMenu(false);
                }}
                className="relative p-2 rounded-lg hover:bg-accent/50 transition-colors"
                aria-label="Notificaciones"
              >
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
                )}
              </button>

              {/* Panel notificaciones con framer-motion */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    key="notif-panel"
                    variants={panelVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    ref={notifPanelRef}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="fixed right-4 top-[64px] w-[92vw] sm:w-96 rounded-2xl z-[200] overflow-hidden origin-top-right"
                    style={{
                      background: "rgba(255,255,255,0.82)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.5)",
                      boxShadow:
                        "0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)",
                    }}
                  >
                    {/* Header del panel */}
                    <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/40">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-900 text-sm">
                            Notificaciones
                          </h3>
                          {unreadCount > 0 && (
                            <span className="px-2 py-0.5 text-[10px] font-bold bg-green-500 text-white rounded-full">
                              {unreadCount} Nuevas
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          Tienes alertas del sistema pendientes
                        </p>
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllRead}
                          className="text-[11px] text-green-600 hover:text-green-700 font-semibold flex items-center gap-1"
                        >
                          <CheckCheck className="h-3.5 w-3.5" />
                          Marcar todas
                        </button>
                      )}
                    </div>

                    {/* Lista de notificaciones */}
                    <div className="divide-y divide-gray-100/60">
                      <AnimatePresence initial={false}>
                        {visibleNotifs.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                            <Bell className="h-8 w-8 mb-2 opacity-30" />
                            <p className="text-sm">Sin notificaciones</p>
                          </div>
                        ) : (
                          visibleNotifs.map((notif, i) => {
                            const Icon = notif.icon;
                            return (
                              <motion.div
                                key={notif.id}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 8, height: 0 }}
                                transition={{ delay: i * 0.04 }}
                                onClick={() => markRead(notif.id)}
                                className={`flex items-center gap-3 px-5 py-3 hover:bg-white/60 cursor-pointer transition-colors ${
                                  !notif.read ? "bg-white/40" : ""
                                }`}
                              >
                                {/* Dot de estado */}
                                <div
                                  className={`h-2 w-2 rounded-full shrink-0 ${notif.dot} ${notif.read ? "opacity-30" : ""}`}
                                />

                                {/* Icono */}
                                <div className={`shrink-0 ${notif.color}`}>
                                  <Icon className="h-4 w-4" />
                                </div>

                                {/* Contenido */}
                                <div className="flex-1 min-w-0">
                                  <p
                                    className={`text-xs leading-snug ${!notif.read ? "font-semibold text-gray-900" : "text-gray-600"}`}
                                  >
                                    {notif.title}
                                  </p>
                                  <p className="text-[10px] text-gray-400 mt-0.5">
                                    {notif.time}
                                  </p>
                                </div>

                                {/* Dismiss */}
                                <button
                                  onClick={(e) =>
                                    dismissNotification(notif.id, e)
                                  }
                                  className="shrink-0 p-1 rounded-lg hover:bg-gray-200/60 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                  <X className="h-3 w-3 text-gray-400" />
                                </button>
                              </motion.div>
                            );
                          })
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Footer: Ver más / Ver todo el historial */}
                    <div className="border-t border-white/40 px-5 py-3 flex items-center justify-between">
                      {notifications.length > INITIAL_VISIBLE && (
                        <button
                          onClick={() => setShowAll((v) => !v)}
                          className="text-xs text-gray-500 hover:text-gray-700 font-medium transition-colors"
                        >
                          {showAll
                            ? "Ver menos"
                            : `Ver ${notifications.length - INITIAL_VISIBLE} más`}
                        </button>
                      )}
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="ml-auto text-xs font-semibold text-green-600 hover:text-green-700 transition-colors"
                      >
                        Ver todo el historial →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Botón usuario ── */}
            <div className="relative">
              <button
                ref={userBtnRef}
                onClick={() => {
                  setShowUserMenu((v) => !v);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-accent/50 transition-colors outline-none"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold uppercase text-sm shadow-sm">
                  {userInitial}
                </div>
                <div className="flex flex-col items-start leading-none min-w-0">
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate max-w-[80px] sm:max-w-[150px]">
                    {displayName}
                  </span>
                  <span className="text-[10px] text-muted-foreground capitalize truncate">
                    {userRole}
                  </span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                    showUserMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* ── Dropdown usuario con animación ── */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    key="user-menu"
                    variants={panelVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    ref={userPanelRef}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="fixed right-4 top-[64px] w-[92vw] sm:w-72 rounded-2xl z-[200] overflow-hidden origin-top-right"
                    style={{
                      background: "rgba(255,255,255,0.88)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.5)",
                      boxShadow:
                        "0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)",
                    }}
                  >
                    {/* Sección superior */}
                    <div className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow">
                            {userInitial}
                          </div>
                          <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 text-base leading-tight truncate">
                            {displayName}
                          </p>
                          <p className="text-xs text-gray-500 truncate mt-0.5">
                            {userEmail}
                          </p>
                          <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full border border-green-200 text-[10px] font-bold text-green-700 bg-green-50 uppercase tracking-wide">
                            <svg
                              className="h-2.5 w-2.5"
                              viewBox="0 0 12 12"
                              fill="none"
                            >
                              <path
                                d="M6 1L7.5 4.5H11L8.5 6.5L9.5 10L6 8L2.5 10L3.5 6.5L1 4.5H4.5L6 1Z"
                                fill="currentColor"
                              />
                            </svg>
                            {userRole}
                          </span>
                        </div>
                      </div>

                      {selectedFarm && (
                        <button
                          onClick={() => {
                            navigate("/farm-selector");
                            setShowUserMenu(false);
                          }}
                          className="mt-3 w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gray-50/80 hover:bg-green-50 border border-gray-100 hover:border-green-200 transition-all group text-left"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0 group-hover:border-green-300 transition-colors">
                            <Building2 className="h-4 w-4 text-gray-500 group-hover:text-green-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                                Sede Actual
                              </p>
                              {selectedFarm.location && (
                                <p className="text-[9px] text-green-600 font-medium truncate ml-2">
                                  {selectedFarm.location}
                                </p>
                              )}
                            </div>
                            <p className="text-sm font-semibold text-gray-800 truncate mt-0.5">
                              {selectedFarm.name}
                            </p>
                          </div>
                        </button>
                      )}
                    </div>

                    <div className="border-t border-gray-100/60" />

                    {/* Configuración */}
                    <div className="p-2">
                      <p className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Configuración
                      </p>

                      <button
                        onClick={() => {
                          navigate("/profile");
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/60 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors">
                          <User className="h-4 w-4 text-gray-500 group-hover:text-green-600" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-semibold text-gray-800 leading-none">
                            Mi Perfil
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            Gestiona tu información
                          </p>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          navigate("/settings");
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/60 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors">
                          <Settings className="h-4 w-4 text-gray-500 group-hover:text-green-600" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-semibold text-gray-800 leading-none">
                            Preferencias
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            Ajustes del sistema
                          </p>
                        </div>
                      </button>
                    </div>

                    <div className="border-t border-gray-100/60" />

                    {/* Cerrar sesión */}
                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-50/80 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-red-100 transition-colors">
                          <LogOut className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-bold text-red-600 leading-none">
                            Cerrar Sesión
                          </p>
                          <p className="text-xs text-red-400 mt-0.5">
                            Salir de tu cuenta
                          </p>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col">
          <div className="flex-1 p-6">
            {children || <Outlet />}
          </div>
        </div>
      </SidebarInset>

      <Chatbot />
    </SidebarProvider>
  );
};

export default Layout;
