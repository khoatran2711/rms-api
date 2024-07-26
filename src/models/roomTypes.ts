import { paginate } from 'mongoose-paginate-v2';
import { NewScheme } from "../helpers/shceme.helper";
import mongoose from "mongoose";

const RoomTypesScheme = NewScheme ({
    name: { type: String },
    description: { type: String }
})

export const RoomTypesModel = <any>mongoose.model("RoomTypes", RoomTypesScheme);

export const getRoomTypes = () => RoomTypesModel.find();
export const getRoomTypesById = async (id: String) => {
    RoomTypesModel.findOne({ id });
};

export const getRoomTypesWithQuery = async(query: any) => RoomTypesModel.paginate(query.data, query.option)

export const createRoomTypes = async (value: Record<string,any>) => {
    new RoomTypesModel(value).save().then((RoomTypes:any) => {
        return RoomTypes.toObject();
    });
};

export const deleteRoomTypesById = async (id: String) => {
    RoomTypesModel.findOneAndDelete({ _id: id});
};

export const updateRoomTypesById = async (id: String, data: Record<string, any>) => {
    RoomTypesModel.findOneAndUpdate({ _id: id}, data);
};