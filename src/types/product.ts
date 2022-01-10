import { ObjectId } from "mongoose";

export interface IQuantityBody {
  Quantity: number;
}

export interface ICreateProductBody {
  Name: string;
  Price: string;
  Details: string;
  Quantity: ObjectId;
  Sizes: string[];
  SKU: string;
  Product_images: string[];
}
