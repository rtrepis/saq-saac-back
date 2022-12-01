export interface Jwt {
  id: string;
  userName: string;
}

export interface UserRegister {
  userName: string;
  password: string;
  email: string;
  confirmationCode: string;
}

export interface UserData {
  id: string;
  userName: string;
  password: string;
  sequencesCreate: [];
  email: string;
  status: "Pending" | "Active";
  confirmationCode: string;
}

export interface UserJwtPayload {
  id: string;
  userName: string;
}

export interface UserLogin {
  userName: string;
  password: string;
}
