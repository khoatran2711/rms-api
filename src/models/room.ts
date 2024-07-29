
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
export const getRoomByID = async (id: string) =>{
   return RoomModel.findOne({ _id: id })
};
  
export const getRoomByName = async (name: string) => {
   return RoomModel.findOne({ name });
};

export const getRoomWithQuery = async (query: any) => (RoomModel as any).paginate(query.data, query.option)

export const addRoom = async (value: Record<string, any>) => {
    new RoomModel(value).save().then((Room:any) => {
        return Room.toObject();
    });
};

export const deleteRoombyId = async(id: string) => {
   return RoomModel.findOneAndDelete({ _id: id});
};

export const updateRoomById = async (id: string, data: Record<string, any>) => {
   return RoomModel.findOneAndUpdate({_id:id}, data)
}
