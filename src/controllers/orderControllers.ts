import { ObjectId } from 'mongoose';
import { Request, Response } from "express";
import Order from "../models/order";
import OrderItem from "../models/orderItem";
import Client from "../models/client";

const addOrder = async (req: Request, res: Response) => {
  const data = req.body;

  const foundUser = await Client.findOne({
    Email: data.Email,
  });
  let client;

  if (!foundUser) {
    const newClient = new Client({
      Name: data.Name,
      Email: data.Email,
      Phone: data.Phone,
    });
  
    client = await newClient.save();
  }
  
  if(foundUser){
  client = foundUser._id
  }

  const newOrder = new Order({
    ClientId: client._id,
  });
  const order = await newOrder.save();

  const ProductList = req.body.ProductList.map(
    async (item: {
      ProductId: ObjectId;
      Quantity: Object;
      TotalPrice: number;
      Size: string;
    }) => {
      const newItem = new OrderItem({
        ProductId: item.ProductId,
        Quantity: item.Quantity,
        TotalPrice: item.TotalPrice,
        Size: item.Size,
        OrderId: order._id,
      });
      const orderItem = await newItem.save();
      return res.status(201).json(orderItem);
    }
  );
};

export default {
  addOrder,
};
