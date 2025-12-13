#🏗️BioTech Shell – Host Application

Host application of the BioTech livestock ERP that orchestrates all microfrontends.

## 🚀 Features

- **MFEs Orchestration**: Manages dynamic loading of all modules
- **Centralized authentication**: Access control and permissions
- **Shared layout**: Consistent Header, Sidebar, and Footer
- **Unified navigation**: Global routing across module
- **Global Status**: Shared store with Zustand
- **Error Management**: Error boundaries for each MFE

</div>

## 🚀 TechStack
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Module Federation](https://img.shields.io/badge/Module%20Federation-1.3.6-FF6B6B?style=for-the-badge)
![React Router](https://img.shields.io/badge/React%20Router-v6-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5.0.9-443E38?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.17-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)


## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/biotech-shell.git

# Install dependencies
cd biotech-shell
npm install

# Start in development
npm run dev

# Compile for production
npm run build
```

## 🌐 Development Ports

- **Shell (Host)**: http://localhost:5000
- **Auth MF**: http://localhost:5001
- **Animals MF**: http://localhost:5002
- **Feeding MF**: http://localhost:5003
- **Health MF**: http://localhost:5004
- **Reproduction MF**: http://localhost:5005
- **Inventory MF**: http://localhost:5006
- **Commercial MF**: http://localhost:5007

## 📁 Project Structure

```
biotech-shell/
├── src/
│ ├── features/
│ │ ├── layout/ # Layout components
│ │ ├── navigation/ # Navigation menu
│ │ └── error-boundary/ # Error handling
│ ├── shared/
│ │ ├── store/ # Global state
│ │ ├── utils/ # Utilities
│ │ └── constants/ # Constants
│ ├── router/
│ │ └── AppRouter.jsx # Route configuration
│ ├── App.jsx
│ └── main.jsx
├── vite.config.js # Vite and MF configuration
├── tailwind.config.js
└── package.json
```

## 🔌 Integrated Microfrontends

### **Exposed by other MFEs:**
- `authMF/Login` - Login form
- `animalsMF/AnimalsList` - Animal list
- `feedingMF/FeedingSchedule` - Feeding schedule
- `healthMF/HealthRecords` - Health records
- `reproductionMF/ReproductionCycles` - Reproductive cycles
- `inventoryMF/InventoryDashboard` - Inventory Dashboard
- `commercialMF/SalesDashboard` - Sales Dashboard

## 🌍 Environment Variables

### Development (.env.development)
```send
VITE_API_GATEWAY_URL=http://localhost:8000/api
VITE_ENV=development
```

### Production (.env.production)
```send
VITE_API_GATEWAY_URL=https://api.biotech.com/api
VITE_ENV=production
```

## 🧩 Module Federation Configuration

```javascript
// vite.config.js
remotes: { 
authMF: 'http://localhost:5001/assets/remoteEntry.js', 
animalsMF: 'http://localhost:5002/assets/remoteEntry.js',

/ ... other remotes
}
```

## 🎨 Layout Customization

### Header
```javascript
// src/features/layout/components/Header.jsx
// Customize the application header
```

### Sidebar
```javascript
// src/features/layout/components/Sidebar.jsx
// Modify the navigation menu
```

### Adding New Modules
```javascript
// src/features/navigation/constants/menuItems.js
export const menuItems = [

{
path: '/new-module',
label: 'New Module',
icon: '🆕',
module: 'new'

}
]
```

## 🚀 Deploy on Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Vercel Configuration (vercel.json)
```json
{
"buildCommand": "npm run build",
"outputDirectory": "dist",
"framework": "vite"
}
```

## 🔐 Authentication

The shell handles authentication centrally:

```javascript
// src/shared/store/globalStore.js
const useGlobalStore = create((set) => ({
user: null,
isAuthenticated: false,
setUser: (user) => set({ user, isAuthenticated: true }),
logout: () => set({ user: null, isAuthenticated: false })
}))
```

## 📝 Available Scripts

```json
{
"dev": "vite --port 5000", // Development
"build": "vite build", // Production
"preview": "vite preview" // Build preview
}
```

## 🐛 Troubleshooting

### Error: "Failed to fetch remote"
- Verify that all MFEs are running
- Check the URLs in `vite.config.js`
- Confirm that the ports are available

### Error: "Module not found"
- Run `npm install` on all projects
- Clean up node_modules: `rm -rf node_modules && npm install`

### CORS errors
- Verify the CORS configuration in the API Gateway
- Check the headers in the requests

## 🤝 Contribution

1. Fork the project
2. Create your branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add: new-feature'`
4. Push: `git push origin feature/new-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

- **RIWI** - Initial Development
- **BioTech** - Product Owner


