import buildLogger from "../config/logger.js";
import config from "../config/config.js";

const logger = buildLogger(config.environment || "development");

export const addLogger = (req, res, next) => {
    req.logger = logger;
    next();
}

export default logger; 