import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IOrderModel {
  OrderId: ObjectId;
  ClientId: ObjectId;
}

export interface IOrderDocument extends IOrderModel, Document {}

const OrderSchema = new Schema<IOrderModel>(
  {
    OrderId: {
      type: Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true,
    },
    ClientId: {
      type: Schema.Types.ObjectId,
      ref: "clients",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrderDocument>("orders", OrderSchema);

export default Order;
