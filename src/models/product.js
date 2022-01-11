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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSingle = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ProductSchema = new mongoose_1.Schema({
    Name: {
        type: String,
        required: true,
    },
    Price: {
        type: String,
        required: true,
    },
    Details: {
        type: String,
        required: true,
    },
    Quantity: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "quantities",
    },
    Sizes: [String],
    SKU: {
        type: String,
        required: true,
    },
    Product_images: [String],
}, { timestamps: true });
const Product = mongoose_1.default.model("products", ProductSchema);
exports.default = Product;
const updateProductSingle = (query, data) => __awaiter(void 0, void 0, void 0, function* () {
    const options = { new: true, omitUndefined: true };
    const updatedData = yield Product.findOneAndUpdate(query, data, options);
    return updatedData;
});
exports.updateProductSingle = updateProductSingle;
