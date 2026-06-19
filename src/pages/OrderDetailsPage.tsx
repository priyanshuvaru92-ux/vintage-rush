import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, ChevronRight, MapPin, CreditCard, User } from 'lucide-react';
import { orderService } from '@/services/orderService';
import StatusBadge from '@/components/orders/StatusBadge';
import OrderTimeline from '@/components/orders/OrderTimeline';
import SEO from '@/components/SEO';

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      if (!id) return;
      try {
        const data = await orderService.getOrderDetails(id);
        setOrder(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#1C1917] animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] pt-32 pb-16 flex flex-col items-center justify-center">
        <h1 className="font-poppins text-2xl font-bold text-[#1C1917] mb-4">Order Not Found</h1>
        <Link to="/orders" className="text-[#B8974E] hover:underline font-inter font-semibold">Back to Orders</Link>
      </div>
    );
  }

  const date = new Date(order.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <>
      <SEO title={`Order #${order.id.split('-')[0].toUpperCase()} | Vintage Rush`} />
      <div className="min-h-screen bg-[#FAF8F5] pt-24 lg:pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 mb-8 font-inter text-sm text-[#78716C]"
          >
            <Link to="/account" className="hover:text-[#1C1917] transition-colors" style={{ textDecoration: "none", color: "inherit" }}>Account</Link>
            <ChevronRight size={14} />
            <Link to="/orders" className="hover:text-[#1C1917] transition-colors" style={{ textDecoration: "none", color: "inherit" }}>Orders</Link>
            <ChevronRight size={14} />
            <span className="text-[#1C1917] font-semibold">#{order.id.split('-')[0].toUpperCase()}</span>
          </motion.nav>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h1 className="font-poppins text-3xl font-bold text-[#1C1917] tracking-tight flex items-center gap-4">
                Order #{order.id.split('-')[0].toUpperCase()}
              </h1>
              <p className="font-inter text-[#78716C]/60 text-sm mt-2 font-semibold">Placed on {date}</p>
            </div>
            <StatusBadge status={order.status} />
          </div>

          {/* Timeline */}
          <div className="bg-white border border-[#E8E2D9] rounded-lg p-6 sm:p-10 mb-8 overflow-x-auto">
            <div className="min-w-[500px]">
               <OrderTimeline currentStatus={order.status} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Items */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="font-poppins text-xl font-semibold text-[#1C1917]">Order Items</h2>
              <div className="bg-white border border-[#E8E2D9] rounded-lg p-2">
                {order.order_items.map((item: any, index: number) => (
                  <div key={item.id} className={`flex gap-4 p-4 ${index !== order.order_items.length - 1 ? 'border-b border-[#E8E2D9]' : ''}`}>
                    <div className="w-20 h-24 bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.product?.images?.[0]} alt={item.product?.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-poppins font-semibold text-[#1C1917]">{item.product?.name || 'Unknown Product'}</h4>
                      <p className="font-inter text-xs text-[#78716C] mt-1 font-semibold">Size: {item.size} | Qty: {item.quantity}</p>
                      <p className="font-inter text-sm font-semibold text-[#1C1917] mt-3">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Info */}
            <div className="space-y-6">
              
              {/* Customer Info */}
              <div className="bg-white border border-[#E8E2D9] rounded-lg p-6">
                <h3 className="font-poppins text-lg font-semibold text-[#1C1917] mb-4 flex items-center gap-2">
                  <User size={18} className="text-[#B8974E]" /> Customer Info
                </h3>
                <div className="space-y-2 font-inter text-sm text-[#78716C]">
                  <p className="text-[#1C1917] font-semibold">{order.customer_name}</p>
                  <p>{order.email}</p>
                  <p>{order.phone}</p>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="bg-white border border-[#E8E2D9] rounded-lg p-6">
                <h3 className="font-poppins text-lg font-semibold text-[#1C1917] mb-4 flex items-center gap-2">
                  <MapPin size={18} className="text-[#B8974E]" /> Shipping Address
                </h3>
                <div className="space-y-1 font-inter text-sm text-[#78716C]">
                  <p>{order.address}</p>
                  <p>{order.city}, {order.state}</p>
                  <p>Pincode: {order.pincode}</p>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-white border border-[#E8E2D9] rounded-lg p-6">
                <h3 className="font-poppins text-lg font-semibold text-[#1C1917] mb-4 flex items-center gap-2">
                  <CreditCard size={18} className="text-[#B8974E]" /> Payment Details
                </h3>
                <div className="space-y-3 font-inter text-sm">
                  <div className="flex justify-between text-[#78716C]">
                    <span>Method</span>
                    <span className="text-[#1C1917] font-semibold">{order.payment_method}</span>
                  </div>
                  <div className="flex justify-between text-[#78716C]">
                    <span>Delivery</span>
                    <span className="text-[#B8974E] font-semibold">Free</span>
                  </div>
                  <div className="pt-3 border-t border-[#E8E2D9] flex justify-between text-[#1C1917] font-bold text-lg">
                    <span>Total</span>
                    <span>₹{order.total_price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
