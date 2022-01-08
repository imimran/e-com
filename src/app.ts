import express, { NextFunction, Request, Response } from "express";
import errorHandler from "./middlewares/errorHandler";
import { createConnectionAndInitialize } from "./models/db";
import logger from "./logger";
import {MONGO_URL} from "./config"
import  {router}  from "./routes";
require('express-async-errors');
import passport from "passport";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
createConnectionAndInitialize(MONGO_URL)
  .then()
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });

process.on("unhandledRejection", (error) => {
  throw error;
});


// app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "*");
  
    next();
  });


app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ error: false, msg: "Hello Imran" });
});

app.use("/api/v1", router);

app.use(errorHandler);
export default app;