import { motion } from 'framer-motion';
import LoginForm from '@/components/auth/LoginForm';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { user } = useAuth();

  // If already logged in, redirect to account
  if (user) {
    return <Navigate to="/account" replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#111111] pt-24 lg:pt-32 pb-16 flex items-center justify-center"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <LoginForm />
        </motion.div>
      </div>
    </motion.div>
  );
}
