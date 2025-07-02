from flask import Flask
from flask_cors import CORS
from database import db_connect
from database.api_requests import register_routes
import enable_log
import os

def origin_allowlist(origin):
    # Allow localhost for local dev
    if origin == "http://localhost:5173":
        return True

    # Allow all Vercel preview URLs matching this pattern
    # Adjust this pattern if your Vercel URLs change structure
    if origin and origin.startswith("https://its-tennis-time-git-") and origin.endswith(".vercel.app"):
        return True

    # Optionally add your custom domain here:
    if origin == "https://your-vercel-custom-domain.com":
        return True

    return False

def main():
    logger = enable_log.setup_logging("main")

    client = db_connect.connect_to_db(logger)
    db = client["itstennistime_db"]
    collection = db["sf_tennis_courts"]

    app = Flask(__name__)

    # Enable CORS with dynamic origin checking
    CORS(
        app,
        origins=origin_allowlist,
        methods=["GET", "POST", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization"]
    )

    register_routes(app, collection, logger)
    port = int(os.environ.get("PORT", 8000))  # Render provides PORT
    app.run(host="0.0.0.0", port=port, debug=True)

if __name__ == "__main__":
    main()
