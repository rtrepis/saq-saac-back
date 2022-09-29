import { Schema } from "mongoose";

interface SequenceI {
  name: string;
  pictograms: Number[];
  privately: boolean;
  owner: Schema.Types.ObjectId;
}
export default SequenceI;
