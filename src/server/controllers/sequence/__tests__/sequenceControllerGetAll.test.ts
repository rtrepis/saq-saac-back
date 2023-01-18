import { NextFunction, Request, Response } from "express";
import Sequence from "../../../../database/models/Sequence";
import { getAllSequencePublic } from "../sequencesController";

describe("Given a sequence controller", () => {
  let req: Partial<Request> = {
    query: {},
  };
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

  describe("When called with request query params", () => {
    test("Then called the response with json call 200", async () => {
      req = {
        query: { pageSize: "3", page: "1" },
      };
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
});
