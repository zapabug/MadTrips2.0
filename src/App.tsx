import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/layout/Navigation';
import { Hero } from './components/home/Hero';
import { FeaturedPackages } from './components/packages/FeaturedPackages';
import { FunchalMap } from './components/home/FunchalMap';
import { CallToAction } from './components/home/CallToAction';
import { FloatingLoginButton } from './components/ui/FloatingLoginButton';
import { MapPage } from './pages/MapPage';
import { CommunityPage } from './pages/CommunityPage';
import { Footer } from './components/layout/Footer';
import PackagesPage from './pages/PackagesPage';
import { CustomPackagePage } from './pages/CustomPackagePage';
import { PackageDetailPage } from './pages/PackageDetailPage';
import './App.css';

// Component for the Home page layout
function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedPackages />
      <FunchalMap variant="home" />
      <CallToAction />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow pt-20 bg-gradient-to-b from-ocean to-forest">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/packages/custom" element={<CustomPackagePage />} />
            <Route path="/packages/:id" element={<PackageDetailPage />} />
          </Routes>
        </main>
        <FloatingLoginButton />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
