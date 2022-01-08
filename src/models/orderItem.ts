import mongoose, { Schema, Document, ObjectId } from "mongoose";

interface IOrderItemModel {
  ProductId: ObjectId;
  TotalPrice: number;
  Quantity: string;
  Sizes: string[];
  OrderId: ObjectId;
}
export interface IOrderItemDocument extends IOrderItemModel, Document {}

const OrderItemSchema = new Schema<IOrderItemModel>(
  {
    ProductId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    TotalPrice: {
      type: Number,
      required: true,
    },
    Quantity: Number,
    Sizes: [String],
    OrderId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
  },
  { timestamps: true }
);

const OrderItem = mongoose.model<IOrderItemDocument>(
  "orderitems",
  OrderItemSchema
);

export default OrderItem;
