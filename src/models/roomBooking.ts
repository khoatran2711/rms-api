import { paginate } from 'mongoose-paginate-v2';
import { NewScheme } from "../helpers/shceme.helper"
import mongoose from "mongoose"

const RoomBookingScheme = NewScheme({
    roomID: { type: [{}] },
    userID: { type: String },
    customerName: { type: String },
    identityNumber: { type: String },
    phoneNumber: { type: String },
    member: { type: String },
    checkInDate: { type: Date },
    checkOutDate: { type: Date },
    status: { type: String }
})
export const RoomBookingModel = mongoose.model("RoomBooking", RoomBookingScheme);

export const getRoomBookings = async() => RoomBookingModel.find();
export const getRoomBookingById = async(id: String) => { 
    RoomBookingModel.findOne({_id:id});
};

export const getRoomBookingWithQuery = async (query: any) => (RoomBookingModel as any).paginate(query.data, query.option)
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