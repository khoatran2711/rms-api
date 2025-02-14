import { NewScheme } from "../helpers/shceme.helper";
import mongoose from "mongoose";

const OrderScheme = NewScheme({
  rooms: { type: [{}] },
  services: { type: [{}] },
  userID: { type: String },
  customerName: { type: String },
  identityNumber: { type: String },
  phoneNumber: { type: String },
  email: { type: String },
  members: { type: String },
  checkInDate: { type: Number },
  checkOutDate: { type: Number },
  orderType: { type: String },
  totalAmount: { type: Number },
  status: { type: String },
});

export const OrderModel = mongoose.model("Order", OrderScheme);

export const getOrders = async () => OrderModel.find();
export const getOrderByID = async (id: string) => {
  return OrderModel.findOne({ _id: id });
};
export const listOrders = async (query: any) => {
  return OrderModel.find(query);
};
export const getOrderWithQuery = async (query: any) =>
  (OrderModel as any).paginate(query.data, query.option);

export const addOrder = async (value: Record<string, any>) => {
  new OrderModel(value).save().then((Order: any) => {
    return Order.toObject();
  });
};
export const updateOrderByID = async (id: any, data: any) => {
  return OrderModel.findOneAndUpdate({ _id: id }, data);
};
export const countOrdersByDay = async (
  start: number,
  end: number,
  type: string
) => {
  let dateFormat;
  let filter;
  if (type === "week" || type === "days") {
    dateFormat = "%d-%m-%Y";
    filter = {
      created_at: {
        $gte: start,
        $lte: end,
      },
    };
  } else if (type === "month") {
    dateFormat = "%m-%Y";
    filter = {};
  }
  return OrderModel.aggregate([
    {
      $match: filter,
    },
    {
      $group: {
        _id: {
          date: {
            $dateToString: {
              format: dateFormat,
              date: { $toDate: { $multiply: ["$created_at", 1000] } },
            },
          },
          orderType: "$orderType",
        },
        orderCount: { $sum: 1 },
        totalAmount: { $sum: "$totalAmount" },
      },
    },
    {
      $group: {
        _id: "$_id.date",
        bookings: {
          $push: {
            type: "$_id.orderType",
            orderCount: "$orderCount",
            totalAmount: "$totalAmount",
          },
        },
      },
    },
    {
      $addFields: { date: "$_id" },
    },
    {
      $sort: { _id: 1 },
    },
    {
      $project: { _id: 0 },
    },
  ]);
};
