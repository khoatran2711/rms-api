import { NewScheme } from "helpers/shceme.helper";
import mongoose from "mongoose";

const OrderScheme = NewScheme({
    serviceBookingsID: { type: String },
    roomBookingsID: { type: String },
    status: { type: String }
})

export const OrderModel = mongoose.model("Order", OrderScheme);

export const getOrders = async() => OrderModel.find();
export const getOrdersByID = async (id: string) => {
    return OrderModel.findOne({ _id: id })
};

export const getOrderWithQuery = async (query: any) => (OrderModel as any).paginate(query.option);

export const addOrder = async (value: Record<string, any>) => {
    new OrderModel(value).save().then((Order:any) => {
        return Order.toObject();
    });
};
