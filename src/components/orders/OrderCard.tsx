import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { Package, ChevronRight } from 'lucide-react';

interface OrderCardProps {
  order: any;
}

export default function OrderCard({ order }: OrderCardProps) {
  const date = new Date(order.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const itemCount = order.order_items.reduce((acc: number, item: any) => acc + item.quantity, 0);

  return (
    <Link 
      to={`/orders/${order.id}`}
      className="block bg-[#1a1a1a] border border-white/5 rounded-2xl p-5 sm:p-6 hover:border-white/20 transition-all duration-300 group"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/50 group-hover:text-secondary group-hover:bg-secondary/10 transition-colors">
            <Package size={24} />
          </div>
          <div>
            <h3 className="font-poppins text-lg font-bold text-white tracking-tight">Order #{order.id.split('-')[0].toUpperCase()}</h3>
            <p className="font-inter text-xs text-white/40 mt-1">Placed on {date}</p>
          </div>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full">
          <StatusBadge status={order.status} />
          <ChevronRight size={20} className="text-white/30 group-hover:text-white transition-colors sm:block hidden" />
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/5 font-inter text-sm">
        <div className="text-white/60">
          <span className="text-white font-medium">{itemCount}</span> {itemCount === 1 ? 'item' : 'items'}
        </div>
        <div className="text-white/60">
          Total: <span className="text-white font-medium ml-1">₹{order.total_price.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </Link>
  );
}
