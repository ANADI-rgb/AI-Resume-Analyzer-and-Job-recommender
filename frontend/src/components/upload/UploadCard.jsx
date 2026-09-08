import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUploadCloud } from "react-icons/fi";

import {
  uploadResume,
  recommendJobs,
} from "../../services/api";

export default function UploadCard() {
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  // ============================================================
  // PROCESS RESUME
  // ============================================================

  const processFile = async (file) => {
    if (!file) return;

    // ==========================================================
    // FILE VALIDATION
    // ==========================================================

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "text/plain",
    ];

    const allowedExtensions = [
      ".pdf",
      ".doc",
      ".docx",
      ".txt",
    ];

    const fileExtension =
      "." +
      file.name
        .split(".")
        .pop()
        .toLowerCase();

    if (
      !allowedTypes.includes(file.type) &&
      !allowedExtensions.includes(fileExtension)
    ) {
      alert(
        "Please upload a PDF, DOC, DOCX or TXT file."
      );

      return;
    }

    // ==========================================================
    // START LOADING
    // ==========================================================

    setFileName(file.name);
    setLoading(true);

    try {
      // ========================================================
      // STEP 1: UPLOAD RESUME
      // ========================================================

      const formData = new FormData();

      formData.append(
        "resume",
        file
      );

      console.log("");
      console.log(
        "=============================================="
      );
      console.log(
        "UPLOADING RESUME"
      );
      console.log(
        "=============================================="
      );

      console.log(
        "Filename:",
        file.name
      );

      console.log(
        "File type:",
        file.type
      );

      console.log(
        "File size:",
        file.size,
        "bytes"
      );

      console.log(
        "=============================================="
      );

      const uploadResponse =
        await uploadResume(formData);

      const uploadData =
        uploadResponse?.data;

      // ========================================================
      // UPLOAD RESPONSE DEBUG
      // ========================================================

      console.log("");
      console.log(
        "=============================================="
      );
      console.log(
        "UPLOAD RESPONSE"
      );
      console.log(
        "=============================================="
      );

      console.log(
        uploadData
      );

      console.log(
        "JSON:",
        JSON.stringify(
          uploadData,
          null,
          2
        )
      );

      console.log(
        "=============================================="
      );

      if (!uploadData) {
        throw new Error(
          "Backend returned an empty response."
        );
      }

      if (
        uploadData.success === false
      ) {
        throw new Error(
          uploadData.error ||
            "Resume upload failed."
        );
      }

      // ========================================================
      // STEP 2: GET COMPLETE RESUME TEXT
      // ========================================================

      /*
       * Backend currently returns:
       *
       * {
       *   success: true,
       *   text: "...",
       *   skills: [...]
       * }
       *
       * We also support alternative field names
       * for backward compatibility.
       */

      let resumeText = "";

      if (
        typeof uploadData.text === "string"
      ) {
        resumeText =
          uploadData.text;
      } else if (
        typeof uploadData.resume_text === "string"
      ) {
        resumeText =
          uploadData.resume_text;
      } else if (
        typeof uploadData.resumeText === "string"
      ) {
        resumeText =
          uploadData.resumeText;
      } else if (
        typeof uploadData.extracted_text === "string"
      ) {
        resumeText =
          uploadData.extracted_text;
      } else if (
        typeof uploadData.extractedText === "string"
      ) {
        resumeText =
          uploadData.extractedText;
      }

      resumeText =
        resumeText.trim();

      // ========================================================
      // RESUME TEXT DEBUG
      // ========================================================

      console.log("");
      console.log(
        "=============================================="
      );
      console.log(
        "RESUME TEXT ANALYSIS"
      );
      console.log(
        "=============================================="
      );

      console.log(
        "Resume text length:",
        resumeText.length
      );

      console.log(
        "Resume text preview:",
        resumeText.substring(
          0,
          500
        )
      );

      console.log(
        "=============================================="
      );

      // ========================================================
      // IMPORTANT VALIDATION
      // ========================================================

      if (!resumeText) {
        throw new Error(
          "Resume text is empty. The backend extracted no readable text from this resume."
        );
      }

      // ========================================================
      // STEP 3: GET SKILLS
      // ========================================================

      const skills =
        Array.isArray(
          uploadData.skills
        )
          ? uploadData.skills
          : [];

      const newSkills =
        Array.isArray(
          uploadData.new_skills
        )
          ? uploadData.new_skills
          : Array.isArray(
              uploadData.newSkills
            )
          ? uploadData.newSkills
          : [];

      const suggestions =
        Array.isArray(
          uploadData.suggestions
        )
          ? uploadData.suggestions
          : [];

      const atsScore =
        Number(
          uploadData.atsScore
        ) || 0;

      const atsBreakdown =
        uploadData.atsBreakdown &&
        typeof uploadData.atsBreakdown ===
          "object"
          ? uploadData.atsBreakdown
          : {};

      // ========================================================
      // RESUME ANALYSIS DEBUG
      // ========================================================

      console.log("");
      console.log(
        "=============================================="
      );
      console.log(
        "RESUME ANALYSIS RESULTS"
      );
      console.log(
        "=============================================="
      );

      console.log(
        "Resume length:",
        resumeText.length
      );

      console.log(
        "Skills:",
        skills
      );

      console.log(
        "Skill count:",
        skills.length
      );

      console.log(
        "New skills:",
        newSkills
      );

      console.log(
        "ATS score:",
        atsScore
      );

      console.log(
        "Suggestions:",
        suggestions
      );

      console.log(
        "=============================================="
      );

      // ========================================================
      // STEP 4: RECOMMEND JOBS
      // ========================================================

      console.log("");
      console.log(
        "=============================================="
      );
      console.log(
        "REQUESTING JOB RECOMMENDATIONS"
      );
      console.log(
        "=============================================="
      );

      console.log(
        "Resume length being sent:",
        resumeText.length
      );

      console.log(
        "Skills being sent:",
        skills
      );

      console.log(
        "Resume preview being sent:",
        resumeText.substring(
          0,
          300
        )
      );

      console.log(
        "=============================================="
      );

      /*
       * IMPORTANT:
       *
       * We send the ACTUAL extracted resume text,
       * not an empty string and not only the skills.
       */

      const recommendationResponse =
        await recommendJobs(
          resumeText,
          skills
        );

      const recommendationData =
        recommendationResponse?.data || {};

      // ========================================================
      // JOB API RESPONSE
      // ========================================================

      console.log("");
      console.log(
        "=============================================="
      );
      console.log(
        "JOB RECOMMENDATION RESPONSE"
      );
      console.log(
        "=============================================="
      );

      console.log(
        JSON.stringify(
          recommendationData,
          null,
          2
        )
      );

      console.log(
        "=============================================="
      );

      // ========================================================
      // CHECK API SUCCESS
      // ========================================================

      if (
        recommendationData.success === false
      ) {
        throw new Error(
          recommendationData.error ||
            "Failed to generate job recommendations."
        );
      }

      // ========================================================
      // EXTRACT RECOMMENDATIONS
      // ========================================================

      let recommendations =
        Array.isArray(
          recommendationData.recommendations
        )
          ? recommendationData.recommendations
          : [];

      console.log("");
      console.log(
        "=============================================="
      );
      console.log(
        "RAW RECOMMENDATIONS"
      );
      console.log(
        "=============================================="
      );

      console.table(
        recommendations
      );

      console.log(
        "Recommendation count:",
        recommendations.length
      );

      console.log(
        "=============================================="
      );

      // ========================================================
      // NORMALIZE RECOMMENDATIONS
      // ========================================================

      recommendations =
        recommendations.map(
          (job, index) => {
            const title =
              job?.title ||
              job?.job_title ||
              job?.role ||
              job?.name ||
              (
                typeof job?.job ===
                "string"
                  ? job.job.replace(
                      / requiring .*/i,
                      ""
                    )
                  : ""
              ) ||
              "Recommended Job";

            const score =
              Number(
                job?.score ??
                  job?.match_score ??
                  job?.matchPercentage ??
                  job?.match ??
                  0
              ) || 0;

            const skillsRequired =
              Array.isArray(
                job?.skills_required
              )
                ? job.skills_required
                : Array.isArray(
                    job?.skills
                  )
                ? job.skills
                : [];

            const matchedSkills =
              Array.isArray(
                job?.matched_skills
              )
                ? job.matched_skills
                : [];

            const missingSkills =
              Array.isArray(
                job?.missing_skills
              )
                ? job.missing_skills
                : [];

            const skillMatch =
              Number(
                job?.skill_match
              ) || 0;

            const tfidfScore =
              Number(
                job?.tfidf_score
              ) || 0;

            return {
              ...job,

              id:
                job?.id ??
                job?.job_id ??
                index + 1,

              title,

              category:
                job?.category ||
                "",

              score: Math.max(
                0,
                Math.min(
                  100,
                  score
                )
              ),

              skills_required:
                skillsRequired,

              matched_skills:
                matchedSkills,

              missing_skills:
                missingSkills,

              skill_match:
                skillMatch,

              tfidf_score:
                tfidfScore,

              description:
                job?.description ||
                job?.job_description ||
                `This ${title} position matches your resume skills and experience.`,
            };
          }
        );

      // ========================================================
      // FINAL RECOMMENDATIONS DEBUG
      // ========================================================

      console.log("");
      console.log(
        "=============================================="
      );
      console.log(
        "FINAL RECOMMENDATIONS"
      );
      console.log(
        "=============================================="
      );

      console.table(
        recommendations.map(
          (job) => ({
            id: job.id,
            title: job.title,
            category:
              job.category,
            score:
              job.score,
            skillMatch:
              job.skill_match,
            tfidf:
              job.tfidf_score,
            matched:
              job.matched_skills?.join(
                ", "
              ),
            missing:
              job.missing_skills?.join(
                ", "
              ),
          })
        )
      );

      console.log(
        "Final job count:",
        recommendations.length
      );

      console.log(
        "=============================================="
      );

      // ========================================================
      // STEP 5: CREATE RESULTS STATE
      // ========================================================

      const resultsState = {
        resume: resumeText,

        skills,

        newSkills,

        atsScore,

        atsBreakdown,

        suggestions,

        recommendations,
      };

      // ========================================================
      // RESULTS STATE DEBUG
      // ========================================================

      console.log("");
      console.log(
        "=============================================="
      );
      console.log(
        "FINAL RESULTS STATE"
      );
      console.log(
        "=============================================="
      );

      console.log(
        "Resume length:",
        resultsState.resume.length
      );

      console.log(
        "Skills:",
        resultsState.skills
      );

      console.log(
        "ATS score:",
        resultsState.atsScore
      );

      console.log(
        "Recommendations:",
        resultsState.recommendations.length
      );

      console.log(
        "=============================================="
      );

      // ========================================================
      // STEP 6: SAVE SESSION
      // ========================================================

      try {
        sessionStorage.setItem(
          "resumeAnalysis",
          JSON.stringify(
            resultsState
          )
        );

        console.log(
          "Resume analysis saved to sessionStorage."
        );
      } catch (storageError) {
        console.warn(
          "Could not save analysis to sessionStorage:",
          storageError
        );
      }

      // ========================================================
      // STEP 7: NAVIGATE TO RESULTS
      // ========================================================

      navigate(
        "/results",
        {
          state: resultsState,
        }
      );

    } catch (error) {
      // ========================================================
      // ERROR HANDLING
      // ========================================================

      console.error("");
      console.error(
        "=============================================="
      );
      console.error(
        "RESUME ANALYSIS ERROR"
      );
      console.error(
        "=============================================="
      );

      console.error(
        "Error:",
        error
      );

      console.error(
        "Message:",
        error?.message
      );

      console.error(
        "Response:",
        error?.response
      );

      console.error(
        "Response data:",
        error?.response?.data
      );

      console.error(
        "Status:",
        error?.response?.status
      );

      console.error(
        "=============================================="
      );

      alert(
        error?.response?.data?.error ||
          error?.message ||
          "Failed to analyze resume."
      );

    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="flex justify-center px-6">

      <motion.div
        whileHover={{
          scale: loading ? 1 : 1.02,
        }}

        className={`w-full max-w-3xl rounded-3xl border-2 p-10 transition ${
          dragging
            ? "border-cyan-400 bg-cyan-500/10"
            : "border-slate-700 bg-slate-900/70"
        } backdrop-blur-xl`}

        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}

        onDragLeave={() => {
          setDragging(false);
        }}

        onDrop={(e) => {
          e.preventDefault();

          setDragging(false);

          const file =
            e.dataTransfer.files?.[0];

          if (file) {
            processFile(file);
          }
        }}
      >

        <div className="flex flex-col items-center text-center">

          {/* Upload Icon */}

          <FiUploadCloud
            className="text-7xl text-cyan-400 mb-5"
          />

          {/* Heading */}

          <h2 className="text-3xl font-bold text-white">
            Upload Your Resume
          </h2>

          <p className="text-gray-400 mt-3">
            Drag & Drop or click below
          </p>

          {/* Upload Button */}

          <button
            type="button"
            disabled={loading}
            onClick={() =>
              inputRef.current?.click()
            }

            className="mt-8 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition px-8 py-3 rounded-xl font-semibold text-white"
          >
            {loading
              ? "Analyzing..."
              : "Choose Resume"}
          </button>

          {/* File Input */}

          <input
            ref={inputRef}

            type="file"

            className="hidden"

            accept=".pdf,.doc,.docx,.txt"

            onChange={(e) => {
              const file =
                e.target.files?.[0];

              if (file) {
                processFile(file);
              }

              e.target.value = "";
            }}
          />

          {/* Selected File */}

          {fileName && !loading && (
            <p className="mt-5 text-cyan-300">
              📄 {fileName}
            </p>
          )}

          {/* Loading */}

          {loading && (
            <div className="mt-8 flex flex-col items-center">

              <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />

              <p className="mt-4 text-cyan-300">
                AI is analyzing your resume...
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Extracting skills and finding matching jobs
              </p>

            </div>
          )}

        </div>

      </motion.div>

    </div>
  );
}