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
      className="block bg-white border border-[#E8E2D9] rounded-lg p-5 sm:p-6 hover:border-[#1C1917] transition-all duration-300 group"
      style={{ textDecoration: "none" }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#78716C] group-hover:text-[#B8974E] transition-colors">
            <Package size={24} />
          </div>
          <div>
            <h3 className="font-poppins text-lg font-bold text-[#1C1917] tracking-tight">Order #{order.id.split('-')[0].toUpperCase()}</h3>
            <p className="font-inter text-xs text-[#78716C]/60 mt-1 font-semibold">Placed on {date}</p>
          </div>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full">
          <StatusBadge status={order.status} />
          <ChevronRight size={20} className="text-[#78716C]/40 group-hover:text-[#1C1917] transition-colors sm:block hidden" />
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[#E8E2D9] font-inter text-sm">
        <div className="text-[#78716C]">
          <span className="text-[#1C1917] font-semibold">{itemCount}</span> {itemCount === 1 ? 'item' : 'items'}
        </div>
        <div className="text-[#78716C]">
          Total: <span className="text-[#1C1917] font-semibold ml-1">₹{order.total_price.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </Link>
  );
}
