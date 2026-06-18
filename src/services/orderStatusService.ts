export type OrderStatus = 'Pending' | 'Awaiting Payment' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';

export const orderStatusService = {
  getTimelineSteps(): OrderStatus[] {
    return ['Pending', 'Confirmed', 'Shipped', 'Delivered'];
  },

  getStatusConfig(status: OrderStatus | string): { bg: string; text: string } {
    const config: Record<string, { bg: string; text: string }> = {
      'Pending': { bg: 'bg-yellow-500/10', text: 'text-yellow-500' },
      'Awaiting Payment': { bg: 'bg-orange-500/10', text: 'text-orange-500' },
      'Confirmed': { bg: 'bg-blue-500/10', text: 'text-blue-500' },
      'Shipped': { bg: 'bg-purple-500/10', text: 'text-purple-500' },
      'Delivered': { bg: 'bg-green-500/10', text: 'text-green-500' },
      'Cancelled': { bg: 'bg-red-500/10', text: 'text-red-500' },
    };

    return config[status] || { bg: 'bg-white/10', text: 'text-white' };
  }
};
