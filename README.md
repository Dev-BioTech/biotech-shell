# 🏗️BioTech Shell – Host Application

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

The shell is configured as a **Host (Container)** application that dynamically loads all microfrontends as remotes.

### Configuration (vite.config.js)
```javascript
federation({
  name: 'biotech_shell',
  filename: 'remoteEntry.js',
  remotes: {
    authMF: process.env.VITE_AUTH_MF || 'http://localhost:5001/assets/remoteEntry.js',
    animalsMF: process.env.VITE_ANIMALS_MF || 'http://localhost:5002/assets/remoteEntry.js',
    feedingMF: process.env.VITE_FEEDING_MF || 'http://localhost:5003/assets/remoteEntry.js',
    healthMF: process.env.VITE_HEALTH_MF || 'http://localhost:5004/assets/remoteEntry.js',
    reproductionMF: process.env.VITE_REPRODUCTION_MF || 'http://localhost:5005/assets/remoteEntry.js',
    inventoryMF: process.env.VITE_INVENTORY_MF || 'http://localhost:5006/assets/remoteEntry.js',
  },
  shared: ['react', 'react-dom', 'react-router-dom', 'zustand'],
})
```

### Environment-Aware Remotes
- **Development**: Uses `localhost` with default ports
- **Production (Vercel)**: Uses environment variables for deployed MFE URLs

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

### Prerequisites
- All microfrontends deployed on Vercel (or your hosting platform)
- Environment variables configured in Vercel project

### Step 1: Deploy via Vercel CLI
```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Deploy to production
vercel --prod
```

### Step 2: Configure Environment Variables in Vercel
In your Vercel project dashboard, go to **Settings > Environment Variables** and add:

```
VITE_AUTH_MF=https://your-auth-mf.vercel.app/assets/remoteEntry.js
VITE_ANIMALS_MF=https://your-animals-mf.vercel.app/assets/remoteEntry.js
VITE_FEEDING_MF=https://your-feeding-mf.vercel.app/assets/remoteEntry.js
VITE_HEALTH_MF=https://your-health-mf.vercel.app/assets/remoteEntry.js
VITE_REPRODUCTION_MF=https://your-reproduction-mf.vercel.app/assets/remoteEntry.js
VITE_INVENTORY_MF=https://your-inventory-mf.vercel.app/assets/remoteEntry.js
```

### Step 3: Vercel Configuration (vercel.json)
The `vercel.json` file is already configured with:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm ci",
  "framework": "vite",
  "env": {
    "VITE_AUTH_MF": "@auth-mf-url",
    "VITE_ANIMALS_MF": "@animals-mf-url",
    "VITE_FEEDING_MF": "@feeding-mf-url",
    "VITE_HEALTH_MF": "@health-mf-url",
    "VITE_REPRODUCTION_MF": "@reproduction-mf-url",
    "VITE_INVENTORY_MF": "@inventory-mf-url"
  }
}
```

### Step 4: Configure Each Microfrontend for Vercel

Each MFE repository should have a similar structure:

**vercel.json** (for each MFE):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm ci",
  "framework": "vite"
}
```

**vite.config.js** (example for authMF):
```javascript
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'authMF',
      filename: 'remoteEntry.js',
      exposes: {
        './Login': './src/components/Login',
        './AuthProvider': './src/context/AuthProvider',
      },
      shared: ['react', 'react-dom', 'react-router-dom', 'zustand'],
    }),
  ],
})
```

### Step 5: Deploy Other Microfrontends
1. Deploy each MFE separately to Vercel
2. Copy the deployment URL for each MFE
3. Update the Shell's environment variables with the new URLs
4. Redeploy the Shell (Host)

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


