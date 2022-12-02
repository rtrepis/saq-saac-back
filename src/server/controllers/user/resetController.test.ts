import { NextFunction, Request, Response } from "express";
import User from "../../../database/models/User";
import CustomError from "../../../utils/CustomError";
import reset from "./resetController";

const mockLoggedUser = {
  id: "1345422",
  userName: "TestUser",
  password: "Validate",
  status: "Pending",
  email: "user@validate.com",
  confirmationCode: "validConfirmationCode",
};

describe("Give controller reset", () => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn() as Partial<NextFunction>;

  describe("When it received new password and correct validationCode", () => {
    test("Then is should response called with expectResponse", async () => {
      const req: Partial<Request> = {
        body: {
          password: "newPassword",
          code: "validConfirmationCode",
        },
      };
      const expectResponse = {
        status: 200,
        json: { message: "Ok reset password" },
      };
      User.findOne = jest.fn().mockResolvedValue(mockLoggedUser);
      User.replaceOne = jest.fn();

      await reset(req as Request, res as Response, next as NextFunction);

      expect(res.status).toBeCalledWith(expectResponse.status);
      expect(res.json).toBeCalledWith(expectResponse.json);
    });
  });

  describe("When it receives a invalidCode", () => {
    test("Then is should NextFunction called with 403 code error", async () => {
      const req: Partial<Request> = {
        body: { password: "newPassword", code: "invalidConfirmationCode" },
      };
      const testError = new CustomError(403, "", "Error reset password");
      User.findOne = jest.fn().mockRejectedValue(testError);

      await reset(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(testError);
    });
  });
});
