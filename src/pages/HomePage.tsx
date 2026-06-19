import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MoveRight } from 'lucide-react';
import SEO from '@/components/SEO';
import { useProducts } from '@/hooks/useProducts';
import IntroLoader from '@/components/home/IntroLoader';
import ParallaxCollage from '@/components/home/ParallaxCollage';

// Fallback high-fidelity streetwear products if database is empty
const fallbackProducts = [
  {
    id: 'fb-1',
    name: 'HEAVYWEIGHT OVERSIZED HOODIE',
    slug: 'heavyweight-oversized-hoodie',
    price: 2499,
    category: 'Hoodies',
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop&q=85'],
    featured: true
  },
  {
    id: 'fb-2',
    name: 'VINTAGE UTILITY CARGO PANTS',
    slug: 'vintage-utility-cargo-pants',
    price: 2999,
    category: 'Cargos',
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=1000&fit=crop&q=85'],
    best_seller: true
  },
  {
    id: 'fb-3',
    name: 'SURAT VINTAGE APPLIQUE TEE',
    slug: 'surat-vintage-applique-tee',
    price: 1499,
    category: 'T-Shirts',
    images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&h=1000&fit=crop&q=85'],
    featured: true
  },
  {
    id: 'fb-4',
    name: 'UTILITY STREETWEAR VEST',
    slug: 'utility-streetwear-vest',
    price: 2299,
    category: 'Vests',
    images: ['https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop&q=85'],
    best_seller: true
  }
];

