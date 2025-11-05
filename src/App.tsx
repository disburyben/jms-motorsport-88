import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { NextEvent } from './components/NextEvent';
import { Store } from './components/Store';
import { About } from './components/About';
import { Drivers } from './components/Drivers';
import { Schedule } from './components/Schedule';
import { Sponsors } from './components/Sponsors';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Admin } from './components/Admin';
import { Loading } from './components/Loading';
import carImage1 from './assets/9af74f7de68473c678e8346a58b6dd170eb61358.png';
import carImage2 from './assets/5276abd9ae1edcabc7726464a9ac05adad7f2545.png';
import carImage3 from './assets/dd754015a12b9d3f5baacbade8e2d7a7852dd501.png';

export default function App() {
  const carImages = [carImage1, carImage2, carImage3];
  const [showAdmin, setShowAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check URL for admin access
  const urlParams = new URLSearchParams(window.location.search);
  const isAdmin = urlParams.get('admin') === 'true' || showAdmin;

  // Show loading screen
  if (isLoading) {
    return <Loading onComplete={() => setIsLoading(false)} />;
  }

  if (isAdmin) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen">
        <Admin />
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] overflow-x-hidden">
      <Navigation />
      <Hero heroImage={carImage1} />
      <NextEvent />
      <About carImages={carImages} />
      <Drivers />
      <Schedule />
      <Sponsors />
      <Store />
      <Contact />
      <Footer />
    </div>
  );
}
