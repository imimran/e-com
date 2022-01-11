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
const generatePDF_1 = require("./../template/generatePDF");
const order_1 = __importDefault(require("../models/order"));
const orderItem_1 = __importDefault(require("../models/orderItem"));
const client_1 = __importDefault(require("../models/client"));
const quantity_1 = __importDefault(require("../models/quantity"));
const product_1 = __importDefault(require("../models/product"));
const logger_1 = __importDefault(require("../logger"));
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const foundUser = yield client_1.default.findOne({
        Email: data.Email,
    });
    let client;
    if (!foundUser) {
        const newClient = new client_1.default({
            Name: data.Name,
            Email: data.Email,
            Phone: data.Phone,
        });
        client = yield newClient.save();
    }
    if (foundUser) {
        client = foundUser._id;
    }
    const newOrder = new order_1.default({
        ClientId: client._id,
    });
    const order = yield newOrder.save();
    const ProductList = req.body.ProductList.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const foundProduct = yield product_1.default.findOne({
            _id: item.ProductId,
            Sizes: item.Size,
        });
        if (!foundProduct) {
            return res.status(404).json({ message: "Product or Size Not found" });
        }
        const newItem = new orderItem_1.default({
            ProductId: item.ProductId,
            Quantity: item.Quantity,
            TotalPrice: item.TotalPrice,
            Size: item.Size,
            OrderId: order._id,
        });
        const orderItem = yield newItem.save();
        yield quantity_1.default.findOneAndUpdate({ ProductId: item.ProductId }, { $inc: { Quantity: -item.Quantity } }, { new: true });
        return res.status(201).json(orderItem);
    }));
});
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    let foundOrder = yield order_1.default.findOne({
        _id: orderId,
    }).populate("ClientId");
    if (!foundOrder) {
        return res.status(404).json({ message: "No Product found" });
    }
    let foundOrderItem = yield orderItem_1.default.findOne({
        OrderId: { $in: [orderId] },
    });
    return res
        .status(200)
        .json({ order: foundOrder, order_items: foundOrderItem });
});
const getClientDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clientId } = req.params;
    let foundClient = yield client_1.default.findOne({
        _id: clientId,
    });
    if (!foundClient) {
        return res.status(404).json({ message: "No client found" });
    }
    let foundOrders;
    if (foundClient) {
        foundOrders = yield order_1.default.find({
            ClientId: { $in: [foundClient._id] },
        });
    }
    if (foundOrders) {
        foundOrders.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const foundOrderItems = yield orderItem_1.default.findOne({
                OrderId: item._id,
            })
                .populate("ProductId")
                .populate("OrderId");
            logger_1.default.info("data..", foundOrderItems);
            if (foundOrderItems) {
                return res.json(foundOrderItems);
            }
        }));
    }
});
const getClientsOrderDetailsPDF = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clientId } = req.params;
    let foundClient = yield client_1.default.findOne({
        _id: clientId,
    });
    if (!foundClient) {
        return res.status(404).json({ message: "No client found" });
    }
    let foundOrders;
    if (foundClient) {
        foundOrders = yield order_1.default.find({
            ClientId: { $in: [foundClient._id] },
        });
    }
    if (foundOrders) {
        foundOrders.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            let foundOrderItem = yield orderItem_1.default.findOne({
                OrderId: item._id,
            })
                .populate("ProductId")
                .populate("OrderId");
            logger_1.default.info("pdf...", foundOrderItem);
            if (foundOrderItem) {
                (0, generatePDF_1.generateInvoice)((0, generatePDF_1.generateInvoiceHTML)(foundOrderItem), (err, pdfStream) => {
                    if (!err && pdfStream) {
                        pdfStream.pipe(res);
                    }
                });
            }
        }));
    }
});
exports.default = {
    addOrder,
    getOrder,
    getClientDetails,
    getClientsOrderDetailsPDF,
};
