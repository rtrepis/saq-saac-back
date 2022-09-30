interface SequenceI {
  id?: string;
  name: string;
  pictograms: number[];
  privately: boolean;
  owner: { id: string };
}
export default SequenceI;
