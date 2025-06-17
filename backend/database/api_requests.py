from flask import request, jsonify
from datetime import datetime, time

TIME_RANGES = {
    "Morning": (time(6,0), time(11,59)),
    "Afternoon": (time(12,0), time(17,59)),
    "Evening": (time(18,0), time(21,59)),
}

def filter_available_times(court, filter_date, times_requested):
    filtered_times = []
    for ts_str in court.get("availableTimes", []):
        try:
            ts = datetime.strptime(ts_str, "%Y-%m-%d %H:%M:%S")
        except Exception:
            continue

        if ts.date() != filter_date:
            continue

        for time_label in times_requested:
            start, end = TIME_RANGES.get(time_label, (None, None))
            if start is None:
                continue
            if start <= ts.time() <= end:
                filtered_times.append(ts_str)
                break  # No need to check other times_requested for this ts_str

    return filtered_times

def filter_parks(parks, filter_date, times_requested, searchPickle, logger):
    filtered_parks = []
    for park in parks:
        courts = park.get("courts", [])
        matching_courts = []
        for court in courts:
            filtered_times = filter_available_times(court, filter_date, times_requested)
            if filtered_times and searchPickle:
                if ("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa" == court['sportId']):  
                    court_copy = court.copy()
                    court_copy["availableTimes"] = filtered_times
                    matching_courts.append(court_copy)
            elif filtered_times and not searchPickle:
                court_copy = court.copy()
                court_copy["availableTimes"] = filtered_times
                matching_courts.append(court_copy)

        if matching_courts:
            park_copy = park.copy()
            park_copy["courts"] = matching_courts
            park_copy["_id"] = str(park["_id"])
            filtered_parks.append(park_copy)

    return filtered_parks  # <-- Don't jsonify here


def register_routes(app, collection, logger):

    @app.route("/parks", methods=["POST"])
    def get_parks():
        filters = request.get_json() or {}

        date_str = filters.get("date")
        times_requested = filters.get("times", [])  # e.g. ["Morning"]
        pickleball = filters.get("pickleball")
        logger.info(date_str)

        if not date_str or not times_requested:
            return jsonify({"error": "Missing date or times filter"}), 400

        try:
            # Parse RFC 1123 date format e.g. 'Thu, 12 Jun 2025 21:54:14 GMT'
            filter_date = datetime.strptime(date_str, '%a, %d %b %Y %H:%M:%S GMT').date()
        except ValueError:
            return jsonify({"error": "Invalid date format, expected RFC 1123 format like 'Thu, 12 Jun 2025 21:54:14 GMT'"}), 400

        parks = list(collection.find({}))


        filtered_parks = filter_parks(parks, filter_date, times_requested, pickleball, logger)


        return jsonify(filtered_parks)