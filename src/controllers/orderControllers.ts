import { Request, Response } from "express";
import Product from "../models/product";
import Order from "../models/order";
import OrderItem from "../models/orderItem";
import Client from "../models/client";


const addOrder = async (req: Request, res: Response) => {
    const data = req.body;
  
    const newOrder = new Order({
      Name: data.Name,
      Email: data.Email,
      Phone: data.Phone
    //   Price: data.Price,
    //   Details: data.Details,
    //   Quantity: data.Quantity,
    //   Sizes: data.Sizes,
    //   SKU: data.SKU,
    //   Product_images: data.Product_images,
    });
  
    const product = await newOrder.save();

    
  
    return res.status(201).json(product);
  };

  export default {
    addOrder,

  };
  