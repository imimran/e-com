"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../validators/product");
const express_1 = __importDefault(require("express"));
const productController_1 = __importDefault(require("../controllers/productController"));
const orderControllers_1 = __importDefault(require("../controllers/orderControllers"));
const inputValidator_1 = __importDefault(require("../middlewares/inputValidator"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
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
router.post("/order", auth_1.default, orderControllers_1.default.addOrder);
router.post("/upload", auth_1.default, productController_1.default.uploadProduct);
router.post("/", auth_1.default, productController_1.default.getAllProduct);
router.post("/product", auth_1.default, (0, inputValidator_1.default)(product_1.creatProductSchema), productController_1.default.addProduct);
router.get("/:productId", auth_1.default, productController_1.default.getProduct);
router.patch("/:productId", auth_1.default, productController_1.default.updateProduct);
router.delete("/:productId", auth_1.default, productController_1.default.removeProduct);
exports.default = router;
