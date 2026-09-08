import { motion } from "framer-motion";

export default function ATSBreakdown({
  resume = "",
  skills = [],
}) {
  const text = String(resume).toLowerCase();

  const hasAny = (keywords) =>
    keywords.some((keyword) =>
      text.includes(keyword.toLowerCase())
    );

  // -------------------------
  // Skills — 40 points
  // -------------------------

  const skillScore = Math.min(
    40,
    Math.round((skills.length / 10) * 40)
  );

  // -------------------------
  // Projects — 15 points
  // -------------------------

  const projectFound = hasAny([
    "projects",
    "project",
    "developed",
    "built",
    "created",
    "implemented",
  ]);

  const projectScore = projectFound ? 15 : 0;

  // -------------------------
  // Education — 10 points
  // -------------------------

  const educationFound = hasAny([
    "education",
    "b.tech",
    "btech",
    "bachelor",
    "degree",
    "university",
    "college",
  ]);

  const educationScore = educationFound ? 10 : 0;

  // -------------------------
  // Experience — 10 points
  // -------------------------
  // Do NOT use "developer" or "engineer"
  // because those words can appear in
  // job titles or career objectives.

  const experienceFound = hasAny([
    "work experience",
    "professional experience",
    "employment",
    "internship",
    "intern experience",
    "work history",
  ]);

  const experienceScore = experienceFound ? 10 : 0;

  // -------------------------
  // Resume Quality — 25 points
  // -------------------------

  let qualityScore = 0;

  // Resume has reasonable content
  if (text.length >= 500) {
    qualityScore += 5;
  }

  // Resume has substantial content
  if (text.length >= 1000) {
    qualityScore += 5;
  }

  // Professional summary
  if (
    hasAny([
      "professional summary",
      "summary",
      "career objective",
      "objective",
    ])
  ) {
    qualityScore += 3;
  }

  // GitHub
  if (
    hasAny([
      "github.com",
      "github",
    ])
  ) {
    qualityScore += 3;
  }

  // LinkedIn
  if (
    hasAny([
      "linkedin.com",
      "linkedin",
    ])
  ) {
    qualityScore += 3;
  }

  // Certifications
  if (
    hasAny([
      "certification",
      "certifications",
      "certificate",
      "certificates",
    ])
  ) {
    qualityScore += 3;
  }

  // Achievements
  if (
    hasAny([
      "achievement",
      "achievements",
      "award",
      "awards",
    ])
  ) {
    qualityScore += 3;
  }

  qualityScore = Math.min(
    25,
    qualityScore
  );

  // -------------------------
  // Total
  // -------------------------

  const totalScore =
    skillScore +
    projectScore +
    educationScore +
    experienceScore +
    qualityScore;

  const categories = [
    {
      name: "Skills",
      score: skillScore,
      max: 40,
    },
    {
      name: "Projects",
      score: projectScore,
      max: 15,
    },
    {
      name: "Education",
      score: educationScore,
      max: 10,
    },
    {
      name: "Experience",
      score: experienceScore,
      max: 10,
    },
    {
      name: "Resume Quality",
      score: qualityScore,
      max: 25,
    },
  ];

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

      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-2xl font-bold">
            ATS Score Breakdown
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Based on resume structure, skills,
            and content quality
          </p>
        </div>

        <div className="text-right">

          <p className="text-3xl font-bold text-cyan-400">
            {totalScore}/100
          </p>

        </div>

      </div>

      {/* Categories */}

      <div className="space-y-5">

        {categories.map(
          (category, index) => {

            const percentage =
              category.max > 0
                ? (category.score /
                    category.max) *
                  100
                : 0;

            return (
              <motion.div
                key={category.name}
                initial={{
                  opacity: 0,
                  x: -15,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay:
                    index * 0.08,
                }}
              >

                <div className="flex justify-between mb-2">

                  <span className="font-medium">
                    {category.name}
                  </span>

                  <span className="text-slate-400">
                    {category.score}/
                    {category.max}
                  </span>

                </div>

                <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">

                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${percentage}%`,
                    }}
                    transition={{
                      duration: 0.8,
                      delay:
                        index * 0.08,
                    }}
                    className="h-full bg-cyan-400 rounded-full"
                  />

                </div>

              </motion.div>
            );
          }
        )}

      </div>

    </motion.div>
  );
}
