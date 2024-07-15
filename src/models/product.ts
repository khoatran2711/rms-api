import { NewScheme } from "../helpers/shceme.helper";
import mongoose from "mongoose";

const ProductScheme = NewScheme({
    name: { type: String },
    decscription: {type: String},
    price: {type: String},
  });

export const ProductModel = <any>mongoose.model("Product", ProductScheme);

export const getProducts = async() => ProductModel.find();
export const getProductById = async (id: String) => {
    ProductModel.findOne({ id });
};

export const getProductWithQuery = async (query: any) => ProductModel.paginate(query.data,query.option)

export const createProduct = async (value: Record<string, any>) => {
  new ProductModel(value).save().then((Product:any) => {
    return Product.toObject();
  });
};

export const deleteProductbyId = async (id: String) => {
    ProductModel.findOneAndDelete({ _id: id });
};
export const updateUserById = async (id: String, data: Record<string, any>) => {
    ProductModel.findOneAndUpdate({ _id: id }, data);
};
