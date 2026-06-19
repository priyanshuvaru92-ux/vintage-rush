import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroLoaderProps {
  onComplete: () => void;
}

const textSteps = [
  "V",
  "VI",
  "VIN",
  "VINT",
  "VINTA",
  "VINTAG",
  "VINTAGE",
  "VINTAGE RUSH"
];

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [showTagline, setShowTagline] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if loader was already played in this browser session
    const hasPlayed = localStorage.getItem('vintage_rush_intro_played');
    if (hasPlayed) {
      onComplete();
      return;
    }

    // Step through the "V" to "VINTAGE RUSH" letters
    let intervalId: any;
    if (stepIndex < textSteps.length - 1) {
      intervalId = setTimeout(() => {
        setStepIndex(prev => prev + 1);
      }, 140);
    } else {
      // Once we reach "VINTAGE RUSH", show the tagline after a brief pause
      const taglineTimeout = setTimeout(() => {
        setShowTagline(true);
      }, 300);

      // Start the fade out sequence after showing the tagline
      const exitTimeout = setTimeout(() => {
        setIsExiting(true);
      }, 2000);

      // Mark as played and call completion handler
      const completeTimeout = setTimeout(() => {
        localStorage.setItem('vintage_rush_intro_played', 'true');
        onComplete();
      }, 2600);

      return () => {
        clearTimeout(taglineTimeout);
        clearTimeout(exitTimeout);
        clearTimeout(completeTimeout);
      };
    }

    return () => clearTimeout(intervalId);
  }, [stepIndex, onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#FAF8F5',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Subtle noise/grain overlay for a luxury tactile texture */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.035,
              pointerEvents: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          <div style={{ textAlign: 'center', zIndex: 1, padding: '24px' }}>
            {/* Main Title Animation */}
            <motion.h1
              key={stepIndex}
              initial={{ opacity: 0.8, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.05 }}
              style={{
                fontFamily: '"Cinzel", "Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: '#1C1917',
                margin: 0,
                textTransform: 'uppercase',
                height: '7.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {textSteps[stepIndex]}
            </motion.h1>

            {/* Tagline Reveal */}
            <div style={{ height: '32px', overflow: 'hidden', marginTop: '16px' }}>
              <AnimatePresence>
                {showTagline && (
                  <motion.p
                    initial={{ y: 25, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.215, 0.610, 0.355, 1] }}
                    style={{
                      fontFamily: '"DM Sans", "Inter", sans-serif',
                      fontSize: 'clamp(0.65rem, 2vw, 0.85rem)',
                      fontWeight: 600,
                      letterSpacing: '0.3em',
                      color: '#78716C',
                      margin: 0,
                      textTransform: 'uppercase',
                    }}
                  >
                    WEAR THE TREND. OWN THE RUSH.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
