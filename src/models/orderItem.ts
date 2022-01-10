import mongoose, { Schema, Document, ObjectId } from "mongoose";

interface IOrderItemModel {
  ProductId: ObjectId;
  TotalPrice: number;
  Quantity: string;
  Size: string;
  OrderId: ObjectId;
}
export interface IOrderItemDocument extends IOrderItemModel, Document {}

const OrderItemSchema = new Schema<IOrderItemModel>(
  {
    ProductId: {
      type: Schema.Types.ObjectId,
      ref: "products",
    },
    TotalPrice: {
      type: Number,
      required: true,
    },
    Quantity: Number,
    Size: String,
    OrderId: {
      type: Schema.Types.ObjectId,
      ref: "orders",
    },
  },
  { timestamps: true }
);

const OrderItem = mongoose.model<IOrderItemDocument>(
  "orderitems",
  OrderItemSchema
);

export default OrderItem;
