from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import certifi

# NTD: This should be encrypted 
uri = "mongodb+srv://vdalfaro27:Bananasoup1@cluster0.s4ssm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


client = MongoClient(uri, server_api=ServerApi('1'), tls=True, tlsCAFile=certifi.where())

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(f"Error: {e}")


db = client["itstennistime_db"]
collection = db["sf_tennis_courts"]