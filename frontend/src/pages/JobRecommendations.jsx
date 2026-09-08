import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiBriefcase,
  FiCheckCircle,
  FiAlertCircle,
  FiTarget,
  FiChevronDown,
  FiChevronUp,
  FiInfo,
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

const getMatchColor = (score) => {
  if (score >= 75) return "text-emerald-400";
  if (score >= 55) return "text-cyan-400";
  if (score >= 35) return "text-yellow-400";

  return "text-red-400";
};

const getMatchBorder = (score) => {
  if (score >= 75) return "border-emerald-500/30";
  if (score >= 55) return "border-cyan-500/30";
  if (score >= 35) return "border-yellow-500/30";

  return "border-red-500/30";
};

const getMatchBackground = (score) => {
  if (score >= 75) return "bg-emerald-500/10";
  if (score >= 55) return "bg-cyan-500/10";
  if (score >= 35) return "bg-yellow-500/10";

  return "bg-red-500/10";
};

const getRecommendationLevel = (job) => {
  if (job?.recommendation_level) {
    return job.recommendation_level;
  }

  const score = clampScore(job?.score);

  if (score >= 75) return "Excellent Match";
  if (score >= 55) return "Strong Match";
  if (score >= 35) return "Good Match";
  if (score >= 15) return "Potential Match";

  return "Low Match";
};

// ============================================================
// NORMALIZE JOB
// ============================================================

const normalizeJob = (job, index) => {
  if (!job || typeof job !== "object") {
    return null;
  }

  const score = clampScore(
    job.score ??
      job.match_score ??
      job.matchPercentage ??
      job.match ??
      0
  );

  return {
    ...job,

    id: job.id ?? job.job_id ?? index + 1,

    title:
      job.title ||
      job.job_title ||
      job.role ||
      "Recommended Job",

    category:
      job.category ||
      "General",

    score,

    skill_match: clampScore(
      job.skill_match
    ),

    tfidf_score: clampScore(
      job.tfidf_score
    ),

    relevance_score: clampScore(
      job.relevance_score
    ),

    skills_required: Array.isArray(
      job.skills_required
    )
      ? job.skills_required
      : Array.isArray(job.skills)
      ? job.skills
      : [],

    matched_skills: Array.isArray(
      job.matched_skills
    )
      ? job.matched_skills
      : [],

    missing_skills: Array.isArray(
      job.missing_skills
    )
      ? job.missing_skills
      : [],

    recommendation_level:
      getRecommendationLevel({
        ...job,
        score,
      }),

    description:
      job.description ||
      `This ${job.title || "job"} matches your resume based on skills and resume content.`,
  };
};

// ============================================================
// SKILL BADGE
// ============================================================

function SkillBadge({
  children,
  type = "default",
}) {
  const styles = {
    default:
      "bg-slate-800 text-slate-200 border-slate-700",

    matched:
      "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",

    missing:
      "bg-red-500/10 text-red-300 border-red-500/20",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-medium ${styles[type]}`}
    >
      {children}
    </span>
  );
}

// ============================================================
// SCORE BAR
// ============================================================

function ScoreBar({ label, score }) {
  const safeScore = clampScore(score);

  return (
    <div className="space-y-2">

      <div className="flex justify-between">
        <span className="text-sm text-slate-400">
          {label}
        </span>

        <span className="text-sm font-semibold text-white">
          {safeScore.toFixed(1)}%
        </span>
      </div>

      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">

        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${safeScore}%`,
          }}
          transition={{
            duration: 0.8,
          }}
          className="h-full bg-cyan-400 rounded-full"
        />

      </div>

    </div>
  );
}

// ============================================================
// JOB CARD
// ============================================================

