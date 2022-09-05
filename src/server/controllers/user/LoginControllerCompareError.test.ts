import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../../database/models/User";
import loginUser from "./loginController";

describe("Given it's called userLogin controller", () => {
  const mockUser = {
    userName: "UserTest",
    password: "123456",
  };
  const mockUserDB = {
    userName: "",
    password: "",
    id: "",
  };
  const req: Partial<Request> = {
    body: mockUser,
  };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: Partial<NextFunction> = jest.fn();

  describe("When password comparer reject an error", () => {
    test("Then call the response method next", async () => {
      const bcryptError = new Error();

      User.find = jest.fn().mockResolvedValue([mockUserDB]);
      bcrypt.compare = jest.fn().mockRejectedValue(bcryptError);
      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });
});
