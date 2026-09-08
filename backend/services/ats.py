import re


def calculate_ats_score(resume_text, skills):
    """
    Calculate ATS score from resume content.

    Maximum = 100
    Skills = 40
    Projects = 15
    Education = 10
    Experience = 10
    Resume Quality = 25
    """

    text = (resume_text or "").lower()
    skills = skills or []

    # -------------------------
    # Skills — 40 points
    # -------------------------

    skill_score = min(
        40,
        round((len(skills) / 10) * 40)
    )

    # -------------------------
    # Projects — 15 points
    # -------------------------

    project_keywords = [
        "projects",
        "project",
        "developed",
        "built",
        "created",
        "implemented",
    ]

    project_found = any(
        keyword in text
        for keyword in project_keywords
    )

    project_score = 15 if project_found else 0

    # -------------------------
    # Education — 10 points
    # -------------------------

    education_keywords = [
        "education",
        "b.tech",
        "btech",
        "bachelor",
        "degree",
        "university",
        "college",
    ]

    education_found = any(
        keyword in text
        for keyword in education_keywords
    )

    education_score = 10 if education_found else 0

    # -------------------------
    # Experience — 10 points
    # -------------------------

    experience_keywords = [
        "work experience",
        "professional experience",
        "employment",
        "internship",
        "intern experience",
        "work history",
    ]

    experience_found = any(
        keyword in text
        for keyword in experience_keywords
    )

    experience_score = (
        10 if experience_found else 0
    )

    # -------------------------
    # Resume Quality — 25 points
    # -------------------------

    quality_score = 0

    if len(text) >= 500:
        quality_score += 5

    if len(text) >= 1000:
        quality_score += 5

    if any(
        keyword in text
        for keyword in [
            "professional summary",
            "summary",
            "career objective",
            "objective",
        ]
    ):
        quality_score += 3

    if "github.com" in text or "github" in text:
        quality_score += 3

    if "linkedin.com" in text or "linkedin" in text:
        quality_score += 3

    if any(
        keyword in text
        for keyword in [
            "certification",
            "certifications",
            "certificate",
            "certificates",
        ]
    ):
        quality_score += 3

    if any(
        keyword in text
        for keyword in [
            "achievement",
            "achievements",
            "award",
            "awards",
        ]
    ):
        quality_score += 3

    quality_score = min(
        25,
        quality_score
    )

    # -------------------------
    # Total ATS Score
    # -------------------------

    total_score = (
        skill_score
        + project_score
        + education_score
        + experience_score
        + quality_score
    )

    return {
        "total": max(
            0,
            min(100, total_score)
        ),
        "breakdown": {
            "skills": {
                "score": skill_score,
                "max": 40,
            },
            "projects": {
                "score": project_score,
                "max": 15,
            },
            "education": {
                "score": education_score,
                "max": 10,
            },
            "experience": {
                "score": experience_score,
                "max": 10,
            },
            "resume_quality": {
                "score": quality_score,
                "max": 25,
            },
        },
    }
