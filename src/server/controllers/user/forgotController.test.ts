import { NextFunction, Request, Response } from "express";
import User from "../../../database/models/User";
import CustomError from "../../../utils/CustomError";
import forgot from "./forgotController";

jest.mock("../../../utils/auth", () => ({
  ...jest.requireActual("../../../utils/auth"),
  createToken: () => jest.fn().mockReturnValue("#"),
}));

const mockLoggedUser = {
  id: "1345422",
  userName: "TestUser",
  password: "Validate",
  status: "Active",
  email: "user@validate.com",
};

describe("Give controller forgot", () => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn() as Partial<NextFunction>;

  describe("When it receives a registered user@email", () => {
    test("Then it should response called with 200 code status", async () => {
      const req: Partial<Request> = {
        body: { email: "user@validate.com" },
      };
      const expectResponse = {
        status: 200,
        json: { message: "Please, validate email" },
      };

      User.findOne = jest.fn().mockResolvedValue(mockLoggedUser);
      User.replaceOne = jest.fn();
      await forgot(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectResponse.status);
      expect(res.json).toHaveBeenCalledWith(expectResponse.json);
    });
  });

  describe("When it receives a unregistered email", () => {
    test("Then it should NextFunction called with 403 Error", async () => {
      const req: Partial<Request> = {
        body: { email: "user@invalid.com" },
      };
      const testError = new CustomError(403, "", "Error forgot email");
      User.findOne = jest.fn().mockRejectedValue(testError);

      await forgot(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(testError);
    });
  });
});
