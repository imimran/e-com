import logger from "../logger";
import User from "../models/user";

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

export default function (passport: any) {
    console.log("yes");
    
  var opts: any = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = "jwtPrivateKey";
  passport.use(
    new JwtStrategy(opts, (jwt_payload: any, done: any) => {
        
      User.findOne({ _id: jwt_payload.id }, (err: any, user:any) => {
        logger.info(jwt_payload)
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      });
    })
  );
}
