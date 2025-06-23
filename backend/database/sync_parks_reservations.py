import requests
import sys
import os
from datetime import datetime

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import enable_log
from database import db_connect
from utils.validate_times import make_validate_time


# Setup logger and DB
logger = enable_log.setup_logging("sync_parks_reservations")
client = db_connect.connect_to_db(logger)
db = client["itstennistime_db"]
collection = db["sf_tennis_courts"]
validate_time = make_validate_time(db, logger)

def sync_available_times():
    logger.info("Fetching reservation data from API...")

    url = "https://api.rec.us/v1/locations/availability?publishedSites=true&organizationSlug=san-francisco-rec-park"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
    except Exception as e:
        logger.error(f"Error fetching API data: {e}")
        return

    parks = response.json()
    logger.info(f"Fetched {len(parks)} parks from API")

    total_courts_updated = 0

    for park in parks:
        location = park.get("location", {})
        location_id = location.get("id")
        courts = location.get("courts", [])

        for court in courts:
            court_id = court.get("id")
            raw_times = court.get("availableSlots", [])

            valid_times = [
                time_str for time_str in raw_times
                if validate_time(time_str, location_id, court_id)
            ]

            result = collection.update_one(
                {"locationId": location_id, "courts.courtId": court_id},
                {"$set": {"courts.$[court].availableTimes": valid_times}},
                array_filters=[{"court.courtId": court_id}]
            )

            if result.modified_count > 0:
                total_courts_updated += 1
                logger.info(f"Updated court {court_id} at location {location_id} with {len(valid_times)} valid times")

    logger.info(f"✅ Done. Updated availableTimes for {total_courts_updated} courts.")

if __name__ == "__main__":
    sync_available_times()
