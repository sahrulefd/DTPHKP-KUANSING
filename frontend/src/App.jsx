import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes';
import ErrorBoundary from './components/common/ErrorBoundary';
import './index.css';

/**
 * App — Root Component
 *
 * Struktur:
 * BrowserRouter → AuthProvider → ErrorBoundary → AppRoutes
 */
function App() {
  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  );
}

/**
 * AppWrapper — Wraps App dengan providers yang membutuhkan Router context.
 * AuthProvider membutuhkan useNavigate, jadi harus di dalam BrowserRouter.
 */
export default function AppWrapper() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
}

