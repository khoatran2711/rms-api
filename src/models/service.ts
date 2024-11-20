import { NewScheme } from "../helpers/shceme.helper";
import mongoose from "mongoose";

const ServiceScheme = NewScheme({
    name: { type: String },
    decscription: {type: String},
    imageURL: {type: String}
  });

export const ServiceModel = mongoose.model("Service", ServiceScheme);

export const getServices = async() => ServiceModel.find();
export const getServiceById = async (id: String) => {
   return ServiceModel.findOne({_id:id});
};

export const getServicesByName = async(name: string) =>{
  return ServiceModel.findOne({ name });
};

export const getServiceWithQuery = async (query: any) => (ServiceModel as any).paginate(query.data,query.option)

export const addService = async (value: Record<string, any>) => {
  new ServiceModel(value).save().then((Service:any) => {
    return Service.toObject();
  });
};

export const deleteServiceById = async (id: String) => {
   return ServiceModel.findOneAndDelete({ _id: id });
};
export const updateServiceById = async (id: String, data: Record<string, any>) => {
   return ServiceModel.findOneAndUpdate({ _id: id }, data);
};
