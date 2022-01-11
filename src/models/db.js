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
exports.createConnectionAndInitialize = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../logger"));
function createConnectionAndInitialize(dbUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(dbUrl);
            logger_1.default.info("DB connected");
        }
        catch (error) {
            logger_1.default.error("DB not connected", error);
        }
    });
}
exports.createConnectionAndInitialize = createConnectionAndInitialize;
// import mongoose from "mongoose";
// import logger from "../logger";
// import {MONGO_URL} from "../config"
// // const options  = {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //     useFindAndModify: false
// // }
// const connectDB = () => {
//    mongoose.connect(MONGO_URL)
//   console.log('Connected to the mongodb');
//   const conection = mongoose.connection
//   conection.on('error', () => console.log('Cound not connected on the db'))
//   conection.on('connected', () => console.log('Connected to the mongodb'))
//   // const db = mongoose.createConnection(MONGO_URL, { maxPoolSize: 10 });
//   // db.on(`error`, console.error.bind(console, `connection error:`));
//   // db.once(`open`, function () {
//   //   // we`re connected!
//   //   console.log(`MongoDB connected on "  ${MONGO_URL}`);
//   // });
// };
// export default connectDB;
// import mongoose from "mongoose";
// import logger from "../logger";
// import {MONGO_URL} from "../config"
// function connect() {
//     return mongoose
//       .connect(MONGO_URL)
//       .then(() => {
//         logger.info("Database connected");
//       })
//       .catch((error) => {
//         logger.error("db error", error);
//         process.exit(1);
//       });
//   }
//   export default connect;
