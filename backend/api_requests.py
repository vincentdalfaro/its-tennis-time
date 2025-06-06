from flask import jsonify
import time

def register_routes(app, collection, logger):
    logger.info("in api_requests")

    # Your tennis sportId
    TENNIS_SPORT_ID = "bd745b6e-1dd6-43e2-a69f-06f094808a96"

    @app.route("/parks/coordinates")
    def get_coordinates():
        start = time.time()

        results = collection.find({}, {"_id": 0, "lat": 1, "lng": 1, "courts.availableSlots": 1, "courts.sports.sportId": 1})
        
        coords = []
        for doc in results:
            logger.info(f"Document: {doc}") 
            try:
                lat = float(doc["lat"])
                lng = float(doc["lng"])

                available_slots = []
                is_tennis = False  # default

                courts = doc.get("courts", [])
                for court in courts:
                    # Check for tennis sportId
                    sports = court.get("sports", [])
                    for sport in sports:
                        if sport.get("sportId") == TENNIS_SPORT_ID:
                            is_tennis = True
                            break  # no need to keep checking

                    # Collect slots
                    slots = court.get("availableSlots", [])
                    available_slots.extend(slots)

                coords.append({
                    "lat": lat,
                    "lng": lng,
                    "availableSlots": sorted(set(available_slots)),
                    "isTennis": is_tennis
                })
                logger.info(f"API call took {time.time() - start:.2f} seconds")
            except (ValueError, KeyError):
                pass

        return jsonify(coords)