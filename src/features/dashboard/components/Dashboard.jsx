import React from "react";
import { motion } from "framer-motion";
import {
  Sprout,
  Beef,
  Thermometer,
  Droplet,
  Activity,
  TrendingUp,
  AlertCircle,
  Award,
  Building2,
} from "lucide-react";
import { useAuthStore } from "@shared/store/authStore";

export default function Dashboard() {
  const { selectedFarm } = useAuthStore();
  const stats = [
    {
      label: "Cultivos Activos",
      value: "24",
      icon: Sprout,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      trend: "+12%",
      iconBg: "bg-green-500",
    },
    {
      label: "Ganado",
      value: "156",
      icon: Beef,
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
      trend: "+5%",
      iconBg: "bg-emerald-500",
    },
    {
      label: "Temperatura Promedio",
      value: "22°C",
      icon: Thermometer,
      color: "from-teal-500 to-cyan-600",
      bgColor: "bg-gradient-to-br from-teal-50 to-cyan-50",
      trend: "Normal",
      iconBg: "bg-teal-500",
    },
    {
      label: "Nivel de Agua",
      value: "87%",
      icon: Droplet,
      color: "from-cyan-500 to-blue-600",
      bgColor: "bg-gradient-to-br from-cyan-50 to-blue-50",
      trend: "Óptimo",
      iconBg: "bg-cyan-500",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Riego automático activado",
      area: "Sector A",
      time: "Hace 2 horas",
      status: "success",
    },
    {
      id: 2,
      action: "Alimentación de ganado",
      area: "Corral 3",
      time: "Hace 4 horas",
      status: "success",
    },
    {
      id: 3,
      action: "Monitoreo de temperatura",
      area: "Invernadero 1",
      time: "Hace 6 horas",
      status: "info",
    },
    {
      id: 4,
      action: "Cosecha registrada",
      area: "Sector B",
      time: "Hace 1 día",
      status: "success",
    },
  ];

  const alerts = [
    {
      id: 1,
      message: "Nivel bajo de fertilizante en Sector C",
      priority: "medium",
    },
    { id: 2, message: "Mantenimiento programado para bombas", priority: "low" },
  ];

  return (
    <div className="w-full">
      {/* Header with Hero Section */}
      <motion.div
        className="mb-8 relative overflow-hidden rounded-3xl group"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="relative h-48 bg-cover bg-center rounded-3xl transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1683592042069-cb631de451c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMGNvd3MlMjBwYXN0dXJlfGVufDF8fHx8MTc2NTUxNzM1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-emerald-800/85 to-teal-900/90 rounded-3xl" />
          <div className="relative h-full flex flex-col justify-center px-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-2"
            >
              <Activity className="w-8 h-8 text-green-300" />
              <h1 className="text-3xl font-bold text-white">
                Panel de Control
              </h1>
            </motion.div>

            {/* Farm Name Display */}
            {selectedFarm && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="flex items-center gap-2 mb-3"
              >
                <Building2 className="w-5 h-5 text-green-300" />
                <span className="text-xl font-semibold text-green-100">
                  {selectedFarm.name}
                </span>
              </motion.div>
            )}

            <motion.p
              className="text-green-100 text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Bienvenido a BioTech Farm Management - Gestión Inteligente de Tu
              Granja
            </motion.p>
            <motion.div
              className="flex items-center gap-2 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
              <p className="text-sm text-green-200 uppercase tracking-wider font-semibold">
                Sistema operativo
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid with Enhanced Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group"
          >
            <div
              className={`${stat.bgColor} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden backdrop-blur-sm`}
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5 transform translate-x-10 translate-y-[-10px] rotate-12">
                <stat.icon className="w-full h-full" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    className={`${stat.iconBg} w-12 h-12 rounded-xl flex items-center justify-center shadow-lg bg-opacity-90`}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="flex items-center bg-white/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/50 shadow-sm">
                    <TrendingUp className="w-3 h-3 mr-1.5 text-green-600" />
                    <span className="text-sm font-semibold text-green-700">
                      {stat.trend}
                    </span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm font-medium text-gray-600">
                  {stat.label}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity with Modern Design */}
        <motion.div
          className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Actividad Reciente
                </h2>
                <p className="text-sm text-gray-500">
                  Monitoreo en tiempo real
                </p>
              </div>
            </div>
            <button className="text-sm font-medium text-green-600 hover:text-green-700 hover:bg-green-50 px-4 py-2 rounded-xl transition-colors">
              Ver todo
            </button>
          </div>

          <div className="space-y-2">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center p-4 hover:bg-gray-50 rounded-2xl transition-all duration-300 group border border-transparent hover:border-gray-100"
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        activity.status === "success"
                          ? "bg-green-500"
                          : "bg-blue-500"
                      }`}
                    />
                  </div>
                  {index !== recentActivity.length - 1 && (
                    <div className="absolute top-10 left-5 w-0.5 h-full bg-gray-100 -z-10" />
                  )}
                </div>

                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                    {activity.action}
                  </h4>
                  <p className="text-xs font-medium text-gray-500 mt-1">
                    {activity.area}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 group-hover:bg-white group-hover:shadow-sm transition-all">
                    {activity.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Alerts & Quick Stats */}
        <div className="space-y-6">
          {/* Alerts */}
          <motion.div
            className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-orange-500" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Alertas</h2>
            </div>

            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    alert.priority === "medium"
                      ? "bg-orange-50/50 border-orange-100 hover:border-orange-200"
                      : "bg-blue-50/50 border-blue-100 hover:border-blue-200"
                  }`}
                >
                  <div className="flex gap-3">
                    <AlertCircle
                      className={`w-5 h-5 flex-shrink-0 ${
                        alert.priority === "medium"
                          ? "text-orange-500"
                          : "text-blue-500"
                      }`}
                    />
                    <p
                      className={`text-sm font-medium leading-relaxed ${
                        alert.priority === "medium"
                          ? "text-orange-900"
                          : "text-blue-900"
                      }`}
                    >
                      {alert.message}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Performance Badge */}
          <motion.div
            className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl shadow-xl p-6 text-white relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ y: -5 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl transform translate-x-10 -translate-y-10" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg">Rendimiento</h3>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold">94%</span>
                <span className="text-green-100 font-medium">Eficiencia</span>
              </div>
              <p className="text-sm text-green-50 opacity-90 leading-relaxed">
                Tu granja está operando por encima del promedio este mes.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
