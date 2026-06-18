import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 font-inter text-base sm:text-lg text-white/40 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div
        className={`mt-6 h-[2px] w-16 bg-secondary ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </motion.div>
  );
}
