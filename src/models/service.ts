import { NewScheme } from "../helpers/shceme.helper";
import mongoose from "mongoose";

const ServiceScheme = NewScheme({
    name: { type: String },
    decscription: {type: String},
    productsID: { type: [String] },
  });

export const ServiceModel = mongoose.model("Service", ServiceScheme);

export const getServices = async() => ServiceModel.find();
export const getServiceById = async (id: String) => {
    ServiceModel.findOne({_id:id});
};

export const getServiceWithQuery = async (query: any) => (ServiceModel as any).paginate(query.data,query.option)

export const createService = async (value: Record<string, any>) => {
  new ServiceModel(value).save().then((Service:any) => {
    return Service.toObject();
  });
};

export const deleteServiceById = async (id: String) => {
    ServiceModel.findOneAndDelete({ _id: id });
};
export const updateServiceById = async (id: String, data: Record<string, any>) => {
    ServiceModel.findOneAndUpdate({ _id: id }, data);
};
