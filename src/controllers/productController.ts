import { Request, Response } from "express";
import fs from "fs";
import Product, { updateProductSingle } from "../models/product";
import QuantityM from "../models/quantity";
import { ICreateProductBody } from "../types/product";

const addProduct = async (req: Request, res: Response) => {
  const data: ICreateProductBody = req.body;
  let quanityData = req.body.QuantityM;

  const newQuantity = new QuantityM({
    Quantity: quanityData,
  });
  let quanity = await newQuantity.save();

  const newProduct = new Product({
    Name: data.Name,
    Price: data.Price,
    Details: data.Details,
    QuantityM: quanity._id,
    Sizes: data.Sizes,
    SKU: data.SKU,
    Product_images: data.Product_images,
  });

  const product = await newProduct.save();
  quanity.ProductId = product._id;
  await quanity.save();

  return res.status(201).json(product);
};

const getProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  let foundProduct = await Product.findOne({
    _id: productId,
  }).populate("Quantity");

  if (!foundProduct) {
    return res.status(404).json({ message: "No Product found" });
  }

  return res.status(200).json(foundProduct);
};

const updateProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const data = req.body;
  const foundProduct = await Product.findOne({
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

  const updateData = await updateProductSingle(query, update);

  res.json(updateData);
};

const removeProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const foundProduct = await Product.findOne({
    _id: productId,
  });

  if (!foundProduct) {
    return res.status(404).json({ message: "No product found" });
  }

  await Product.findByIdAndRemove(productId);
  return res.status(200).json({ message: "Product Deleted Successfully" });
};

const getAllProduct = async (req: Request, res: Response) => {
  const sort: any = {};

  if (req.body.sortby && req.body.sortType) {
    sort[req.body.sortby] = req.body.sortType === "desc" ? -1 : 1;
  }

  var perPage = req.body.total,
    page = Math.max(0, req.body.page);

  const products = await Product.find({}, null, { sort: sort, limit: perPage }).populate("Quantity");

  const totalProduct = await Product.count();
  return res.json({
    products: products,
    currentPage: page,
    totalPage: Math.ceil(totalProduct / perPage),
  });
};

const uploadProduct = async (req: Request, res: Response) => {
  let products: any = fs.readFileSync("products.json");
  let data = JSON.parse(products);
  const upload = await Product.insertMany(data);
  res.json(upload);
};

export default {
  addProduct,
  getProduct,
  updateProduct,
  removeProduct,
  getAllProduct,
  uploadProduct,
};
