import {
  generateInvoice,
  generateInvoiceHTML,
} from "./../template/generatePDF";
import { ObjectId } from "mongoose";
import { NextFunction, Request, Response } from "express";
import Order from "../models/order";
import OrderItem from "../models/orderItem";
import Client from "../models/client";
import QuantityM from "../models/quantity";
import Product from "../models/product";
import logger from "../logger";

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

  if (foundUser) {
    client = foundUser._id;
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
      const foundProduct = await Product.findOne({
        _id: item.ProductId,
        Sizes: item.Size,
      });

      if (!foundProduct) {
        return res.status(404).json({ message: "Product or Size Not found" });
      }

      const newItem = new OrderItem({
        ProductId: item.ProductId,
        Quantity: item.Quantity,
        TotalPrice: item.TotalPrice,
        Size: item.Size,
        OrderId: order._id,
      });
      const orderItem = await newItem.save();

      await QuantityM.findOneAndUpdate(
        { ProductId: item.ProductId },
        { $inc: { Quantity: -item.Quantity } },
        { new: true }
      );

      return res.status(201).json(orderItem);
    }
  );
};

const getOrder = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  let foundOrder = await Order.findOne({
    _id: orderId,
  }).populate("ClientId");

  if (!foundOrder) {
    return res.status(404).json({ message: "No Product found" });
  }

  let foundOrderItem = await OrderItem.findOne({
    OrderId: { $in: [orderId] },
  });

  return res
    .status(200)
    .json({ order: foundOrder, order_items: foundOrderItem });
};

const getClientDetails = async (req: Request, res: Response) => {
  const { clientId } = req.params;

  let foundClient = await Client.findOne({
    _id: clientId,
  });
  if (!foundClient) {
    return res.status(404).json({ message: "No client found" });
  }

  let foundOrders;
  if (foundClient) {
    foundOrders = await Order.find({
      ClientId: { $in: [foundClient._id] },
    });
  }

  if (foundOrders) {
    foundOrders.map(async (item) => {
      const foundOrderItems = await OrderItem.findOne({
        OrderId: item._id,
      })
        .populate("ProductId")
        .populate("OrderId");
      logger.info("data..", foundOrderItems);
      if (foundOrderItems) {
        return res.json(foundOrderItems);
      }
    });
  }
};

const getClientsOrderDetailsPDF = async (req: Request, res: Response) => {
  const { clientId } = req.params;

  let foundClient = await Client.findOne({
    _id: clientId,
  });
  if (!foundClient) {
    return res.status(404).json({ message: "No client found" });
  }

  let foundOrders;
  if (foundClient) {
    foundOrders = await Order.find({
      ClientId: { $in: [foundClient._id] },
    });
  }

  if (foundOrders) {
    foundOrders.map(async (item: any) => {
      let foundOrderItem = await OrderItem.findOne({
        OrderId: item._id,
      })
        .populate("ProductId")
        .populate("OrderId");

        logger.info("pdf...", foundOrderItem);
      if (foundOrderItem) {
        generateInvoice(
          generateInvoiceHTML(foundOrderItem),
          (err, pdfStream) => {
            if (!err && pdfStream) {
              pdfStream.pipe(res);
            }
          }
        );
      }
    });
  }
};
export default {
  addOrder,
  getOrder,
  getClientDetails,
  getClientsOrderDetailsPDF,
};