export default function HomePage() {
  const [introComplete, setIntroComplete] = useState(false);
  const { products } = useProducts();
  const { scrollY } = useScroll();

  // Parallax transform value for background layers/images on scroll
  const storyImageY = useTransform(scrollY, [600, 1800], [-30, 30]);

  useEffect(() => {
    // Fast check if already played to bypass in state
    const hasPlayed = localStorage.getItem('vintage_rush_intro_played');
    if (hasPlayed) {
      setIntroComplete(true);
    }
  }, []);

  // Use loaded database products, filter them, or default to fallback list if empty
  const displayProducts = products.length > 0 
    ? products.slice(0, 4) 
    : fallbackProducts;

  return (
    <>
      <SEO 
        title="Vintage Rush | Premium Indian Streetwear" 
        description="Premium Indian streetwear born in Surat. Oversized fits, limited drops, premium fabrics. Wear the Trend. Own the Rush."
      />

      {/* 1. Cinematic Intro Loader */}
      {!introComplete && <IntroLoader onComplete={() => setIntroComplete(true)} />}

      {/* Main Content (faded in when intro completes or if skipped) */}
      <div style={{ opacity: introComplete ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        
        {/* Subtle overall background grain texture */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            opacity: 0.02,
            pointerEvents: 'none',
            zIndex: 99,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* 2. Premium Hero Section */}
        <section style={{
          minHeight: '100vh',
          background: '#FAF8F5',
          display: 'flex',
          alignItems: 'center',
          paddingTop: '100px',
          paddingBottom: '60px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-100" style={{ width: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '32px', alignItems: 'center' }} className="hero-grid">
              
              {/* Hero Left Column (Editorial Type) */}
              <div style={{ gridColumn: 'span 5' }} className="hero-left">
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  animate={introComplete ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
                >
                  <h1 style={{
                    fontFamily: '"Cinzel", "Cormorant Garamond", serif',
                    fontSize: 'clamp(3rem, 7.5vw, 6rem)',
                    fontWeight: 700,
                    lineHeight: 0.9,
                    color: '#1C1917',
                    letterSpacing: '-0.02em',
                    margin: 0,
                  }}>
                    VINTAGE<br />
                    <span style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 400 }}>RUSH</span>
                  </h1>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={introComplete ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.4 }}
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                    fontWeight: 400,
                    color: '#78716C',
                    marginTop: '24px',
                    letterSpacing: '0.04em',
                    lineHeight: 1.5
                  }}
                >
                  Wear the Trend.<br />
                  <span style={{ color: '#1C1917', fontWeight: 600 }}>Own the Rush.</span>
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={introComplete ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.6 }}
                  style={{ display: 'flex', gap: '16px', marginTop: '40px' }}
                >
                  <Link to="/shop" style={{ textDecoration: 'none' }}>
                    <motion.button
                      whileHover={{ scale: 1.02, backgroundColor: '#FAF8F5', color: '#1C1917', border: '1px solid #1C1917' }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        padding: '16px 32px',
                        background: '#1C1917',
                        color: '#FAF8F5',
                        border: '1px solid #1C1917',
                        fontFamily: '"DM Sans", sans-serif',
                        fontSize: '12px',
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    >
                      Shop Collection
                    </motion.button>
                  </Link>

                  <a href="#brand-story" style={{ textDecoration: 'none' }}>
                    <motion.button
                      whileHover={{ scale: 1.02, borderColor: '#1C1917', color: '#1C1917' }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        padding: '16px 32px',
                        background: 'transparent',
                        color: '#78716C',
                        border: '1px solid #E8E2D9',
                        fontFamily: '"DM Sans", sans-serif',
                        fontSize: '12px',
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    >
                      Explore Story
                    </motion.button>
                  </a>
                </motion.div>
              </div>

              {/* Hero Right Column (Floating Collage) */}
              <div style={{ gridColumn: 'span 7' }} className="hero-right">
                <ParallaxCollage />
              </div>

            </div>
          </div>
        </section>

        {/* 3. Marquee Section */}
        <section style={{
          background: '#1C1917',
          padding: '24px 0',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10
        }}>
          <div className="marquee-container" style={{ display: 'flex', whiteSpace: 'nowrap', width: '200%' }}>
            <div className="marquee-content" style={{
              display: 'flex',
              gap: '60px',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.25em',
              color: '#FAF8F5',
              textTransform: 'uppercase',
              animation: 'marquee-scroll 25s linear infinite',
              whiteSpace: 'nowrap'
            }}>
              <span>PREMIUM STREETWEAR</span>
              <span>•</span>
              <span>LIMITED DROPS</span>
              <span>•</span>
              <span>OVERSIZED FITS</span>
              <span>•</span>
              <span>VINTAGE RUSH</span>
              <span>•</span>
              <span>MODERN ESSENTIALS</span>
              <span>•</span>
              {/* Repeat for seamless transition */}
              <span>PREMIUM STREETWEAR</span>
              <span>•</span>
              <span>LIMITED DROPS</span>
              <span>•</span>
              <span>OVERSIZED FITS</span>
              <span>•</span>
              <span>VINTAGE RUSH</span>
              <span>•</span>
              <span>MODERN ESSENTIALS</span>
            </div>
          </div>
        </section>

        {/* 4. Featured Collection (Magazine Style Asymmetric Layout) */}
        <section style={{ padding: '120px 0', background: '#FAF8F5' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px' }}>
              <div>
                <span style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.25em',
                  color: '#78716C',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '12px'
                }}>
                  // Curated Drops
                </span>
                <h2 style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  fontWeight: 400,
                  color: '#1C1917',
                  margin: 0,
                  lineHeight: 1
                }}>
                  Featured Collection
                </h2>
              </div>
              
              <Link to="/shop" style={{ textDecoration: 'none' }}>
                <motion.span
                  whileHover={{ x: 6 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#1C1917',
                    cursor: 'pointer'
                  }}
                >
                  View Catalog <MoveRight size={16} />
                </motion.span>
              </Link>
            </div>

            {/* Asymmetric Assembled Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '40px' }} className="collection-grid">
              
              {displayProducts.map((product, idx) => {
                // Design asymmetric grid placement: 
                // Card 0: Large (left, 7 cols)
                // Card 1: Small offset (right, 5 cols)
                // Card 2: Small offset (left, 5 cols)
                // Card 3: Large (right, 7 cols)
                const gridColumn = idx === 0 || idx === 3 ? 'span 7' : 'span 5';
                const aspectRatio = idx === 0 || idx === 3 ? '16/10' : '3/4';
                
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: idx * 0.1 }}
                    style={{ gridColumn }}
                    className="collection-item"
                  >
                    <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                      <div style={{
                        position: 'relative',
                        aspectRatio,
                        overflow: 'hidden',
                        borderRadius: '4px',
                        background: '#E8E2D9',
                        border: '1px solid #E8E2D9',
                        boxShadow: '0 10px 30px rgba(28,25,23,0.02)'
                      }} className="collection-img-frame">
                        <motion.img
                          src={product.images[0]}
                          alt={product.name}
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        {/* Elegant floating metadata overlay on image */}
                        <div style={{
                          position: 'absolute',
                          bottom: '24px',
                          left: '24px',
                          background: 'rgba(250, 248, 245, 0.9)',
                          backdropFilter: 'blur(8px)',
                          padding: '12px 20px',
                          borderRadius: '2px',
                          border: '1px solid #E8E2D9'
                        }}>
                          <span style={{
                            fontFamily: '"DM Sans", sans-serif',
                            fontSize: '9px',
                            fontWeight: 700,
                            letterSpacing: '0.15em',
                            color: '#1C1917',
                            textTransform: 'uppercase'
                          }}>
                            {product.category}
                          </span>
                        </div>
                      </div>
                      
                      {/* Asymmetric Product Details */}
                      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <h3 style={{
                            fontFamily: '"DM Sans", sans-serif',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#1C1917',
                            margin: 0,
                            letterSpacing: '0.05em'
                          }}>
                            {product.name}
                          </h3>
                          <p style={{
                            fontFamily: '"Cormorant Garamond", Georgia, serif',
                            fontSize: '18px',
                            fontWeight: 600,
                            color: '#78716C',
                            margin: '4px 0 0 0'
                          }}>
                            ₹{product.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          border: '1px solid #1C1917',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#1C1917'
                        }} className="arrow-circle">
                          <MoveRight size={14} />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}

            </div>
          </div>
        </section>

        {/* 5. Brand Story Section */}
        <section id="brand-story" style={{ padding: '140px 0', background: '#FAF8F5', borderTop: '1px solid #E8E2D9', overflow: 'hidden' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '48px', alignItems: 'center' }} className="brand-story-grid">
              
              {/* Brand Story Left Image with Scroll Parallax */}
              <div style={{ gridColumn: 'span 6', position: 'relative' }} className="brand-story-col">
                <div style={{ overflow: 'hidden', borderRadius: '4px', height: '580px', border: '1px solid #E8E2D9' }}>
                  <motion.img
                    src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&h=1100&fit=crop&q=85"
                    alt="Vintage Rush craft"
                    style={{
                      width: '100%',
                      height: '115%',
                      y: storyImageY,
                      objectFit: 'cover'
                    }}
                  />
                </div>
                {/* Accent mini stamp card overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: '-28px',
                  right: '28px',
                  background: '#FFFFFF',
                  border: '1px solid #E8E2D9',
                  padding: '24px',
                  width: '160px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.04)'
                }}>
                  <Sparkles size={20} style={{ color: '#1C1917', marginBottom: '12px' }} />
                  <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '0.15em', color: '#1C1917', margin: 0, textTransform: 'uppercase' }}>
                    100% PREMIUM COTTON DROP
                  </p>
                </div>
              </div>

              {/* Brand Story Right Text */}
              <div style={{ gridColumn: 'span 6', paddingLeft: '40px' }} className="brand-story-col">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                >
                  <span style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.25em',
                    color: '#78716C',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '20px'
                  }}>
                    // Our Identity
                  </span>
                  
                  <h3 style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    fontWeight: 400,
                    lineHeight: 1.1,
                    color: '#1C1917',
                    margin: '0 0 32px 0'
                  }}>
                    Built for those who refuse ordinary.
                  </h3>
                  
                  <p style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '15px',
                    color: '#78716C',
                    lineHeight: 1.8,
                    marginBottom: '24px'
                  }}>
                    Vintage Rush is an independent label founded in Surat. We blend nostalgic streetwear elements with high-grade, heavyweight fabrics to curate drops that last lifetimes.
                  </p>
                  
                  <p style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '15px',
                    color: '#78716C',
                    lineHeight: 1.8,
                    marginBottom: '40px'
                  }}>
                    Every garment tells a story of subversion, precision, and craftsmanship. We don't release collections—we drop statements.
                  </p>

                  <Link to="/about" style={{ textDecoration: 'none' }}>
                    <motion.button
                      whileHover={{ scale: 1.02, color: '#1C1917', borderColor: '#1C1917' }}
                      style={{
                        padding: '14px 28px',
                        background: 'transparent',
                        color: '#78716C',
                        border: '1px solid #E8E2D9',
                        fontFamily: '"DM Sans", sans-serif',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                    >
                      Read Full Manifesto
                    </motion.button>
                  </Link>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* 6. Signature Section (Animated Border Collection Cards) */}
        <section style={{ padding: '120px 0', background: '#FAF8F5', borderTop: '1px solid #E8E2D9' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
              <span style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.25em',
                color: '#78716C',
                textTransform: 'uppercase'
              }}>
                // Signature Lines
              </span>
              <h2 style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                fontWeight: 400,
                color: '#1C1917',
                margin: '12px 0 0 0'
              }}>
                Explore Segments
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }} className="signature-grid">
              
              {[
                {
                  title: 'Oversized Tees',
                  desc: 'Heavy 240+ GSM crafted boxy tees featuring unique drops and graphics.',
                  link: '/shop?category=T-Shirts',
                  image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700&h=900&fit=crop&q=85'
                },
                {
                  title: 'Utility Cargos',
                  desc: 'Engineered for structure, utility pocket arrangements, and tailored fits.',
                  link: '/shop?category=Cargos',
                  image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=700&h=900&fit=crop&q=85'
                },
                {
                  title: 'Modern Essentials',
                  desc: 'Premium fleece hoodies, sweats, and layering items for high street comfort.',
                  link: '/shop?category=Hoodies',
                  image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=700&h=900&fit=crop&q=85'
                }
              ].map((segment, idx) => (
                <motion.div
                  key={segment.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: idx * 0.15 }}
                  className="signature-card"
                  style={{
                    position: 'relative',
                    background: '#FFFFFF',
                    borderRadius: '4px',
                    border: '1px solid #E8E2D9',
                    padding: '24px',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '380px',
                    boxShadow: '0 10px 30px rgba(28,25,23,0.02)',
                    transition: 'transform 0.4s ease'
                  }}
                  whileHover={{ y: -8 }}
                >
                  {/* Decorative slide-in image background on hover */}
                  <div className="hover-bg-img" style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0,
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    zIndex: 0,
                  }}>
                    <img src={segment.image} alt={segment.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(28, 25, 23, 0.85)' }} />
                  </div>

                  <div style={{ zIndex: 1 }} className="card-content-block">
                    <span style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#B8974E',
                      letterSpacing: '0.15em',
                      display: 'block',
                      marginBottom: '16px'
                    }}>
                      0{idx + 1} // SEGMENT
                    </span>
                    <h3 style={{
                      fontFamily: '"Cinzel", "Cormorant Garamond", serif',
                      fontSize: '24px',
                      fontWeight: 700,
                      color: '#1C1917',
                      margin: 0,
                      letterSpacing: '0.05em',
                      transition: 'color 0.4s'
                    }} className="title-text">
                      {segment.title}
                    </h3>
                    <p style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '13px',
                      color: '#78716C',
                      lineHeight: 1.6,
                      marginTop: '16px',
                      transition: 'color 0.4s'
                    }} className="desc-text">
                      {segment.desc}
                    </p>
                  </div>

                  <div style={{ zIndex: 1 }} className="card-link-block">
                    <Link to={segment.link} style={{ textDecoration: 'none' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontFamily: '"DM Sans", sans-serif',
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#1C1917',
                        transition: 'color 0.4s'
                      }} className="btn-text">
                        Shop Segment <ArrowRight size={13} />
                      </span>
                    </Link>
                  </div>
                </motion.div>
              ))}

            </div>
          </div>
        </section>

        {/* 7. Quote Section */}
        <section style={{ padding: '120px 0', background: '#F5F1EB', position: 'relative' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '48px',
                fontStyle: 'italic',
                color: '#B8974E',
                display: 'block',
                lineHeight: 1,
                marginBottom: '16px'
              }}>
                “
              </span>
              <blockquote style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                fontWeight: 300,
                color: '#1C1917',
                lineHeight: 1.3,
                margin: 0,
                letterSpacing: '0.02em'
              }}>
                Fashion fades. Identity remains.
              </blockquote>
              <div style={{ width: '40px', height: '1px', background: '#C4B89F', margin: '32px auto 0' }} />
              <cite style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#78716C',
                display: 'block',
                marginTop: '16px',
                fontStyle: 'normal'
              }}>
                VINTAGE RUSH MANIFESTO
              </cite>
            </motion.div>
          </div>
        </section>

        {/* 8. Newsletter Section */}
        <section style={{ padding: '100px 0', background: '#FAF8F5' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E8E2D9',
                padding: '56px 40px',
                borderRadius: '4px',
                textAlign: 'center',
                boxShadow: '0 20px 40px rgba(28,25,23,0.02)'
              }}
            >
              <span style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: '#B8974E',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '16px'
              }}>
                // Newsletter
              </span>
              <h2 style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '32px',
                fontWeight: 400,
                color: '#1C1917',
                margin: 0
              }}>
                Join the Subculture
              </h2>
              <p style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '13px',
                color: '#78716C',
                marginTop: '12px',
                lineHeight: 1.6
              }}>
                Subscribe to get access to early drops, exclusive previews, and member-only pricing campaigns.
              </p>

              <form onSubmit={e => e.preventDefault()} style={{
                display: 'flex',
                gap: '12px',
                marginTop: '32px',
                width: '100%',
                maxWidth: '480px',
                marginRight: 'auto',
                marginLeft: 'auto'
              }} className="newsletter-form">
                <input
                  type="email"
                  placeholder="ENTER YOUR EMAIL"
                  required
                  style={{
                    flex: 1,
                    padding: '14px 20px',
                    background: '#FAF8F5',
                    border: '1px solid #E8E2D9',
                    color: '#1C1917',
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    outline: 'none',
                    borderRadius: '2px',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = '#1C1917'}
                  onBlur={e => e.currentTarget.style.borderColor = '#E8E2D9'}
                />
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: '#FAF8F5', color: '#1C1917', border: '1px solid #1C1917' }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  style={{
                    padding: '14px 28px',
                    background: '#1C1917',
                    color: '#FAF8F5',
                    border: '1px solid #1C1917',
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    borderRadius: '2px',
                    transition: 'all 0.3s'
                  }}
                >
                  Join
                </motion.button>
              </form>
            </motion.div>
          </div>
        </section>

      </div>

      {/* Global CSS for marquee scrolling, asymmetric layout responsiveness, and card overlays */}
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .hero-grid {
          display: grid !important;
        }

        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-left {
            grid-column: span 12 !important;
            padding-bottom: 40px;
          }
          .hero-right {
            grid-column: span 12 !important;
          }
          .hero-left div {
            justify-content: center !important;
          }
        }

        @media (max-width: 900px) {
          .collection-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .collection-item {
            grid-column: span 12 !important;
          }
          .collection-img-frame {
            aspect-ratio: 4/3 !important;
          }
        }

        @media (max-width: 768px) {
          .brand-story-grid {
            grid-template-columns: 1fr !important;
          }
          .brand-story-col {
            grid-column: span 12 !important;
            padding-left: 0 !important;
          }
          .signature-grid {
            grid-template-columns: 1fr !important;
          }
          .newsletter-form {
            flex-direction: column !important;
            gap: 16px !important;
          }
        }

        .signature-card:hover .hover-bg-img {
          opacity: 1 !important;
          transform: scale(1.03) !important;
        }
        
        .signature-card:hover .title-text {
          color: #FAF8F5 !important;
        }
        
        .signature-card:hover .desc-text {
          color: #FAF8F5 !important;
          opacity: 0.8 !important;
        }

        .signature-card:hover .btn-text {
          color: #B8974E !important;
        }
      `}</style>
    </>
  );
}
