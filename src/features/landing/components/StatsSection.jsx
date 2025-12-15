import { Activity, Shield, TrendingUp, Users } from "lucide-react";

const StatsSection = () => {
  const stats = [
    { value: "+500", label: "Granjas Activas", icon: Users },
    { value: "98%", label: "Satisfacción", icon: TrendingUp },
    { value: "+1M", label: "Animales Gestionados", icon: Activity },
    { value: "24/7", label: "Soporte Técnico", icon: Shield },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574943320219-553eb213da07?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>

      {/* Animated Shapes */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Resultados que hablan por sí mismos
          </h2>
          <p className="text-xl text-green-100">
            Únete a cientos de granjas que ya confían en nosotros
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <stat.icon className="w-8 h-8 text-green-200 mx-auto mb-4" />
              <div className="text-5xl md:text-6xl font-black text-white mb-2">
                {stat.value}
              </div>
              <div className="text-green-100 font-semibold text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
