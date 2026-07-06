import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",

  format: format.combine(
    format.timestamp(),

    format.errors({
      stack: true,
    }),

    format.printf(({ timestamp, level, message, stack }) => {
      return stack
        ? `${timestamp} [${level.toUpperCase()}]: ${stack}`
        : `${timestamp} [${level.toUpperCase()}]: ${message}`;
    }),
  ),

  transports: [new transports.Console()],
});

export default logger;
