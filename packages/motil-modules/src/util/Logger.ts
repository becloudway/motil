import winston = require("winston");

winston.loggers.add("default", {
    transports: [
        new winston.transports.Console()
    ]
})

export default winston;