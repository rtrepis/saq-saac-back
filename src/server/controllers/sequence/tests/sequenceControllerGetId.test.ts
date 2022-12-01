import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Sequence from "../../../../database/models/Sequence";
import CustomError from "../../../../utils/CustomError";
import SequenceI from "../../../types/interfaces";
import getId from "../sequencesControllerGetId";

jwt.verify = jest.fn().mockReturnValue({
  id: "1234",
});

describe("Given a sequence controller get Id", () => {
  const sequenceId = "6319f88252877874111c55ff";

  let req: Partial<Request> = {
    params: { id: sequenceId },
    get: jest.fn().mockReturnValue("Bearer null"),
  };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn() as Partial<NextFunction>;

  describe("When getId it's called and it receives a response ", () => {
    test("Then it should call the response method status with 200 if resource public", async () => {
      const status = 200;
      const mockSequence = {
        id: sequenceId,
        name: "",
        owner: "12548",
        pictograms: [0, 0],
        privately: false,
      };

      Sequence.findById = jest.fn().mockReturnThis();
      Sequence.populate = jest.fn().mockReturnValue([{ mockSequence }]);

      await getId(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(status);
    });
  });

  describe("When database getting throw an error", () => {
    test("Then call next function and reject error", async () => {
      Sequence.findById = jest.fn().mockReturnThis();
      Sequence.populate = jest.fn().mockRejectedValue("");

      await getId(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When not owner called getId privately resource", () => {
    test("Then it should call the response method status with 401", async () => {
      const status = 401;
      const mockSequence = {
        id: sequenceId,
        name: "",
        owner: "1234",
        privately: true,
        pictograms: [0, 0],
      };

      Sequence.findById = jest.fn().mockReturnThis();
      Sequence.populate = jest.fn().mockReturnValue(mockSequence);

      await getId(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(status);
    });
  });

  describe("When owner called getID privately resource", () => {
    test("Then it should call the response status with 201", async () => {
      const status = 200;
      req = {
        params: { id: sequenceId },
        get: jest.fn().mockReturnValue("Bearer right"),
      };
      const mockSequence: SequenceI = {
        id: sequenceId,
        name: "",
        owner: { id: "1234" },
        privately: true,
        pictograms: [0, 0],
      };

      Sequence.findById = jest.fn().mockReturnThis();
      Sequence.populate = jest.fn().mockReturnValue(mockSequence);

      await getId(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(status);
    });
  });

  describe("When verifyToken reject error", () => {
    test("Then it should call the next function with error", async () => {
      const expectNextWithError = new CustomError(
        500,
        "Server internal Error",
        "Server internal Error"
      );
      req = {
        params: { id: sequenceId },
        get: jest.fn().mockReturnValue("Bearer error"),
      };
      jwt.verify = jest.fn().mockReturnValue("crash");

      await getId(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectNextWithError);
    });
  });
});
