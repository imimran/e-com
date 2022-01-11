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
exports.loginSchema = exports.createPasswordSchema = exports.createUserSchema = void 0;
const yup = __importStar(require("yup"));
exports.createUserSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    phone: yup.string().required("Phone is required"),
    email: yup
        .string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
    occupation: yup.string().required("Occupation is required"),
});
exports.createPasswordSchema = yup.object({
    password: yup.string().required('Password is required'),
    confirm_password: yup.string().required()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});
exports.loginSchema = yup.object({
    email: yup
        .string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
    password: yup.string().required('Password is required'),
});