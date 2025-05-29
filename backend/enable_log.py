import logging

def setup_logging():
    logging.basicConfig(
        filename="bootup.log",
        format='%(asctime)s %(levelname)s %(message)s',
        filemode='w'
    )

    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)
    logger.info("Logger is enabled")
    return logger