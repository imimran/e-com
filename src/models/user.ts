import mongoose, { Schema, Document } from "mongoose";

interface IUserModel {
  name: string;
  phone: string;
  email: string;
  password: string;
  occupation: string;
}
export interface IUserDocument extends IUserModel, Document {}

const UserSchema = new Schema<IUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    occupation: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUserDocument>("users", UserSchema);

export default User;
