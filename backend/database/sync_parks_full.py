import sys
import os
import requests
from datetime import datetime

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import enable_log
import db_connect
from data.hardcoded_features import park_features
from utils.validate_times import make_validate_time

logger = enable_log.setup_logging("sync_parks_full")
client = db_connect.connect_to_db(logger)
db = client["itstennistime_db"]
validate_time = make_validate_time(db, logger)

def get_neighborhood(lat, lng, api_key, logger):
    url = f"https://maps.googleapis.com/maps/api/geocode/json?latlng={lat},{lng}&key={api_key}"

    response = requests.get(url)
    data = response.json()

    if data.get("status") != "OK":
        print("Error:", data.get("status"))
        return None

    for result in data.get("results", []):
        for component in result.get("address_components", []):
            if "neighborhood" in component.get("types", []):
                return component.get("long_name")

    return None

def parse_and_simplify(park):
    location = park.get("location", {})
    if not location:
        return None

    location_id = location.get("id")
    courts = location.get("courts", [])

    simplified_courts = []
    reservable_pickle = 0
    reservable_tennis = 0

    for court in courts:
        court_id = court.get("id")
        is_bookable = court.get("isInstantBookable")

        sports = court.get("sports", [])
        sport_id = sports[0].get("sportId") if sports else None

        if sport_id == "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa" and is_bookable:
            reservable_pickle += 1
        elif sport_id == "bd745b6e-1dd6-43e2-a69f-06f094808a96" and is_bookable:
            reservable_tennis += 1

        available_times = court.get("availableSlots", [])
        valid_available_times = [
            time_str for time_str in available_times
            if validate_time(time_str, location_id, court_id)
        ]

        simplified_courts.append({
            "courtId": court_id,
            "sportId": sport_id,
            "availableTimes": valid_available_times
        })

    simplified_location = {
        "locationId": location_id,
        "name": location.get("name"),
        "lat": location.get("lat"),
        "lng": location.get("lng"),
        "courts": simplified_courts,
        "reservable_pickle": reservable_pickle,
        "reservable_tennis": reservable_tennis,
        "neighborhood": get_neighborhood(
            location.get("lat"), location.get("lng"),
            "AIzaSyBMzgDapBifIff9Np80ZHzodgpxcEsOoTc", logger
        )
    }

    # ✅ Inject hardcoded features here
    if location_id in park_features:
        simplified_location.update(park_features[location_id])

    return simplified_location


def pull_data_full(client, logger):
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

        for park in json_data:
            simplified_location = parse_and_simplify(park)
            if simplified_location:
                collection.insert_one(simplified_location)

        logger.info("Successfully stored parks data in DB")

    except Exception as e:
        logger.error(f"Error storing parks data: {e}")

    return collection

pull_data_full(client, logger)