import enable_log
import db_connect
import requests

logger = enable_log.setup_logging()
logger.info("Calling valid_slots")

client = db_connect.connect_to_db(logger)
db = client["itstennistime_db"]
valid_slots = db["valid_slots"]

URL = "https://api.rec.us/v1/locations/availability?publishedSites=true&organizationSlug=san-francisco-rec-park"


try:
    response = requests.get(URL)
    response.raise_for_status()
except Exception as e:
    logger.error(f"An error occurred while fetching data: {e}")

json_data = response.json()
logger.info(f"Fetched {len(json_data)} park items")

try: 
    client = db_connect.connect_to_db(logger)
    db = client["itstennistime_db"]
    valid_slots = db["valid_slots"]
    valid_slots.drop()

    for park in json_data:
        location = park.get("location", {})
        location_id = location.get("id")
        
        courts = location.get("courts", [])

        simplified_courts = []

        for court in courts:
            court_id = court.get("id")

            # Get the first sportId only, or None if not present

            config = court.get("config", {})
            booking_policies = config.get("bookingPolicies", [])
            slots = next(
                (policy.get("slots", []) for policy in booking_policies if policy.get("type") == "fixed-slots"),
                []
            )

            simplified_courts.append({
                "court_id": court_id,
                "slots": slots
            })

        simplified_location = {
            "locationId": location_id,
            "courts": simplified_courts
        }

        if simplified_location:
            valid_slots.insert_one(simplified_location)






except Exception as e:
        logger.error(f"Error storing parks data: {e}")