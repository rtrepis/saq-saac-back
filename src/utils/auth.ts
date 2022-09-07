import "../loadEnvironment";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserJwtPayload } from "../database/types/interfaces";

export const hashCreator = (text: string) => {
  const salt = 10;
  return bcrypt.hash(text, salt);
};

export const hashCompare = (text: string, hash: string) =>
  bcrypt.compare(text, hash);

export const createToken = (payload: UserJwtPayload) =>
  process.env.NODE_ENV === "test"
    ? jwt.sign(payload, "testSecret")
    : jwt.sign(payload, process.env.SECRET);

export const verifyToken = (token: string) =>
  jwt.verify(token, process.env.SECRET);
