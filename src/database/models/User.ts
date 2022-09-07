import { model, Schema } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  sequences: [
    {
      type: Schema.Types.ObjectId,
      ref: "Sequence",
    },
  ],
});

const User = model("User", userSchema, "users");

export default User;
