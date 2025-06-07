import requests



# This function was used to pick and choose data from the REC.US API,
def parse_and_simplify(park):
    location = park.get("location", {})
    if not location:
        return None

    location_id = location.get("id")
    courts = location.get("courts", [])

    simplified_courts = []

    for court in courts:
        court_id = court.get("id")

        # Get the first sportId only, or None if not present
        sports = court.get("sports", [])
        sport_id = sports[0].get("sportId") if sports else None

        available_times = court.get("availableSlots", [])

        simplified_courts.append({
            "courtId": court_id,
            "sportId": sport_id,  # singular now
            "availableTimes": available_times
        })

    simplified_location = {
        "locationId": location_id,
        "name": location.get("name"),
        "lat": location.get("lat"),
        "lng": location.get("lng"),
        "courts": simplified_courts
    }

    return simplified_location



def get_collection(client, logger):
    logger.info("Requesting data from API")
    URL = "https://api.rec.us/v1/locations/availability?publishedSites=true&organizationSlug=san-francisco-rec-park"

    try:
        response = requests.get(URL)
        response.raise_for_status()
    except Exception as e:
        logger.error(f"An error occurred while fetching data: {e}")
        return

    json_data = response.json()
    logger.info(f"Fetched {len(json_data)} park items")

    try:
        db = client["itstennistime_db"]
        collection = db["sf_tennis_courts"]
        collection.drop()  # Clear old data

        # Insert each simplified location
        for park in json_data:
            simplified_location = parse_and_simplify(park)
            if simplified_location:
                collection.insert_one(simplified_location)

        logger.info("Successfully stored parks data in DB")

    except Exception as e:
        logger.error(f"Error storing parks data: {e}")

    return collection
