import { NextFunction, Request, Response } from "express";
import Sequence from "../../../database/models/Sequence";
import { getAllSequencePublic } from "./sequencesController";
import getId from "./sequencesControllerGetId";

describe("Given a sequence controller get Id", () => {
  const sequenceId = "63199e9c8aa067d2f0931a4e";

  const req: Partial<Request> = { params: { id: sequenceId } };
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
        owner: "",
        pictograms: [0, 0],
        private: false,
      };

      Sequence.findById = jest.fn().mockReturnValue(mockSequence);

      await getId(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(status);
    });
  });

  describe("When database getting throw an error", () => {
    test("Then call next function and reject error", async () => {
      Sequence.findById = jest.fn().mockRejectedValue("");

      await getId(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When getId it's called and it receives a response ", () => {
    test("Then it should call the response method status with 401 if resource private", async () => {
      const status = 401;
      const mockSequence = {
        id: sequenceId,
        name: "",
        owner: "",
        pictograms: [0, 0],
        private: true,
      };

      Sequence.findById = jest.fn().mockReturnValue(mockSequence);

      await getId(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(status);
    });
  });
});
