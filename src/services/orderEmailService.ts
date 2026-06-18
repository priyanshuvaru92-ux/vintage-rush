import { emailService } from './emailService';
import CustomerOrderConfirmation from '@/emails/CustomerOrderConfirmation';
import AdminNewOrderNotification from '@/emails/AdminNewOrderNotification';
import OrderStatusUpdate from '@/emails/OrderStatusUpdate';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

export const orderEmailService = {
  async sendOrderConfirmation(order: any) {
    if (!order.email) return;

    await emailService.sendEmail({
      to: order.email,
      subject: 'Thank You For Ordering From Vintage Rush 🖤',
      react: CustomerOrderConfirmation({
        customerName: order.customer_name,
        orderId: order.id,
        paymentMethod: order.payment_method,
        status: order.status,
        amount: order.total_price,
      }),
    });
  },

  async sendAdminNotification(order: any) {
    if (!ADMIN_EMAIL) {
      console.warn('VITE_ADMIN_EMAIL is not defined. Admin notification skipped.');
      return;
    }

    await emailService.sendEmail({
      to: ADMIN_EMAIL,
      subject: `New Order Received - Vintage Rush`,
      react: AdminNewOrderNotification({
        customerName: order.customer_name,
        email: order.email,
        phone: order.phone,
        orderId: order.id,
        paymentMethod: order.payment_method,
        status: order.status,
        amount: order.total_price,
      }),
    });
  },

  async sendOrderStatusUpdate(order: any) {
    if (!order.email) return;

    let subject = 'Order Status Update';
    if (order.status === 'Shipped') subject = 'Your Order Has Been Shipped 🚚';
    if (order.status === 'Delivered') subject = 'Your Order Has Been Delivered 🎉';
    if (order.status === 'Confirmed') subject = 'Your Order Is Confirmed ✅';

    await emailService.sendEmail({
      to: order.email,
      subject,
      react: OrderStatusUpdate({
        customerName: order.customer_name,
        orderId: order.id,
        status: order.status,
      }),
    });
  }
};
