import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { orderStatusService } from '@/services/orderStatusService';

const timelineSteps = orderStatusService.getTimelineSteps();

export default function OrderTimeline({ currentStatus }: { currentStatus: string }) {
  if (currentStatus === 'Cancelled') {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl font-inter text-sm text-center">
        This order has been cancelled.
      </div>
    );
  }

  // Treat 'Awaiting Payment' as 'Pending' for the visual timeline
  const effectiveStatus = currentStatus === 'Awaiting Payment' ? 'Pending' : currentStatus;
  const currentIndex = timelineSteps.indexOf(effectiveStatus as any);

  return (
    <div className="relative">
      <div className="absolute top-5 left-4 right-4 h-[2px] bg-white/10" />
      <div 
        className="absolute top-5 left-4 h-[2px] bg-secondary transition-all duration-500" 
        style={{ width: `calc(${(Math.max(0, currentIndex) / (timelineSteps.length - 1)) * 100}% - 2rem)` }} 
      />

      <div className="relative flex justify-between">
        {timelineSteps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step} className="flex flex-col items-center gap-2">
              <div 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 z-10",
                  isCompleted ? "bg-secondary border-secondary text-primary" : "bg-[#111111] border-white/20 text-white/20"
                )}
              >
                {isCompleted ? <Check size={18} /> : <div className="w-2 h-2 rounded-full bg-current" />}
              </div>
              <span className={cn(
                "font-inter text-xs font-semibold uppercase tracking-widest mt-1",
                isCurrent ? "text-secondary" : isCompleted ? "text-white/70" : "text-white/30"
              )}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
