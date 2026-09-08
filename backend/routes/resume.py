from flask import Blueprint, request, jsonify

from services import parser, nlp, jobs_db
from services.ats import calculate_ats_score


# ============================================================
# RESUME BLUEPRINT
# ============================================================

resume_bp = Blueprint("resume", __name__)


# ============================================================
# UPLOAD + ANALYZE RESUME
# ============================================================

@resume_bp.route("/upload", methods=["POST"])
def upload_resume():

    # --------------------------------------------------------
    # Validate uploaded file
    # --------------------------------------------------------

    if "resume" not in request.files:

        return jsonify({
            "success": False,
            "error": "No file uploaded."
        }), 400

    try:

        file = request.files["resume"]

        if not file or not file.filename:

            return jsonify({
                "success": False,
                "error": "Invalid resume file."
            }), 400

        print()
        print("==============================================")
        print("RESUME UPLOAD")
        print("==============================================")

        print(
            "Filename:",
            file.filename
        )

        # ----------------------------------------------------
        # Extract complete resume text
        # ----------------------------------------------------

        text = parser.extract_text(file)

        # Safety conversion
        if text is None:
            text = ""

        text = str(text).strip()

        print(
            "Extracted text length:",
            len(text)
        )

        # ----------------------------------------------------
        # Validate extracted text
        # ----------------------------------------------------

        if not text:

            print(
                "ERROR: Resume text extraction returned empty."
            )

            return jsonify({

                "success": False,

                "error":
                    "Could not extract text from the resume. "
                    "Please make sure the PDF/DOCX contains selectable text.",

                "text": "",

                "skills": [],

                "new_skills": [],

                "atsScore": 0,

                "atsBreakdown": {},

                "suggestions": []

            }), 400

        # ----------------------------------------------------
        # Extract skills
        # ----------------------------------------------------

        skills = nlp.extract_skills(text)

        if not isinstance(skills, list):
            skills = list(skills) if skills else []

        print(
            "Detected skills:",
            skills
        )

        # ----------------------------------------------------
        # Calculate ATS score
        # ----------------------------------------------------

        ats_result = calculate_ats_score(
            text,
            skills
        )

        if not isinstance(ats_result, dict):
            ats_result = {
                "total": 0,
                "breakdown": {}
            }

        ats_score = ats_result.get(
            "total",
            0
        )

        ats_breakdown = ats_result.get(
            "breakdown",
            {}
        )

        # ----------------------------------------------------
        # Load existing jobs
        # ----------------------------------------------------

        existing_jobs = jobs_db.load_jobs()

        print(
            "Jobs loaded:",
            len(existing_jobs)
        )

        # ----------------------------------------------------
        # Detect skills not currently used by jobs
        # ----------------------------------------------------

        job_skill_set = set()

        for job in existing_jobs:

            job_skills = job.get(
                "skills_required",
                []
            )

            if isinstance(job_skills, str):

                job_skills = [
                    skill.strip()
                    for skill in job_skills.split(",")
                    if skill.strip()
                ]

            if isinstance(job_skills, list):

                for skill in job_skills:

                    if skill:

                        job_skill_set.add(
                            str(skill).lower().strip()
                        )

        new_skills = [

            skill

            for skill in skills

            if str(skill).lower().strip()
            not in job_skill_set

        ]

        print(
            "New skills:",
            new_skills
        )

        # ----------------------------------------------------
        # Add new skills
        # ----------------------------------------------------

        if new_skills:

            try:

                jobs_db.add_skills(
                    new_skills
                )

            except Exception as skill_error:

                print(
                    "Warning: Could not add new skills:",
                    skill_error
                )

        # ----------------------------------------------------
        # Generate suggestions
        # ----------------------------------------------------

        suggestions = []

        text_lower = text.lower()

        # LinkedIn
        if "linkedin.com" not in text_lower:

            suggestions.append(
                "Add your LinkedIn profile."
            )

        # Certifications
        if not any(
            word in text_lower
            for word in [
                "certification",
                "certifications",
                "certificate"
            ]
        ):

            suggestions.append(
                "Mention certifications relevant to your role."
            )

        # Docker
        if "docker" not in text_lower:

            suggestions.append(
                "Consider adding Docker if relevant to your target role."
            )

        # GitHub
        if "github.com" not in text_lower:

            suggestions.append(
                "Add your GitHub profile link."
            )

        # ----------------------------------------------------
        # Debug output
        # ----------------------------------------------------

        print()
        print("----------------------------------------------")
        print("RESUME ANALYSIS RESULTS")
        print("----------------------------------------------")

        print(
            "Resume length:",
            len(text)
        )

        print(
            "Skills:",
            skills
        )

        print(
            "Skill count:",
            len(skills)
        )

        print(
            "New skills:",
            new_skills
        )

        print(
            "ATS score:",
            ats_score
        )

        print(
            "Suggestions:",
            suggestions
        )

        print("----------------------------------------------")
        print(
            "Returning complete resume text:",
            len(text),
            "characters"
        )
        print("==============================================")

        # ----------------------------------------------------
        # FINAL RESPONSE
        # ----------------------------------------------------

        return jsonify({

            "success": True,

            # IMPORTANT:
            # Return the COMPLETE extracted resume text.
            "text": text,

            "skills": skills,

            "new_skills": new_skills,

            "atsScore": ats_score,

            "atsBreakdown": ats_breakdown,

            "suggestions": suggestions

        }), 200

    except Exception as error:

        print()
        print("==============================================")
        print("RESUME ANALYSIS ERROR")
        print("==============================================")
        print(error)
        print("==============================================")

        return jsonify({

            "success": False,

            "error":
                "Failed to analyze resume.",

            "details":
                str(error),

            "text": "",

            "skills": [],

            "new_skills": [],

            "atsScore": 0,

            "atsBreakdown": {},

            "suggestions": []

        }), 500