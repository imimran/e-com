"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("../middlewares/passport"));
(0, passport_2.default)(passport_1.default);
const auth = passport_1.default.authenticate("jwt", { session: false });
exports.default = auth;
