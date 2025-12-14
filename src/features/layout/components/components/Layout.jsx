import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-biotech-dark transition-colors duration-300">
      {/* Header */}
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main Content */}
      <main
        className={`pt-16 min-h-screen transition-all duration-300 ${
          isSidebarOpen ? 'lg:pl-64' : 'lg:pl-20'
        }`}
      >
        <div className="p-4 md:p-6 lg:p-8">
          {/* Breadcrumb */}
          <div className="mb-6 animate-fade-in">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="hover:text-biotech-primary cursor-pointer transition-colors">Inicio</span>
              <span>/</span>
              <span className="text-gray-900 dark:text-gray-200">Dashboard</span>
            </div>
          </div>

          {/* Content Area */}
          <div className="animate-fade-in">
            {children}
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
};

export default Layout;