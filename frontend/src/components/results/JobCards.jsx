import { motion } from "framer-motion";

export default function JobCards({
  jobs = [],
  skills = [],
}) {
  // Normalize resume skills once
  const normalizedSkills = skills
    .map((skill) =>
      String(skill).toLowerCase().trim()
    )
    .filter(Boolean);

  // Extract required skills from:
  // "Data Scientist requiring Python, SQL, Pandas"
  const getRequiredSkills = (jobText = "") => {
    const match = String(jobText).match(
      /requiring\s+(.+)/i
    );

    if (!match) return [];

    return match[1]
      .split(",")
      .map((skill) =>
        skill.trim()
      )
      .filter(Boolean);
  };

  // Check whether a resume skill matches a required skill
  const isSkillMatched = (requiredSkill) => {
    const normalizedRequired =
      requiredSkill.toLowerCase().trim();

    return normalizedSkills.some(
      (resumeSkill) =>
        resumeSkill === normalizedRequired
    );
  };

  // Calculate job match
  const getMatchInfo = (job) => {
    const requiredSkills =
      getRequiredSkills(job?.job);

    const matchedSkills =
      requiredSkills.filter(
        (skill) =>
          isSkillMatched(skill)
      );

    const matchPercentage =
      requiredSkills.length > 0
        ? Math.round(
            (matchedSkills.length /
              requiredSkills.length) *
              100
          )
        : 0;

    return {
      requiredSkills,
      matchedSkills,
      matchPercentage,
    };
  };

  // Match labels
  const getMatchLabel = (percentage) => {
    if (percentage >= 80) {
      return "Excellent Match";
    }

    if (percentage >= 60) {
      return "Good Match";
    }

    if (percentage >= 40) {
      return "Moderate Match";
    }

    return "Poor Match";
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700">

      <h2 className="text-2xl font-bold mb-6">
        Recommended Jobs
      </h2>

      <div className="space-y-5">

        {jobs.length === 0 ? (

          <div className="text-center py-10">
            <p className="text-slate-400">
              No job recommendations available.
            </p>
          </div>

        ) : (

          jobs.map((job, index) => {

            const {
              requiredSkills,
              matchedSkills,
              matchPercentage,
            } = getMatchInfo(job);

            const matchLabel =
              getMatchLabel(
                matchPercentage
              );

            return (
              <motion.div
                key={`${job.job}-${index}`}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
                className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-cyan-500/50 transition"
              >

                {/* Job title */}

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                  <div>

                    <h3 className="font-bold text-xl">
                      {String(job.job || "").replace(
                        / requiring .*/i,
                        ""
                      )}
                    </h3>

                    <p
                      className={`text-sm mt-1 ${
                        matchPercentage >= 80
                          ? "text-green-400"
                          : matchPercentage >= 60
                          ? "text-cyan-400"
                          : matchPercentage >= 40
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {matchLabel}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-sm text-slate-400">
                      Match Score
                    </p>

                    <p className="text-2xl font-bold text-cyan-400">
                      {matchPercentage}%
                    </p>

                  </div>

                </div>

                {/* Progress */}

                <div className="mt-5">

                  <div className="flex justify-between text-sm mb-2">

                    <span className="text-slate-400">
                      Your Match
                    </span>

                    <span className="text-cyan-300">
                      {matchPercentage}%
                    </span>

                  </div>

                  <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">

                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: `${matchPercentage}%`,
                      }}
                      transition={{
                        duration: 1,
                        delay: index * 0.05,
                      }}
                      className="h-full bg-cyan-400 rounded-full"
                    />

                  </div>

                </div>

                {/* Required skills */}

                <div className="mt-5">

                  <p className="text-sm font-semibold text-slate-300 mb-3">
                    Required Skills
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {requiredSkills.length === 0 ? (

                      <span className="text-sm text-slate-500">
                        No required skills found.
                      </span>

                    ) : (

                      requiredSkills.map(
                        (skill, skillIndex) => {

                          const matched =
                            isSkillMatched(
                              skill
                            );

                          return (
                            <span
                              key={`${skill}-${skillIndex}`}
                              className={`px-3 py-1.5 rounded-full text-sm border ${
                                matched
                                  ? "bg-green-500/20 text-green-300 border-green-500/30"
                                  : "bg-red-500/20 text-red-300 border-red-500/30"
                              }`}
                            >
                              {matched
                                ? "✓"
                                : "✗"}{" "}
                              {skill}
                            </span>
                          );
                        }
                      )

                    )}

                  </div>

                </div>

                {/* Match summary */}

                <div className="mt-5 text-sm text-slate-400">

                  <span className="text-green-400">
                    {matchedSkills.length}
                  </span>

                  {" of "}

                  <span className="text-slate-300">
                    {requiredSkills.length}
                  </span>

                  {" required skills matched"}

                </div>

                {/* Action */}

                <button
                  type="button"
                  className="mt-5 px-5 py-2 rounded-xl bg-slate-700 hover:bg-cyan-500 transition text-sm font-semibold"
                >
                  Apply Later
                </button>

              </motion.div>
            );
          })

        )}

      </div>

    </div>
  );
}
