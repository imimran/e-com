import { creatProductSchema } from "../validators/product";
import express from "express";
import ProductController from "../controllers/productController";

import inputValidator from "../middlewares/inputValidator";

import auth from "../middlewares/auth";


const router = express.Router();

router.post("/", auth, ProductController.getAllProduct);
router.post("/product", auth, inputValidator(creatProductSchema), ProductController.addProduct);
router.get("/:productId", auth, ProductController.getProduct);
router.patch("/:productId", auth, ProductController.updateProduct);
router.delete("/:productId", auth, ProductController.removeProduct);


export default router;