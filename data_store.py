from bs4 import BeautifulSoup
import json
from db_connect import client

import requests

# API request for data 
URL = "https://api.rec.us/v1/locations?radius=1000000000&organizationSlug=san-francisco-rec-park"
response = requests.get(URL)
html_data = response.text


#Converting data into HTML format
soup = BeautifulSoup(html_data, 'html.parser')
formatted_html = soup.prettify()

print(formatted_html)

# Logging data
file = open("recus_data.txt", "w")
file.write(formatted_html)
file.close()

formatted_html = json.loads(formatted_html)


location = formatted_html[0]["location"]["name"]
# print(location)

# ************* This is just for testing purposes ***************
# Illustration of what formatted_html is stored like
file = open("recus_data_stored.txt", "w")

for park in formatted_html:
    file.write(park["location"]["name"])
    file.write("\n".join(park["location"]["courts"][0]["availableSlots"]))

file.close()

# ***************************************************************

# Connecting to our db and storing data in sf_tennis_courts collection
db = client["itstennistime_db"]
collection = db["sf_tennis_courts"]
collection.drop()

for park in formatted_html:
    user_result = collection.insert_one(park)


