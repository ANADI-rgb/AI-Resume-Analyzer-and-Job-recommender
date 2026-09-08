import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiFileText,
  FiBriefcase,
  FiTarget,
  FiLogOut,
  FiUpload,
  FiUser,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    // Get logged-in user
    try {
      const storedUser =
        sessionStorage.getItem("authUser");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error(
        "Unable to load user:",
        error
      );
    }

    // Get latest resume analysis
    try {
      const storedAnalysis =
        sessionStorage.getItem(
          "resumeAnalysis"
        );

      if (storedAnalysis) {
        setAnalysis(
          JSON.parse(storedAnalysis)
        );
      }
    } catch (error) {
      console.error(
        "Unable to load analysis:",
        error
      );
    }
  }, []);

  const logout = () => {
    sessionStorage.removeItem("authUser");
    sessionStorage.removeItem("authToken");

    navigate("/login", {
      replace: true,
    });
  };

  const atsScore =
    Number(analysis?.atsScore) || 0;

  const skillsCount = Array.isArray(
    analysis?.skills
  )
    ? analysis.skills.length
    : 0;

  const jobsCount = Array.isArray(
    analysis?.recommendations
  )
    ? analysis.recommendations.length
    : 0;

  const topJob =
    jobsCount > 0
      ? analysis.recommendations[0]
      : null;

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ================================================== */}
      {/* HEADER */}
      {/* ================================================== */}

      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl sticky top-0 z-40">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">

              <FiFileText className="text-cyan-400 text-xl" />

            </div>

            <div>
              <h1 className="font-bold">
                AI Resume Analyzer
              </h1>

              <p className="text-xs text-slate-500">
                Dashboard
              </p>
            </div>

          </div>

          <div className="flex items-center gap-4">

            <div className="hidden sm:flex items-center gap-2">

              <FiUser className="text-slate-400" />

              <span className="text-sm text-slate-300">
                {user?.name || "User"}
              </span>

            </div>

            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition"
            >
              <FiLogOut />

              <span className="hidden sm:inline">
                Logout
              </span>
            </button>

          </div>

        </div>

      </header>

      {/* ================================================== */}
      {/* MAIN */}
      {/* ================================================== */}

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* WELCOME */}

        <section>

          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">
            Dashboard
          </p>

          <h2 className="mt-2 text-4xl md:text-5xl font-bold">
            Welcome back
            {user?.name
              ? `, ${user.name}`
              : ""}
          </h2>

          <p className="mt-4 text-slate-400 max-w-2xl">
            Manage your resume analysis,
            review your ATS score, and explore
            AI-powered job recommendations.
          </p>

        </section>

        {/* ================================================== */}
        {/* STAT CARDS */}
        {/* ================================================== */}

        <section className="mt-10 grid md:grid-cols-3 gap-5">

          {/* ATS */}

          <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/80 p-6">

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

                <FiTarget className="text-cyan-400 text-2xl" />

              </div>

            </div>

            <div className="mt-5 h-2 bg-slate-800 rounded-full overflow-hidden">

              <div
                className="h-full bg-cyan-400 rounded-full transition-all"
                style={{
                  width: `${atsScore}%`,
                }}
              />

            </div>

          </div>

          {/* SKILLS */}

          <div className="rounded-2xl border border-purple-500/20 bg-slate-900/80 p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-400">
                  Skills Detected
                </p>

                <p className="mt-2 text-4xl font-bold text-white">
                  {skillsCount}
                </p>

              </div>

              <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center">

                <FiCheckCircle className="text-purple-400 text-2xl" />

              </div>

            </div>

            <p className="mt-4 text-sm text-slate-500">
              Skills extracted from your latest
              resume.
            </p>

          </div>

          {/* JOBS */}

          <div className="rounded-2xl border border-emerald-500/20 bg-slate-900/80 p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-400">
                  Jobs Matched
                </p>

                <p className="mt-2 text-4xl font-bold text-white">
                  {jobsCount}
                </p>

              </div>

              <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center">

                <FiBriefcase className="text-emerald-400 text-2xl" />

              </div>

            </div>

            <p className="mt-4 text-sm text-slate-500">
              AI-recommended job roles.
            </p>

          </div>

        </section>

        {/* ================================================== */}
        {/* QUICK ACTIONS */}
        {/* ================================================== */}

        <section className="mt-10 grid md:grid-cols-2 gap-5">

          {/* ANALYZE */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-7">

            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">

              <FiUpload className="text-cyan-400 text-xl" />

            </div>

            <h3 className="mt-5 text-xl font-bold">
              Analyze a New Resume
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Upload a resume to calculate its
              ATS score, extract skills, and get
              personalized job recommendations.
            </p>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 font-semibold transition"
            >
              Upload Resume

              <FiArrowRight />
            </button>

          </div>

          {/* JOBS */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-7">

            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">

              <FiBriefcase className="text-emerald-400 text-xl" />

            </div>

            <h3 className="mt-5 text-xl font-bold">
              Job Recommendations
            </h3>

            {topJob ? (

              <>
                <p className="mt-2 text-sm text-slate-400">
                  Your strongest current match is:
                </p>

                <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-4">

                  <div>

                    <p className="font-semibold text-white">
                      {topJob.title ||
                        topJob.job_title ||
                        "Recommended Job"}
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      Top recommended role
                    </p>

                  </div>

                  <span className="text-emerald-400 font-bold">
                    {Number(
                      topJob.score || 0
                    ).toFixed(1)}
                    %
                  </span>

                </div>

              </>

            ) : (

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Analyze your resume first to
                receive personalized job
                recommendations.
              </p>

            )}

            <button
              type="button"
              onClick={() => {

                if (analysis) {
                  navigate("/jobs", {
                    state: analysis,
                  });
                } else {
                  navigate("/");
                }

              }}
              className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 font-semibold transition"
            >
              {analysis
                ? "View Recommendations"
                : "Analyze Resume"}

              <FiArrowRight />

            </button>

          </div>

        </section>

        {/* ================================================== */}
        {/* LATEST ANALYSIS */}
        {/* ================================================== */}

        <section className="mt-10">

          <div className="flex items-center justify-between">

            <div>

              <h3 className="text-2xl font-bold">
                Latest Resume Analysis
              </h3>

              <p className="mt-2 text-slate-400">
                Review your most recent analysis.
              </p>

            </div>

          </div>

          {analysis ? (

            <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/80 p-6">

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    ATS Score
                  </p>

                  <p className="mt-2 text-2xl font-bold text-cyan-400">
                    {atsScore}/100
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Skills
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {skillsCount}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Recommendations
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {jobsCount}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Best Match
                  </p>

                  <p className="mt-2 text-lg font-bold text-emerald-400">
                    {topJob?.title ||
                      "No recommendation"}
                  </p>
                </div>

              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">

                <button
                  type="button"
                  onClick={() =>
                    navigate("/results", {
                      state: analysis,
                    })
                  }
                  className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 font-semibold transition"
                >
                  View Resume Results
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/jobs", {
                      state: analysis,
                    })
                  }
                  className="px-5 py-3 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 font-semibold transition"
                >
                  View Job Recommendations
                </button>

              </div>

            </div>

          ) : (

            <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-10 text-center">

              <FiFileText className="mx-auto text-4xl text-slate-600" />

              <h4 className="mt-4 text-lg font-semibold">
                No Resume Analysis Yet
              </h4>

              <p className="mt-2 text-slate-500">
                Upload your resume to start your
                first analysis.
              </p>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="mt-5 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 font-semibold transition"
              >
                Analyze Resume
              </button>

            </div>

          )}

        </section>

      </main>

      {/* ================================================== */}
      {/* FOOTER */}
      {/* ================================================== */}

      <footer className="border-t border-slate-800 mt-16">

        <div className="max-w-7xl mx-auto px-6 py-8 text-center">

          <p className="text-sm text-slate-500">
            AI Resume Analyzer
          </p>

          <p className="mt-1 text-xs text-slate-600">
            AI-powered resume analysis and career
            recommendations.
          </p>

        </div>

      </footer>

    </div>
  );
}