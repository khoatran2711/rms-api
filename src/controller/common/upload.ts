import express from "express";
import { badRequest, success } from "../../helpers/res.helper";
import fileUpload, { UploadedFile } from "express-fileupload";


export const uploadImage = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const imageFile = (req.files.files as UploadedFile) || "";
      if (!imageFile) {
        return badRequest("file not found ", res, 404);
      }
      imageFile.mv("./src/public/upload/" + imageFile.name);
      let fileName = "/public/upload/" + imageFile.name;
      return success(fileName, res);
    } catch (error) {
        return badRequest("Internal server!", res, 500);

    }
  };