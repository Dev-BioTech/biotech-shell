import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Beef,
  HeartPulse,
  Utensils,
  Package,
  AlertCircle,
  Activity,
  Building2,
  CalendarClock,
  TrendingUp,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { useAuthStore } from "@shared/store/authStore";
import apiClient from "@shared/utils/apiClient";

// ── helpers ──────────────────────────────────────────────────────────────────
function extractList(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (data.data && Array.isArray(data.data)) return data.data;
  if (data.items && Array.isArray(data.items)) return data.items;
  return [];
}

function relativeTime(dateStr) {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `Hace ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `Hace ${hrs} h`;
  return `Hace ${Math.floor(hrs / 24)} día(s)`;
}

// ── stat card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, color, bg, loading, trend }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`${bg} rounded-2xl shadow hover:shadow-xl transition-all duration-300 p-5 border border-white/50 relative overflow-hidden`}
    >
      <div className="absolute top-0 right-0 w-28 h-28 opacity-5 transform translate-x-6 -translate-y-4 rotate-12">
        <Icon className="w-full h-full" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div
            className={`${color} w-11 h-11 rounded-xl flex items-center justify-center shadow-md`}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
          {trend !== undefined && (
            <div className="flex items-center bg-white/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/50 shadow-sm text-xs font-semibold text-green-700">
              <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
              {trend}
            </div>
          )}
        </div>
        {loading ? (
          <Loader2 className="w-7 h-7 animate-spin text-gray-400 mb-1" />
        ) : (
          <h3 className="text-3xl font-bold text-gray-800 mb-0.5">{value}</h3>
        )}
        <p className="text-sm font-medium text-gray-500">{label}</p>
      </div>
    </motion.div>
  );
}

// ── main ──────────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const { selectedFarm } = useAuthStore();
  const farmId = selectedFarm?.id;

  // ─ state ─
  const [loading, setLoading] = useState(true);
  const [animals, setAnimals] = useState([]);
  const [healthEvents, setHealthEvents] = useState([]);
  const [feedingEvents, setFeedingEvents] = useState([]);
  const [upcomingHealth, setUpcomingHealth] = useState([]);
  const [lowStock, setLowStock] = useState([]);

  // ─ fetch all data ─
  const fetchAll = async () => {
    setLoading(true);
    try {
      const [animalsRes, healthRes, feedingRes, upcomingRes, lowStockRes] =
        await Promise.allSettled([
          apiClient.get("/v1/animals", { params: { farmId } }),
          apiClient.get("/HealthEvent/farm"),
          apiClient.get(`/v1/FeedingEvents/farm/${farmId}`, {
            params: { pageSize: 5 },
          }),
          apiClient.get("/HealthEvent/upcoming", { params: { limit: 4 } }),
          apiClient.get("/Products/low-stock", { params: { farmId } }),
        ]);

      setAnimals(
        animalsRes.status === "fulfilled"
          ? extractList(animalsRes.value?.data)
          : [],
      );
      setHealthEvents(
        healthRes.status === "fulfilled"
          ? extractList(healthRes.value?.data)
          : [],
      );
      setFeedingEvents(
        feedingRes.status === "fulfilled"
          ? extractList(feedingRes.value?.data)
          : [],
      );
      setUpcomingHealth(
        upcomingRes.status === "fulfilled"
          ? extractList(upcomingRes.value?.data)
          : [],
      );
      setLowStock(
        lowStockRes.status === "fulfilled"
          ? extractList(lowStockRes.value?.data)
          : [],
      );
    } catch (e) {
      console.error("Dashboard fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (farmId) fetchAll();
  }, [farmId]);

  // ─ derived stats ─
  const activeAnimals = animals.filter(
    (a) => a.status !== "Muerto" && a.status !== "Vendido",
  ).length;
  const pendingHealth = healthEvents.filter(
    (e) => e.status === "Pendiente",
  ).length;
  const feedingThisWeek = feedingEvents.length;
  const lowStockCount = lowStock.length;

  // ─ recent activity from health events ─
  const recentActivity = [...healthEvents]
    .sort(
      (a, b) =>
        new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt),
    )
    .slice(0, 5);

  return (
    <div className="w-full px-2 md:px-0">
      {/* Hero Header */}
      <motion.div
        className="mb-6 md:mb-8 relative overflow-hidden rounded-2xl md:rounded-3xl group shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="relative min-h-[180px] md:h-48 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1683592042069-cb631de451c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-emerald-800/85 to-teal-900/90" />
          <div className="relative h-full flex flex-col justify-center px-6 md:px-8 py-6 md:py-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-2"
            >
              <Activity className="w-6 h-6 md:w-8 md:h-8 text-green-300" />
              <h1 className="text-xl md:text-3xl font-bold text-white">
                Panel de Control
              </h1>
            </motion.div>

            {selectedFarm && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="flex items-center gap-2 mb-3"
              >
                <Building2 className="w-4 h-4 md:w-5 md:h-5 text-green-300" />
                <span className="text-lg md:text-xl font-semibold text-green-100">
                  {selectedFarm.name}
                </span>
              </motion.div>
            )}

            <motion.p
              className="text-green-100 text-sm md:text-base max-w-2xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Resumen en tiempo real de tu granja
            </motion.p>

            <motion.div
              className="flex items-center gap-2 mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
              <p className="text-[10px] md:text-sm text-green-200 uppercase tracking-wider font-semibold">
                Sistema operativo
              </p>
              <button
                onClick={fetchAll}
                className="ml-auto flex items-center gap-1 text-xs text-green-200 hover:text-white transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Actualizar
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid — datos reales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <StatCard
          label="Animales Activos"
          value={activeAnimals}
          icon={Beef}
          color="bg-emerald-500"
          bg="bg-gradient-to-br from-emerald-50 to-teal-50"
          loading={loading}
        />
        <StatCard
          label="Salud Pendiente"
          value={pendingHealth}
          icon={HeartPulse}
          color={pendingHealth > 0 ? "bg-orange-500" : "bg-green-500"}
          bg="bg-gradient-to-br from-orange-50 to-red-50"
          loading={loading}
        />
        <StatCard
          label="Alimentaciones (últimas)"
          value={feedingThisWeek}
          icon={Utensils}
          color="bg-blue-500"
          bg="bg-gradient-to-br from-blue-50 to-indigo-50"
          loading={loading}
        />
        <StatCard
          label="Productos Stock Bajo"
          value={lowStockCount}
          icon={Package}
          color={lowStockCount > 0 ? "bg-red-500" : "bg-green-500"}
          bg="bg-gradient-to-br from-rose-50 to-pink-50"
          loading={loading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Actividad reciente — últimos eventos de salud */}
        <motion.div
          className="lg:col-span-2 bg-white rounded-2xl md:rounded-3xl shadow-lg p-6 md:p-8 border border-gray-100"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Eventos de Salud Recientes
                </h2>
                <p className="text-xs text-gray-500">
                  Últimos registros del módulo de salud
                </p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-green-500" />
            </div>
          ) : recentActivity.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <HeartPulse className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Sin eventos de salud registrados</p>
            </div>
          ) : (
            <div className="space-y-1">
              {recentActivity.map((event, index) => (
                <motion.div
                  key={event.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.08 }}
                  className="flex items-center p-3 md:p-4 hover:bg-gray-50 rounded-2xl transition-all duration-300 group border border-transparent hover:border-gray-100"
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        event.status === "Completado"
                          ? "bg-green-500"
                          : event.status === "Pendiente"
                            ? "bg-orange-500"
                            : "bg-blue-500"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-green-700 transition-colors truncate">
                      {event.eventType || event.type || "Evento de salud"}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                      {event.animalName || event.description || "—"}
                    </p>
                  </div>
                  <span className="ml-3 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 whitespace-nowrap">
                    {relativeTime(event.date || event.createdAt)}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Panel derecho */}
        <div className="space-y-6">
          {/* Próximos eventos de salud */}
          <motion.div
            className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-6 border border-gray-100"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                <CalendarClock className="w-5 h-5 text-orange-500" />
              </div>
              <h2 className="text-base font-bold text-gray-900">
                Próximos eventos
              </h2>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="w-6 h-6 animate-spin text-orange-400" />
              </div>
            ) : upcomingHealth.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">
                Sin eventos próximos
              </p>
            ) : (
              <div className="space-y-3">
                {upcomingHealth.map((event, index) => (
                  <motion.div
                    key={event.id || index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3 rounded-xl border bg-orange-50/50 border-orange-100 hover:border-orange-200 transition-all"
                  >
                    <p className="text-xs font-semibold text-orange-900 truncate">
                      {event.eventType || event.type || "Evento"}
                    </p>
                    <p className="text-[11px] text-orange-600 mt-0.5">
                      {event.animalName || event.date || "—"}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Productos con stock bajo */}
          <motion.div
            className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-6 border border-gray-100"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <h2 className="text-base font-bold text-gray-900">Stock Bajo</h2>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="w-6 h-6 animate-spin text-red-400" />
              </div>
            ) : lowStock.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">
                ✅ Inventario en orden
              </p>
            ) : (
              <div className="space-y-2">
                {lowStock.slice(0, 4).map((product, index) => (
                  <div
                    key={product.id || index}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-red-50/60 border border-red-100"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-red-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-[11px] text-red-500">
                        {product.stock ?? "—"} {product.unit ?? ""}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full ml-2 whitespace-nowrap">
                      Bajo
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
