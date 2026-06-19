import { motion } from 'framer-motion';
import SignupForm from '@/components/auth/SignupForm';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import SEO from '@/components/SEO';

export default function SignupPage() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/account" replace />;
  }

  return (
    <>
      <SEO title="Create Account | Vintage Rush" description="Join Vintage Rush. Create your account to track orders and save your wishlist." />
      <div style={{ minHeight: "100vh", background: "#080808", display: "flex" }}>
        
        {/* Left: Image panel (desktop only) */}
        <div style={{ flex: "0 0 45%", position: "relative", overflow: "hidden", display: "none" }} className="signup-image-panel">
          <img
            src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=900&h=1200&fit=crop&q=85"
            alt="Vintage Rush fashion"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent, rgba(8,8,8,0.5))" }} />
          <div style={{ position: "absolute", bottom: "48px", left: "48px" }}>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "32px", fontWeight: 300, color: "#f5f0eb", lineHeight: 1.2 }}>
              "Premium Streetwear<br />
              <span style={{ fontStyle: "italic", color: "#c9a96e" }}>Born in Surat."</span>
            </p>
          </div>
        </div>

        {/* Right: Form */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 40px" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: "100%" }}
          >
            <SignupForm />
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .signup-image-panel { display: block !important; }
        }
      `}</style>
    </>
  );
}
