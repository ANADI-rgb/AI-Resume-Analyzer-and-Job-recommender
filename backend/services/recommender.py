import re

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


# ============================================================
# SKILL NORMALIZATION
# ============================================================

def normalize_skill(skill):
    if not skill:
        return ""

    skill = str(skill).lower().strip()

    replacements = {
        "scikit-learn": "sklearn",
        "scikit learn": "sklearn",

        "machine-learning": "machine learning",
        "machinelearning": "machine learning",

        "deep-learning": "deep learning",
        "deeplearning": "deep learning",

        "natural language processing": "nlp",

        "artificial intelligence": "ai",

        "amazon web services": "aws",

        "structured query language": "sql",

        "java script": "javascript",

        "react.js": "react",
        "reactjs": "react",

        "node.js": "node",
        "nodejs": "node",

        "express.js": "express",
        "expressjs": "express",

        "power-bi": "power bi",
        "powerbi": "power bi",

        "adobe-xd": "adobe xd",

        "react-native": "react native",
        "reactnative": "react native",
    }

    return replacements.get(skill, skill)


# ============================================================
# KNOWN SKILLS
# ============================================================

KNOWN_SKILLS = [

    # Programming
    "python",
    "java",
    "c",
    "c++",
    "c#",
    "javascript",
    "typescript",

    # Web
    "html",
    "css",
    "react",
    "node",
    "express",
    "flask",
    "django",

    # Database
    "sql",
    "mysql",
    "postgresql",
    "mongodb",

    # Data
    "pandas",
    "numpy",
    "matplotlib",
    "seaborn",

    # AI / ML
    "machine learning",
    "deep learning",
    "artificial intelligence",
    "nlp",
    "natural language processing",
    "tensorflow",
    "pytorch",
    "keras",
    "scikit-learn",
    "sklearn",

    # Cloud / DevOps
    "aws",
    "azure",
    "gcp",
    "docker",
    "kubernetes",

    # Version Control
    "git",
    "github",

    # Data / BI
    "excel",
    "tableau",
    "power bi",

    # Management
    "agile",
    "scrum",
    "leadership",

    # Design
    "figma",
    "adobe xd",
    "user research",

    # Mobile
    "swift",
    "kotlin",
    "react native",
]


# ============================================================
# EXTRACT RESUME SKILLS
# ============================================================

def extract_resume_skills(resume_text):

    if not resume_text:
        return set()

    text = str(resume_text).lower()

    found = set()

    for skill in KNOWN_SKILLS:

        normalized = normalize_skill(skill)

        if not normalized:
            continue

        pattern = (
            r"(?<!\w)"
            + re.escape(normalized)
            + r"(?!\w)"
        )

        if re.search(pattern, text):
            found.add(normalized)

    return found


# ============================================================
# NORMALIZE JOB DATA
# ============================================================

def normalize_jobs(jobs):

    normalized_jobs = []

    for job in jobs:

        if not isinstance(job, dict):
            continue

        title = str(
            job.get("title")
            or job.get("job_title")
            or ""
        ).strip()

        category = str(
            job.get("category")
            or ""
        ).strip()

        skills = job.get(
            "skills_required",
            []
        )

        if isinstance(skills, str):

            skills = [
                skill.strip()
                for skill in skills.split(",")
                if skill.strip()
            ]

        if not isinstance(skills, list):
            skills = []

        skills = [
            str(skill).strip()
            for skill in skills
            if str(skill).strip()
        ]

        normalized_jobs.append({

            "id": str(
                job.get("id", "")
            ),

            "title": title,

            "category": category,

            "skills_required": skills

        })

    return normalized_jobs


# ============================================================
# BUILD JOB SEARCH TEXT
# ============================================================

def build_job_text(job):

    title = job.get(
        "title",
        ""
    )

    category = job.get(
        "category",
        ""
    )

    skills = job.get(
        "skills_required",
        []
    )

    return (
        f"{title} "
        f"{category} "
        f"{' '.join(skills)}"
    )


# ============================================================
# TITLE / CATEGORY RELEVANCE
# ============================================================

def calculate_relevance(
    resume_text,
    resume_skills,
    job
):

    resume_lower = resume_text.lower()

    title = job["title"].lower()

    category = job["category"].lower()

    relevance = 0.0

    # --------------------------------------------------------
    # Title words appearing in resume
    # --------------------------------------------------------

    title_words = set(
        re.findall(
            r"[a-zA-Z]+",
            title
        )
    )

    ignored_words = {
        "developer",
        "engineer",
        "analyst",
        "manager",
        "designer"
    }

    title_words -= ignored_words

    if title_words:

        matched_title_words = sum(
            1
            for word in title_words
            if word in resume_lower
        )

        title_match = (
            matched_title_words
            /
            len(title_words)
        )

        relevance += (
            title_match * 70
        )

    # --------------------------------------------------------
    # Category relevance
    # --------------------------------------------------------

    if category and category in resume_lower:

        relevance += 30

    # --------------------------------------------------------
    # Related keyword bonus
    # --------------------------------------------------------

    category_keywords = {

        "software": {
            "python",
            "java",
            "javascript",
            "react",
            "node",
            "flask"
        },

        "ai": {
            "python",
            "machine learning",
            "deep learning",
            "tensorflow",
            "pytorch",
            "nlp"
        },

        "data": {
            "python",
            "sql",
            "pandas",
            "numpy",
            "tableau",
            "excel"
        },

        "cloud": {
            "aws",
            "azure",
            "gcp",
            "docker",
            "kubernetes"
        },

        "design": {
            "figma",
            "adobe xd",
            "user research"
        },

        "management": {
            "agile",
            "scrum",
            "leadership"
        }
    }

    category_key = category.lower()

    related_skills = category_keywords.get(
        category_key,
        set()
    )

    related_matches = (
        resume_skills &
        related_skills
    )

    if related_skills:

        relevance += min(
            20,
            len(related_matches) * 5
        )

    return min(
        100.0,
        relevance
    )


