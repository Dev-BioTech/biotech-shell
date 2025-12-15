import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Carlos Mendoza",
      role: "Propietario, Hacienda El Roble",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      rating: 5,
      text: "Desde que implementamos BioTech, hemos aumentado nuestra productividad en un 40%. El monitoreo en tiempo real nos permite tomar decisiones más informadas sobre la salud de nuestro ganado.",
    },
    {
      name: "María Fernández",
      role: "Gerente de Operaciones, Granja San José",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
      rating: 5,
      text: "La plataforma es increíblemente intuitiva. Ahora podemos gestionar el inventario de alimentos y medicinas sin errores. El soporte técnico 24/7 es excepcional.",
    },
    {
      name: "Roberto Silva",
      role: "Director, Agropecuaria Los Andes",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
      rating: 5,
      text: "BioTech revolucionó nuestra forma de trabajar. La gestión genética nos ha permitido mejorar la calidad de nuestro ganado significativamente. ¡Altamente recomendado!",
    },
  ];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-sm mb-4">
            <Quote className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-700 dark:text-green-400">
              Testimonios
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Lo que dicen{" "}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              nuestros clientes
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Historias reales de éxito de granjas que transformaron su gestión
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="group relative p-8 rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-16 h-16 text-green-600" />
              </div>

              <div className="relative">
                {/* Avatar and Info */}
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-green-500/20 group-hover:ring-green-500/40 transition-all"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Trust Indicator */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <div className="flex -space-x-2">
              {testimonials.map((t, idx) => (
                <img
                  key={idx}
                  src={t.avatar}
                  alt="Cliente"
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 object-cover"
                />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 bg-green-600 flex items-center justify-center text-white text-sm font-bold">
                +500
              </div>
            </div>
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              Más de 500 granjas confían en nosotros
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
