
import { NewScheme } from "../helpers/shceme.helper";
import mongoose from "mongoose";

const RoomScheme = NewScheme ({
    name: { type: String },
    roomTypeID: { type: String },
    price: { type: Number },
    status: { type: String } 
})

export const RoomModel = mongoose.model("Room", RoomScheme);

export const getRooms = async() => RoomModel.find();
export const getRoomById = async (id: String) => {
    return RoomModel.findOne({ _id: id });
};
export const getRoomByName = async (name: String) => {
   return RoomModel.findOne({ name });
};

export const getRoomWithQuery = async (query: any) => (RoomModel as any).paginate(query.data, query.option)

export const addRoom = async (value: Record<string, any>) => {
    new RoomModel(value).save().then((Room:any) => {
        return Room.toObject();
    });
};

export const deleteRoombyId = async(id: String) => {
   RoomModel.findOneAndDelete({ _id: id});
};

export const updateRoomById = async (id: String, data: Record<string, any>) => {
   return RoomModel.findOneAndUpdate({_id:id}, data)
}
