import { authUser } from "./../middlewares/tokenAuth";
import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { transporter } from "../utils/mailer";
import { ICreateUserBody } from "../types/user";
import logger from "../logger";

const getAllUsers = async (_req: Request, res: Response) => {
  const user = await User.find({});
  return res.status(200).json(user);
};

const addUser = async (req: Request, res: Response) => {
  const data: ICreateUserBody = req.body;

  const foundEmail = await User.findOne({
    email: data.email,
  });

  if (foundEmail) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const newUser = new User({
    name: data.name,
    phone: data.phone,
    email: data.email,
    occupation: data.occupation,
  });

  const user = await newUser.save();

  const token = jwt.sign(
    { _id: user._id, email: user.email },
    "jwtPrivateKey",
    { expiresIn: "24h" }
  );

  let mail = {
    from: "engr.aih@gmail.com", // sender address
    to: user.email,
    subject: "Token for set Password.", // Subject line
    html: `Hello ${user.name} You got a new token for set password(24 hours).
                 <p>Your token is: <b>${token}</b></p>
        `, // html body
  };

  await transporter.sendMail(mail, function (error: any, info: any) {
    if (error) {
      // console.log(error);
      return res.status(500).json({ error: true, msg: "Email server error." });
    } else {
      logger.info("Email sent: " + info.response);
    }
  });

  return res.status(201).json(user);
};


const setPassword = async (req: Request, res: Response) => {
  const data = req.body;
  const token = req.header("auth-token");
  let auth_user = await authUser(token);
  logger.info(auth_user);
  const foundUser = await User.findOne({
    _id: (<any>auth_user)._id,
  });
  if (!foundUser) {
    return res.status(404).json({ message: "No User found" });
  }

  let passwordHash;
  if (data.password) {
    const salt = await bcrypt.genSalt(10);
    passwordHash = await bcrypt.hash(data.password, salt);
  }
  const query = { _id: (<any>auth_user)._id };

  const update = {
    password: passwordHash,
  };

  const updateData = await User.findOneAndUpdate(query, update, { new: true });

  res.json(updateData);
};

const login = async (req: Request, res: Response) => {
  //console.log("login user", req.body);
  const { email, password } = req.body;

  //checking email registerd or not...
  const foundUser = await User.findOne({ email: email });
  if (!foundUser) {
    return res.status(400).json({ error: true, msg: "Invalid credentials." });
  }

  //checking for password match..
  const isMatched = await bcrypt.compare(password, foundUser.password);
  if (!isMatched) {
    return res.status(400).json({ error: true, msg: "Invalid credentials." });
  }

  //create and store refresh token into db...
  const generateToken = crypto.randomBytes(10).toString("hex");
  const refreshToken = jwt.sign(generateToken, "jwtPrivateKey");

  const payload = {
    id: foundUser._id,
    email: foundUser.email,
  };

  //console.log("payload data", payload);

  jwt.sign(payload, "jwtPrivateKey", { expiresIn: "24h" }, (err, token) => {
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
};

const logout = async (_req: Request, res: Response) => {
  return res
    .clearCookie("accessToken")
    .status(200)
    .json({ message: "Successfully logged out" });
};

export default {
  getAllUsers,
  addUser,
  setPassword,
  login,
  logout,
};
