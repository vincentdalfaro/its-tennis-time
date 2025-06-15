import get_parks
import logging
import db_connect
import enable_log

logger = enable_log.setup_logging()
client = db_connect.connect_to_db(logger)
get_parks.filter_parks(client, logger)
