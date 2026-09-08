import os
import csv

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

JOBS_FILE = os.path.join(BASE_DIR, "database", "seed_data.csv")
SKILLS_FILE = os.path.join(BASE_DIR, "database", "skills.csv")


def load_jobs():
    jobs = []

    if not os.path.exists(JOBS_FILE):
        print("❌ seed_data.csv not found!")
        return jobs

    with open(JOBS_FILE, mode="r", encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)

        for row in reader:

            skills_text = row.get("skills_required")

            if not skills_text:
                print("⚠ Warning: skills_required is missing for row:", row)
                skills = []
            else:
                skills = [
                    skill.strip()
                    for skill in skills_text.split(",")
                    if skill.strip()
                ]

            jobs.append({
                "id": row.get("job_id", ""),
                "title": row.get("job_title", ""),
                "category": row.get("category", ""),
                "skills_required": skills
            })

    return jobs


def load_job_descriptions():
    jobs = load_jobs()

    return [
        f"{job['title']} requiring {', '.join(job['skills_required'])}"
        for job in jobs
    ]


def load_skills():
    if not os.path.exists(SKILLS_FILE):
        return []

    with open(SKILLS_FILE, mode="r", encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        return [
            row["skill_name"]
            for row in reader
            if row.get("skill_name")
        ]


def add_skills(new_skills):
    existing = set(skill.lower() for skill in load_skills())

    file_exists = os.path.exists(SKILLS_FILE)

    with open(SKILLS_FILE, mode="a", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=["skill_name", "source"]
        )

        if not file_exists or os.path.getsize(SKILLS_FILE) == 0:
            writer.writeheader()

        for skill in new_skills:

            if skill.lower() not in existing:

                writer.writerow({
                    "skill_name": skill,
                    "source": "resume"
                })