function JobCard({ job, index }) {
  const [expanded, setExpanded] =
    useState(index === 0);

  const score = clampScore(job.score);

  return (
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
        delay: index * 0.05,
      }}
      className={`rounded-2xl border ${getMatchBorder(
        score
      )} bg-slate-900/80 backdrop-blur-xl overflow-hidden`}
    >

      {/* HEADER */}

      <div className="p-6">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div className="flex gap-4">

            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">

              <FiBriefcase className="text-cyan-400 text-xl" />

            </div>

            <div>

              <div className="flex flex-wrap items-center gap-2">

                <h3 className="text-xl font-bold text-white">
                  {job.title}
                </h3>

                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getMatchBackground(
                    score
                  )} ${getMatchColor(score)}`}
                >
                  {job.recommendation_level}
                </span>

              </div>

              <p className="text-sm text-slate-400 mt-1">
                {job.category}
              </p>

            </div>

          </div>

          {/* SCORE */}

          <div className="flex items-center gap-4">

            <div className="text-right">

              <p className="text-xs uppercase tracking-wider text-slate-500">
                Match
              </p>

              <p
                className={`text-3xl font-bold ${getMatchColor(
                  score
                )}`}
              >
                {score.toFixed(1)}%
              </p>

            </div>

            <div className="w-14 h-14 rounded-full border-4 border-slate-700 flex items-center justify-center">

              <FiTarget
                className={getMatchColor(score)}
              />

            </div>

          </div>

        </div>

        {/* DESCRIPTION */}

        <p className="mt-5 text-sm leading-6 text-slate-400">
          {job.description}
        </p>

        {/* MATCHED */}

        {job.matched_skills?.length > 0 && (

          <div className="mt-5">

            <p className="text-xs uppercase tracking-wider text-slate-500 mb-3">
              Matched Skills
            </p>

            <div className="flex flex-wrap gap-2">

              {job.matched_skills.map(
                (skill) => (
                  <SkillBadge
                    key={skill}
                    type="matched"
                  >
                    <FiCheckCircle />
                    {skill}
                  </SkillBadge>
                )
              )}

            </div>

          </div>
        )}

        {/* MISSING */}

        {job.missing_skills?.length > 0 && (

          <div className="mt-5">

            <p className="text-xs uppercase tracking-wider text-slate-500 mb-3">
              Skills To Improve
            </p>

            <div className="flex flex-wrap gap-2">

              {job.missing_skills.map(
                (skill) => (
                  <SkillBadge
                    key={skill}
                    type="missing"
                  >
                    <FiAlertCircle />
                    {skill}
                  </SkillBadge>
                )
              )}

            </div>

          </div>
        )}

      </div>

      {/* EXPAND */}

      <button
        type="button"
        onClick={() =>
          setExpanded(!expanded)
        }
        className="w-full border-t border-slate-800 px-6 py-4 flex items-center justify-between text-sm text-slate-400 hover:text-white hover:bg-slate-800/40 transition"
      >

        <span>
          {expanded
            ? "Hide score breakdown"
            : "View score breakdown"}
        </span>

        {expanded ? (
          <FiChevronUp />
        ) : (
          <FiChevronDown />
        )}

      </button>

      {/* BREAKDOWN */}

      {expanded && (

        <motion.div
          initial={{
            opacity: 0,
            height: 0,
          }}
          animate={{
            opacity: 1,
            height: "auto",
          }}
          className="px-6 pb-6 border-t border-slate-800"
        >

          <div className="pt-5 grid md:grid-cols-3 gap-5">

            <ScoreBar
              label="Skill Match"
              score={job.skill_match}
            />

            <ScoreBar
              label="TF-IDF Similarity"
              score={job.tfidf_score}
            />

            <ScoreBar
              label="Role Relevance"
              score={job.relevance_score}
            />

          </div>

          {/* REQUIRED SKILLS */}

          {job.skills_required?.length > 0 && (

            <div className="mt-6">

              <p className="text-xs uppercase tracking-wider text-slate-500 mb-3">
                Required Skills
              </p>

              <div className="flex flex-wrap gap-2">

                {job.skills_required.map(
                  (skill) => {

                    const matched =
                      job.matched_skills?.some(
                        (item) =>
                          item.toLowerCase() ===
                          skill.toLowerCase()
                      );

                    return (
                      <SkillBadge
                        key={skill}
                        type={
                          matched
                            ? "matched"
                            : "default"
                        }
                      >
                        {matched && (
                          <FiCheckCircle />
                        )}

                        {skill}
                      </SkillBadge>
                    );
                  }
                )}

              </div>

            </div>
          )}

        </motion.div>
      )}

    </motion.div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================

export default function JobRecommendations() {

  const location = useLocation();
  const navigate = useNavigate();

  const [analysis, setAnalysis] =
    useState(null);

  // ==========================================================
  // LOAD DATA
  // ==========================================================

  useEffect(() => {

    let data = location.state;

    // First try router state

    if (
      data &&
      typeof data === "object"
    ) {
      setAnalysis(data);

      // Also save it for refresh
      sessionStorage.setItem(
        "resumeAnalysis",
        JSON.stringify(data)
      );

      return;
    }

    // Then try sessionStorage

    try {

      const stored =
        sessionStorage.getItem(
          "resumeAnalysis"
        );

      if (stored) {

        const parsed =
          JSON.parse(stored);

        setAnalysis(parsed);

      }

    } catch (error) {

      console.error(
        "Could not restore analysis:",
        error
      );

    }

  }, [location.state]);

  // ==========================================================
  // RECOMMENDATIONS
  // ==========================================================

  const recommendations = useMemo(() => {

    if (
      !analysis ||
      !Array.isArray(
        analysis.recommendations
      )
    ) {
      return [];
    }

    return analysis.recommendations
      .map(normalizeJob)
      .filter(Boolean)
      .sort(
        (a, b) =>
          b.score - a.score
      );

  }, [analysis]);

  // ==========================================================
  // EMPTY STATE
  // ==========================================================

  if (!analysis) {

    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

        <div className="text-center max-w-md">

          <div className="w-16 h-16 mx-auto rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">

            <FiInfo className="text-yellow-400 text-2xl" />

          </div>

          <h1 className="mt-6 text-2xl font-bold text-white">
            No Resume Analysis Found
          </h1>

          <p className="mt-3 text-slate-400">
            Please analyze your resume first
            before viewing job recommendations.
          </p>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-6 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
          >
            Analyze Resume
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

      {/* HEADER */}

      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <button
            type="button"
            onClick={() =>
              navigate("/results", {
                state: analysis,
              })
            }
            className="flex items-center gap-2 text-slate-400 hover:text-white transition"
          >
            <FiArrowLeft />

            Back to Results
          </button>

          <div className="flex items-center gap-2">

            <FiBriefcase className="text-cyan-400" />

            <span className="font-bold">
              AI Resume Analyzer
            </span>

          </div>

        </div>

      </header>

      {/* MAIN */}

      <main className="max-w-7xl mx-auto px-6 py-10">

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
            AI Career Matching
          </p>

          <h1 className="mt-2 text-4xl md:text-5xl font-bold">
            Job Recommendations
          </h1>

          <p className="mt-4 text-slate-400 max-w-2xl">
            These roles are ranked according to
            your resume skills, resume similarity,
            and role relevance.
          </p>

        </motion.div>

        {/* SUMMARY */}

        <div className="mt-10 grid md:grid-cols-3 gap-5">

          <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/80 p-6">

            <p className="text-sm text-slate-400">
              Jobs Found
            </p>

            <p className="mt-2 text-4xl font-bold text-cyan-400">
              {recommendations.length}
            </p>

          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-slate-900/80 p-6">

            <p className="text-sm text-slate-400">
              Best Match
            </p>

            <p className="mt-2 text-4xl font-bold text-emerald-400">
              {recommendations.length
                ? `${recommendations[0].score.toFixed(1)}%`
                : "0%"}
            </p>

          </div>

          <div className="rounded-2xl border border-purple-500/20 bg-slate-900/80 p-6">

            <p className="text-sm text-slate-400">
              Top Role
            </p>

            <p className="mt-2 text-xl font-bold text-white">
              {recommendations.length
                ? recommendations[0].title
                : "No role"}
            </p>

          </div>

        </div>

        {/* JOBS */}

        <section className="mt-12">

          {recommendations.length > 0 ? (

            <div className="space-y-5">

              {recommendations.map(
                (job, index) => (
                  <JobCard
                    key={
                      job.id ?? index
                    }
                    job={job}
                    index={index}
                  />
                )
              )}

            </div>

          ) : (

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-12 text-center">

              <FiBriefcase className="mx-auto text-4xl text-slate-600" />

              <h2 className="mt-5 text-xl font-bold text-white">
                No Recommendations Available
              </h2>

              <p className="mt-2 text-slate-400">
                Your resume analysis did not contain
                job recommendation data.
              </p>

              <button
                onClick={() => navigate("/")}
                className="mt-6 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 font-semibold"
              >
                Analyze Resume Again
              </button>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}