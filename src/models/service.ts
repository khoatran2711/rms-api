import { NewScheme } from "../helpers/shceme.helper";
import mongoose from "mongoose";

const ServiceScheme = NewScheme({
    name: { type: String },
    decscription: {type: String},
    productsID: { type: [String] },
  });

export const ServiceModel = <any>mongoose.model("Service", ServiceScheme);

export const getServices = async() => ServiceModel.find();
export const getServiceById = async (id: String) => {
    ServiceModel.findOne({ id });
};

export const getServiceWithQuery = async (query: any) => ServiceModel.paginate(query.data,query.option)

export const createService = async (value: Record<string, any>) => {
  new ServiceModel(value).save().then((Service:any) => {
    return Service.toObject();
  });
};

export const deleteServicebyId = async (id: String) => {
    ServiceModel.findOneAndDelete({ _id: id });
};
export const updateUserById = async (id: String, data: Record<string, any>) => {
    ServiceModel.findOneAndUpdate({ _id: id }, data);
};
