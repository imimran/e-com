import { authUser } from './../middlewares/tokenAuth';
import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import {transporter} from '../utils/mailer'
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

  const token = jwt.sign({_id: user._id, email: user.email}, 'jwtPrivateKey', { expiresIn: "24h" });

  let mail = {
    from: "engr.aih@gmail.com", // sender address
    to: user.email,
    subject: "Token for set Password.", // Subject line
    html: `Hello ${user.name} You got a new token for set password(24 hours).
                 <p>Your token is: <b>${token}</b></p>
        `, // html body
  };


await transporter.sendMail(mail, function (error:any, info:any) {
    if (error) {
        // console.log(error);
        return res.status(500).json({ error: true, msg: "Email server error." });
    } else {
       
        logger.info('Email sent: ' + info.response);
    }
});

  return res.status(201).json(user);
};

const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const foundUser = await User.findOne({
    _id: userId,
  });

  if (!foundUser) {
    return res.status(404).json({ message: "No User found" });
  }

  return res.status(200).json(foundUser);
};

const setPassword  = async (req: Request, res: Response) => {
    const data = req.body;
    const token = req.header("auth-token");
    let auth_user = await authUser(token);
    logger.info( auth_user)
    const foundUser = await User.findOne({
        _id:(<any>auth_user)._id,
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

export default {
  getAllUsers,
  addUser,
  getUser,
  setPassword,
};
