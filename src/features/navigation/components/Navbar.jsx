// Navbar Component
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Inicio", href: "#hero" },
    { label: "Características", href: "#features" },
    { label: "Testimonios", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
    { label: "Contacto", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="/BioTech.webp"
              alt="BioTech Logo"
              className="h-10 w-auto"
            />
            <span className="font-bold text-xl text-gray-900">BioTech</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-600 hover:text-green-600 font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all shadow-md"
            >
              Iniciar Sesión
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-green-600"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 bg-white">
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-600 hover:text-green-600 font-medium transition-colors px-4 py-2 hover:bg-green-50 rounded-lg"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/login");
                }}
                className="mx-4 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all"
              >
                Iniciar Sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
