from flask import Flask
from flask_cors import CORS
from database import db_connect
from database.api_requests import register_routes
import enable_log
import os

def main():
    logger = enable_log.setup_logging("main")
    client = db_connect.connect_to_db(logger)
    db = client["itstennistime_db"]
    collection = db["sf_tennis_courts"]
    app = Flask(__name__)

    # Allow localhost (dev) AND deployed frontend origins
    CORS(
        app,
        origins=[
            "http://localhost:5173",  # Local development
            "https://its-tennis-time-git-vinnie-vincent-alfaros-projects-deef64dd.vercel.app",  # Vercel preview
            "https://www.itstennistime.org",  # Production (www)
            "https://itstennistime.org",  # Production (non-www)
        ],
        methods=["GET", "POST", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization"],
        supports_credentials=True
    )

    register_routes(app, collection, logger)
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port, debug=True)

if __name__ == "__main__":
    main()
