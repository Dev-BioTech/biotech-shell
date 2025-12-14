import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FlaskConical, 
  BarChart3, 
  Users, 
  Settings, 
  FileText,
  Database,
  Shield,
  ChevronRight
} from 'lucide-react';
import { menuItems } from '../../../navigation/constants/menuItems';

const defaultMenuItems = [
  { id: 1, label: 'Dashboard', icon: Home, path: '/', badge: null },
  { id: 2, label: 'Laboratorio', icon: FlaskConical, path: '/lab', badge: 'Nuevo' },
  { id: 3, label: 'Análisis', icon: BarChart3, path: '/analytics', badge: null },
  { id: 4, label: 'Pacientes', icon: Users, path: '/patients', badge: '3' },
  { id: 5, label: 'Datos', icon: Database, path: '/data', badge: null },
  { id: 6, label: 'Reportes', icon: FileText, path: '/reports', badge: null },
  { id: 7, label: 'Seguridad', icon: Shield, path: '/security', badge: null },
  { id: 8, label: 'Configuración', icon: Settings, path: '/settings', badge: null },
];

const iconMap = {
  Home,
  FlaskConical,
  BarChart3,
  Users,
  Settings,
  FileText,
  Database,
  Shield,
};

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const items = menuItems.length > 0 ? menuItems : defaultMenuItems;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden animate-fade-in"
          onClick={() => {}}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-biotech-darker border-r border-gray-200 dark:border-gray-800 z-40 transition-all duration-300 ${
          isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:w-20 lg:translate-x-0'
        }`}
      >
        <nav className="h-full overflow-y-auto py-4 px-2">
          <div className="space-y-1">
            {items.map((item) => {
              const Icon = item.icon || iconMap[item.iconName] || Home;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-biotech-primary to-biotech-secondary text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-biotech-dark'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-biotech-primary'}`} />
                  
                  <span className={`flex-1 font-medium text-sm ${isOpen ? 'block' : 'hidden lg:hidden'}`}>
                    {item.label}
                  </span>

                  {item.badge && (isOpen || window.innerWidth >= 1024) && (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-biotech-accent/10 text-biotech-accent dark:bg-biotech-accent/20'
                    }`}>
                      {item.badge}
                    </span>
                  )}

                  {isActive && (
                    <ChevronRight className="w-4 h-4 text-white" />
                  )}

                  {/* Tooltip for collapsed state */}
                  {!isOpen && (
                    <div className="hidden lg:block absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                      {item.label}
                      <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                    </div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Sidebar Footer */}
          <div className={`mt-8 pt-4 border-t border-gray-200 dark:border-gray-800 ${isOpen ? 'px-3' : 'hidden lg:block px-3'}`}>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-biotech-primary/10 to-biotech-secondary/10 dark:from-biotech-primary/20 dark:to-biotech-secondary/20">
              <div className={`w-10 h-10 bg-gradient-to-br from-biotech-primary to-biotech-secondary rounded-lg flex items-center justify-center ${isOpen ? '' : 'lg:w-8 lg:h-8'}`}>
                <FlaskConical className={`text-white ${isOpen ? 'w-5 h-5' : 'lg:w-4 lg:h-4'}`} />
              </div>
              <div className={`${isOpen ? 'block' : 'hidden'}`}>
                <p className="text-xs font-semibold text-gray-900 dark:text-gray-100">Biotech v1.0</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Sistema de Gestión</p>
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;