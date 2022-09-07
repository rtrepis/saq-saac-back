import { Schema } from "mongoose";

interface SequenceI {
  name: string;
  pictograms: [Number];
  private: boolean;
  owner: Schema.Types.ObjectId;
}

export default SequenceI;
