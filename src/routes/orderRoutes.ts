import express from "express";
import OrderControllers from "../controllers/orderControllers";

import auth from "../middlewares/auth";

const router = express.Router();

router.post("/order", auth, OrderControllers.addOrder);
router.get("/:orderId", auth, OrderControllers.getOrder);
router.get("/client/:clientId", auth, OrderControllers.getClientDetails);

export default router;
