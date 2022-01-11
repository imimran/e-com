"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../logger"));
exports.default = (error, _req, res, next) => {
    res.status(500).json({ message: "Server error" });
    logger_1.default.error(error.message);
    next(error);
};
