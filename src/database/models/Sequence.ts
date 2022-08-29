import { model, Schema } from "mongoose";

const sequenceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  pictograms: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: new Date(),
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Sequence = model("Sequence", sequenceSchema, "sequences");

export default Sequence;
