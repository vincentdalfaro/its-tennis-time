import logging
import os

def setup_logging(log_name):
    # Get absolute path to this file's directory
    backend_dir = os.path.dirname(os.path.abspath(__file__))

    # Define the logs directory within backend/
    log_dir = os.path.join(backend_dir, 'logs')
    os.makedirs(log_dir, exist_ok=True)

    # Full path to the log file
    log_path = os.path.join(log_dir, f"{log_name}.log")

    # Configure the logging
    logging.basicConfig(
        filename=log_path,
        format='%(asctime)s %(levelname)s %(message)s',
        filemode='w'
    )

    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)
    logger.info("Logger is enabled")
    return logger