import { AuthProvider } from './contexts/AuthContext';
import { SiteSettingsProvider } from './contexts/SiteSettingsContext';
import { AppRoutes } from './routes/AppRoutes';
import { ToastProvider } from './contexts/ToastContext';

export default function App() {
  return (
    <SiteSettingsProvider>
      <AuthProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </SiteSettingsProvider>
  );
}
