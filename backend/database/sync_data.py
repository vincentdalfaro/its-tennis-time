import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import enable_log
import db_connect
from utils import get_parks

logger = enable_log.setup_logging()
client = db_connect.connect_to_db(logger)
get_parks.filter_parks(client, logger)
