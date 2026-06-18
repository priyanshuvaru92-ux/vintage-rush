import { cn } from '@/lib/utils';
import { orderStatusService } from '@/services/orderStatusService';

export default function StatusBadge({ status }: { status: string }) {
  const config = orderStatusService.getStatusConfig(status);

  return (
    <span className={cn("px-3 py-1 rounded-full text-xs font-inter font-semibold uppercase tracking-widest", config.bg, config.text)}>
      {status}
    </span>
  );
}
