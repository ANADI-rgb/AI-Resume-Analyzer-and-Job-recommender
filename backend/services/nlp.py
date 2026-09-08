import re

KNOWN_SKILLS = {
    "python",
    "java",
    "c",
    "c++",
    "javascript",
    "typescript",
    "html",
    "css",
    "react",
    "angular",
    "vue",
    "node.js",
    "express",
    "flask",
    "django",
    "fastapi",
    "sql",
    "mysql",
    "postgresql",
    "mongodb",
    "firebase",
    "docker",
    "kubernetes",
    "git",
    "github",
    "aws",
    "azure",
    "gcp",
    "tensorflow",
    "pytorch",
    "scikit-learn",
    "numpy",
    "pandas",
    "machine learning",
    "deep learning",
    "nlp",
    "opencv",
    "power bi",
    "excel",
    "rest api"
}


def extract_skills(text):
    """
    Extract known technical skills from resume text.
    """
    text = text.lower()
    found_skills = []

    for skill in KNOWN_SKILLS:
        pattern = r"\b" + re.escape(skill) + r"\b"
        if re.search(pattern, text):
            found_skills.append(skill.title())

    return sorted(list(set(found_skills)))