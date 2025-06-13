import requests
import enable_log
import db_connect
from datetime import datetime, time
import logging

logger = enable_log.setup_logging()
client = db_connect.connect_to_db(logger)
db = client["itstennistime_db"]
valid_slots = db["valid_slots"]

# Cache to avoid repeated DB queries per location+court
valid_slots_cache = {}

def time_matches_slot(dt, slot):
    # Check if the slot's dayOfWeek matches the datetime's day of week
    if slot.get("dayOfWeek") != dt.isoweekday():
        return False

    start_time_str = slot.get("startTimeLocal")
    if not start_time_str:
        return False

    start_time = datetime.strptime(start_time_str, "%H:%M:%S").time()
    return dt.time() == start_time

def validate_time(dt_str, location_id, court_id):
    logger = logging.getLogger("slot_validation")

    try:
        dt = datetime.strptime(dt_str, "%Y-%m-%d %H:%M:%S")
    except ValueError:
        logger.warning(f"Invalid datetime format: {dt_str}")
        return False

    day_of_week = dt.isoweekday()  # Monday = 1, Sunday = 7
    check_time = dt.time()

    # Check cache first
    cache_key = (location_id, court_id)
    if cache_key in valid_slots_cache:
        court_data = valid_slots_cache[cache_key]
    else:
        # Fetch from DB
        slot_data = valid_slots.find_one({"locationId": location_id})
        if not slot_data:
            logger.warning(f"No slot data found for locationId {location_id}")
            return False

        court_data = next((court for court in slot_data.get("courts", []) if court.get("court_id") == court_id), None)
        if not court_data:
            logger.warning(f"No matching courtId {court_id} under locationId {location_id}")
            return False

        valid_slots_cache[cache_key] = court_data

    # Step 3: Filter slots for the correct day
    valid_slots_for_day = [
        slot for slot in court_data.get("slots", [])
        if slot.get("dayOfWeek") == day_of_week
    ]

    if not valid_slots_for_day:
        logger.info(f"No slots for day {day_of_week} for court {court_id}")
        return False

    # Step 4: Check if the given time fits in any slot
    for slot in valid_slots_for_day:
        start = datetime.strptime(slot["startTimeLocal"], "%H:%M:%S").time()
        end = datetime.strptime(slot["endTimeLocal"], "%H:%M:%S").time()
        if check_time == start:
            logger.info(f"[VALID SLOT] {dt}")
            return True

    logger.info(f"[INVALID SLOT] {dt}")
    return False

def parse_and_simplify(park):
    location = park.get("location", {})
    if not location:
        return None

    location_id = location.get("id")
    courts = location.get("courts", [])

    simplified_courts = []

    for court in courts:
        court_id = court.get("id")

        sports = court.get("sports", [])
        sport_id = sports[0].get("sportId") if sports else None

        available_times = court.get("availableSlots", [])

        valid_available_times = []
        for time_str in available_times:
            if validate_time(time_str, location_id, court_id):
                valid_available_times.append(time_str)

        simplified_courts.append({
            "courtId": court_id,
            "sportId": sport_id,
            "availableTimes": valid_available_times  # Only valid times here
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

        for park in json_data:
            simplified_location = parse_and_simplify(park)
            if simplified_location:
                collection.insert_one(simplified_location)

        logger.info("Successfully stored parks data in DB")

    except Exception as e:
        logger.error(f"Error storing parks data: {e}")

    return collection