def generate_suggestions(text, skills):
    suggestions = []

    lower = text.lower()

    # GitHub
    if "github.com" not in lower:
        suggestions.append("Add your GitHub profile link.")

    # LinkedIn
    if "linkedin" not in lower:
        suggestions.append("Add your LinkedIn profile.")

    # Projects
    if "project" not in lower:
        suggestions.append("Include at least 2 technical projects.")

    # Certifications
    if "certificate" not in lower:
        suggestions.append("Mention certifications relevant to your role.")

    # Cloud
    if "aws" not in lower and "azure" not in lower:
        suggestions.append(
            "Learn AWS or Azure for Cloud Engineering roles."
        )

    # Docker
    if "docker" not in lower:
        suggestions.append("Add Docker to your skillset.")

    # SQL
    if "sql" not in lower:
        suggestions.append("Improve SQL proficiency.")

    # Python
    if "python" not in lower:
        suggestions.append("Strengthen Python programming.")

    return suggestions[:6]