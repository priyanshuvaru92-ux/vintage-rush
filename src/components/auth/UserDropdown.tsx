import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { User as UserIcon, Heart, LogOut, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UserDropdown() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) {
    return (
      <Link to="/login" className="hidden sm:block text-white/70 hover:text-secondary font-inter text-sm uppercase tracking-wide transition-colors">
        Login
      </Link>
    );
  }

  // Get initials or fallback
  const initials = user.email ? user.email.substring(0, 2).toUpperCase() : 'U';

  return (
    <div className="relative" ref={ref}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white/70 hover:text-secondary transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center font-poppins font-bold text-xs">
          {initials}
        </div>
        <ChevronDown size={14} className={`transition-transform duration-200 hidden sm:block ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-56 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50"
          >
            <div className="px-4 py-3 border-b border-white/10 bg-white/5">
              <p className="font-poppins text-sm text-white truncate">
                {user.user_metadata?.full_name || 'User'}
              </p>
              <p className="font-inter text-xs text-white/50 truncate mt-0.5">
                {user.email}
              </p>
            </div>
            <div className="p-2">
              <Link
                to="/account"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-inter text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <UserIcon size={16} />
                My Account
              </Link>
              <Link
                to="/account" // Placeholder, might have a dedicated wishlist page later
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-inter text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <Heart size={16} />
                Wishlist
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-inter text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
