import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: 'Sobre Nosotros', href: '#' },
    { label: 'Servicios', href: '#' },
    { label: 'Soporte', href: '#' },
    { label: 'Documentación', href: '#' },
    { label: 'Privacidad', href: '#' },
    { label: 'Términos', href: '#' },
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-biotech-darker transition-colors duration-300">
      <div className="px-4 py-8 md:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-biotech-primary to-biotech-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">BT</span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-biotech-primary to-biotech-secondary bg-clip-text text-transparent">
                Biotech Platform
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Plataforma avanzada de gestión biotecnológica para laboratorios y centros de investigación.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-biotech-dark flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-biotech-primary hover:text-white transition-all transform hover:scale-110"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {links.slice(0, 3).map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-biotech-primary dark:hover:text-biotech-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Recursos</h3>
            <ul className="space-y-2">
              {links.slice(3).map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-biotech-primary dark:hover:text-biotech-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
              © {currentYear} Biotech Platform. Hecho con
              <Heart className="w-4 h-4 text-biotech-accent fill-biotech-accent inline animate-bounce-subtle" />
              por RIWI
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Sistema Operativo
              </span>
              <span>v1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;