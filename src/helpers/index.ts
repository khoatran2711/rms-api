import { env } from "process";
import jwt from "jsonwebtoken";



export const encode = ( data: any,option = {}) => {
  return jwt.sign(data, env.SECRET_KEY,option)
};

export const decode = (token: string) => {
  return jwt.verify(token,env.SECRET_KEY)
}
