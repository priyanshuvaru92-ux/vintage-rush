import { CheckCircle2, Circle } from 'lucide-react';

export type PaymentMethod = 'COD' | 'WHATSAPP';

interface PaymentMethodSelectorProps {
  selected: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

const methods = [
  {
    id: 'COD',
    title: 'Cash on Delivery',
    description: 'Pay in cash when your order arrives.',
    icon: '💵',
  },
  {
    id: 'WHATSAPP',
    title: 'Pay via WhatsApp',
    description: 'We will send you a payment link on WhatsApp.',
    icon: '💬',
  },
] as const;

export default function PaymentMethodSelector({ selected, onChange }: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-poppins text-lg font-semibold text-white">Payment Method</h3>
      <div className="space-y-3">
        {methods.map((method) => (
          <div
            key={method.id}
            onClick={() => onChange(method.id as PaymentMethod)}
            className={`relative flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
              selected === method.id
                ? 'bg-secondary/10 border-secondary'
                : 'bg-[#1a1a1a] border-white/5 hover:border-white/20'
            }`}
          >
            <div className="mt-0.5">
              {selected === method.id ? (
                <CheckCircle2 className="w-5 h-5 text-secondary" />
              ) : (
                <Circle className="w-5 h-5 text-white/20" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{method.icon}</span>
                <span className="font-inter text-sm font-semibold text-white">
                  {method.title}
                </span>
              </div>
              <p className="mt-1 font-inter text-xs text-white/50">
                {method.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
