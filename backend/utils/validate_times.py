from datetime import datetime

def make_validate_time(db, logger):
    valid_slots = db["valid_slots"]
    valid_slots_cache = {}

    def validate_time(dt_str, location_id, court_id):
        try:
            dt = datetime.strptime(dt_str, "%Y-%m-%d %H:%M:%S")
        except ValueError:
            logger.warning(f"Invalid datetime format: {dt_str}")
            return False

        day_of_week = dt.isoweekday()
        check_time = dt.time()

        cache_key = (location_id, court_id)
        if cache_key in valid_slots_cache:
            court_data = valid_slots_cache[cache_key]
        else:
            slot_data = valid_slots.find_one({"locationId": location_id})
            if not slot_data:
                logger.warning(f"No slot data found for locationId {location_id}")
                return False

            court_data = next(
                (court for court in slot_data.get("courts", []) if court.get("court_id") == court_id),
                None
            )
            if not court_data:
                logger.warning(f"No matching courtId {court_id} under locationId {location_id}")
                return False

            valid_slots_cache[cache_key] = court_data

        valid_slots_for_day = [
            slot for slot in court_data.get("slots", [])
            if slot.get("dayOfWeek") == day_of_week
        ]

        if not valid_slots_for_day:
            logger.info(f"No slots for day {day_of_week} for court {court_id}")
            return False

        for slot in valid_slots_for_day:
            start = datetime.strptime(slot["startTimeLocal"], "%H:%M:%S").time()
            end = datetime.strptime(slot["endTimeLocal"], "%H:%M:%S").time()
            if check_time == start:
                return True

        return False

    return validate_time
