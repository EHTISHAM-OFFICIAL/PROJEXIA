import { AuthProvider } from './contexts/AuthContext';
import { SiteSettingsProvider } from './contexts/SiteSettingsContext';
import { AppRoutes } from './routes/AppRoutes';

export default function App() {
  return (
    <SiteSettingsProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </SiteSettingsProvider>
  );
}
