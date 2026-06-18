import { motion } from "framer-motion";
import { Award, Truck, Wallet, MessageCircle } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "Crafted from the finest fabrics with meticulous attention to detail and durability.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Swift shipping across India. Your order reaches you in 3-5 business days.",
  },
  {
    icon: Wallet,
    title: "Cash On Delivery",
    description:
      "Pay when you receive. No advance payment needed. 100% secure.",
  },
  {
    icon: MessageCircle,
    title: "Easy WhatsApp Ordering",
    description:
      "Order directly via WhatsApp. Quick, simple, and personal shopping experience.",
  },
];

export default function WhyUsSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#0e0e0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Why Vintage Rush?
          </h2>
          <p className="mt-4 font-inter text-base sm:text-lg text-white/40 max-w-2xl mx-auto">
            More than just clothing — it&apos;s a lifestyle
          </p>
          <div className="mt-6 h-[2px] w-16 bg-secondary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group p-8 rounded-2xl bg-[#161616] border border-white/5 hover:border-secondary/30 transition-all duration-500 text-center h-full"
                >
                  <div className="w-14 h-14 mx-auto rounded-xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors duration-300">
                    <Icon size={24} className="text-secondary" />
                  </div>
                  <h3 className="font-poppins text-lg font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="font-inter text-sm text-white/40 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
