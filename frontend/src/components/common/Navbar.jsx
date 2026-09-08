import { FaRobot } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
        <div className="flex items-center gap-3">
          <FaRobot className="text-cyan-400 text-2xl" />
          <h1 className="text-2xl font-bold text-white">
            AI Resume Analyzer
          </h1>
        </div>

        <button className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg font-semibold transition-all">
          Get Started
        </button>
      </div>
    </motion.nav>
  );
}
