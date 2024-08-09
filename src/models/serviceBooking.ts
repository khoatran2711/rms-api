import { NewScheme } from "../helpers/shceme.helper";
import mongoose from "mongoose";
import { ProductModel } from "./product";

const ServiceBookingScheme = NewScheme({
  products: { type: [{}] },
  totalAmount: { type: Number },
  customerName: { type: String },
  customerPhoneNumber: { type: String },
  userID: { type: String }
});

export const ServiceBookingModel = mongoose.model(
  "ServiceBooking",
  ServiceBookingScheme
);

export const getServiceBookings = async () => ServiceBookingModel.find();
export const getServiceBookingById = async (id: string) => {
  return ServiceBookingModel.findOne({ _id: id });
};

export const getServiceBookingByProduct = async (products: [{}]) => {
  return ServiceBookingModel.findOne({ products });
};

export const getServiceBookingWithQuery = async (query: any) =>
  (ServiceBookingModel as any).paginate(query.data, query.option);

export const addServiceBooking = async (value: Record<string, any>) => {
  new ServiceBookingModel(value).save().then((ServiceBooking: any) => {
    return ServiceBooking.toObject();
  });
};

export const deleteServiceBookingbyId = async (id: String) => {
  return ServiceBookingModel.findOneAndDelete({ _id: id });
};
export const updateServiceBookingById = async (
  id: String,
  data: Record<string, any>
) => {
  return ServiceBookingModel.findOneAndUpdate({ _id: id }, data);
};
