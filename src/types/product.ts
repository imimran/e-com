import { ObjectId } from "mongoose";

export interface IQuantityBody {
  ProductId?: ObjectId;
  Quantity: number;
}

export interface ICreateProductBody {
  Name: string;
  Price: string;
  Details: string;
  Quantity: IQuantityBody;
  Sizes: string[];
  SKU: string;
  Product_images: string[];
}
