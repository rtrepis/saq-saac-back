import { NextFunction, Request, Response } from "express";
import Sequence from "../../../database/models/Sequence";
import CustomError from "../../../utils/CustomError";
import getAllSequencePublic from "./sequencesController";

describe("Given a sequence controller", () => {
  const req: Partial<Request> = {};
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn() as Partial<NextFunction>;

  describe("When getAllSequence it's called and it receives a response ", () => {
    test("Then it should call the response method status with 200", async () => {
      const status = 200;

      Sequence.find = jest.fn();

      await getAllSequencePublic(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });
  });
  describe("When database getting throw an error", () => {
    test("Then call next function and reject error", async () => {
      const errorDB = new CustomError(
        404,
        "",
        "Error getting sequences to Data Base"
      );

      Sequence.find = jest.fn().mockRejectedValue("");
      await getAllSequencePublic(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(errorDB);
    });
  });
});
