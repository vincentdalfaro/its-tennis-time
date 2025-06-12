import db_store 
import db_connect 
import enable_log
from flask import Flask
from flask_cors import CORS
from api_requests import register_routes


def main():
    logger = enable_log.setup_logging() 

    client = db_connect.connect_to_db(logger)

    db = client["itstennistime_db"]
    collection = db["sf_tennis_courts"]

    app = Flask(__name__)
    CORS(app)

    register_routes(app, collection, logger)
    app.run(debug=True, port=5000, use_reloader=False)

if __name__ == "__main__":
    main()
