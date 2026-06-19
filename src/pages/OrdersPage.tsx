import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Loader2, PackageX, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { orderService } from '@/services/orderService';
import OrderCard from '@/components/orders/OrderCard';
import SEO from '@/components/SEO';

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return;
      try {
        const data = await orderService.getUserOrders(user.id);
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [user]);

  return (
    <>
      <SEO title="My Orders | Vintage Rush" />
      <div className="min-h-screen bg-[#FAF8F5] pt-24 lg:pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 mb-8 font-inter text-sm text-[#78716C]"
          >
            <Link to="/account" className="hover:text-[#1C1917] transition-colors" style={{ textDecoration: "none", color: "inherit" }}>
              Account
            </Link>
            <ChevronRight size={14} />
            <span className="text-[#1C1917] font-semibold">Orders</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h1 className="font-poppins text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight">Order History</h1>
            <p className="mt-2 font-inter text-[#78716C]/60 text-sm">Track, manage, and view your past purchases.</p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 text-[#1C1917] animate-spin" />
            </div>
          ) : orders.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              {orders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-dashed border-[#C4B89F] rounded-lg p-12 text-center flex flex-col items-center justify-center"
            >
              <PackageX size={48} className="text-[#78716C]/40 mb-4" />
              <h3 className="font-poppins text-xl font-bold text-[#1C1917] mb-2">No orders found</h3>
              <p className="font-inter text-[#78716C] text-sm mb-6 max-w-sm">Looks like you haven't made any purchases yet. Start exploring our collection!</p>
              <Link 
                to="/shop"
                className="btn-primary"
                style={{ padding: "12px 32px", textDecoration: "none" }}
              >
                Start Shopping
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
