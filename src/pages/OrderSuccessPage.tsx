import { useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ShoppingBag, MessageCircle, ListOrdered } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function OrderSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const state = location.state as { orderId: string; paymentMethod: string; status: string; waLink?: string } | null;
  const hasOpenedWA = useRef(false);

  useEffect(() => {
    if (!state?.orderId) {
      navigate('/shop');
      return;
    }

    if (state.waLink && !hasOpenedWA.current) {
      hasOpenedWA.current = true;
      window.open(state.waLink, '_blank');
    }
  }, [state, navigate]);

  if (!state) return null;

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-32 pb-16 flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto px-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-200"
        >
          <CheckCircle2 size={40} />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-poppins text-3xl sm:text-4xl font-bold text-[#1C1917] mb-2"
        >
          Thank You For Ordering From Vintage Rush
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-inter text-[#78716C] mb-8"
        >
          Your order has been successfully placed. We'll send you a confirmation email shortly.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-[#E8E2D9] rounded-lg p-6 mb-8 text-left"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-inter text-xs text-[#78716C] uppercase tracking-widest mb-1 font-bold">Order ID</p>
              <p className="font-mono text-sm text-[#1C1917] font-semibold">{state.orderId.split('-')[0].toUpperCase()}</p>
            </div>
            <div>
              <p className="font-inter text-xs text-[#78716C] uppercase tracking-widest mb-1 font-bold">Status</p>
              <p className="font-inter text-sm text-[#B8974E] font-semibold">{state.status}</p>
            </div>
            <div className="col-span-2">
              <p className="font-inter text-xs text-[#78716C] uppercase tracking-widest mb-1 font-bold">Payment Method</p>
              <p className="font-inter text-sm text-[#1C1917] font-semibold">
                {state.paymentMethod === 'COD' ? 'Cash on Delivery' : 'WhatsApp Payment'}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <Link
            to="/shop"
            className="btn-primary w-full flex items-center justify-center gap-2 px-6 py-4"
            style={{ textDecoration: "none" }}
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>
          
          <div className="flex gap-4">
            {user && (
              <Link
                to="/orders"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border border-[#C4B89F] text-[#1C1917] font-poppins text-sm font-semibold tracking-widest uppercase rounded-lg hover:border-[#1C1917] hover:bg-[#FAF8F5] transition-colors duration-300"
                style={{ textDecoration: "none" }}
              >
                <ListOrdered size={18} />
                View Orders
              </Link>
            )}
            <a
              href={state.waLink || "https://wa.me/919106485332"}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border border-[#C4B89F] text-[#1C1917] font-poppins text-sm font-semibold tracking-widest uppercase rounded-lg hover:border-green-600 hover:text-green-600 hover:bg-green-50 transition-colors duration-300"
              style={{ textDecoration: "none" }}
            >
              <MessageCircle size={18} />
              Contact On WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
