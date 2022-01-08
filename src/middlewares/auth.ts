import passport from "passport";
import PassportAuth from "../middlewares/passport";
PassportAuth(passport);

const auth = passport.authenticate("jwt", { session: false });

export default auth;
