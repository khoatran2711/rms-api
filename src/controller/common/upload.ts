import express from "express";
import { badRequest, success } from "../../helpers/res.helper";
import fileUpload, { UploadedFile } from "express-fileupload";
import path from "path";
import * as fs from 'fs';
import * as https from 'https';
import * as http from 'http';

export const uploadImage = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    if (!req.files) {
      return badRequest("file Not Found!", res, 404);
    }
    const imageFile = req.files.file as UploadedFile;
    console.log(imageFile.mimetype);
    if (!imageFile.mimetype.includes("image")) {
      return badRequest("File type is not allowed!", res, 400);
    }
    imageFile.mv("./src/public/upload/" + imageFile.name);
    let fileName = "/public/upload/" + imageFile.name;
    return success(fileName, res);
  } catch (error) {
    console.log(error);
    return badRequest("Internal server!", res, 500);
  }
};
export const downloadFile = async (
  req: express.Request,
  res: express.Response
) => {
  const reqfilePath = req.query.url as string;
  const pathDf = reqfilePath.split('/').pop();
  const fileName = pathDf[pathDf.length - 1];
  if (!reqfilePath) {
    return res.status(400).json({ message: 'URL is required' });
  }

  const filePath = path.join(__dirname, reqfilePath);

  // Tạo folder nếu chưa có
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const fileUrl = 'https://hexadash-angular.vercel.app/' + reqfilePath;
  const protocol = fileUrl.startsWith('https') ? https : http;
  const fileStream = fs.createWriteStream(filePath);

  protocol.get(fileUrl, (response) => {
    if (response.statusCode !== 200) {
      return res.status(500).json({ message: `Failed to download file: ${response.statusCode}` });
    }

    response.pipe(fileStream);

    fileStream.on('finish', () => {
      fileStream.close();
      res.json({ message: 'File downloaded successfully', filePath });
    });

    fileStream.on('error', (err) => {
      fs.unlink(filePath, () => {}); // Xóa file nếu có lỗi
      res.status(500).json({ message: 'Error saving file', error: err.message });
    });
  }).on('error', (err) => {
    res.status(500).json({ message: 'Failed to download file', error: err.message });
  });
};