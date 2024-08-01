import { NewScheme } from "../helpers/shceme.helper";
import mongoose from "mongoose";

const ServiceBookingScheme = NewScheme({
  products: { type: String },
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
export const getServiceBookingById = async (id: String) => {
  ServiceBookingModel.findOne({ _id: id });
};

export const getServiceBookingWithQuery = async (query: any) =>
  (ServiceBookingModel as any).paginate(query.data, query.option);

export const createServiceBooking = async (value: Record<string, any>) => {
  new ServiceBookingModel(value).save().then((ServiceBooking: any) => {
    return ServiceBooking.toObject();
  });
};

export const deleteServiceBookingbyId = async (id: String) => {
  ServiceBookingModel.findOneAndDelete({ _id: id });
};
export const updateServiceBookingById = async (
  id: String,
  data: Record<string, any>
) => {
  ServiceBookingModel.findOneAndUpdate({ _id: id }, data);
};
