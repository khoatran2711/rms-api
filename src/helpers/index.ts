import { env } from "process";
import jwt from "jsonwebtoken";


const secret_key = process.env.SECRET_KEY
export const encode = ( data: any,option = {}) => {
  return jwt.sign(data, secret_key,option)
};

export const decode = (token: string) => {
  return jwt.verify(token,secret_key)
}
