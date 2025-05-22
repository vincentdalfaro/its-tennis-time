from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import certifi
from enable_log import logger

# TODO This should be encrypted 
uri = "mongodb+srv://vdalfaro:bananasoup@itstennistime.86wi2nl.mongodb.net/?"
client = MongoClient(uri, server_api=ServerApi('1'), tls=True, tlsCAFile=certifi.where())

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    logger.info("Successfully connected to MongoDB")
    
except Exception as e:
    print(f"Error: {e}")

