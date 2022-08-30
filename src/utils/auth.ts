import "../loadEnvironment";
import bcrypt from "bcryptjs";

export const hashCreator = (text: string) => {
  const salt = 10;
  return bcrypt.hash(text, salt);
};

export default hashCreator;
