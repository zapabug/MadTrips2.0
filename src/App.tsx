import { Navigation } from './components/layout/Navigation';
import { Hero } from './components/home/Hero';
import { FeaturedPackages } from './components/packages/FeaturedPackages';
import { CallToAction } from './components/home/CallToAction';
import { FloatingLoginButton } from './components/ui/FloatingLoginButton';
import './App.css';

function App() {
  return (
    <div className="bg-gradient-to-b from-ocean to-forest min-h-screen">
      <Navigation />
      <main className="pt-20">
        <Hero />
        <FeaturedPackages />
        <CallToAction />
      </main>
      <FloatingLoginButton />
    </div>
  );
}

export default App;
