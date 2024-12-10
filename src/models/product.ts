import { NewScheme } from "../helpers/shceme.helper";
import mongoose from "mongoose";

export const ProductScheme = NewScheme({
  name: { type: String },
  decscription: { type: String },
  serviceID: { type: String, ref: "Service" },
  imgUrl: { type: String },
  price: { type: String },
});

export const ProductModel = mongoose.model("Product", ProductScheme);

export const getProducts = async () => ProductModel.find();
export const getProductById = async (id: string) => {
  return ProductModel.findOne({ _id: id });
};

export const getProductsByName = async (name: String) => {
  return ProductModel.findOne({ name });
};

export const getProductWithQuery = async (query: any) =>
  (ProductModel as any).paginate(query.data, query.option);

export const addProduct = async (value: Record<string, any>) => {
  new ProductModel(value).save().then((Product: any) => {
    return Product.toObject();
  });
};

export const deleteProductbyId = async (id: String) => {
  return ProductModel.findOneAndDelete({ _id: id });
};
export const updateProductbyId = async (
  id: String,
  data: Record<string, any>
) => {
  return ProductModel.findOneAndUpdate({ _id: id }, data);
};
