import { NextFunction, Request, Response } from "express";
import User from "../../../database/models/User";
import CustomError from "../../../utils/CustomError";
import forgot from "./forgotController";
import verifyCode from "./verifyCodeController";

const mockLoggedUser = {
  id: "1345422",
  userName: "TestUser",
  password: "Validate",
  status: "Pending",
  email: "user@validate.com",
  confirmationCode: "validConfirmationCode",
  save: jest.fn(),
};

describe("Give controller verifyCode", () => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn() as Partial<NextFunction>;

  describe("When it receives a validConfirmationCode", () => {
    test("Then it should response called with 200 code status", async () => {
      const req: Partial<Request> = {
        params: { confirmCode: "validConfirmationCode" },
      };
      const expectResponse = {
        status: 200,
        json: { message: "Validate email, User is active" },
      };

      User.findOne = jest.fn().mockResolvedValue(mockLoggedUser);
      await verifyCode(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectResponse.status);
      expect(res.json).toHaveBeenCalledWith(expectResponse.json);
    });
  });

  describe("When it receives a invalidConfirmationCode", () => {
    test("Then it should NextFunction called with 403 Error", async () => {
      const req: Partial<Request> = {
        params: { confirmCode: "invalidConfirmationCode" },
      };
      const testError = new CustomError(
        403,
        "",
        "Error verifyConfirmationCode"
      );
      User.findOne = jest.fn().mockRejectedValue(testError);

      await verifyCode(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(testError);
    });
  });
});
