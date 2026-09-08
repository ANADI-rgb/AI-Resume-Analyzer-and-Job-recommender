import { motion } from "framer-motion";

export default function ATSScore({ score = 0 }) {
  const safeScore = Math.min(100, Math.max(0, Number(score) || 0));

  const size = 130;
  const strokeWidth = 10;
  const radius = 55;
  const circumference = 2 * Math.PI * radius;

  const progress = circumference - (circumference * safeScore) / 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-900 rounded-3xl p-6 border border-slate-700"
    >
      <h2 className="text-2xl font-bold mb-5">
        ATS Score
      </h2>

      <div className="flex justify-center">
        <div
          className="relative"
          style={{
            width: `${size}px`,
            height: `${size}px`,
          }}
        >
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="-rotate-90"
          >
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#334155"
              strokeWidth={strokeWidth}
              fill="none"
            />

            {/* Progress circle */}
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#06b6d4"
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{
                strokeDashoffset: circumference,
              }}
              animate={{
                strokeDashoffset: progress,
              }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
              }}
            />
          </svg>

          {/* Score */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-white">
              {safeScore}%
            </span>
          </div>
        </div>
      </div>

      <p className="text-center text-slate-400 mt-4 text-sm">
        Resume compatibility score
      </p>
    </motion.div>
  );
}