import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative p-12 rounded-3xl bg-gradient-to-br from-green-600 to-emerald-600 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574943320219-553eb213da07?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Listo para transformar tu granja?
            </h2>
            <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
              Únete a la revolución digital agropecuaria y lleva tu negocio al
              siguiente nivel
            </p>
            <button
              onClick={() => navigate("/login")}
              className="group px-10 py-5 bg-white text-green-600 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 inline-flex items-center gap-3"
            >
              Comenzar Gratis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
