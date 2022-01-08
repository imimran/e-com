import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IClientModel {
  Name: string;
  Email: string;
  Phone: string;
}

export interface IClientDocument extends IClientModel, Document {}
const ClientSchema = new Schema<IClientModel>(
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Client = mongoose.model<IClientDocument>("clients", ClientSchema);

export default Client;
