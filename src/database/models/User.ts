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
  sequencesCreate: [
    {
      type: Schema.Types.ObjectId,
      ref: "Sequence",
    },
  ],
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Active"],
    default: "Pending",
  },
});

const User = model("User", userSchema, "users");

export default User;
