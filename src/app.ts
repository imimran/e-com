import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUI from "swagger-ui-express";
import errorHandler from "./middlewares/errorHandler";
import { createConnectionAndInitialize } from "./models/db";
import logger from "./logger";
import { MONGO_URL } from "./config";
import { router } from "./routes";
require("express-async-errors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(cookieParser());


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
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "*");

//   next();
// });

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API",
      version: "1.0.0",
      description: "Ecommerce backend APIs",
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};
const specs = swaggerJSDoc(options);

app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(specs));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ error: false, msg: "Hello Imran" });
});

app.use("/api/v1", router);

app.use(errorHandler);
export default app;
