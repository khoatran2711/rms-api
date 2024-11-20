import { downloadFile, uploadImage } from '../controller/common/upload';
import express from 'express';

const get = (url: string) => {
    return "/common"+url
  }

  export default (router: express.Router) => {
    router.post(get("/image/upload"),uploadImage)
    router.get(get("/file/download"),downloadFile)
  }