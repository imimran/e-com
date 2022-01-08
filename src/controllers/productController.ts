import { Request, Response } from "express";
import Product, { updateProductSingle } from "../models/product";
import { ICreateProductBody } from "../types/product";

const addProduct = async (req: Request, res: Response) => {
  const data: ICreateProductBody = req.body;

  const newProduct = new Product({
    Name: data.Name,
    Price: data.Price,
    Details: data.Details,
    Quantity: data.Quantity,
    Sizes: data.Sizes,
    SKU: data.SKU,
    Product_images: data.Product_images,
  });

  const product = await newProduct.save();

  return res.status(201).json(product);
};

const getProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const foundProduct = await Product.findOne({
    _id: productId,
  });

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
    Quantity: data.Quantity,
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
  const sort: any = {}

  if (req.body.sortby && req.body.sortType) 
  {
    sort[req.body.sortby] = req.body.sortType === 'desc' ? -1 : 1
  }

  console.log(sort)
  var perPage = req.body.total,
    page = Math.max(0, req.body.page);

  const products = await Product.find({}, null, {sort: sort})

 
   
  const totalProduct =  await Product.count()
  return res.json({
          products: products,
          currentPage: page,
          totalPage: totalProduct / perPage,
        });
      
};

export default {
  addProduct,
  getProduct,
  updateProduct,
  removeProduct,
  getAllProduct,
};
