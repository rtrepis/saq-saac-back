import { model, Schema } from "mongoose";

export interface UserData {
  id: string;
  userName: string;
  image?: string;
  passwd: string;
}

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  passwd: {
    type: String,
    required: true,
  },
  sequence: [{ type: Schema.Types.ObjectId, ref: "Sequence" }],
});

const User = model("User", userSchema, "users");

export default User;
