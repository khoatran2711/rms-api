import express from "express";

export const success = (data: any, res?: express.Response) => {
    res.send({
        data: data,
        status: "ok",
      })
      .status(200);
  };
  export const badRequest = (
    message: string,
    res?: express.Response,
    code = 400
  ) => {
    res.status(code).send({
      message: message,
      status: "error",
    });
  };  