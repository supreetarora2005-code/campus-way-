import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ExplorePage from '@/pages/ExplorePage';
import DirectoryPage from '@/pages/DirectoryPage';
import LocationDetailsPage from '@/pages/LocationDetailsPage';
import AboutPage from '@/pages/AboutPage';

export default function App() {
  return (
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
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
