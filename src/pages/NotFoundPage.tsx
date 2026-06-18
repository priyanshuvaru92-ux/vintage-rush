import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';

export default function NotFoundPage() {
  return (
    <>
      <SEO title="Page Not Found | Vintage Rush" description="The page you are looking for does not exist." />
      <div className="min-h-[80vh] flex items-center justify-center bg-[#111111] px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="font-poppins text-9xl font-bold text-white/5 mb-4">404</h1>
          <h2 className="font-poppins text-2xl font-bold text-white mb-4 tracking-wide">Page Not Found</h2>
          <p className="font-inter text-white/50 mb-8 max-w-sm mx-auto">
            The streetwear piece you're looking for seems to have dropped off the grid.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-3 border-2 border-secondary text-secondary font-poppins text-sm font-semibold uppercase tracking-widest hover:bg-secondary hover:text-primary transition-colors duration-300"
          >
            Back To Home
          </Link>
        </motion.div>
      </div>
    </>
  );
}
