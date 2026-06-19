import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { orderStatusService } from '@/services/orderStatusService';

const timelineSteps = orderStatusService.getTimelineSteps();

export default function OrderTimeline({ currentStatus }: { currentStatus: string }) {
  if (currentStatus === 'Cancelled') {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg font-inter text-sm text-center font-semibold">
        This order has been cancelled.
      </div>
    );
  }

  // Treat 'Awaiting Payment' as 'Pending' for the visual timeline
  const effectiveStatus = currentStatus === 'Awaiting Payment' ? 'Pending' : currentStatus;
  const currentIndex = timelineSteps.indexOf(effectiveStatus as any);

  return (
    <div className="relative">
      <div className="absolute top-5 left-4 right-4 h-[2px] bg-[#E8E2D9]" />
      <div 
        className="absolute top-5 left-4 h-[2px] bg-[#B8974E] transition-all duration-500" 
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
                  isCompleted ? "bg-[#B8974E] border-[#B8974E] text-[#FAF8F5]" : "bg-[#FAF8F5] border-[#E8E2D9] text-[#78716C]/40"
                )}
              >
                {isCompleted ? <Check size={18} /> : <div className="w-2 h-2 rounded-full bg-current" />}
              </div>
              <span className={cn(
                "font-inter text-xs font-semibold uppercase tracking-widest mt-1",
                isCurrent ? "text-[#B8974E]" : isCompleted ? "text-[#1C1917]" : "text-[#78716C]/40"
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
