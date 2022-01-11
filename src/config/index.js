"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAIL_PASSWORD = exports.MAIL_USER = exports.JWT_KEY = exports.MONGO_URL = exports.APP_URL = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT;
exports.APP_URL = process.env.APP_URL;
exports.MONGO_URL = process.env.MONGO_URL;
exports.JWT_KEY = process.env.JWT_KEY;
exports.MAIL_USER = process.env.MAIL_USER;
exports.MAIL_PASSWORD = process.env.MAIL_PASSWORD;
