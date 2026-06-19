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
    borderBottom: "1px solid rgba(255,255,255,0.12)",
    color: "#f5f0eb",
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
          <span style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: "28px", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#f5f0eb" }}>
            VINTAGE RUSH
          </span>
        </Link>
      </div>

      <div style={{ marginBottom: "36px" }}>
        <h1 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: "42px", fontWeight: 400, color: "#f5f0eb", marginBottom: "8px", lineHeight: 1 }}>
          Welcome Back
        </h1>
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "rgba(245,240,235,0.45)" }}>
          Sign in to your account to continue.
        </p>
      </div>

      <form onSubmit={handleLogin}>
        {error && (
          <div style={{ padding: "12px 16px", marginBottom: "24px", background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", fontFamily: '"DM Sans", sans-serif', fontSize: "13px", color: "#f87171" }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: "32px" }}>
          <label style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "10px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,240,235,0.4)", display: "block", marginBottom: "12px" }}>
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            placeholder="you@example.com"
            onFocus={e => (e.target.style.borderBottomColor = "#c9a96e")}
            onBlur={e => (e.target.style.borderBottomColor = "rgba(255,255,255,0.12)")}
          />
        </div>

        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <label style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "10px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,240,235,0.4)" }}>
              Password
            </label>
            <a href="#" style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "12px", color: "#c9a96e", textDecoration: "none" }}>
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
              onFocus={e => (e.target.style.borderBottomColor = "#c9a96e")}
              onBlur={e => (e.target.style.borderBottomColor = "rgba(255,255,255,0.12)")}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              style={{ position: "absolute", right: 0, top: "0", background: "none", border: "none", cursor: "pointer", color: "rgba(245,240,235,0.4)", padding: "4px" }}
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
        <div style={{ position: "absolute", inset: "50% 0 0", borderTop: "1px solid rgba(255,255,255,0.08)" }} />
        <span style={{ position: "relative", display: "inline-block", padding: "0 16px", background: "#080808", fontFamily: '"DM Sans", sans-serif', fontSize: "11px", color: "rgba(245,240,235,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          or
        </span>
      </div>

      <GoogleLoginButton />

      <p style={{ textAlign: "center", fontFamily: '"DM Sans", sans-serif', fontSize: "13px", color: "rgba(245,240,235,0.4)", marginTop: "32px" }}>
        Don't have an account?{' '}
        <Link to="/signup" style={{ color: "#e8dfd0", textDecoration: "none", fontWeight: 600 }}>
          Sign up
        </Link>
      </p>
    </div>
  );
}
