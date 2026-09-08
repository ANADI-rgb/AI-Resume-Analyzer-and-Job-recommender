import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiLogIn,
  FiArrowLeft,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ============================================================
  // HANDLE INPUT
  // ============================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  // ============================================================
  // VALIDATE
  // ============================================================

  const validateForm = () => {
    const email = formData.email.trim();

    if (!email) {
      return "Please enter your email address.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address.";
    }

    if (!formData.password) {
      return "Please enter your password.";
    }

    if (formData.password.length < 6) {
      return "Password must contain at least 6 characters.";
    }

    return "";
  };

  // ============================================================
  // LOGIN
  // ============================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      console.log("====================================");
      console.log("LOGIN REQUEST");
      console.log("Email:", formData.email.trim().toLowerCase());
      console.log("====================================");

      const response = await fetch(
        "http://127.0.0.1:5000/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
          }),
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch (jsonError) {
        throw new Error(
          "Backend returned an invalid response."
        );
      }

      console.log("========== LOGIN RESPONSE ==========");
      console.log(data);
      console.log("Status:", response.status);
      console.log("====================================");

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "Invalid email or password."
        );
      }

      // ========================================================
      // STORE USER
      // ========================================================

      const user = data.user || {};

      sessionStorage.setItem(
        "authUser",
        JSON.stringify(user)
      );

      // ========================================================
      // STORE TOKEN IF BACKEND RETURNS ONE
      // ========================================================

      if (data.token) {
        sessionStorage.setItem(
          "authToken",
          data.token
        );
      }

      // ========================================================
      // SUCCESS
      // ========================================================

      setSuccess(
        "Login successful. Redirecting..."
      );

      // ========================================================
      // REDIRECT
      // ========================================================

      const redirectPath =
        location.state?.from?.pathname ||
        "/dashboard";

      setTimeout(() => {
        navigate(redirectPath, {
          replace: true,
        });
      }, 500);

    } catch (error) {
      console.error(
        "========== LOGIN ERROR =========="
      );

      console.error(error);

      console.error(
        "================================="
      );

      if (
        error instanceof TypeError &&
        error.message === "Failed to fetch"
      ) {
        setError(
          "Cannot connect to the backend. Make sure Flask is running on http://127.0.0.1:5000."
        );
      } else {
        setError(
          error.message ||
            "Unable to login. Please try again."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-md">

        {/* BACK */}

        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-8"
        >
          <FiArrowLeft />

          Back to Home
        </button>

        {/* CARD */}

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-8 shadow-2xl">

          {/* HEADER */}

          <div className="text-center mb-8">

            <div className="mx-auto w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5">

              <FiLogIn className="text-3xl text-cyan-400" />

            </div>

            <h1 className="text-3xl font-bold">
              Welcome Back
            </h1>

            <p className="text-slate-400 mt-2">
              Login to your AI Resume Analyzer account
            </p>

          </div>

          {/* ERROR */}

          {error && (
            <div className="mb-5 flex gap-3 items-start rounded-xl border border-red-500/20 bg-red-500/10 p-4">

              <FiAlertCircle className="text-red-400 text-xl mt-0.5 flex-shrink-0" />

              <p className="text-sm text-red-300">
                {error}
              </p>

            </div>
          )}

          {/* SUCCESS */}

          {success && (
            <div className="mb-5 flex gap-3 items-start rounded-xl border border-green-500/20 bg-green-500/10 p-4">

              <FiCheckCircle className="text-green-400 text-xl mt-0.5 flex-shrink-0" />

              <p className="text-sm text-green-300">
                {success}
              </p>

            </div>
          )}

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* EMAIL */}

            <div>

              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Email Address
              </label>

              <div className="relative">

                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 py-3.5 pl-11 pr-4 text-white placeholder-slate-600 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 disabled:opacity-50"
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div>

              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Password
              </label>

              <div className="relative">

                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 py-3.5 pl-11 pr-12 text-white placeholder-slate-600 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 disabled:opacity-50"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (previous) => !previous
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <FiEyeOff />
                  ) : (
                    <FiEye />
                  )}
                </button>

              </div>

            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-500/50 disabled:cursor-not-allowed py-3.5 font-semibold transition"
            >

              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />

                  Logging in...
                </>
              ) : (
                <>
                  <FiLogIn />

                  Login
                </>
              )}

            </button>

          </form>

          {/* REGISTER */}

          <div className="mt-7 pt-6 border-t border-slate-800 text-center">

            <p className="text-slate-400 text-sm">
              Don't have an account?
            </p>

            <Link
              to="/register"
              className="inline-block mt-2 text-cyan-400 hover:text-cyan-300 font-semibold transition"
            >
              Create an account
            </Link>

          </div>

        </div>

        {/* FOOTER */}

        <p className="text-center text-xs text-slate-600 mt-6">
          AI Resume Analyzer
        </p>

      </div>

    </div>
  );
}