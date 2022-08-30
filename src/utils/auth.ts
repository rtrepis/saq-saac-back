import "../loadEnvironment";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Jwt } from "../database/types/interfaces";

export const createToken = (payload: Jwt) =>
  jsonwebtoken.sign(payload, process.env.SECRET);

export const verifyToken = (token: string) =>
  jsonwebtoken.verify(token, process.env.SECRET);

export const hashCreator = (text: string) => {
  const salt = 10;
  return bcrypt.hash(text, salt);
};

export const hashCompare = (text: string, hash: string) =>
  bcrypt.compare(text, hash);
