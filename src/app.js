"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const db_1 = require("./models/db");
const logger_1 = __importDefault(require("./logger"));
const config_1 = require("./config");
const routes_1 = require("./routes");
require("express-async-errors");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(passport_1.default.initialize());
app.use((0, cookie_parser_1.default)());
(0, db_1.createConnectionAndInitialize)(config_1.MONGO_URL)
    .then()
    .catch((err) => {
    logger_1.default.error(err);
    process.exit(1);
});
process.on("unhandledRejection", (error) => {
    throw error;
});
// app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "E-commerce API",
            version: "1.0.0",
            description: "Ecommerce backend APIs",
        },
        servers: [
            {
                url: "http://localhost:5000/api/v1",
            },
        ],
    },
    apis: ["./src/routes/*.ts"],
};
const specs = (0, swagger_jsdoc_1.default)(options);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
app.get("/", (req, res) => {
    res.status(200).json({ error: false, msg: "Hello Imran" });
});
app.use("/api/v1", routes_1.router);
app.use(errorHandler_1.default);
exports.default = app;
