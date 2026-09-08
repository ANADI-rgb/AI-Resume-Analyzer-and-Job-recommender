from flask import Blueprint, request, jsonify
import json
import os
import hashlib

auth_bp = Blueprint("auth", __name__)

USERS_FILE = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "users.json"
)


def load_users():
    if not os.path.exists(USERS_FILE):
        return []

    try:
        with open(USERS_FILE, "r", encoding="utf-8") as file:
            return json.load(file)
    except Exception:
        return []


def save_users(users):
    with open(
        USERS_FILE,
        "w",
        encoding="utf-8"
    ) as file:
        json.dump(
            users,
            file,
            indent=4
        )


def hash_password(password):
    return hashlib.sha256(
        password.encode("utf-8")
    ).hexdigest()


@auth_bp.route("/register", methods=["POST"])
def register():

    try:

        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "error": "Request body is required."
            }), 400

        name = str(
            data.get("name", "")
        ).strip()

        email = str(
            data.get("email", "")
        ).strip().lower()

        password = str(
            data.get("password", "")
        )

        if not name:
            return jsonify({
                "success": False,
                "error": "Name is required."
            }), 400

        if not email:
            return jsonify({
                "success": False,
                "error": "Email is required."
            }), 400

        if not password:
            return jsonify({
                "success": False,
                "error": "Password is required."
            }), 400

        if len(password) < 6:
            return jsonify({
                "success": False,
                "error": "Password must contain at least 6 characters."
            }), 400

        users = load_users()

        existing_user = next(
            (
                user
                for user in users
                if user.get("email") == email
            ),
            None
        )

        if existing_user:

            return jsonify({
                "success": False,
                "error": "An account with this email already exists."
            }), 409

        user = {
            "id": len(users) + 1,
            "name": name,
            "email": email,
            "password": hash_password(password)
        }

        users.append(user)

        save_users(users)

        return jsonify({
            "success": True,
            "message": "Account created successfully.",
            "user": {
                "id": user["id"],
                "name": user["name"],
                "email": user["email"]
            }
        }), 201

    except Exception as e:

        print("REGISTER ERROR:", str(e))

        return jsonify({
            "success": False,
            "error": "Registration failed."
        }), 500


@auth_bp.route("/login", methods=["POST"])
def login():

    try:

        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "error": "Request body is required."
            }), 400

        email = str(
            data.get("email", "")
        ).strip().lower()

        password = str(
            data.get("password", "")
        )

        if not email or not password:

            return jsonify({
                "success": False,
                "error": "Email and password are required."
            }), 400

        users = load_users()

        hashed_password = hash_password(
            password
        )

        user = next(
            (
                user
                for user in users
                if user.get("email") == email
                and user.get("password") == hashed_password
            ),
            None
        )

        if not user:

            return jsonify({
                "success": False,
                "error": "Invalid email or password."
            }), 401

        return jsonify({
            "success": True,
            "message": "Login successful.",
            "user": {
                "id": user["id"],
                "name": user["name"],
                "email": user["email"]
            }
        }), 200

    except Exception as e:

        print("LOGIN ERROR:", str(e))

        return jsonify({
            "success": False,
            "error": "Login failed."
        }), 500