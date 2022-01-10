import mongoose, { Schema, Document, ObjectId } from "mongoose";

interface IQuantityModel {
  ProductId: ObjectId;
  Quantity: number;
}

export interface IQuantityDocument extends IQuantityModel, Document {}

const QantitySchema = new Schema<IQuantityModel>({
  ProductId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  Quantity: {
    type: Number,
    required: true,
  },
});

const QuantityM = mongoose.model<IQuantityDocument>("quantities", QantitySchema);

export default QuantityM;
