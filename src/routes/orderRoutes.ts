import express from "express";
import OrderControllers from "../controllers/orderControllers";

import auth from "../middlewares/auth";

const router = express.Router();

router.post("/order", auth, OrderControllers.addOrder);

export default router;
