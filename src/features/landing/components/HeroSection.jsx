import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, ChevronRight, CheckCircle2 } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-transparent"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-8 animate-fade-in-up">
            <div className="relative group">
              <div className="absolute inset-0 bg-green-400 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
              <img
                src="/BioTech.webp"
                alt="BioTech Logo"
                className="relative h-28 md:h-40 w-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500 filter brightness-110"
              />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-sm mb-6 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-700">
              Tecnología de Vanguardia en Gestión Agropecuaria
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Gestión Inteligente
            </span>
            <br />
            <span className="text-gray-900">para tu Granja</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-100">
            Optimiza la producción, maximiza la salud animal y controla cada
            aspecto de tu negocio con{" "}
            <span className="font-bold text-green-600">
              tecnología de punta
            </span>
            .
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200 mb-16">
            <button
              onClick={() => navigate("/login")}
              className="group relative px-8 py-4 bg-green-600 text-white rounded-2xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-2"
            >
              Comenzar Ahora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 border-2 border-gray-200 bg-white/80 text-gray-900 rounded-2xl font-bold text-lg hover:border-green-500 transition-all shadow-md hover:shadow-lg"
            >
              Ver Demo
            </button>
          </div>

          {/* Features / Trust */}
          <div className="flex flex-wrap items-center justify-center gap-10 text-sm text-gray-500 animate-fade-in-up delay-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="font-medium">+500 Granjas Activas</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="font-medium">98% Satisfacción</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="font-medium">Soporte 24/7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <ChevronRight className="w-6 h-6 text-gray-400 rotate-90" />
      </div>
    </section>
  );
};

export default HeroSection;
