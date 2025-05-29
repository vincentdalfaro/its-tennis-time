from flask import jsonify

def register_routes(app, collection, logger):
    logger.info("in api_requests")

    @app.route("/parks/coordinates")
    def get_coordinates():
        results = collection.find({}, {"_id": 0, "lat": 1, "lng": 1})
        
        coords = []
        for doc in results:
            try:
                coords.append({
                    "lat": float(doc["lat"]),
                    "lng": float(doc["lng"])
                })
            except (ValueError, KeyError):
                pass  # skip if missing or bad data

        return jsonify(coords)