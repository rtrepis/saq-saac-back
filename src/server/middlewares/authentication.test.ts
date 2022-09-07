import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import CustomError from "../../utils/CustomError";
import { CustomRequest } from "../types/CustomRequest";
import authentication from "./authentication";

const res = {} as Partial<Response>;
const next = jest.fn() as NextFunction;
jwt.verify = jest.fn().mockReturnValue({
  id: "",
  userName: "",
});

describe("Given the authentication middleware", () => {
  describe("When it's call with request authorized", () => {
    test("Then it should call the next function with request plus payload ", () => {
      const req = {
        get: jest.fn().mockReturnValue("Bearer 23"),
      } as Partial<CustomRequest>;
      const expectPayloadRequestProperty = "payload";

      authentication(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalled();
      expect(req).toHaveProperty(expectPayloadRequestProperty);
    });
  });

  describe("When it's call with request unauthorized", () => {
    test("Then it should call the next with an error", () => {
      const expectNextWithError = new CustomError(
        400,
        "invalid authentication",
        "invalid authentication"
      );
      const req = {
        get: jest.fn().mockReturnValue(""),
      } as Partial<CustomRequest>;

      authentication(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectNextWithError);
    });
  });

  describe("When it's call with request authorized", () => {
    test("Then verifyToken return with string and call next with", () => {
      const expectNextWithError = new CustomError(
        400,
        "invalid authentication",
        "invalid authentication"
      );
      const req = {
        get: jest.fn().mockReturnValue("Bearer 23"),
      } as Partial<CustomRequest>;
      jwt.verify = jest.fn().mockReturnValue("crash");

      authentication(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectNextWithError);
    });
  });
});
