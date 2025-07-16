import { motion } from "framer-motion";

export default function Badge({ children }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 text-sm rounded-full font-semibold shadow-sm"
    >
      {children}
    </motion.span>
  );
}
