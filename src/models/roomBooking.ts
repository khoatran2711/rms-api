import { paginate } from 'mongoose-paginate-v2';
import { NewScheme } from "../helpers/shceme.helper"
import mongoose from "mongoose"

const RoomBookingScheme = NewScheme({
    roomID: { type: String },
    userID: { type: String },
    customers: { type: String },
    checkInDate: { type: Date },
    checkOutDate: { type: Date },
    status: { type: String }
})
export const RoomBookingModel = <any>mongoose.model("RoomBooking", RoomBookingScheme);

export const getRoomBookings = async() => RoomBookingModel.find();
export const getRoomBookingById = async(id: String) => { 
    RoomBookingModel.findOne({ id });
};

export const getRoomBookingWithQuery = async (query: any) => RoomBookingModel.paginate(query.data, query.option)
export const createRoomBooking = async (value: Record<string, any>) => {
    new RoomBookingModel(value).save().then((RoomBooking:any) => {
        return RoomBooking.toObject();
    });
};

export const deleteRoomBookingById = async (id: String) => {
    RoomBookingModel.findOneAndDelete({ _id: id });
};

export const updateRoomBookingById = async (id: String, data: Record<string,any>) => {
    RoomBookingModel.findOneAndUpdate({ _id: id}, data);
};