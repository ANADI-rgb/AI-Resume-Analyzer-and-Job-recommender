import axios from "axios";

// ============================================================
// AXIOS CONFIGURATION
// ============================================================

const api = axios.create({
  baseURL: "http://127.0.0.1:5000",
  timeout: 60000,
});

// ============================================================
// UPLOAD RESUME
// ============================================================

export const uploadResume = async (formData) => {
  return api.post(
    "/resume/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// ============================================================
// RECOMMEND JOBS
// ============================================================

export const recommendJobs = async (
  resume,
  skills = []
) => {
  return api.post(
    "/jobs/recommend",
    {
      resume,
      skills,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

// ============================================================
// GET ALL JOBS
// ============================================================

export const getJobs = async () => {
  return api.get("/jobs/");
};

// ============================================================
// EXPORT AXIOS INSTANCE
// ============================================================

export default api;