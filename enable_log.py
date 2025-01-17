import logging

logging.basicConfig(filename="bootup.log",
                format='%(asctime)s %(message)s',
                filemode='w')

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)