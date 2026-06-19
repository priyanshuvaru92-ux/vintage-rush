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
      <h3 className="font-poppins text-lg font-semibold text-[#1C1917]">Payment Method</h3>
      <div className="space-y-3">
        {methods.map((method) => (
          <div
            key={method.id}
            onClick={() => onChange(method.id as PaymentMethod)}
            className={`relative flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
              selected === method.id
                ? 'bg-[#F5F1EB] border-[#B8974E]'
                : 'bg-white border-[#E8E2D9] hover:border-[#1C1917]'
            }`}
          >
            <div className="mt-0.5">
              {selected === method.id ? (
                <CheckCircle2 className="w-5 h-5 text-[#B8974E]" />
              ) : (
                <Circle className="w-5 h-5 text-[#78716C]/40" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{method.icon}</span>
                <span className="font-inter text-sm font-semibold text-[#1C1917]">
                  {method.title}
                </span>
              </div>
              <p className="mt-1 font-inter text-xs text-[#78716C]">
                {method.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
