import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/context/AuthContext';
import { orderService } from '@/services/orderService';
import { orderEmailService } from '@/services/orderEmailService';
import { whatsappService } from '@/services/whatsappService';
import AddressForm from '@/components/checkout/AddressForm';
import type { AddressFormData } from '@/components/checkout/AddressForm';
import PaymentMethodSelector from '@/components/checkout/PaymentMethodSelector';
import type { PaymentMethod } from '@/components/checkout/PaymentMethodSelector';
import { Loader2 } from 'lucide-react';
import SEO from '@/components/SEO';
export default function CheckoutPage() {
  const { cartItems, loading: cartLoading, refetch: refetchCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<AddressFormData>({
    customer_name: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('COD');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }, [cartItems]);

  const deliveryFee = 0; // Free delivery
  const total = subtotal + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setSubmitting(true);
    setError(null);

    try {
      const status = paymentMethod === 'COD' ? 'Pending' : 'Awaiting Payment';
      
      const orderData = {
        ...formData,
        total_price: total,
        payment_method: paymentMethod,
        status,
      };

      const orderItemsData = cartItems.map(item => ({
        product_id: item.product_id,
        size: item.size,
        quantity: item.quantity,
        price: item.product.price,
      }));

      // 1. Create Order
      const order = await orderService.createOrder(orderData, orderItemsData);

      // Fire and forget email notifications (graceful failure)
      try {
        orderEmailService.sendOrderConfirmation(order);
        orderEmailService.sendAdminNotification(order);
      } catch (emailError) {
        console.error("Failed to send order emails:", emailError);
      }

      let waLink = null;
      if (paymentMethod === 'WHATSAPP') {
        const itemsList = cartItems.map(i => ({
          name: i.product.name,
          size: i.size,
          quantity: i.quantity
        }));
        
        waLink = whatsappService.generateOrderMessage({
          orderId: order.id,
          customerName: formData.customer_name,
          phone: formData.phone,
          items: itemsList,
          totalAmount: total,
        });
      }

      // 3. Clear local cart & redirect
      await refetchCart();
      navigate('/order-success', { 
        state: { 
          orderId: order.id, 
          paymentMethod,
          status,
          waLink
        } 
      });

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to process order.");
    } finally {
      setSubmitting(false);
    }
  };

  if (cartLoading) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-secondary animate-spin" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#111111] pt-32 pb-16 flex flex-col items-center justify-center">
        <h1 className="font-poppins text-3xl font-bold text-white mb-4">Your cart is empty</h1>
        <button onClick={() => navigate('/shop')} className="px-8 py-3 bg-secondary text-primary font-inter text-sm font-semibold uppercase tracking-widest rounded-full">
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <>
      <SEO title="Checkout | Vintage Rush" />
      <div className="min-h-screen bg-[#111111] pt-24 lg:pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-poppins text-3xl sm:text-4xl font-bold text-white mb-10">Checkout</h1>

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-10">
          {/* Left Column - Forms */}
          <div className="flex-1 space-y-10">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl font-inter text-sm">
                {error}
              </div>
            )}
            
            <AddressForm formData={formData} setFormData={setFormData} />
            <PaymentMethodSelector selected={paymentMethod} onChange={setPaymentMethod} />
          </div>

          {/* Right Column - Summary */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-32">
              <h3 className="font-poppins text-xl font-semibold text-white mb-6">Order Summary</h3>
              
              <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 bg-white/10 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 py-1">
                      <h4 className="font-inter text-sm font-medium text-white">{item.product.name}</h4>
                      <p className="font-inter text-xs text-white/50 mt-1">Size: {item.size} | Qty: {item.quantity}</p>
                      <p className="font-inter text-sm font-medium text-white mt-2">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                <div className="flex justify-between font-inter text-sm text-white/60">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-inter text-sm text-white/60">
                  <span>Delivery</span>
                  <span className="text-secondary">Free</span>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between font-poppins text-lg font-bold text-white">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={submitting}
                className="w-full mt-8 flex items-center justify-center gap-2 px-6 py-4 bg-secondary text-primary font-poppins text-sm font-semibold tracking-widest uppercase rounded-xl hover:bg-white transition-colors duration-300 disabled:opacity-50"
              >
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Place Order'}
              </motion.button>
              <p className="text-center font-inter text-xs text-white/30 mt-4">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
