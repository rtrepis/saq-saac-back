import { NextFunction, Request, Response } from "express";
import User from "../../../database/models/User";
import CustomError from "../../../utils/CustomError";
import registerUser from "./registerContoller";

let mockUser = {
  userName: "TestUser",
  password: "Validate",
};
const req = {
  body: mockUser,
} as Partial<Request>;

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as Partial<Response>;

describe("Given a function registerUser", () => {
  describe("When it receives a response object with 'userName' and 'password'", () => {
    test("Then it should called with 201 status code and with expectMessage", async () => {
      const expectMessage = { message: "User successfully created" };
      const status = 201;
      const next = () => {};
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
      };
      const testError = new CustomError(400, "", "Error creating new user");
      User.create = jest.fn().mockRejectedValue(testError);
      const next = jest.fn();

      await registerUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(testError);
    });
  });
});
