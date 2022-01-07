import jwt from "jsonwebtoken";
import User from "../models/user";
import { Request, Response, NextFunction } from "express";

interface UserPayload {
  _id: string;
}

export async function tokenAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).json("Authorization Failed.No token Provided");

  try {
    const decoded = jwt.verify(token, "jwtPrivateKey", async (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          const payload = jwt.verify(token, "jwtPrivateKey", {
            ignoreExpiration: true,
          });
          return res.status(401).json({ error: true, msg: "Expired token." });
        }

        return res.status(401).json({ error: true, msg: "Token Invalid." });
      }
    });

    req.user = (await User.findOne((<any>decoded)._id)) as UserPayload;

    next();
  } catch (error) {
    res.status(401).json("Authorization Failed. Invald token");
  }
}


export const authUser = async (token:any) => {
    try {
      const decoded = jwt.verify(token, "jwtPrivateKey");
    //   console.log("decode", decoded);
      let auth_user = await User.findOne( { _id: (<any>decoded)._id }).then(
        (data) => {
          return data;
        }
      );
      return auth_user;
    } catch (error) {
      throw error;
    }
  };
