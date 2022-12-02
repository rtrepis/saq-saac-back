import "../loadEnvironment";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import { UserJwtPayload } from "../database/types/UsersInterfaces";

export const hashCreator = (text: string) => {
  const salt = 10;
  return bcrypt.hash(text, salt);
};

export const hashCompare = (text: string, hash: string) =>
  bcrypt.compare(text, hash);

export const createToken = (payload: UserJwtPayload | string) =>
  jwt.sign(payload, process.env.SECRET);

export const verifyToken = (token: string) =>
  jwt.verify(token, process.env.SECRET);

export const decodeToken = (token: string) => {
  const payloadTokenForgot: {
    email: string;
    iat: number;
  } = jwtDecode(token);

  return {
    email: payloadTokenForgot.email,
  };
};
