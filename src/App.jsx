import { BrowserRouter } from 'react-router-dom';
import { Layout } from './features/layout/components';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        {/* Dashboard Content */}
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-biotech-primary to-biotech-secondary rounded-xl p-6 text-white shadow-lg">
            <h1 className="text-3xl font-bold mb-2">¡Bienvenido a Biotech Platform!</h1>
            <p className="text-white/90">Sistema de gestión biotecnológica de última generación</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Experimentos Activos', value: '24', change: '+12%', color: 'from-blue-500 to-blue-600' },
              { label: 'Muestras Procesadas', value: '1,234', change: '+8%', color: 'from-green-500 to-green-600' },
              { label: 'Análisis Completados', value: '456', change: '+15%', color: 'from-purple-500 to-purple-600' },
              { label: 'Reportes Generados', value: '89', change: '+5%', color: 'from-pink-500 to-pink-600' },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-biotech-darker rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-800"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <span className="text-xs font-semibold text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                    {stat.change}
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                <div className={`h-2 bg-gradient-to-r ${stat.color} rounded-full mt-4`} />
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1 */}
            <div className="bg-white dark:bg-biotech-darker rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Análisis por Mes
              </h3>
              <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-600">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-biotech-primary to-biotech-secondary rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-sm">Gráfico de análisis</p>
                </div>
              </div>
            </div>

            {/* Chart 2 */}
            <div className="bg-white dark:bg-biotech-darker rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Distribución de Datos
              </h3>
              <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-600">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-biotech-secondary to-biotech-accent rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                  </div>
                  <p className="text-sm">Gráfico de distribución</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-biotech-darker rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Actividad Reciente
            </h3>
            <div className="space-y-4">
              {[
                { title: 'Análisis de muestra #1234 completado', time: 'Hace 5 minutos', type: 'success' },
                { title: 'Nuevo experimento iniciado', time: 'Hace 15 minutos', type: 'info' },
                { title: 'Reporte generado: Resultados Q4', time: 'Hace 1 hora', type: 'default' },
                { title: 'Actualización de datos completada', time: 'Hace 2 horas', type: 'success' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-biotech-dark transition-colors">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' : 
                    activity.type === 'info' ? 'bg-blue-500' : 
                    'bg-gray-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{activity.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
