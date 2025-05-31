import requests

def get_collection(client, logger):
    logger.info("Requesting data from API")
    URL = "https://api.rec.us/v1/locations/availability?publishedSites=true&organizationSlug=san-francisco-rec-park"

    try:
        response = requests.get(URL)
        response.raise_for_status()
    except Exception as e:
        logger.error(f"An error occurred while fetching data: {e}")
        return

    # Requests all data from the parks
    json_data = response.json()
    logger.info(f"Fetched {len(json_data)} park items")

    try:
        db = client["itstennistime_db"]
        collection = db["sf_tennis_courts"]
        collection.drop()  # Clear old data again maybe TODO is not doing this

        # Insert each location
        for park in json_data:
            location = park.get("location")
            if location:
                collection.insert_one(location)

        logger.info("Successfully stored parks data in DB")
    except Exception as e:
        logger.error(f"Error storing data in DB: {e}")

    return collection
