from flask import Blueprint, request, jsonify

from services import jobs_db, recommender


# ============================================================
# JOBS BLUEPRINT
# ============================================================

jobs_bp = Blueprint("jobs", __name__)


# ============================================================
# GET ALL JOBS
# ============================================================

@jobs_bp.route("/", methods=["GET"])
def get_jobs():

    try:
        jobs = jobs_db.load_jobs()

        return jsonify({
            "success": True,
            "count": len(jobs),
            "jobs": jobs
        }), 200

    except Exception as error:

        print("Error loading jobs:", error)

        return jsonify({
            "success": False,
            "error": "Failed to load jobs."
        }), 500


# ============================================================
# RECOMMEND JOBS
# ============================================================

@jobs_bp.route("/recommend", methods=["POST"])
def recommend():

    # --------------------------------------------------------
    # Validate JSON
    # --------------------------------------------------------

    if not request.is_json:

        return jsonify({
            "success": False,
            "error": "Request must be application/json"
        }), 415

    try:

        data = request.get_json() or {}

        # ----------------------------------------------------
        # Resume text
        # ----------------------------------------------------

        resume = data.get("resume", "")

        if not isinstance(resume, str):
            resume = str(resume)

        # ----------------------------------------------------
        # Skills sent by frontend
        # ----------------------------------------------------

        frontend_skills = data.get("skills", [])

        if not isinstance(frontend_skills, list):
            frontend_skills = []

        print()
        print("==============================================")
        print("JOB RECOMMENDATION API")
        print("==============================================")

        print("Resume length:", len(resume))

        print(
            "Frontend skills:",
            frontend_skills
        )

        # ----------------------------------------------------
        # Validate resume
        # ----------------------------------------------------

        if not resume.strip():

            return jsonify({
                "success": False,
                "error": "Resume text is empty.",
                "recommendations": []
            }), 400

        # ----------------------------------------------------
        # Load jobs from database
        # ----------------------------------------------------

        jobs = jobs_db.load_jobs()

        print(
            "Jobs loaded:",
            len(jobs)
        )

        if not jobs:

            return jsonify({
                "success": True,
                "recommendations": [],
                "count": 0,
                "message": "No jobs available for recommendation."
            }), 200

        # ----------------------------------------------------
        # Generate recommendations
        # ----------------------------------------------------

        recommendations = recommender.recommend_jobs(
            resume,
            jobs
        )

        # ----------------------------------------------------
        # Safety normalization
        # ----------------------------------------------------

        if not isinstance(recommendations, list):
            recommendations = []

        # ----------------------------------------------------
        # Ensure every recommendation has frontend fields
        # ----------------------------------------------------

        normalized_recommendations = []

        for job in recommendations:

            if not isinstance(job, dict):
                continue

            normalized_recommendations.append({

                "id": job.get("id", ""),

                "relevance_score": round(
                    float(job.get("relevance_score", 0)),
                    2
                ),

                "coverage_bonus": round(
                    float(job.get("coverage_bonus", 0)),
                    2
                ),   

                "title": job.get(
                    "title",
                    "Recommended Job"
                ),

                "category": job.get(
                    "category",
                    ""
                ),

                "skills_required": job.get(
                    "skills_required",
                    []
                ),

                "matched_skills": job.get(
                    "matched_skills",
                    []
                ),

                "skill_match": round(
                    float(
                        job.get(
                            "skill_match",
                            0
                        )
                    ),
                    2
                ),

                "tfidf_score": round(
                    float(
                        job.get(
                            "tfidf_score",
                            0
                        )
                    ),
                    2
                ),

                "score": round(
                    float(
                        job.get(
                            "score",
                            0
                        )
                    ),
                    2
                )
            })

        # ----------------------------------------------------
        # Debug
        # ----------------------------------------------------

        print()
        print(
            "Recommendation count:",
            len(normalized_recommendations)
        )

        for index, job in enumerate(
            normalized_recommendations,
            start=1
        ):

            print(
                f"{index}. "
                f"{job['title']} -> "
                f"{job['score']}%"
            )

            print(
                f"   Skill Match: "
                f"{job['skill_match']}%"
            )

            print(
                f"   TF-IDF: "
                f"{job['tfidf_score']}%"
            )

            print(
                f"   Matched Skills: "
                f"{job['matched_skills']}"
            )

        print(
            "=============================================="
        )

        # ----------------------------------------------------
        # API response
        # ----------------------------------------------------

        return jsonify({

            "success": True,

            "count": len(
                normalized_recommendations
            ),

            "recommendations":
                normalized_recommendations

        }), 200

    except Exception as error:

        print()
        print("==============================================")
        print("JOB RECOMMENDATION ERROR")
        print("==============================================")
        print(error)
        print("==============================================")

        return jsonify({

            "success": False,

            "error":
                "Failed to generate job recommendations.",

            "details":
                str(error),

            "recommendations": []

        }), 500