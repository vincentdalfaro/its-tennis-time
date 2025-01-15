import logging

logging.basicConfig(filename="bootup.log",
                format='%(asctime)s %(message)s',
                filemode='w')

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

# -------------- COUPLE OF USEFUL COMMANDS --------------
# logger.debug("Harmless debug Message")
# logger.info("Just an information")
# logger.warning("Its a Warning")
# logger.error("Did you try to divide by zero")
# logger.critical("Internet is down")