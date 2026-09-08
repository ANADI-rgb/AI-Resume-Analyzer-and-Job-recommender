import { motion } from "framer-motion";

export default function MissingSkills({
  skills = [],
  jobs = [],
}) {
  // Normalize resume skills
  const normalizedSkills = skills
    .map((skill) =>
      String(skill).toLowerCase().trim()
    )
    .filter(Boolean);

  // Extract required skills from recommended jobs
  const allRequiredSkills = [];

  jobs.forEach((job) => {
    const jobText = String(job?.job || "");

    const match = jobText.match(
      /requiring\s+(.+)/i
    );

    if (!match) return;

    const requiredSkills = match[1]
      .split(",")
      .map((skill) =>
        skill.trim()
      )
      .filter(Boolean);

    requiredSkills.forEach((skill) => {
      const normalizedRequired =
        skill.toLowerCase().trim();

      const alreadyExists =
        allRequiredSkills.some(
          (existingSkill) =>
            existingSkill.toLowerCase().trim() ===
            normalizedRequired
        );

      if (!alreadyExists) {
        allRequiredSkills.push(skill);
      }
    });
  });

  // Find skills that are genuinely missing
  const missingSkills =
    allRequiredSkills.filter(
      (requiredSkill) => {
        const normalizedRequired =
          requiredSkill.toLowerCase().trim();

        return !normalizedSkills.some(
          (resumeSkill) =>
            resumeSkill === normalizedRequired
        );
      }
    );

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
        duration: 0.5,
      }}
      className="bg-slate-900 rounded-3xl p-8 border border-slate-700"
    >

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold">
            Missing Skills
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Skills required by recommended jobs
          </p>
        </div>

        {missingSkills.length > 0 && (
          <span className="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-sm">
            {missingSkills.length} Missing
          </span>
        )}

      </div>

      {/* No missing skills */}

      {missingSkills.length === 0 ? (

        <div className="text-center py-8">

          <div className="text-4xl mb-3">
            🎉
          </div>

          <p className="text-green-400 font-semibold">
            Your resume covers the required skills.
          </p>

          <p className="text-slate-400 text-sm mt-2">
            No additional skills were detected as missing.
          </p>

        </div>

      ) : (

        <div>

          <p className="text-slate-400 mb-5">
            Consider adding these skills to improve your
            job matches:
          </p>

          <div className="flex flex-wrap gap-3">

            {missingSkills.map(
              (skill, index) => (

                <motion.span
                  key={`${skill}-${index}`}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  className="px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-300"
                >
                  ✗ {skill}
                </motion.span>

              )
            )}

          </div>

        </div>

      )}

    </motion.div>
  );
}
