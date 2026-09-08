import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiBriefcase,
  FiCheckCircle,
  FiFileText,
  FiInfo,
  FiRefreshCw,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";

// ============================================================
// HELPERS
// ============================================================

const clampScore = (value) => {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return 0;
  }

  return Math.max(0, Math.min(100, number));
};

// ============================================================
// SKILL BADGE
// ============================================================

function SkillBadge({ children, type = "default" }) {
  const styles = {
    default:
      "bg-slate-800 text-slate-200 border-slate-700",

    new:
      "bg-purple-500/10 text-purple-300 border-purple-500/20",

    success:
      "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${styles[type]}`}
    >
      {children}
    </span>
  );
}

// ============================================================
// MAIN RESULTS PAGE
// ============================================================

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(null);

  // ==========================================================
  // LOAD ANALYSIS
  // ==========================================================

  useEffect(() => {
    let state = location.state;

    // If React Router state is unavailable,
    // restore the analysis from sessionStorage.
    if (!state || typeof state !== "object") {
      try {
        const stored =
          sessionStorage.getItem("resumeAnalysis");

        if (stored) {
          state = JSON.parse(stored);
        }
      } catch (error) {
        console.error(
          "Could not restore resume analysis:",
          error
        );
      }
    }

    if (state) {
      setAnalysis(state);

      // Keep the latest analysis available
      // for the Job Recommendations page.
      try {
        sessionStorage.setItem(
          "resumeAnalysis",
          JSON.stringify(state)
        );
      } catch (error) {
        console.error(
          "Could not save resume analysis:",
          error
        );
      }
    }
  }, [location.state]);

  // ==========================================================
  // EXTRACTED SKILLS
  // ==========================================================

  const skills = useMemo(() => {
    if (
      !analysis ||
      !Array.isArray(analysis.skills)
    ) {
      return [];
    }

    return analysis.skills;
  }, [analysis]);

  // ==========================================================
  // NEW SKILLS
  // ==========================================================

  const newSkills = useMemo(() => {
    if (
      !analysis ||
      !Array.isArray(analysis.newSkills)
    ) {
      return [];
    }

    return analysis.newSkills;
  }, [analysis]);

  // ==========================================================
  // SUGGESTIONS
  // ==========================================================

  const suggestions = useMemo(() => {
    if (
      !analysis ||
      !Array.isArray(analysis.suggestions)
    ) {
      return [];
    }

    return analysis.suggestions;
  }, [analysis]);

  // ==========================================================
  // ATS SCORE
  // ==========================================================

  const atsScore = clampScore(
    analysis?.atsScore
  );

  // ==========================================================
  // ATS BREAKDOWN
  // ==========================================================

  const atsBreakdown =
    analysis?.atsBreakdown &&
    typeof analysis.atsBreakdown === "object"
      ? analysis.atsBreakdown
      : {};

  // ==========================================================
  // EMPTY STATE
  // ==========================================================

  if (!analysis) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <FiInfo className="text-red-400 text-2xl" />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-white">
            No Analysis Found
          </h1>

          <p className="mt-3 text-slate-400">
            Upload a resume first to view your
            resume analysis.
          </p>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition"
          >
            <FiArrowLeft />
            Upload Resume
          </button>
        </div>
      </div>
    );
  }

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ==================================================== */}
      {/* HEADER */}
      {/* ==================================================== */}

      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition"
          >
            <FiArrowLeft />

            <span className="hidden sm:inline">
              Analyze Another Resume
            </span>
          </button>

          <div className="flex items-center gap-2">
            <FiFileText className="text-cyan-400" />

            <span className="font-bold">
              AI Resume Analyzer
            </span>
          </div>

        </div>
      </header>

      {/* ==================================================== */}
      {/* MAIN */}
      {/* ==================================================== */}

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* ================================================== */}
        {/* TITLE */}
        {/* ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: -15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">
            Resume Analysis Complete
          </p>

          <h1 className="mt-2 text-4xl md:text-5xl font-bold">
            Your Resume Results
          </h1>

          <p className="mt-4 text-slate-400 max-w-2xl">
            We've analyzed your resume, identified
            your skills, calculated your ATS score,
            and generated personalized suggestions
            to improve your resume.
          </p>
        </motion.div>

        {/* ================================================== */}
        {/* SUMMARY CARDS */}
        {/* ================================================== */}

        <div className="mt-10 grid md:grid-cols-2 gap-5">

          {/* ATS SCORE */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-2xl border border-cyan-500/20 bg-slate-900/80 p-6"
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-400">
                  ATS Score
                </p>

                <p className="mt-2 text-4xl font-bold text-cyan-400">
                  {atsScore}
                  <span className="text-lg text-slate-500">
                    /100
                  </span>
                </p>
              </div>

              <div className="w-14 h-14 rounded-full bg-cyan-500/10 flex items-center justify-center">
                <FiTrendingUp className="text-cyan-400 text-2xl" />
              </div>

            </div>

            <div className="mt-5 h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${atsScore}%`,
                }}
                transition={{
                  duration: 1,
                }}
                className="h-full bg-cyan-400 rounded-full"
              />
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Overall resume compatibility with ATS systems
            </p>
          </motion.div>

          {/* SKILLS */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.1,
            }}
            className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6"
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-400">
                  Skills Detected
                </p>

                <p className="mt-2 text-4xl font-bold text-white">
                  {skills.length}
                </p>
              </div>

              <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center">
                <FiCheckCircle className="text-purple-400 text-2xl" />
              </div>

            </div>

            <p className="mt-4 text-sm text-slate-500">
              Skills identified from your resume
            </p>
          </motion.div>

        </div>

        {/* ================================================== */}
        {/* EXTRACTED SKILLS */}
        {/* ================================================== */}

        <section className="mt-12">

          <div className="flex items-center gap-3">
            <FiCheckCircle className="text-cyan-400" />

            <h2 className="text-2xl font-bold">
              Extracted Skills
            </h2>
          </div>

          <p className="mt-2 text-slate-400">
            Technical and professional skills detected
            from your resume.
          </p>

          <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">

            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">

                {skills.map((skill, index) => (
                  <SkillBadge
                    key={`${skill}-${index}`}
                  >
                    {skill}
                  </SkillBadge>
                ))}

              </div>
            ) : (
              <p className="text-slate-500">
                No skills were detected.
              </p>
            )}

          </div>
        </section>

        {/* ================================================== */}
        {/* NEW SKILLS */}
        {/* ================================================== */}

        {newSkills.length > 0 && (
          <section className="mt-8">

            <div className="flex items-center gap-3">

              <FiTrendingUp className="text-purple-400" />

              <h2 className="text-xl font-bold">
                Additional Skills Detected
              </h2>

            </div>

            <p className="mt-2 text-slate-400">
              Skills identified during the enhanced
              resume analysis.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">

              {newSkills.map((skill, index) => (
                <SkillBadge
                  key={`${skill}-${index}`}
                  type="new"
                >
                  {skill}
                </SkillBadge>
              ))}

            </div>

          </section>
        )}

        {/* ================================================== */}
        {/* RESUME IMPROVEMENT SUGGESTIONS */}
        {/* ================================================== */}

        <section className="mt-14">

          <div className="flex items-center gap-3">

            <FiTarget className="text-yellow-400" />

            <h2 className="text-2xl font-bold">
              Improve Your Resume
            </h2>

          </div>

          <p className="mt-2 text-slate-400">
            Suggestions generated from your current
            resume analysis.
          </p>

          <div className="mt-5 space-y-3">

            {suggestions.length > 0 ? (

              suggestions.map(
                (suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: -10,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.05,
                    }}
                    className="flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-900/70 p-5"
                  >

                    <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0">

                      <FiInfo className="text-yellow-400" />

                    </div>

                    <p className="text-sm leading-6 text-slate-300">
                      {suggestion}
                    </p>

                  </motion.div>
                )
              )

            ) : (

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 flex items-center gap-3">

                <FiCheckCircle className="text-emerald-400" />

                <p className="text-emerald-300">
                  No major improvement suggestions
                  were detected.
                </p>

              </div>

            )}

          </div>

        </section>

        {/* ================================================== */}
        {/* ATS BREAKDOWN */}
        {/* ================================================== */}

        {Object.keys(atsBreakdown).length > 0 && (

          <section className="mt-14">

            <div className="flex items-center gap-3">

              <FiTrendingUp className="text-cyan-400" />

              <h2 className="text-2xl font-bold">
                ATS Score Breakdown
              </h2>

            </div>

            <p className="mt-2 text-slate-400">
              Detailed breakdown of your resume's ATS
              compatibility.
            </p>

            <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

              {Object.entries(
                atsBreakdown
              ).map(([key, value]) => {

                const score =
                  typeof value === "number"
                    ? clampScore(value)
                    : 0;

                const label = key
                  .replace(
                    /([A-Z])/g,
                    " $1"
                  )
                  .replace(
                    /^./,
                    (char) =>
                      char.toUpperCase()
                  );

                return (
                  <motion.div
                    key={key}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="rounded-xl border border-slate-800 bg-slate-900/70 p-5"
                  >

                    <div className="flex items-center justify-between mb-4">

                      <span className="text-sm text-slate-400">
                        {label}
                      </span>

                      <span className="font-bold text-white">
                        {score}
                      </span>

                    </div>

                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">

                      <motion.div
                        initial={{
                          width: 0,
                        }}
                        animate={{
                          width: `${score}%`,
                        }}
                        transition={{
                          duration: 0.8,
                        }}
                        className="h-full bg-cyan-400 rounded-full"
                      />

                    </div>

                  </motion.div>
                );
              })}

            </div>

          </section>
        )}

        {/* ================================================== */}
        {/* EXTRACTED RESUME TEXT */}
        {/* ================================================== */}

        {analysis.resume && (

          <section className="mt-14">

            <div className="flex items-center gap-3">

              <FiFileText className="text-slate-400" />

              <h2 className="text-2xl font-bold">
                Extracted Resume Text
              </h2>

            </div>

            <p className="mt-2 text-slate-400">
              Text extracted from your uploaded resume.
            </p>

            <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">

              <pre className="whitespace-pre-wrap text-sm leading-7 text-slate-400 font-sans max-h-96 overflow-y-auto">
                {analysis.resume}
              </pre>

            </div>

          </section>
        )}

        {/* ================================================== */}
        {/* JOB RECOMMENDATIONS NAVIGATION */}
        {/* ================================================== */}

        <section className="mt-14">

          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 md:p-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              <div>

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">

                    <FiBriefcase className="text-cyan-400 text-xl" />

                  </div>

                  <h2 className="text-xl md:text-2xl font-bold">
                    Find Suitable Jobs
                  </h2>

                </div>

                <p className="mt-3 text-sm leading-6 text-slate-400 max-w-2xl">
                  Your resume analysis is complete.
                  View your personalized job recommendations
                  on a separate page based on your skills,
                  resume similarity, and role relevance.
                </p>

              </div>

              <button
                type="button"
                onClick={() => {
                  // Make sure latest analysis is saved
                  sessionStorage.setItem(
                    "resumeAnalysis",
                    JSON.stringify(analysis)
                  );

                  navigate("/jobs", {
                    state: analysis,
                  });
                }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition"
              >
                <FiBriefcase />
                View Job Recommendations
              </button>

            </div>

          </div>

        </section>

        {/* ================================================== */}
        {/* ACTIONS */}
        {/* ================================================== */}

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">

          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition"
          >
            <FiRefreshCw />

            Analyze Another Resume
          </button>

          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold transition"
          >
            Back to Top
          </button>

        </div>

      </main>

      {/* ==================================================== */}
      {/* FOOTER */}
      {/* ==================================================== */}

      <footer className="border-t border-slate-800 mt-16">

        <div className="max-w-7xl mx-auto px-6 py-8 text-center">

          <p className="text-sm text-slate-500">
            AI Resume Analyzer
          </p>

          <p className="mt-1 text-xs text-slate-600">
            AI-powered resume analysis and career matching.
          </p>

        </div>

      </footer>

    </div>
  );
}