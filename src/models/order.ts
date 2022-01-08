import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IOrderModel {

  ClientId: ObjectId;
}

export interface IOrderDocument extends IOrderModel, Document {}

const OrderSchema = new Schema<IOrderModel>(
  {

    ClientId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrderDocument>("orders", OrderSchema);

export default Order;
