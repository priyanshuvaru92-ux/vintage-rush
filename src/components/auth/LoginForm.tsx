import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleLoginButton from './GoogleLoginButton';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/account');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0 0 12px 0",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid #C4B89F",
    color: "#1C1917",
    fontFamily: '"DM Sans", sans-serif',
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.3s",
  };

  return (
    <div style={{ width: "100%", maxWidth: "420px", margin: "0 auto" }}>
      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: "28px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#1C1917" }}>
            VINTAGE RUSH
          </span>
        </Link>
      </div>

      <div style={{ marginBottom: "36px" }}>
        <h1 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: "42px", fontWeight: 400, color: "#1C1917", marginBottom: "8px", lineHeight: 1 }}>
          Welcome Back
        </h1>
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "#78716C" }}>
          Sign in to your account to continue.
        </p>
      </div>

      <form onSubmit={handleLogin}>
        {error && (
          <div style={{ padding: "12px 16px", marginBottom: "24px", background: "#FEE2E2", border: "1px solid #FCA5A5", fontFamily: '"DM Sans", sans-serif', fontSize: "13px", color: "#DC2626", borderRadius: "4px" }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: "32px" }}>
          <label style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#78716C", display: "block", marginBottom: "12px" }}>
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            placeholder="you@example.com"
            onFocus={e => (e.target.style.borderBottomColor = "#1C1917")}
            onBlur={e => (e.target.style.borderBottomColor = "#C4B89F")}
          />
        </div>

        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <label style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#78716C" }}>
              Password
            </label>
            <a href="#" style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "12px", color: "#B8974E", textDecoration: "none", fontWeight: 600 }}>
              Forgot password?
            </a>
          </div>
          <div style={{ position: "relative" }}>
            <input
              type={showPass ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ ...inputStyle, paddingRight: "40px" }}
              placeholder="••••••••"
              onFocus={e => (e.target.style.borderBottomColor = "#1C1917")}
              onBlur={e => (e.target.style.borderBottomColor = "#C4B89F")}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              style={{ position: "absolute", right: 0, top: "0", background: "none", border: "none", cursor: "pointer", color: "#78716C", padding: "4px" }}
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="btn-primary"
          style={{ width: "100%", marginBottom: "24px", justifyContent: "center" }}
        >
          {loading ? <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> : 'Sign In'}
        </motion.button>
      </form>

      <div style={{ position: "relative", textAlign: "center", marginBottom: "24px" }}>
        <div style={{ position: "absolute", inset: "50% 0 0", borderTop: "1px solid #E8E2D9" }} />
        <span style={{ position: "relative", display: "inline-block", padding: "0 16px", background: "#FAF8F5", fontFamily: '"DM Sans", sans-serif', fontSize: "11px", color: "#78716C", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          or
        </span>
      </div>

      <GoogleLoginButton />

      <p style={{ textAlign: "center", fontFamily: '"DM Sans", sans-serif', fontSize: "13px", color: "#78716C", marginTop: "32px" }}>
        Don't have an account?{' '}
        <Link to="/signup" style={{ color: "#1C1917", textDecoration: "none", fontWeight: 600 }}>
          Sign up
        </Link>
      </p>
    </div>
  );
}
