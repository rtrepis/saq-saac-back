import { NextFunction, Request, Response } from "express";
import User from "../../database/models/User";
import CustomError from "../../utils/CustomError";
import { registerUser } from "./userControllers";

let mockUser = {
  userName: "Ernesto",
  password: "1234",
};
describe("Given a function registerUser", () => {
  describe("When it receives a response object with 'userName' and 'password'", () => {
    describe("And a user with the requires properties", () => {
      const req = {
        body: mockUser,
      } as Partial<Request>;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;

      User.create = jest.fn().mockResolvedValue(mockUser);

      test("Then it should called with 201 status code and with expectMessage", async () => {
        const expectMessage = { message: "User successfully created" };
        const status = 201;
        const next = () => {};

        await registerUser(
          req as Request,
          res as Response,
          next as NextFunction
        );

        expect(res.status).toHaveBeenCalledWith(status);
        expect(res.json).toHaveBeenCalledWith(expectMessage);
      });
    });

    describe("when with a incorrect user data", () => {
      mockUser = {
        userName: "Ern",
        password: "",
      };
      const req = {
        body: mockUser,
      } as Partial<Request>;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;
      test("Then it should called and return error", async () => {
        const testError = new CustomError(400, "", "error");

        User.create = jest.fn().mockRejectedValue(testError);
        const next = jest.fn();

        await registerUser(
          req as Request,
          res as Response,
          next as NextFunction
        );

        expect(next).toHaveBeenCalled();
      });
    });
  });
});
