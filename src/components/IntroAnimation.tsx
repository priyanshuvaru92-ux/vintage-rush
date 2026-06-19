import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FRAMES = ['V', 'VI', 'VIN', 'VINT', 'VINTA', 'VINTAG', 'VINTAGE', 'VINTAGE RUSH'];
const INTRO_KEY = 'vr_intro_seen';

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Step through each frame
    const frameDuration = 220;
    const timers: ReturnType<typeof setTimeout>[] = [];

    FRAMES.forEach((_, i) => {
      timers.push(
        setTimeout(() => setFrameIndex(i), i * frameDuration)
      );
    });

    // After all frames, hold for 400ms then fade out
    const holdTimer = setTimeout(() => {
      setVisible(false);
    }, FRAMES.length * frameDuration + 400);

    timers.push(holdTimer);

    // Complete after exit animation
    const doneTimer = setTimeout(() => {
      localStorage.setItem(INTRO_KEY, '1');
      onComplete();
    }, FRAMES.length * frameDuration + 1100);

    timers.push(doneTimer);

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-[#FAF8F5] flex items-center justify-center"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-96 h-96 rounded-full bg-[#B8974E]/3 blur-[120px]" />
          </div>

          {/* Text */}
          <div className="relative text-center">
            <motion.p
              key={frameIndex}
              initial={{ opacity: 0.3, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.4em] text-[#1C1917] uppercase"
            >
              {FRAMES[frameIndex]}
            </motion.p>

            {/* Gold underline that grows on last frame */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: frameIndex === FRAMES.length - 1 ? 1 : 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="mt-4 mx-auto h-[1px] w-24 bg-[#B8974E] origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
