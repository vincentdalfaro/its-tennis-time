from flask import request, jsonify
from datetime import datetime
import os

from dotenv import load_dotenv
from utils.api_helpers import filter_parks, geocode_address


load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY") 

def register_routes(app, collection, logger):

    @app.route("/parks", methods=["POST"])
    def get_parks():


        filters = request.get_json() or {}
        date_str = filters.get("date")
        times_requested = filters.get("times", [])  # e.g. ["Morning"]
        pickleball = filters.get("pickleball")
        address = filters.get("address")
        

        if not date_str or not times_requested:
            return jsonify({"error": "Missing date or times filter"}), 400

        try:
            # Parse RFC 1123 date format e.g. 'Thu, 12 Jun 2025 21:54:14 GMT'
            filter_date = datetime.strptime(date_str, '%a, %d %b %Y %H:%M:%S GMT').date()
        except ValueError:
            return jsonify({"error": "Invalid date format, expected RFC 1123 format like 'Thu, 12 Jun 2025 21:54:14 GMT'"}), 400

        parks = list(collection.find({}))


        filtered_parks = filter_parks(parks, filter_date, times_requested, pickleball, logger, address)


        return jsonify(filtered_parks)

    @app.route("/geocode", methods=["POST"])
    def geocode():
        data = request.get_json() or {}
        address = data.get("address")

        if not address:
            return jsonify({"error": "Missing address"}), 400

        try:
            location = geocode_address(address)
        except ValueError as e:
            return jsonify({"error": str(e)}), 400

        return jsonify(location)