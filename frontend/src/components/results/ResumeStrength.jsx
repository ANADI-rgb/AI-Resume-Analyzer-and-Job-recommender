import { motion } from "framer-motion";

export default function ResumeStrength({ skills = [] }) {
  const normalizedSkills = skills.map((skill) =>
    skill.toLowerCase().trim()
  );

  const hasSkill = (skill) =>
    normalizedSkills.includes(skill.toLowerCase());

  const categories = [
    {
      name: "Programming",
      skills: ["python", "java", "c", "c++"],
      weight: 25,
    },
    {
      name: "Data & AI",
      skills: [
        "python",
        "machine learning",
        "nlp",
        "numpy",
        "pandas",
        "sql",
      ],
      weight: 30,
    },
    {
      name: "Cloud",
      skills: ["aws", "azure", "gcp"],
      weight: 20,
    },
    {
      name: "Development",
      skills: [
        "html",
        "css",
        "javascript",
        "react",
        "node.js",
        "flask",
      ],
      weight: 15,
    },
    {
      name: "DevOps",
      skills: ["docker", "kubernetes", "jenkins", "airflow"],
      weight: 10,
    },
  ];

  const categoryScores = categories.map((category) => {
    const matched = category.skills.filter(hasSkill).length;

    const score = Math.round(
      (matched / category.skills.length) * 100
    );

    return {
      ...category,
      score,
    };
  });

  const overallScore = Math.round(
    categoryScores.reduce(
      (total, category) =>
        total + (category.score * category.weight) / 100,
      0
    )
  );

  const strengths = [];

  if (hasSkill("python")) {
    strengths.push("Strong Python foundation");
  }

  if (hasSkill("sql")) {
    strengths.push("Good SQL and database skills");
  }

  if (
    hasSkill("machine learning") ||
    hasSkill("nlp")
  ) {
    strengths.push("AI/ML skills detected");
  }

  if (hasSkill("git") || hasSkill("github")) {
    strengths.push("Version control experience detected");
  }

  const weaknesses = [];

  if (!hasSkill("aws") && !hasSkill("azure") && !hasSkill("gcp")) {
    weaknesses.push("Cloud skills need improvement");
  }

  if (!hasSkill("docker")) {
    weaknesses.push("Docker is missing");
  }

  if (!hasSkill("airflow")) {
    weaknesses.push("Airflow is missing");
  }

  if (!hasSkill("spark")) {
    weaknesses.push("Apache Spark is missing");
  }

  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-700">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        <div>
          <h2 className="text-2xl font-bold">
            Resume Strength Analysis
          </h2>

          <p className="text-gray-400 mt-2">
            Analysis based on your detected technical skills.
          </p>
        </div>

        <div className="text-center">

          <div className="text-5xl font-bold text-cyan-400">
            {overallScore}%
          </div>

          <p className="text-gray-400 text-sm mt-1">
            Overall Strength
          </p>

        </div>

      </div>

      {/* Category Scores */}

      <div className="mt-8 space-y-5">

        {categoryScores.map((category) => (

          <div key={category.name}>

            <div className="flex justify-between mb-2">

              <span className="font-medium">
                {category.name}
              </span>

              <span className="text-cyan-400">
                {category.score}%
              </span>

            </div>

            <div className="h-3 bg-slate-700 rounded-full overflow-hidden">

              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${category.score}%`,
                }}
                transition={{
                  duration: 1,
                }}
                className="h-full bg-cyan-400 rounded-full"
              />

            </div>

          </div>

        ))}

      </div>

      {/* Strengths */}

      {strengths.length > 0 && (
        <div className="mt-8">

          <h3 className="text-xl font-semibold mb-4">
            Strengths
          </h3>

          <div className="space-y-2">

            {strengths.map((item) => (
              <div
                key={item}
                className="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 text-green-400"
              >
                ✅ {item}
              </div>
            ))}

          </div>

        </div>
      )}

      {/* Weaknesses */}

      {weaknesses.length > 0 && (
        <div className="mt-8">

          <h3 className="text-xl font-semibold mb-4">
            Areas to Improve
          </h3>

          <div className="space-y-2">

            {weaknesses.map((item) => (
              <div
                key={item}
                className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-3 text-yellow-400"
              >
                ⚠️ {item}
              </div>
            ))}

          </div>

        </div>
      )}

    </div>
  );
}