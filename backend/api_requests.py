from flask import request, jsonify


def register_routes(app, collection, logger):

    @app.route("/parks/coordinates", methods=["POST"])
    def get_coordinates():
        filters = request.get_json() or {}
        logger.info(filters)
        
        return jsonify({"message": "hello"})