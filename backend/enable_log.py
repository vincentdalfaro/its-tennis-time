import logging

def setup_logging(log_name):
    logging.basicConfig(
        filename= log_name + ".log",
        format='%(asctime)s %(levelname)s %(message)s',
        filemode='w'
    )

    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)
    logger.info("Logger is enabled")
    return logger