import get_parks
import logging
import db_connect

logger = logging.setup_logging()
client = db_connect.connect_to_db(logger)
get_parks.filter_parks(client, logger)
