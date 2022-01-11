"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderControllers_1 = __importDefault(require("../controllers/orderControllers"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
router.post("/order", auth_1.default, orderControllers_1.default.addOrder);
router.get("/:orderId", auth_1.default, orderControllers_1.default.getOrder);
router.get("/client/:clientId", auth_1.default, orderControllers_1.default.getClientDetails);
router.get("/client/:clientId/download", auth_1.default, orderControllers_1.default.getClientsOrderDetailsPDF);
exports.default = router;
