import * as yup from "yup";

export const creatProductSchema = yup.object().shape({
  Name: yup.string().required("Name is required"),
  Price: yup.string().required("Phone is required"),
  Details: yup.string().required("Phone is required"),
//   Quantity: yup.string().required("Phone is required"),
//   Sizes: yup.string().required("Phone is required"),
  SKU: yup.string().required("Phone is required"),
//   Product_images: yup.string().required("Phone is required"),
  
});