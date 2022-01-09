import { creatProductSchema } from "../validators/product";
import express from "express";
import ProductController from "../controllers/productController";
import OrderControllers from "../controllers/orderControllers";

import inputValidator from "../middlewares/inputValidator";

import auth from "../middlewares/auth";


const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      required:
 *        - Name
 *        - Price
 *        - Details
 *        - Quantity
 *        - Sizes
 *        - SKU
 *        - Product_images
 *      properties:
 *        id:
 *          type: string
 *          description: The auto generated id of product
 *        Name:
 *          type: string
 *          description: The product name
 *        Price:
 *          type: number
 *          description: The product price
 *        Details:
 *          type: string
 *          description: The  product description
 *        Quantity:
 *          type: object
 *          description: The  product Quantity
 *        Sizes:
 *          type: array
 *          description: The  product sizes
 *        SKU:
 *          type: string
 *          description: The  product code
 *        Product_images:
 *          type: array
 *          description: The  product code
 *        createdAt:
 *          type: string
 *          description: The user occupation
 *        updatedAt:
 *          type: string
 *          description: The user occupation
 *          
 */


router.post("/order", auth, OrderControllers.addOrder);
router.post("/upload", auth, ProductController.uploadProduct);
router.post("/", auth, ProductController.getAllProduct);
router.post("/product", auth, inputValidator(creatProductSchema), ProductController.addProduct);
router.get("/:productId", auth, ProductController.getProduct);
router.patch("/:productId", auth, ProductController.updateProduct);
router.delete("/:productId", auth, ProductController.removeProduct);


export default router;