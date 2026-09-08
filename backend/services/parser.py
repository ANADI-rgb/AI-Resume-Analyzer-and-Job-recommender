import os
import re
import docx
import PyPDF2


ALLOWED_EXTENSIONS = {"pdf", "docx", "txt"}


def clean_extracted_text(text):
    """
    Cleans common formatting problems introduced by PDF extraction.
    """

    if not text:
        return ""

    # Normalize non-breaking spaces
    text = text.replace("\xa0", " ")

    # Fix spaces around hyphens inside URLs.
    # Example:
    # linkedin.com/in/aditya -rajput -324832268
    # becomes:
    # linkedin.com/in/aditya-rajput-324832268
    text = re.sub(
        r"(linkedin\.com/in/[A-Za-z0-9_.-]+(?:\s*-\s*[A-Za-z0-9_.-]+)+)",
        lambda m: re.sub(r"\s*-\s*", "-", m.group(1)),
        text,
        flags=re.IGNORECASE,
    )

    text = re.sub(
        r"(github\.com/[A-Za-z0-9_.-]+(?:\s*-\s*[A-Za-z0-9_.-]+)+)",
        lambda m: re.sub(r"\s*-\s*", "-", m.group(1)),
        text,
        flags=re.IGNORECASE,
    )

    # Remove excessive spaces while preserving line breaks.
    text = re.sub(r"[ \t]+", " ", text)

    return text.strip()


def extract_text(file):
    filename = file.filename.lower()
    extension = os.path.splitext(filename)[1].replace(".", "")

    if extension not in ALLOWED_EXTENSIONS:
        raise ValueError(f"Unsupported file type: {extension}")

    try:

        # -------------------------
        # PDF
        # -------------------------

        if extension == "pdf":

            reader = PyPDF2.PdfReader(file)

            text = ""

            for page in reader.pages:

                page_text = page.extract_text()

                if page_text:
                    text += page_text + "\n"

            return clean_extracted_text(text)

        # -------------------------
        # DOCX
        # -------------------------

        elif extension == "docx":

            doc = docx.Document(file)

            text = "\n".join(
                para.text
                for para in doc.paragraphs
                if para.text.strip()
            )

            return clean_extracted_text(text)

        # -------------------------
        # TXT
        # -------------------------

        elif extension == "txt":

            text = file.read().decode(
                "utf-8",
                errors="ignore"
            )

            return clean_extracted_text(text)

    except Exception as e:

        raise Exception(
            f"Error parsing resume: {str(e)}"
        )