import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function ParallaxCollage() {
  // Motion values for smooth hardware-accelerated mouse follow movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for extra buttery smoothness
  const springX = useSpring(mouseX, { stiffness: 50, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 15 });

  // Transform layers at different depths for actual parallax separation
  const mainTranslateX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const mainTranslateY = useTransform(springY, [-0.5, 0.5], [-12, 12]);

  const layerOneTranslateX = useTransform(springX, [-0.5, 0.5], [20, -20]);
  const layerOneTranslateY = useTransform(springY, [-0.5, 0.5], [20, -20]);

  const layerTwoTranslateX = useTransform(springX, [-0.5, 0.5], [-35, 35]);
  const layerTwoTranslateY = useTransform(springY, [-0.5, 0.5], [-35, 35]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get mouse coordinates normalized between -0.5 and 0.5 relative to center of screen
      const normalizedX = (e.clientX / window.innerWidth) - 0.5;
      const normalizedY = (e.clientY / window.innerHeight) - 0.5;
      
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: 'clamp(450px, 60vw, 650px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      overflow: 'visible'
    }}>
      {/* 1. Main Background Card */}
      <motion.div
        style={{
          x: mainTranslateX,
          y: mainTranslateY,
          width: '55%',
          height: '75%',
          position: 'absolute',
          left: '10%',
          top: '12%',
          zIndex: 1,
          overflow: 'hidden',
          borderRadius: '8px',
          boxShadow: '0 20px 40px rgba(28,25,23,0.06)',
          border: '1px solid #E8E2D9',
        }}
      >
        <motion.img
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop&q=85"
          alt="Vintage Rush styling"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top'
          }}
        />
      </motion.div>

      {/* 2. Top-Right Floating Card (Foreground Layer 1) */}
      <motion.div
        style={{
          x: layerOneTranslateX,
          y: layerOneTranslateY,
          width: '45%',
          height: '60%',
          position: 'absolute',
          right: '5%',
          top: '5%',
          zIndex: 2,
          overflow: 'hidden',
          borderRadius: '8px',
          boxShadow: '0 30px 60px rgba(28,25,23,0.12)',
          border: '1px solid #E8E2D9',
        }}
      >
        <motion.img
          src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=700&h=900&fit=crop&q=85"
          alt="Premium streetwear"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </motion.div>

      {/* 3. Bottom-Left Small Detail Card (Deep Foreground Layer 2) */}
      <motion.div
        style={{
          x: layerTwoTranslateX,
          y: layerTwoTranslateY,
          width: '35%',
          height: '42%',
          position: 'absolute',
          left: '25%',
          bottom: '2%',
          zIndex: 3,
          overflow: 'hidden',
          borderRadius: '8px',
          boxShadow: '0 25px 50px rgba(28,25,23,0.15)',
          border: '4px solid #FAF8F5', // luxury picture border look
        }}
      >
        <motion.img
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop&q=85"
          alt="Streetwear details"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </motion.div>

      {/* 4. Elegant Text Label Overlay */}
      <div style={{
        position: 'absolute',
        right: '48px',
        bottom: '48px',
        zIndex: 4,
        fontFamily: '"DM Sans", sans-serif',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.2em',
        color: '#1C1917',
        textTransform: 'uppercase',
        opacity: 0.8
      }}>
        SURAT // IN
      </div>
    </div>
  );
}
