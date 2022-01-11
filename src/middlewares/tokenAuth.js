"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = exports.tokenAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
function tokenAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.header("auth-token");
        if (!token)
            return res.status(401).json("Authorization Failed.No token Provided");
        try {
            const decoded = jsonwebtoken_1.default.verify(token, "jwtPrivateKey", (err, decoded) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    if (err.name === "TokenExpiredError") {
                        const payload = jsonwebtoken_1.default.verify(token, "jwtPrivateKey", {
                            ignoreExpiration: true,
                        });
                        return res.status(401).json({ error: true, msg: "Expired token." });
                    }
                    return res.status(401).json({ error: true, msg: "Token Invalid." });
                }
            }));
            req.user = (yield user_1.default.findOne(decoded._id));
            next();
        }
        catch (error) {
            res.status(401).json("Authorization Failed. Invald token");
        }
    });
}
exports.tokenAuth = tokenAuth;
const authUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "jwtPrivateKey");
        //   console.log("decode", decoded);
        let auth_user = yield user_1.default.findOne({ _id: decoded._id }).then((data) => {
            return data;
        });
        return auth_user;
    }
    catch (error) {
        throw error;
    }
});
exports.authUser = authUser;
