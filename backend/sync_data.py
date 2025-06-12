# sync_data.py
from db_connect import connect_to_db
from db_store import get_collection
import enable_log

logger = enable_log.setup_logging()
client = connect_to_db(logger)
get_collection(client, logger)