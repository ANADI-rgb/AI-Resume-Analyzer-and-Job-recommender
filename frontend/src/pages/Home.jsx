import { motion } from "framer-motion";
import {
  FiCpu,
  FiZap,
  FiShield,
  FiBarChart2,
  FiCheckCircle,
  FiTarget,
  FiBriefcase,
  FiTrendingUp,
  FiArrowRight,
} from "react-icons/fi";

import UploadCard from "../components/upload/UploadCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* ================= BACKGROUND ================= */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute -top-40 -left-40 w-[550px] h-[550px] bg-cyan-500/20 rounded-full blur-[140px]" />

        <div className="absolute top-[25%] -right-40 w-[550px] h-[550px] bg-purple-600/20 rounded-full blur-[140px]" />

        <div className="absolute bottom-[-250px] left-[35%] w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[150px]" />

      </div>

      {/* ================= NAVBAR ================= */}

      <nav className="relative z-20 border-b border-white/5 bg-slate-950/60 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-6 py-5">

          <div className="flex items-center justify-between">

            {/* Logo */}

            <div className="flex items-center gap-3">

              <div className="relative">

                <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-40" />

                <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center">

                  <FiCpu className="text-xl text-white" />

                </div>

              </div>

              <div>

                <h1 className="text-xl font-extrabold">
                  Resume<span className="text-cyan-400">AI</span>
                </h1>

                <p className="text-[11px] text-slate-500">
                  Intelligent Career Assistant
                </p>

              </div>

            </div>

            {/* Navigation */}

            <div className="hidden md:flex items-center gap-8 text-sm">

              <a
                href="#features"
                className="text-slate-400 hover:text-cyan-400 transition"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                className="text-slate-400 hover:text-cyan-400 transition"
              >
                How It Works
              </a>

              <a
                href="#analyze"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition font-semibold shadow-lg shadow-cyan-500/20"
              >
                Analyze Resume
              </a>

            </div>

          </div>

        </div>

      </nav>

      {/* ================= HERO ================= */}

      <main className="relative z-10">

        <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT */}

            <div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 text-sm font-medium"
              >

                <span className="relative flex h-2.5 w-2.5">

                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />

                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />

                </span>

                AI-Powered Resume Analysis

              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="mt-7 text-5xl md:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight"
              >

                Your Resume.

                <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Smarter.
                </span>

                Your Career.

                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Stronger.
                </span>

              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-7 text-lg text-slate-400 leading-relaxed max-w-xl"
              >
                Analyze your resume with AI, discover your ATS score,
                identify missing skills, and find career opportunities
                that match your profile.
              </motion.p>

              {/* Mini stats */}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="grid grid-cols-3 gap-4 mt-9 max-w-lg"
              >

                <MiniStat
                  icon={<FiBarChart2 />}
                  value="ATS"
                  label="Scoring"
                />

                <MiniStat
                  icon={<FiTarget />}
                  value="AI"
                  label="Matching"
                />

                <MiniStat
                  icon={<FiBriefcase />}
                  value="Jobs"
                  label="Recommendations"
                />

              </motion.div>

            </div>

            {/* RIGHT VISUAL */}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative hidden lg:block"
            >

              {/* Glow */}

              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-[80px]" />

              {/* Main card */}

              <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-7 shadow-2xl">

                <div className="flex items-center justify-between mb-7">

                  <div>

                    <p className="text-sm text-slate-400">
                      Resume Analysis
                    </p>

                    <h3 className="text-xl font-bold mt-1">
                      Your Career Dashboard
                    </h3>

                  </div>

                  <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center">
                    <FiTrendingUp className="text-cyan-400" />
                  </div>

                </div>

                {/* Score */}

                <div className="rounded-2xl bg-slate-900/80 border border-white/5 p-5">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-sm text-slate-400">
                        ATS Compatibility
                      </p>

                      <p className="text-4xl font-black text-cyan-400 mt-2">
                        92%
                      </p>

                    </div>

                    <div className="w-24 h-24 rounded-full border-[8px] border-cyan-400/20 flex items-center justify-center">

                      <div className="text-center">

                        <p className="text-xs text-slate-400">
                          Score
                        </p>

                        <p className="font-bold">
                          Excellent
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="mt-5 h-2 rounded-full bg-slate-700 overflow-hidden">

                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "92%" }}
                      transition={{ duration: 1.2, delay: 0.5 }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                    />

                  </div>

                </div>

                {/* Skills */}

                <div className="grid grid-cols-2 gap-4 mt-4">

                  <DashboardPreview
                    icon={<FiZap />}
                    title="Skills Found"
                    value="11"
                    gradient="from-purple-500 to-pink-500"
                  />

                  <DashboardPreview
                    icon={<FiBriefcase />}
                    title="Job Matches"
                    value="10"
                    gradient="from-cyan-400 to-blue-500"
                  />

                </div>

              </div>

              {/* Floating notification */}

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute -right-8 top-12 px-4 py-3 rounded-2xl bg-slate-900 border border-green-400/20 shadow-xl"
              >

                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-xl bg-green-400/10 flex items-center justify-center">

                    <FiCheckCircle className="text-green-400" />

                  </div>

                  <div>

                    <p className="text-xs text-slate-400">
                      Resume analyzed
                    </p>

                    <p className="text-sm font-semibold text-green-400">
                      Great Match!
                    </p>

                  </div>

                </div>

              </motion.div>

            </motion.div>

          </div>

        </section>

        {/* ================= UPLOAD ================= */}

        <section
          id="analyze"
          className="max-w-5xl mx-auto px-6 py-10"
        >

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >

            <div className="text-center mb-8">

              <p className="text-cyan-400 font-semibold text-sm uppercase tracking-widest">
                Start Your Analysis
              </p>

              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                Upload Your Resume
              </h2>

              <p className="text-slate-400 mt-3">
                Let AI find opportunities hidden inside your resume.
              </p>

            </div>

            <UploadCard />

          </motion.div>

        </section>

        {/* ================= TRUST ================= */}

        <section className="max-w-5xl mx-auto px-6 py-8">

          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm text-slate-400">

            <TrustItem text="PDF / DOCX supported" />

            <TrustItem text="Instant AI analysis" />

            <TrustItem text="ATS scoring" />

            <TrustItem text="Smart job matching" />

          </div>

        </section>

        {/* ================= FEATURES ================= */}

        <section
          id="features"
          className="max-w-7xl mx-auto px-6 py-24"
        >

          <div className="text-center max-w-2xl mx-auto">

            <p className="text-purple-400 font-semibold text-sm uppercase tracking-widest">
              Powerful Features
            </p>

            <h2 className="text-4xl md:text-5xl font-black mt-3">
              Everything You Need
              <span className="text-cyan-400"> To Stand Out</span>
            </h2>

            <p className="text-slate-400 mt-5">
              Get actionable insights from your resume and understand
              exactly where you can improve.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">

            <FeatureCard
              icon={<FiBarChart2 />}
              title="ATS Score"
              description="See how well your resume performs against Applicant Tracking Systems."
              gradient="from-cyan-400 to-blue-500"
            />

            <FeatureCard
              icon={<FiTarget />}
              title="Skill Intelligence"
              description="Discover your strongest skills and identify important missing skills."
              gradient="from-purple-400 to-pink-500"
            />

            <FeatureCard
              icon={<FiBriefcase />}
              title="Smart Job Matching"
              description="Find job roles that align with your current skills and experience."
              gradient="from-emerald-400 to-cyan-500"
            />

          </div>

        </section>

        {/* ================= HOW IT WORKS ================= */}

        <section
          id="how-it-works"
          className="border-y border-white/5 bg-white/[0.02]"
        >

          <div className="max-w-7xl mx-auto px-6 py-24">

            <div className="text-center">

              <p className="text-cyan-400 font-semibold text-sm uppercase tracking-widest">
                Simple Process
              </p>

              <h2 className="text-4xl font-black mt-3">
                From Resume To Opportunity
              </h2>

            </div>

            <div className="grid md:grid-cols-4 gap-6 mt-14">

              <StepCard
                number="01"
                title="Upload"
                description="Upload your PDF, DOCX or TXT resume."
              />

              <StepCard
                number="02"
                title="Analyze"
                description="AI extracts skills and analyzes your resume."
              />

              <StepCard
                number="03"
                title="Improve"
                description="Discover missing skills and resume improvements."
              />

              <StepCard
                number="04"
                title="Apply"
                description="Explore jobs that match your profile."
              />

            </div>

          </div>

        </section>

      </main>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-white/5">

        <div className="max-w-7xl mx-auto px-6 py-10">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center">

                <FiCpu />

              </div>

              <span className="font-bold">
                Resume<span className="text-cyan-400">AI</span>
              </span>

            </div>

            <p className="text-sm text-slate-500">
              Built with AI to help you build a better career.
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
}


