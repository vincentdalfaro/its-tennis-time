import os
import subprocess
import threading
from flask import Flask
from flask_cors import CORS
from database import db_connect
from database.api_requests import register_routes
import enable_log

# Build absolute path to the sync script inside /database/
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SYNC_SCRIPT_PATH = os.path.join(BASE_DIR, "database", "sync_parks_reservations.py")

def run_sync_script():
    print("Running sync_park_reservations.py...")
    try:
        subprocess.run(["python3", SYNC_SCRIPT_PATH], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Sync script failed: {e}")
    except FileNotFoundError:
        print("ERROR: sync_park_reservations.py not found at:", SYNC_SCRIPT_PATH)

    # Schedule next run
    threading.Timer(300, run_sync_script).start()

def main():
    logger = enable_log.setup_logging("main")
    client = db_connect.connect_to_db(logger)
    db = client["itstennistime_db"]
    collection = db["sf_tennis_courts"]

    app = Flask(__name__)

    CORS(
        app,
        origins=[
            "http://localhost:5173",
            "https://its-tennis-time-git-vinnie-vincent-alfaros-projects-deef64dd.vercel.app",
            "https://your-frontend.vercel.app",
            "https://www.itstennistime.org",
            "https://itstennistime.org",
        ],
        methods=["GET", "POST", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization"],
        supports_credentials=True
    )

    register_routes(app, collection, logger)

    # Start the sync scheduler
    run_sync_script()

    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port, debug=True)

if __name__ == "__main__":
    main()
