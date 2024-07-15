import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';

export const NewScheme = (obj: any) => {
    let baseScheme = new mongoose.Schema(
      {
        ...obj,
        created_at: { type: Number },
        updated_at: { type: Number },
      },
      {
        timestamps: {
          createdAt: "created_at",
          updatedAt: "updated_at",
          currentTime: () => Math.floor(Date.now() / 1000),
        },
      }
    );
    baseScheme.set("toJSON", {
      transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    });
    baseScheme.plugin(paginate) ;
  
    return baseScheme;
  };