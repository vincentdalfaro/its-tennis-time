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

    origins_list = ["http://localhost:5173"]
    print(f"CORS origins: {origins_list}")
    CORS(
        app,
        origins=origins_list,
        methods=["GET", "POST", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization"],
        supports_credentials=True
    )

    register_routes(app, collection, logger)

    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port, debug=True)


if __name__ == "__main__":
    main()
