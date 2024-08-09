// import express from "express";
// import { badRequest, success } from "../../helpers/res.helper";
// import fileUpload, { UploadedFile } from "express-fileupload";

<<<<<<< HEAD

// export const uploadImage = async (
//     req: express.Request,
//     res: express.Response
//   ) => {
//     try {
//       const imageFile = (req.files.files as UploadedFile) || "";
//       if (!imageFile) {
//         return badRequest("file not found ", res, 404);
//       }
//       imageFile.mv("./src/public/upload/" + imageFile.name);
//       let fileName = "/public/upload/" + imageFile.name;
//       return success(fileName, res);
//     } catch (error) {
//         return badRequest("Internal server!", res, 500);

//     }
//   };
=======
export const uploadImage = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    if (!req.files) {
      return badRequest("file Not Found!", res, 404);
    }
    const imageFile = req.files.file as UploadedFile;
    imageFile.mv("./src/public/upload/" + imageFile.name);
    let fileName = "/public/upload/" + imageFile.name;
    return success(fileName, res);
  } catch (error) {
    console.log(error);
    return badRequest("Internal server!", res, 500);
  }
};
>>>>>>> origin/main