/* =====================================================
   MINI STAT
===================================================== */

function MiniStat({ icon, value, label }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">

      <div className="flex items-center gap-3">

        <div className="text-cyan-400">
          {icon}
        </div>

        <div>

          <p className="font-bold">
            {value}
          </p>

          <p className="text-xs text-slate-500">
            {label}
          </p>

        </div>

      </div>

    </div>
  );
}


/* =====================================================
   DASHBOARD PREVIEW
===================================================== */

function DashboardPreview({
  icon,
  title,
  value,
  gradient,
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-slate-900/80 p-5">

      <div
        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}
      >
        {icon}
      </div>

      <p className="text-sm text-slate-400 mt-4">
        {title}
      </p>

      <p className="text-2xl font-bold mt-1">
        {value}
      </p>

    </div>
  );
}


/* =====================================================
   TRUST ITEM
===================================================== */

function TrustItem({ text }) {
  return (
    <div className="flex items-center gap-2">

      <FiCheckCircle className="text-green-400" />

      <span>{text}</span>

    </div>
  );
}


/* =====================================================
   FEATURE CARD
===================================================== */

function FeatureCard({
  icon,
  title,
  description,
  gradient,
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
      }}
      className="group relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 overflow-hidden"
    >

      <div
        className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-r ${gradient} opacity-10 blur-3xl group-hover:opacity-25 transition duration-500`}
      />

      <div
        className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl shadow-xl`}
      >
        {icon}
      </div>

      <h3 className="relative text-xl font-bold mt-7">
        {title}
      </h3>

      <p className="relative text-slate-400 mt-3 leading-relaxed">
        {description}
      </p>

      <div className="mt-6 flex items-center gap-2 text-sm text-cyan-400">

        Explore feature

        <FiArrowRight className="group-hover:translate-x-1 transition" />

      </div>

    </motion.div>
  );
}


/* =====================================================
   STEP CARD
===================================================== */

function StepCard({
  number,
  title,
  description,
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative rounded-3xl border border-white/5 bg-slate-900/50 p-7"
    >

      <p className="text-5xl font-black bg-gradient-to-br from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        {number}
      </p>

      <h3 className="text-xl font-bold mt-6">
        {title}
      </h3>

      <p className="text-slate-400 mt-3 leading-relaxed">
        {description}
      </p>

    </motion.div>
  );
}