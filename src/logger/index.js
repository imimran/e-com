"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
// import WinstonCloudWatch from "winston-cloudwatch";
// import config from "../settings/config";
// import moment from "moment";
const { prettyPrint } = winston_1.format;
const logger = (0, winston_1.createLogger)({
    level: "debug",
    format: winston_1.format.combine(
    // enumerateErrorFormat(),
    winston_1.format.json(), prettyPrint()),
    transports: [new winston_1.transports.Console()],
});
// const cloudWatchConfig = {
//   logGroupName: `engaze-server-${config.DEPLOY}`,
//   logStreamName: `${moment().format("MMM D, YYYY")}-${
//     config.CLOUDWATCH_LOG_STREAM || "common-stream"
//   }`,
//   retentionInDays: 30,
//   jsonMessage: true,
//   awsAccessKeyId: config.AWS_ACCESS_KEY_ID,
//   awsSecretKey: config.AWS_ACCESS_KEY_SECRET,
//   awsRegion: config.AWS_ACCESS_REGION,
//   level: "debug",
// };
// if (config.DEPLOY === "production") {
//   logger = createLogger({
//     level: "debug",
//     format: format.combine(
//       timestamp(),
//       // enumerateErrorFormat(),
//       format.json(),
//       prettyPrint()
//     ),
//     transports: [new WinstonCloudWatch(cloudWatchConfig)],
//   });
// }
// if (config.DEPLOY === "production") {
//   logger.exceptions.handle(new WinstonCloudWatch(cloudWatchConfig));
// } else {
//   logger.exceptions.handle(new transports.Console());
// }
exports.default = logger;