# ============================================================
# RECOMMEND JOBS
# ============================================================

def recommend_jobs(
    resume_text,
    jobs
):

    # ========================================================
    # VALIDATION
    # ========================================================

    if not resume_text:
        print("❌ Empty resume text.")
        return []

    resume_text = str(
        resume_text
    ).strip()

    if not resume_text:
        print("❌ Resume contains no text.")
        return []

    if not jobs:
        print("❌ No jobs available.")
        return []

    # ========================================================
    # NORMALIZE JOBS
    # ========================================================

    normalized_jobs = normalize_jobs(
        jobs
    )

    if not normalized_jobs:
        return []

    # ========================================================
    # RESUME SKILLS
    # ========================================================

    resume_skills = extract_resume_skills(
        resume_text
    )

    print()
    print("==============================================")
    print("IMPROVED JOB RECOMMENDATION ENGINE")
    print("==============================================")

    print(
        "Resume length:",
        len(resume_text)
    )

    print(
        "Detected skills:",
        sorted(resume_skills)
    )

    print(
        "Skill count:",
        len(resume_skills)
    )

    print(
        "Jobs loaded:",
        len(normalized_jobs)
    )

    # ========================================================
    # TF-IDF
    # ========================================================

    job_texts = [
        build_job_text(job)
        for job in normalized_jobs
    ]

    try:

        vectorizer = TfidfVectorizer(

            stop_words="english",

            ngram_range=(1, 2),

            lowercase=True,

            sublinear_tf=True

        )

        vectors = vectorizer.fit_transform(

            [
                resume_text
            ]
            +
            job_texts

        )

        tfidf_scores = cosine_similarity(

            vectors[0:1],

            vectors[1:]

        ).flatten()

    except Exception as error:

        print(
            "TF-IDF error:",
            error
        )

        tfidf_scores = [
            0.0
            for _ in normalized_jobs
        ]

    # ========================================================
    # SCORE JOBS
    # ========================================================

    recommendations = []

    for index, job in enumerate(
        normalized_jobs
    ):

        # ----------------------------------------------------
        # Required skills
        # ----------------------------------------------------

        required_skills = {

            normalize_skill(skill)

            for skill in job[
                "skills_required"
            ]

            if normalize_skill(skill)

        }

        # ----------------------------------------------------
        # Matched skills
        # ----------------------------------------------------

        matched_skills = (
            resume_skills &
            required_skills
        )

        # ----------------------------------------------------
        # Missing skills
        # ----------------------------------------------------

        missing_skills = (
            required_skills -
            resume_skills
        )

        # ----------------------------------------------------
        # Skill match
        # ----------------------------------------------------

        if required_skills:

            skill_match = (

                len(matched_skills)
                /
                len(required_skills)

            ) * 100

        else:

            skill_match = 0.0

        # ----------------------------------------------------
        # TF-IDF
        # ----------------------------------------------------

        tfidf_score = (
            float(
                tfidf_scores[index]
            )
            * 100
        )

        # ----------------------------------------------------
        # Relevance
        # ----------------------------------------------------

        relevance_score = calculate_relevance(

            resume_text,

            resume_skills,

            job

        )

        # ====================================================
        # FINAL SCORE
        # ====================================================

        final_score = (

            skill_match * 0.60

            +

            tfidf_score * 0.20

            +

            relevance_score * 0.10

        )

        # ----------------------------------------------------
        # Additional skill coverage bonus
        # ----------------------------------------------------

        if required_skills:

            coverage = (
                len(matched_skills)
                /
                len(required_skills)
            )

            coverage_bonus = (
                coverage * 10
            )

        else:

            coverage_bonus = 0.0

        final_score += coverage_bonus

        # ----------------------------------------------------
        # Clamp score
        # ----------------------------------------------------

        final_score = max(
            0.0,
            min(
                100.0,
                final_score
            )
        )

        # ----------------------------------------------------
        # Recommendation
        # ----------------------------------------------------

        recommendations.append({

            "id": job["id"],

            "title": job["title"],

            "category": job["category"],

            "skills_required":
                job["skills_required"],

            "matched_skills":
                sorted(matched_skills),

            "missing_skills":
                sorted(missing_skills),

            "skill_match":
                round(skill_match, 2),

            "tfidf_score":
                round(tfidf_score, 2),

            "relevance_score":
                round(relevance_score, 2),

            "coverage_bonus":
                round(coverage_bonus, 2),

            "score":
                round(final_score, 2)

        })

    # ========================================================
    # SORT
    # ========================================================

    recommendations.sort(

        key=lambda job:
        job["score"],

        reverse=True

    )

    # ========================================================
    # DEBUG
    # ========================================================

    print()
    print("==============================================")
    print("IMPROVED RECOMMENDATION RESULTS")
    print("==============================================")

    for index, job in enumerate(
        recommendations,
        start=1
    ):

        print(
            f"{index}. "
            f"{job['title']} "
            f"-> "
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
            f"   Relevance: "
            f"{job['relevance_score']}%"
        )

        print(
            f"   Matched: "
            f"{job['matched_skills']}"
        )

        print(
            f"   Missing: "
            f"{job['missing_skills']}"
        )

    print(
        "=============================================="
    )

    print(
        "Returning:",
        min(10, len(recommendations)),
        "jobs"
    )

    # ========================================================
    # TOP 10
    # ========================================================

    return recommendations[:10]