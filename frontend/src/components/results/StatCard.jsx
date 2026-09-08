import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
  description = "",
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-slate-700 bg-slate-900/60 backdrop-blur-md p-6 shadow-lg"
    >
      <p className="text-sm font-medium text-slate-400">
        {title}
      </p>

      <h2 className="mt-3 text-4xl font-bold text-cyan-400">
        {value}
      </h2>

      {description && (
        <p className="mt-2 text-sm text-slate-500">
          {description}
        </p>
      )}
    </motion.div>
  );
}
