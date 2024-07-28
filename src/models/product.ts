import { NewScheme } from "../helpers/shceme.helper";
import mongoose from "mongoose";

const ProductScheme = NewScheme({
    name: { type: String },
    decscription: {type: String},
    price: {type: String},
  });

export const ProductModel = mongoose.model("Product", ProductScheme);

export const getProducts = async() => ProductModel.find();
export const getProductById = async (id: String) => {
    ProductModel.findOne({ id });
};

export const getProductsByName = async (name: String) => {
  return ProductModel.findOne({ name });
};

export const getProductWithQuery = async (query: any) => (ProductModel as any).paginate(query.data,query.option)

export const addProduct = async (value: Record<string, any>) => {
  new ProductModel(value).save().then((Product:any) => {
    return Product.toObject();
  });
};

export const deleteProductbyId = async (id: String) => {
    ProductModel.findOneAndDelete({ _id: id });
};
export const updateProductById = async (id: String, data: Record<string, any>) => {
    ProductModel.findOneAndUpdate({ _id: id }, data);
};
