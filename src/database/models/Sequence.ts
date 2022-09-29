import { model, Schema } from "mongoose";

const sequenceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  pictograms: {
    type: [Number],
    required: true,
  },
  privately: {
    type: Boolean,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Sequence = model("Sequence", sequenceSchema, "sequences");

export default Sequence;
