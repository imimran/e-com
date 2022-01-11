"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../logger"));
const user_1 = __importDefault(require("../models/user"));
const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;
const cookieExtractor = function (req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['accessToken'];
    }
    return token;
};
function default_1(passport) {
    console.log("yes");
    var opts = {};
    //   opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.jwtFromRequest = cookieExtractor;
    opts.secretOrKey = "jwtPrivateKey";
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        user_1.default.findOne({ _id: jwt_payload.id }, (err, user) => {
            logger_1.default.info(jwt_payload);
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));
}
exports.default = default_1;
