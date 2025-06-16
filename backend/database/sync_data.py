import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import get_parks
import enable_log
import db_connect

logger = enable_log.setup_logging()
client = db_connect.connect_to_db(logger)
get_parks.filter_parks(client, logger)
