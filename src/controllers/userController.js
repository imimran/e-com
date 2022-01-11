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
const tokenAuth_1 = require("./../middlewares/tokenAuth");
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailer_1 = require("../utils/mailer");
const logger_1 = __importDefault(require("../logger"));
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.find({});
    return res.status(200).json(user);
});
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const foundEmail = yield user_1.default.findOne({
        email: data.email,
    });
    if (foundEmail) {
        return res.status(400).json({ message: "Email already exists" });
    }
    const newUser = new user_1.default({
        name: data.name,
        phone: data.phone,
        email: data.email,
        occupation: data.occupation,
    });
    const user = yield newUser.save();
    const token = jsonwebtoken_1.default.sign({ _id: user._id, email: user.email }, "jwtPrivateKey", { expiresIn: "24h" });
    let mail = {
        from: "engr.aih@gmail.com",
        to: user.email,
        subject: "Token for set Password.",
        html: `Hello ${user.name} You got a new token for set password(24 hours).
                 <p>Your token is: <b>${token}</b></p>
        `, // html body
    };
    yield mailer_1.transporter.sendMail(mail, function (error, info) {
        if (error) {
            // console.log(error);
            return res.status(500).json({ error: true, msg: "Email server error." });
        }
        else {
            logger_1.default.info("Email sent: " + info.response);
        }
    });
    return res.status(201).json(user);
});
const setPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const token = req.header("auth-token");
    let auth_user = yield (0, tokenAuth_1.authUser)(token);
    logger_1.default.info(auth_user);
    const foundUser = yield user_1.default.findOne({
        _id: auth_user._id,
    });
    if (!foundUser) {
        return res.status(404).json({ message: "No User found" });
    }
    let passwordHash;
    if (data.password) {
        const salt = yield bcrypt_1.default.genSalt(10);
        passwordHash = yield bcrypt_1.default.hash(data.password, salt);
    }
    const query = { _id: auth_user._id };
    const update = {
        password: passwordHash,
    };
    const updateData = yield user_1.default.findOneAndUpdate(query, update, { new: true });
    res.json(updateData);
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log("login user", req.body);
    const { email, password } = req.body;
    //checking email registerd or not...
    const foundUser = yield user_1.default.findOne({ email: email });
    if (!foundUser) {
        return res.status(400).json({ error: true, msg: "Invalid credentials." });
    }
    //checking for password match..
    const isMatched = yield bcrypt_1.default.compare(password, foundUser.password);
    if (!isMatched) {
        return res.status(400).json({ error: true, msg: "Invalid credentials." });
    }
    //create and store refresh token into db...
    const generateToken = crypto_1.default.randomBytes(10).toString("hex");
    const refreshToken = jsonwebtoken_1.default.sign(generateToken, "jwtPrivateKey");
    const payload = {
        id: foundUser._id,
        email: foundUser.email,
    };
    //console.log("payload data", payload);
    jsonwebtoken_1.default.sign(payload, "jwtPrivateKey", { expiresIn: "24h" }, (err, token) => {
        if (err) {
            throw err;
        }
        return res
            .cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        })
            .status(200)
            .json({
            accessToken: token,
            refreshToken: refreshToken,
        });
    });
});
const logout = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res
        .clearCookie("accessToken")
        .status(200)
        .json({ message: "Successfully logged out" });
});
exports.default = {
    getAllUsers,
    addUser,
    setPassword,
    login,
    logout,
};
