import express from "express";
import UserRouter from "./userRoutes";
import ProductRoutes from "./productRoutes";
import OrderRoutes from "./orderRoutes";

const router = express.Router();

router.use("/user", UserRouter);
router.use("/products", ProductRoutes);
router.use("/orders", OrderRoutes);
router.all("*", (_req, res) => {
  res.status(404).send("Route not found");
});

export { router };
