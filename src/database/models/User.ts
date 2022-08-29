import { model, Schema } from "mongoose";

export interface UserData {
  id: string;
  userName: string;
  image?: string;
  passwordHash: string;
}

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  sequence: [{ type: Schema.Types.ObjectId, ref: "Sequence" }],
});

const User = model("User", userSchema, "users");

export default User;
