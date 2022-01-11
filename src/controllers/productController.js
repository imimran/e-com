"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const product_1 = __importStar(require("../models/product"));
const quantity_1 = __importDefault(require("../models/quantity"));
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    let quanityData = req.body.QuantityM;
    const newQuantity = new quantity_1.default({
        Quantity: quanityData,
    });
    let quanity = yield newQuantity.save();
    const newProduct = new product_1.default({
        Name: data.Name,
        Price: data.Price,
        Details: data.Details,
        QuantityM: quanity._id,
        Sizes: data.Sizes,
        SKU: data.SKU,
        Product_images: data.Product_images,
    });
    const product = yield newProduct.save();
    quanity.ProductId = product._id;
    yield quanity.save();
    return res.status(201).json(product);
});
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    let foundProduct = yield product_1.default.findOne({
        _id: productId,
    }).populate("Quantity");
    if (!foundProduct) {
        return res.status(404).json({ message: "No Product found" });
    }
    return res.status(200).json(foundProduct);
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const data = req.body;
    const foundProduct = yield product_1.default.findOne({
        _id: productId,
    });
    if (!foundProduct) {
        return res.status(404).json({ message: "No product found" });
    }
    const query = { _id: productId };
    const update = {
        Name: data.Name,
        Price: data.Price,
        Details: data.Details,
        QuantityM: data.QuantityM,
        Sizes: data.Sizes,
        SKU: data.SKU,
        Product_images: data.Product_images,
    };
    const updateData = yield (0, product_1.updateProductSingle)(query, update);
    res.json(updateData);
});
const removeProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const foundProduct = yield product_1.default.findOne({
        _id: productId,
    });
    if (!foundProduct) {
        return res.status(404).json({ message: "No product found" });
    }
    yield product_1.default.findByIdAndRemove(productId);
    return res.status(200).json({ message: "Product Deleted Successfully" });
});
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sort = {};
    if (req.body.sortby && req.body.sortType) {
        sort[req.body.sortby] = req.body.sortType === "desc" ? -1 : 1;
    }
    var perPage = req.body.total, page = Math.max(0, req.body.page);
    const products = yield product_1.default.find({}, null, { sort: sort, limit: perPage }).populate("Quantity");
    const totalProduct = yield product_1.default.count();
    return res.json({
        products: products,
        currentPage: page,
        totalPage: Math.ceil(totalProduct / perPage),
    });
});
const uploadProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let products: any = fs.readFileSync("products.json");
    // let data = JSON.parse(products);
    // const upload = await Product.insertMany(data);
    // res.json(upload);
});
exports.default = {
    addProduct,
    getProduct,
    updateProduct,
    removeProduct,
    getAllProduct,
    uploadProduct,
};
