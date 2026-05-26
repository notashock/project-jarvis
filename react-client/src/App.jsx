import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Emails from './pages/Emails';
import EmailDetails from './pages/EmailDetails';
import Tasks from './pages/Tasks';
import AuthCallback from './pages/AuthCallback';

export default function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Auth callback — outside main layout */}
            <Route path="/accounts/callback" element={<AuthCallback />} />

            {/* Main app shell */}
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/emails" element={<Emails />} />
              <Route path="/emails/:id" element={<EmailDetails />} />
              <Route path="/tasks" element={<Tasks />} />
            </Route>

            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </NotificationProvider>
  );
}
