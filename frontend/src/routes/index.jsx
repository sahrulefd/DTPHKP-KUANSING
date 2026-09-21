import { Routes, Route } from 'react-router-dom';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import MasyarakatLayout from '../layouts/MasyarakatLayout';
import AdminLayout from '../layouts/AdminLayout';

// Guards
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

// Public Pages
import HomePage from '../pages/public/HomePage';
import ServicesPage from '../pages/public/ServicesPage';
import ServiceDetailPage from '../pages/public/ServiceDetailPage';
import GuidePage from '../pages/public/GuidePage';
import FaqPage from '../pages/public/FaqPage';
import ContactPage from '../pages/public/ContactPage';
import SurveyPage from '../pages/public/SurveyPage';
import VerifyPage from '../pages/public/VerifyPage';

// Auth Pages
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';

// Masyarakat Pages
import MasyarakatDashboardPage from '../pages/masyarakat/DashboardPage';
import NewSubmissionPage from '../pages/masyarakat/NewSubmissionPage';
import SubmissionsPage from '../pages/masyarakat/SubmissionsPage';
import SubmissionDetailPage from '../pages/masyarakat/SubmissionDetailPage';
import ProfilePage from '../pages/masyarakat/ProfilePage';

// Admin Pages
import AdminDashboardPage from '../pages/admin/DashboardPage';
import AdminSubmissionsPage from '../pages/admin/SubmissionsPage';
import AdminSubmissionDetailPage from '../pages/admin/SubmissionDetailPage';
import AdminServicesPage from '../pages/admin/ServicesPage';
import ServiceFormPage from '../pages/admin/ServiceFormPage';
import AdminFaqsPage from '../pages/admin/FaqsPage';
import AdminGuidesPage from '../pages/admin/GuidesPage';
import AdminUsersPage from '../pages/admin/UsersPage';
import AdminReportsPage from '../pages/admin/ReportsPage';
import AdminSettingsPage from '../pages/admin/SettingsPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* 1. PUBLIC ROUTES */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/layanan" element={<ServicesPage />} />
        <Route path="/layanan/:slug" element={<ServiceDetailPage />} />
        <Route path="/panduan" element={<GuidePage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/kontak" element={<ContactPage />} />
        <Route path="/survei" element={<SurveyPage />} />
        <Route path="/verifikasi/:trackingNumber" element={<VerifyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* 2. MASYARAKAT PROTECTED ROUTES */}
      <Route
        element={
          <ProtectedRoute>
            <MasyarakatLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<MasyarakatDashboardPage />} />
        <Route path="/dashboard/pengajuan" element={<SubmissionsPage />} />
        <Route path="/dashboard/pengajuan/baru" element={<NewSubmissionPage />} />
        <Route path="/dashboard/pengajuan/:id" element={<SubmissionDetailPage />} />
        <Route path="/dashboard/profil" element={<ProfilePage />} />
      </Route>

      {/* 3. ADMIN PROTECTED ROUTES */}
      <Route
        element={
          <ProtectedRoute>
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/pengajuan" element={<AdminSubmissionsPage />} />
        <Route path="/admin/pengajuan/:id" element={<AdminSubmissionDetailPage />} />
        <Route path="/admin/layanan" element={<AdminServicesPage />} />
        <Route path="/admin/layanan/tambah" element={<ServiceFormPage />} />
        <Route path="/admin/layanan/edit/:id" element={<ServiceFormPage />} />
        <Route path="/admin/faq" element={<AdminFaqsPage />} />
        <Route path="/admin/panduan" element={<AdminGuidesPage />} />
        <Route path="/admin/pengguna" element={<AdminUsersPage />} />
        <Route path="/admin/laporan" element={<AdminReportsPage />} />
        <Route path="/admin/pengaturan" element={<AdminSettingsPage />} />
      </Route>

      {/* Fallback 404 */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-slate-100">
            <h1 className="text-6xl font-black text-slate-800">404</h1>
            <p className="text-slate-600 mt-2">Halaman tidak ditemukan.</p>
            <a href="/" className="mt-4 px-6 py-2.5 bg-primary-600 text-white font-bold rounded-xl">Kembali ke Beranda</a>
          </div>
        }
      />
    </Routes>
  );
}
