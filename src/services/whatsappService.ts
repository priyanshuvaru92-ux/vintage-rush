export const whatsappService = {
  generateOrderMessage({
    orderId,
    customerName,
    phone,
    items,
    totalAmount,
  }: {
    orderId: string;
    customerName: string;
    phone: string;
    items: { name: string; quantity: number; size: string }[];
    totalAmount: number;
  }) {
    const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "919106485332";
    
    let message = `Hello Vintage Rush 🖤\n\n`;
    message += `I would like to place an order.\n\n`;
    message += `Order ID:\n${orderId}\n\n`;
    message += `Customer Name:\n${customerName}\n\n`;
    message += `Phone:\n${phone}\n\n`;
    message += `Items:\n\n`;
    
    items.forEach((item) => {
      message += `${item.name}\nSize: ${item.size}\nQuantity: ${item.quantity}\n\n`;
    });
    
    message += `Total Amount:\n₹${totalAmount.toLocaleString('en-IN')}\n\n`;
    message += `Please share payment details.\n\nThank you.`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  }
};
