from flask import jsonify

def register_routes(app, collection, logger):
    logger.info("in api_requests")

    @app.route("/parks/coordinates")
    def get_coordinates():
        results = collection.find({}, {"_id": 0, "lat": 1, "lng": 1, "courts.availableSlots":1})
        
        coords = []
        for doc in results:
            logger.info(f"Document: {doc}") 
            try:
                lat = float(doc["lat"])
                lng = float(doc["lng"])

                # Collect all slots from all courts
                available_slots = []
                courts = doc.get("courts", [])
                for court in courts:
                    slots = court.get("availableSlots", [])
                    available_slots.extend(slots)

                coords.append({
                    "lat": lat,
                    "lng": lng,
                    "availableSlots": sorted(set(available_slots))  # de-dupe and sort if needed
                })
            except (ValueError, KeyError):
                pass  # skip if missing or bad data

        return jsonify(coords)