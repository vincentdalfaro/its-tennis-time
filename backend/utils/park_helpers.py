# utils/park_helpers.py

import os
import requests
from datetime import datetime, time
from dotenv import load_dotenv

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

TIME_RANGES = {
    "Morning": (time(6, 0), time(11, 59)),
    "Afternoon": (time(12, 0), time(17, 59)),
    "Evening": (time(18, 0), time(21, 59)),
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
                break

    return filtered_times

def geocode_address(address):
    url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {"address": address, "key": GOOGLE_API_KEY}
    response = requests.get(url, params=params)
    data = response.json()

    if data.get("status") == "OK":
        location = data["results"][0]["geometry"]["location"]
        return {"lat": location["lat"], "lng": location["lng"]}
    else:
        raise ValueError(f"Geocoding failed: {data.get('error_message')}")


def find_distances_for_all_parks(parks, address, logger):
    destinations = "|".join([f"{park['lat']},{park['lng']}" for park in parks])
    params = {
        "origins": address,
        "destinations": destinations,
        "units": "imperial",
        "key": GOOGLE_API_KEY,
    }

    url = "https://maps.googleapis.com/maps/api/distancematrix/json"
    response = requests.get(url, params=params)
    data = response.json()

    if data.get("status") != "OK":
        logger.error(f"Distance Matrix API error: {data.get('error_message')}")
        return []

    distances = []
    elements = data["rows"][0]["elements"]
    for element in elements:
        if element.get("status") == "OK":
            distances.append({
                "distance_text": element["distance"]["text"],
                "distance_value": element["distance"]["value"],
                "duration_text": element["duration"]["text"],
            })
        else:
            distances.append(None)

    return distances

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

def filter_parks(parks, filter_date, times_requested, searchPickle, logger, address):
    filtered_parks = []

    for park in parks:
        courts = park.get("courts", [])
        matching_courts = []

        for court in courts:

            filtered_times = filter_available_times(court, filter_date, times_requested)
            if filtered_times and searchPickle:
                if court.get('sportId') == "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa":
                    court_copy = court.copy()
                    court_copy["availableTimes"] = filtered_times
                    matching_courts.append(court_copy)
            elif filtered_times and not searchPickle:
                if court.get('sportId') == "bd745b6e-1dd6-43e2-a69f-06f094808a96":
                    court_copy = court.copy()
                    court_copy["availableTimes"] = filtered_times
                    matching_courts.append(court_copy)

        

        if matching_courts:
            park_copy = park.copy()
            park_copy["courts"] = matching_courts
            park_copy["_id"] = str(park["_id"])
            park_copy["reservable_pickle"] =  park.get("reservable_pickle")
            park_copy["reservable_tennis"] = park.get("reservable_tennis")
            park_copy["neighborhood"] =  get_neighborhood(park["lat"], park["lng"], "AIzaSyBMzgDapBifIff9Np80ZHzodgpxcEsOoTc", logger)
            filtered_parks.append(park_copy)


    distances = find_distances_for_all_parks(filtered_parks, address, logger)
    for park, distance in zip(filtered_parks, distances):
        park["distance"] = distance

    return filtered_parks
