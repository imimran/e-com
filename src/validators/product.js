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
Object.defineProperty(exports, "__esModule", { value: true });
exports.creatProductSchema = void 0;
const yup = __importStar(require("yup"));
exports.creatProductSchema = yup.object().shape({
    Name: yup.string().required("Name is required"),
    Price: yup.string().required("Phone is required"),
    Details: yup.string().required("Phone is required"),
    //   Quantity: yup.string().required("Phone is required"),
    //   Sizes: yup.string().required("Phone is required"),
    SKU: yup.string().required("Phone is required"),
    //   Product_images: yup.string().required("Phone is required"),
});
