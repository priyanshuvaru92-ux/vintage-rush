import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleLoginButton from './GoogleLoginButton';

export default function SignupForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Automatic login usually happens if email confirmation is off.
      navigate('/account');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h2 className="font-poppins text-3xl font-bold text-white tracking-tight">Join the Rush</h2>
        <p className="mt-2 text-white/50 font-inter text-sm">Create an account to track orders and save your wishlist.</p>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg font-inter">
            {error}
          </div>
        )}
        <div className="space-y-1">
          <label className="text-xs font-inter uppercase tracking-widest text-white/50 ml-1">Full Name</label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white font-inter focus:outline-none focus:border-secondary/50 transition-colors duration-300"
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-inter uppercase tracking-widest text-white/50 ml-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white font-inter focus:outline-none focus:border-secondary/50 transition-colors duration-300"
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-inter uppercase tracking-widest text-white/50 ml-1">Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white font-inter focus:outline-none focus:border-secondary/50 transition-colors duration-300"
            placeholder="••••••••"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-secondary text-primary font-poppins text-sm font-semibold tracking-widest uppercase rounded-xl hover:bg-white transition-colors duration-300 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
        </motion.button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-widest font-inter">
          <span className="bg-[#111111] px-4 text-white/30">Or sign up with</span>
        </div>
      </div>

      <GoogleLoginButton label="Sign up with Google" />

      <p className="text-center font-inter text-sm text-white/50">
        Already have an account?{' '}
        <Link to="/login" className="text-secondary hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}
