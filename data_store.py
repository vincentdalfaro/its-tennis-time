from bs4 import BeautifulSoup
import json
import requests
from db_connect import client
from enable_log import logger


# API request for data 
logger.info("Requesting data from API")
URL = "https://api.rec.us/v1/locations?radius=1000000000&organizationSlug=san-francisco-rec-park"

try: 
    response = requests.get(URL)
except:
    logger.error("An error occured")
    
html_data = response.text


#Converting data into HTML format
soup = BeautifulSoup(html_data, 'html.parser')
formatted_html = soup.prettify()


# Copy of data, we can delete this later
file = open("recus_data.txt", "w")
file.write(formatted_html)
file.close()

formatted_html = json.loads(formatted_html)

# ************* This is just for testing purposes ***************

# Illustration of what formatted_html is stored like
file = open("recus_data_stored.txt", "w")

for park in formatted_html:
    file.write(park["location"]["name"])
    file.write("\n".join(park["location"]["courts"][0]["availableSlots"]))

file.close()

# ***************************************************************

# Connecting to our db and storing data in sf_tennis_courts collection
try:
    db = client["itstennistime_db"]
    collection = db["sf_tennis_courts"]
    collection.drop()

    for park in formatted_html:
        user_result = collection.insert_one(park)

    logger.info("Successfully stored Parks Data in DB")

except Exception as e:
    print(f"Error: {e}")
    logger.error("An error occured accessing the DB")


