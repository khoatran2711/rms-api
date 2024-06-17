import { createUser, getUserWithEmail } from "../../models/user";
import { create } from "domain";
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
      return badRequest("Email address already exists",res)
    }
    const hashPass = encode(password);
    const user = await createUser({
      email,
      userName,
      password: hashPass,
    });
    return success("",res)
  } catch (error) {
    next(error);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    const user = await getUserWithEmail(email);
    if (!user) {
      return badRequest("username or password incorrect ")
    }

    const hashPass = encode(password);
    if (user.password !== hashPass) {
      return badRequest("username or password incorrect ")
    }
    const sucessUser = {
      email: user.email,
      userName: user.userName
    }
    const access_token = encode(sucessUser,{expiresIn: "1 day",});
    return success(access_token)
  } catch (error) {
    badRequest("Interal server",res,505)

  }
};
