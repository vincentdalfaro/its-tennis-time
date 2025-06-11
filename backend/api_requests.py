from flask import jsonify

def register_routes(app, collection, logger):
    logger.info("in api_requests")

    # TODO Fix this, performes lng/lat/availableSlots
    @app.route("/parks/coordinates")
    def get_coordinates():
        results = collection.find({}, {"_id": 0, "lat": 1, "lng": 1})
        
        coords = []
        for doc in results:
            logger.info(f"Document: {doc}") 
            try:
                lat = float(doc["lat"])
                lng = float(doc["lng"])

                coords.append({
                    "lat": lat,
                    "lng": lng,
                })
            except (ValueError, KeyError):
                pass  # skip if missing or bad data

        return jsonify(coords)