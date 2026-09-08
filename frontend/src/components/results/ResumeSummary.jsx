import { motion } from "framer-motion";

export default function ResumeSummary({ resume = "" }) {

  const extractEmail = (text) => {
    const match = text.match(
      /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
    );

    return match ? match[0] : null;
  };

  const extractPhone = (text) => {
    const match = text.match(
      /(?:\+91[\s-]?)?[6-9]\d{9}/
    );

    return match ? match[0] : null;
  };

  const extractGithub = (text) => {
    const match = text.match(
      /(?:https?:\/\/)?(?:www\.)?github\.com\/[A-Za-z0-9_.-]+/i
    );

    return match ? match[0] : null;
  };

  const extractLinkedin = (text) => {
    const match = text.match(
      /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9_.-]+/i
    );

    return match ? match[0] : null;
  };

  const email = extractEmail(resume);
  const phone = extractPhone(resume);
  const github = extractGithub(resume);
  const linkedin = extractLinkedin(resume);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-900 rounded-3xl p-8 border border-slate-700"
    >

      <h2 className="text-2xl font-bold mb-6">
        Resume Overview
      </h2>

      <div className="grid sm:grid-cols-2 gap-4">

        {/* Email */}

        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-sm text-slate-400">
            Email
          </p>

          <p className="mt-1 text-cyan-300 break-all">
            {email || "Not Found"}
          </p>
        </div>

        {/* Phone */}

        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-sm text-slate-400">
            Phone
          </p>

          <p className="mt-1 text-cyan-300">
            {phone || "Not Found"}
          </p>
        </div>

        {/* GitHub */}

        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-sm text-slate-400">
            GitHub
          </p>

          {github ? (
            <a
              href={
                github.startsWith("http")
                  ? github
                  : `https://${github}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-cyan-300 hover:text-cyan-200 break-all"
            >
              {github}
            </a>
          ) : (
            <p className="mt-1 text-red-400">
              Not Found
            </p>
          )}
        </div>

        {/* LinkedIn */}

        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-sm text-slate-400">
            LinkedIn
          </p>

          {linkedin ? (
            <a
              href={
                linkedin.startsWith("http")
                  ? linkedin
                  : `https://${linkedin}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-cyan-300 hover:text-cyan-200 break-all"
            >
              {linkedin}
            </a>
          ) : (
            <p className="mt-1 text-red-400">
              Not Found
            </p>
          )}
        </div>

      </div>

      {/* Resume Preview */}

      <div className="mt-8">

        <h3 className="text-xl font-semibold mb-4">
          Resume Preview
        </h3>

        <div className="bg-slate-800 rounded-2xl p-5 max-h-72 overflow-y-auto">

          <p className="text-slate-300 leading-7 whitespace-pre-line">
            {resume
              ? `${resume.substring(0, 1200)}${
                  resume.length > 1200 ? "..." : ""
                }`
              : "No resume available"}
          </p>

        </div>

      </div>

    </motion.div>
  );
}