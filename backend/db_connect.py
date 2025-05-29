from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import certifi
from dotenv import load_dotenv
import os

def connect_to_db(logger):
    load_dotenv()

    uri = os.getenv('MONGO_URI')
    client = MongoClient(uri, server_api=ServerApi('1'), tls=True, tlsCAFile=certifi.where())

    # Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        logger.info("Successfully connected to MongoDB")
        
    except Exception as e:
        print(f"Error: {e}")

    return client

