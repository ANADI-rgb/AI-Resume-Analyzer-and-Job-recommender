from flask import Flask
from flask_cors import CORS

from routes.resume import resume_bp
from routes.jobs import jobs_bp
from routes.auth import auth_bp

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(resume_bp, url_prefix="/resume")
app.register_blueprint(jobs_bp, url_prefix="/jobs")
app.register_blueprint(auth_bp, url_prefix="/auth")

@app.route("/", methods=["GET"])
def home():
    return {
        "message": "AI Resume Analyzer Backend is running 🚀",
        "health": "/ping"
    }

@app.route("/ping", methods=["GET"])
def ping():
    return {"status": "Backend is alive"}


if __name__ == "__main__":
    app.run(
        debug=True,
        use_reloader=False,
        host="0.0.0.0",
        port=5000
    )