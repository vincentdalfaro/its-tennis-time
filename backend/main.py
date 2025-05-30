import db_store 
import db_connect 
import enable_log
from flask import Flask
from flask_cors import CORS
from api_requests import register_routes

def main():
    logger = enable_log.setup_logging() 
    client = db_connect.connect_to_db(logger)
    collection = db_store.get_collection(client, logger)

    app = Flask(__name__)
    CORS(app)

    register_routes(app, collection, logger)
    
    app.run(debug=True, port=5000)

if __name__ == '__main__':
    main()