import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="pt-36 pb-24 text-center">

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl md:text-7xl font-black"
      >
        Build a Resume
        <br />

        <span className="text-cyan-400">
          Recruiters Notice
        </span>

      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 text-xl text-gray-300 max-w-3xl mx-auto"
      >
        Upload your resume to receive AI-powered skill extraction,
        ATS insights, and job recommendations tailored to your profile.
      </motion.p>

    </section>
  );
}