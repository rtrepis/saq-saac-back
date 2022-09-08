import { Schema } from "mongoose";

export interface Jwt {
  id: string;
  userName: string;
}

export interface UserRegister {
  userName: string;
  password: string;
}

export interface UserData {
  id: string;
  userName: string;
  password: string;
  sequencesCreate: Schema.Types.ObjectId;
}

export interface UserJwtPayload {
  id: string;
  userName: string;
}

export interface UserLogin {
  userName: string;
  password: string;
}
