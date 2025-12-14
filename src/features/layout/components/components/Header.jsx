import { useState } from 'react';
import { Menu, X, Bell, Search, User, Moon, Sun } from 'lucide-react';

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const notifications = [
    { id: 1, text: 'Nuevo análisis completado', time: '5 min' },
    { id: 2, text: 'Resultados de laboratorio disponibles', time: '1 hora' },
    { id: 3, text: 'Actualización del sistema', time: '2 horas' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-biotech-darker border-b border-gray-200 dark:border-gray-800 z-50 transition-colors duration-300">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-biotech-dark transition-colors"
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-biotech-primary to-biotech-secondary rounded-lg flex items-center justify-center animate-bounce-subtle">
              <span className="text-white font-bold text-sm">BT</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-biotech-primary to-biotech-secondary bg-clip-text text-transparent hidden md:block">
              Biotech Platform
            </h1>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-biotech-dark border border-transparent rounded-lg focus:outline-none focus:border-biotech-primary focus:ring-2 focus:ring-biotech-primary/20 transition-all dark:text-gray-200"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-biotech-dark transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-biotech-dark transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-biotech-accent rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-biotech-dark rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Notificaciones</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-biotech-darker transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0"
                    >
                      <p className="text-sm text-gray-900 dark:text-gray-200">{notif.text}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-biotech-dark transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-biotech-secondary to-biotech-accent rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="hidden lg:block text-sm font-medium text-gray-700 dark:text-gray-300">
                Usuario
              </span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-biotech-dark rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in">
                <div className="p-2">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-biotech-darker rounded-md transition-colors">
                    Mi Perfil
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-biotech-darker rounded-md transition-colors">
                    Configuración
                  </button>
                  <hr className="my-2 border-gray-200 dark:border-gray-700" />
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-biotech-darker rounded-md transition-colors">
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;