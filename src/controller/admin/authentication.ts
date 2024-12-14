import { addUser, getUserWithEmail } from "../../models/user";
import express from "express";
import { encode } from "../../helpers/index";
import { badRequest, success } from "../../helpers/res.helper";

export const register = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { email, password, userName } = req.body;
    const existingUser = await getUserWithEmail(email);
    if (existingUser) {
      return badRequest("Email address already exists", res);
    }
    const hashPass = encode(password);
    const user = await addUser({
      email,
      userName,
      password: hashPass,
    });
    return success("", res);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await getUserWithEmail(email);
    if (!user) {
      return badRequest("username or password incorrect ", res);
    }

    const hashPass = encode(password);
    if (user.password !== hashPass) {
      return badRequest("username or password incorrect ", res);
    }
    const { password: _,roleID, ...rest } = user;
    const sucessUser = {
      ...rest,
    };
    const access_token = encode(sucessUser, { expiresIn: "1 day" });
    return success({ access_token, expiresIn: "1 day", roleID:roleID  }, res);
  } catch (error) { 
    console.log(error);
    badRequest("Interal server", res, 505);
  }
};

export const initAdmin = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const hashPass = encode("admin123");
    const data = {
      email: "admin@gmail.com",
      password: hashPass,
      userName: "admin",
    };
    const existingUser = await getUserWithEmail(data.email);
    if (existingUser) {
      return badRequest("Email address already exists", res);
    }
    const _ = await addUser(data);
    return success("", res);
  } catch (error) {
    badRequest("Interal Server", res, 505);
  }
};
