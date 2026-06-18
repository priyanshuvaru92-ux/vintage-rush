import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-[#111111] relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Stay in the Loop
          </h2>
          <p className="mt-4 font-inter text-base sm:text-lg text-white/40 max-w-xl mx-auto">
            Subscribe to get early access to new drops, exclusive offers, and
            street style inspiration.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white font-inter text-sm placeholder:text-white/30 focus:outline-none focus:border-secondary/50 transition-colors duration-300"
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="px-8 py-4 bg-secondary text-primary font-poppins text-sm font-semibold tracking-widest uppercase rounded-full flex items-center justify-center gap-2 hover:bg-white transition-colors duration-300"
          >
            Subscribe
            <Send size={16} />
          </motion.button>
        </motion.form>

        {submitted && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-secondary font-inter text-sm"
          >
            ✓ Thanks for subscribing! Welcome to the rush.
          </motion.p>
        )}
      </div>
    </section>
  );
}
