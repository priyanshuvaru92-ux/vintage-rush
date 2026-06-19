import { useState, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import IntroAnimation from '@/components/IntroAnimation';

const INTRO_KEY = 'vr_intro_seen';

export default function MainLayout() {
  const { pathname } = useLocation();
  const [showIntro, setShowIntro] = useState(() => {
    // Only show intro on home page and if not seen before
    return pathname === '/' && !localStorage.getItem(INTRO_KEY);
  });
  const [contentReady, setContentReady] = useState(!showIntro);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
    setContentReady(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      {contentReady && (
        <>
          <Navbar />
          <main>
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
