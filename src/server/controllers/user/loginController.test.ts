import { NextFunction, Request, Response } from "express";
import User from "../../../database/models/User";
import CustomError from "../../../utils/CustomError";
import loginUser from "./loginController";

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

let mockHashCompareValue = false;

jest.mock("../../../utils/auth", () => ({
  ...jest.requireActual("../../../utils/auth"),
  createToken: () => jest.fn().mockReturnValue("#"),
  hashCompare: () => mockHashCompareValue,
}));

let mockLoggedUser = {
  id: "1345422",
  userName: "TestUser",
  password: "Validate",
  status: "Active",
};

describe("Given a function loginUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("When it receives a response with 'userName' not register", () => {
    test("Then it should called and reject with custom error", async () => {
      mockUser = { ...mockUser, userName: "NotUser", password: "invalid" };
      const testError = new CustomError(403, "", "User or password invalid");
      User.find = jest.fn().mockRejectedValue(testError);
      const next = jest.fn();

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives a response with user invalid password", () => {
    test("Then is should called and return with custom error", async () => {
      mockUser = { ...mockUser, userName: "TestUser", password: "invalid" };

      User.find = jest.fn().mockResolvedValue([mockLoggedUser]);
      const next = jest.fn();

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives a response with user validate password", () => {
    test("Then is should called return with status 200", async () => {
      mockHashCompareValue = true;
      mockUser = { ...mockUser, userName: "TestUser", password: "Validate" };

      User.find = jest.fn().mockResolvedValue([mockLoggedUser]);
      const status = 200;
      const next = () => {};

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(status);
    });
  });

  describe("When it receives a response with user not verify email", () => {
    test("Then is should called next", async () => {
      mockUser = { ...mockUser, userName: "TestUser" };
      mockLoggedUser = { ...mockLoggedUser, status: "Pending" };

      User.find = jest.fn().mockResolvedValue([mockLoggedUser]);
      const testError = new CustomError(400, "User pending", "");

      const next = jest.fn();

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(testError);
    });
  });
});
