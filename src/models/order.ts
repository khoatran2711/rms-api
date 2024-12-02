import { NewScheme } from "../helpers/shceme.helper";
import mongoose from "mongoose";

const OrderScheme = NewScheme({
  rooms: { type: [{}] },
  services: { type: [{}] },
  userID: { type: String },
  customerName: { type: String },
  identityNumber: { type: String },
  phoneNumber: { type: String },
  members: { type: String },
  checkInDate: { type: Date },
  checkOutDate: { type: Date },
  orderType: { type: String },
  status: { type: String },
});

export const OrderModel = mongoose.model("Order", OrderScheme);

export const getOrders = async () => OrderModel.find();
export const getOrdersByID = async (id: string) => {
  return OrderModel.findOne({ _id: id });
};
export const listOrders = async (query: any) => {
    return OrderModel.find(query);
};
export const getOrderWithQuery = async (query: any) =>
  (OrderModel as any).paginate(query.option);

export const addOrder = async (value: Record<string, any>) => {
  new OrderModel(value).save().then((Order: any) => {
    return Order.toObject();
  });
};
