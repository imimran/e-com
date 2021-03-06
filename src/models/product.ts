import mongoose, { Schema, Document, ObjectId, FilterQuery, UpdateQuery } from "mongoose";



interface IProductModel {
  Name: string;
  Price: string;
  Details: string;
  Quantity: ObjectId;
  Sizes: string[];
  SKU: string;
  Product_images: string[];
}
export interface IProductDocument extends IProductModel, Document {}


const ProductSchema = new Schema<IProductModel>(
  {
    Name: {
      type: String,
      required: true,
    },
    Price: {
      type: String,
      required: true,
    },
    Details: {
      type: String,
      required: true,
    },
    Quantity: {
      type: Schema.Types.ObjectId,
      ref: "quantities",
    },
    Sizes: [String],
    SKU: {
      type: String,
      required: true,
    },
    Product_images: [String],
  },
  { timestamps: true }
);

const Product = mongoose.model<IProductDocument>("products", ProductSchema);

export default Product;


export const updateProductSingle = async (
    query: FilterQuery<IProductDocument>,
    data: UpdateQuery<IProductDocument>
  ) => {
    const options = { new: true, omitUndefined: true };
    const updatedData = await Product.findOneAndUpdate(query, data, options);
    return updatedData;
  };
