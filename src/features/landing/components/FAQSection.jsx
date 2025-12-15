import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "¿Qué es BioTech Platform?",
      answer:
        "BioTech Platform es una solución integral de gestión agropecuaria que combina tecnología IoT, análisis de datos y herramientas de administración para optimizar la producción y el cuidado del ganado. Permite monitorear en tiempo real la salud de los animales, gestionar inventarios y mejorar la eficiencia operativa de tu granja.",
    },
    {
      question: "¿Cómo funciona el monitoreo en tiempo real?",
      answer:
        "Nuestro sistema utiliza sensores IoT que se colocan en los animales y en diferentes áreas de la granja. Estos sensores recopilan datos sobre temperatura, actividad, alimentación y otros indicadores de salud. La información se envía a nuestra plataforma en la nube donde se procesa y se presenta en dashboards fáciles de entender, permitiéndote tomar decisiones informadas al instante.",
    },
    {
      question: "¿Necesito conocimientos técnicos para usar la plataforma?",
      answer:
        "No, BioTech está diseñado para ser intuitivo y fácil de usar. Ofrecemos una interfaz amigable que no requiere conocimientos técnicos avanzados. Además, proporcionamos capacitación inicial, tutoriales en video y soporte técnico 24/7 para ayudarte en cualquier momento.",
    },
    {
      question: "¿Qué tipo de granjas pueden usar BioTech?",
      answer:
        "BioTech es escalable y se adapta a granjas de todos los tamaños, desde pequeñas fincas familiares hasta grandes operaciones comerciales. Soporta diferentes tipos de ganado incluyendo bovinos, porcinos, ovinos y aves. Nuestro sistema se personaliza según las necesidades específicas de tu operación.",
    },
    {
      question: "¿Cuánto cuesta implementar BioTech?",
      answer:
        "Ofrecemos diferentes planes adaptados al tamaño y necesidades de tu granja. Contamos con planes desde básicos hasta empresariales. Contáctanos para una cotización personalizada y una demo gratuita. También ofrecemos un período de prueba para que puedas experimentar todos los beneficios sin compromiso.",
    },
    {
      question: "¿Qué tipo de soporte ofrecen?",
      answer:
        "Brindamos soporte técnico 24/7 a través de chat, email y teléfono. Nuestro equipo de expertos está siempre disponible para resolver cualquier duda o problema. Además, ofrecemos actualizaciones regulares del software, capacitación continua y una base de conocimientos completa con guías y tutoriales.",
    },
    {
      question: "¿Mis datos están seguros?",
      answer:
        "Absolutamente. Utilizamos encriptación de nivel bancario para proteger toda tu información. Nuestros servidores están alojados en centros de datos certificados con las más altas medidas de seguridad. Realizamos copias de seguridad automáticas diarias y cumplimos con todas las regulaciones de protección de datos.",
    },
    {
      question: "¿Puedo acceder a la plataforma desde mi móvil?",
      answer:
        "Sí, BioTech es completamente responsive y funciona perfectamente en smartphones y tablets. Puedes monitorear tu granja, recibir alertas y tomar decisiones desde cualquier lugar con conexión a internet. También ofrecemos aplicaciones nativas para iOS y Android con funcionalidades adicionales.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-24 relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-sm mb-4">
            <HelpCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-700 dark:text-green-400">
              Preguntas Frecuentes
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            ¿Tienes{" "}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              preguntas?
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Aquí encontrarás respuestas a las dudas más comunes
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-700/50"
              >
                <span className="font-bold text-lg text-gray-900 dark:text-white pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-green-600 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            ¿No encuentras lo que buscas?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Nuestro equipo está listo para ayudarte
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all"
          >
            Contactar Soporte
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
