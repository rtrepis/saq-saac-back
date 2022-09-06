import { Request, Response } from "express";
import Sequence from "../../../database/models/Sequence";
import getAllSequence from "./sequencesController";

describe("Given a sequence controller", () => {
  describe("When getAllSequence it's called and it receives a response ", () => {
    test("Then it should call the response method status with 200", async () => {
      const req: Partial<Request> = {};
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const status = 200;

      Sequence.find = jest.fn();

      await getAllSequence(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(status);
    });
  });
});
