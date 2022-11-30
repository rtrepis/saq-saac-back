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
  sequencesCreate: { id: string[] };
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

export interface EmailForgot {
  email: string;
}

export interface ResetPassword {
  password: string;
  code: string;
}
