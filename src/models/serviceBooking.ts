import { NewScheme } from "../helpers/shceme.helper";
import mongoose from "mongoose";

const ServiceBookingScheme = NewScheme({
    name: { type: String },
    totalAmount: {type: Number},
    productsID: { type: [String]},
    customerName: { type: String },
    customerPhoneNumber: { type: String },
    status: { type: String }        
  });

export const ServiceBookingModel = <any>mongoose.model("ServiceBooking", ServiceBookingScheme);

export const getServiceBookings = async() => ServiceBookingModel.find();
export const getServiceBookingById = async (id: String) => {
    ServiceBookingModel.findOne({ id });
};

export const getServiceBookingWithQuery = async (query: any) => ServiceBookingModel.paginate(query.data,query.option)

export const createServiceBooking = async (value: Record<string, any>) => {
  new ServiceBookingModel(value).save().then((ServiceBooking:any) => {
    return ServiceBooking.toObject();
  });
};

export const deleteServiceBookingbyId = async (id: String) => {
    ServiceBookingModel.findOneAndDelete({ _id: id });
};
export const updateUserById = async (id: String, data: Record<string, any>) => {
    ServiceBookingModel.findOneAndUpdate({ _id: id }, data);
};
