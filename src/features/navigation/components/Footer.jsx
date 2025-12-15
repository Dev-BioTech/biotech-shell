import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://facebook.com",
      label: "Facebook",
      color: "hover:bg-blue-600",
    },
    {
      icon: Twitter,
      href: "https://twitter.com",
      label: "Twitter",
      color: "hover:bg-sky-500",
    },
    {
      icon: Instagram,
      href: "https://instagram.com",
      label: "Instagram",
      color: "hover:bg-pink-600",
    },
    {
      icon: Linkedin,
      href: "https://github.com/Nikotastic/biotech-animals-mf",
      label: "LinkedIn",
      color: "hover:bg-blue-700",
    },
    {
      icon: Github,
      href: "https://github.com/Nikotastic/biotech-animals-mf",
      label: "GitHub",
      color: "hover:bg-gray-700",
    },  
  ];

  const quickLinks = [
    { label: "Inicio", href: "#hero" },
    { label: "Características", href: "#features" },
    { label: "Testimonios", href: "#testimonials" },
    { label: "Preguntas Frecuentes", href: "#faq" },
  ];

  return (
    <footer
      id="contact"
      className="bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900 text-white"
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/BioTech.webp"
                alt="BioTech Logo"
                className="h-12 w-auto"
              />
              <span className="font-bold text-2xl">BioTech</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transformando la gestión agropecuaria con tecnología de
              vanguardia. Optimiza tu producción y maximiza tus resultados.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors">
                <Mail className="w-4 h-4" />
                <a href="mailto:contacto@biotech.com">contacto@biotech.com</a>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors">
                <Phone className="w-4 h-4" />
                <a href="tel:+573001234567">+57 300 123 4567</a>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Barranquilla, Colombia</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Recibe las últimas novedades y consejos para tu granja
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Tu email"
                className="px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all text-sm">
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <span className="text-gray-400 text-sm">Síguenos en:</span>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full bg-gray-800 ${social.color} flex items-center justify-center transition-all hover:scale-110 transform`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>
              © {currentYear} BioTech Platform. Todos los derechos reservados.
            </p>
            <p>Hecho con amor en Colombia</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
