import axios from "axios";

// ============================================================
// AXIOS CONFIGURATION
// ============================================================

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
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