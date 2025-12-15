import { Sparkles, CheckCircle2 } from "lucide-react";

const GallerySection = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80",
      title: "Ganado Bovino",
    },
    {
      url: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80",
      title: "Granja Moderna",
    },
    {
      url: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80",
      title: "Pastoreo",
    },
    {
      url: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800&q=80",
      title: "Producción Lechera",
    },
    {
      url: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
      title: "Tecnología Agrícola",
    },
    {
      url: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80",
      title: "Cuidado Animal",
    },
  ];

  // Duplicate for seamless loop
  const allImages = [...images, ...images.slice(0, 4)];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-green-50/30 to-white dark:from-gray-900 dark:via-emerald-950/30 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-sm mb-4">
            <Sparkles className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-700 dark:text-green-400">
              Nuestros Clientes
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Granjas que{" "}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              confían en nosotros
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Descubre cómo transformamos la gestión agropecuaria en todo el país
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Gradient Overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling Images */}
          <div className="overflow-hidden">
            <div className="flex gap-6 animate-scroll-carousel">
              {allImages.map((image, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-80 h-64 rounded-2xl overflow-hidden group relative"
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-bold text-xl">
                        {image.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-16 flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-gray-700 dark:text-gray-300 font-semibold">
              Más de 500 granjas gestionadas exitosamente
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
