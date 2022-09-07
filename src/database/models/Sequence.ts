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
  private: {
    type: Boolean,
  },
});

const Sequence = model("Sequence", sequenceSchema, "sequences");

export default Sequence;
