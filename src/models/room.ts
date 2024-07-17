import { paginate } from 'mongoose-paginate-v2';
import { getServiceById } from './service';
import { NewScheme } from "helpers/shceme.helper";
import mongoose from "mongoose";

const RoomScheme = NewScheme ({
    name: { type: String },
    roomTypeID: { type: String },
    price: { type: Number },
    status: { type: String } 
})

export const RoomModel = <any>mongoose.model("Room", RoomScheme);

export const getRooms = async() => RoomModel.find();
export const getRoomById = async (id: String) => {
    RoomModel.findOne({ id });
};

export const getRoomWithQuery = async (query: any) => RoomModel.paginate(query.data, query.option)

export const createRoom = async (value: Record<string, any>) => {
    new RoomModel(value).save().then((Room:any) => {
        return Room.toObject();
    });
};

export const deleteRoombyId = async(id: String) => {
    RoomModel.findOneAndDelete({ _id: id});
};

export const updateRoomById = async (id: String, data: Record<string, any>) => {
    RoomModel.findOneAndUpdate({ _id: id }, data);
};

