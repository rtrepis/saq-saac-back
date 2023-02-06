import { NextFunction, Request, Response } from "express";
import User from "../../../database/models/User";
import CustomError from "../../../utils/CustomError";
import registerUser from "./registerController";

let mockUser = {
  userName: "TestUser",
  password: "Validate",
  email: "email@validate.com",
};
const req = {
  body: mockUser,
} as Partial<Request>;

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as Partial<Response>;

jest.mock("../../../utils/auth", () => ({
  ...jest.requireActual("../../../utils/auth"),
  createToken: () => jest.fn().mockReturnValue("#"),
  hashCreator: () => jest.fn().mockReturnValue("hashPassword"),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a function registerUser", () => {
  describe("When it receives a request object with 'userName' and 'password'", () => {
    test("Then it should called with 201 status code and with expectMessage", async () => {
      const expectMessage = { message: "User successfully created" };
      const status = 201;
      const next = () => {};
      User.find = jest.fn().mockResolvedValue([]);
      User.create = jest.fn().mockResolvedValue(mockUser);

      await registerUser(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith(expectMessage);
    });
  });

  describe("when with a incorrect user data", () => {
    test("Then it should called and reject error", async () => {
      mockUser = {
        userName: "Ern",
        password: "",
        email: "",
      };
      const testError = new CustomError(400, "", "Error creating new user");
      User.find = jest.fn().mockResolvedValue([]);
      User.create = jest.fn().mockRejectedValue(testError);
      const next = jest.fn();

      await registerUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(testError);
    });
  });

  describe("When with a email duplicate in database", () => {
    test("Then it should reject to error", async () => {
      const testError = new CustomError(
        403,
        "email duplicate",
        "invalid register"
      );
      const userDB = {
        userName: "TestInDB",
        password: "SameEmail",
        email: "email@validate.com",
      };

      User.find = jest.fn().mockResolvedValue([userDB]);
      const next = jest.fn();

      await registerUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(testError);
    });
  });
});
