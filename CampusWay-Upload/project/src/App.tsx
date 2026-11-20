import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ExplorePage from '@/pages/ExplorePage';
import DirectoryPage from '@/pages/DirectoryPage';
import LocationDetailsPage from '@/pages/LocationDetailsPage';
import AboutPage from '@/pages/AboutPage';
import { AuthProvider } from '@/auth/AuthContext';
import LoginPage from '@/auth/LoginPage';
import SignupPage from '@/auth/SignupPage';
import ForgotPasswordPage from '@/auth/ForgotPasswordPage';
import ResetPasswordPage from '@/auth/ResetPasswordPage';
import ProfilePage from '@/auth/ProfilePage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/directory" element={<DirectoryPage />} />
              <Route path="/location/:id" element={<LocationDetailsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
