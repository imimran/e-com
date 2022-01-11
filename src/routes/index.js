"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const productRoutes_1 = __importDefault(require("./productRoutes"));
const orderRoutes_1 = __importDefault(require("./orderRoutes"));
const router = express_1.default.Router();
exports.router = router;
router.use("/user", userRoutes_1.default);
router.use("/products", productRoutes_1.default);
router.use("/orders", orderRoutes_1.default);
router.all("*", (_req, res) => {
    res.status(404).send("Route not found");
});
