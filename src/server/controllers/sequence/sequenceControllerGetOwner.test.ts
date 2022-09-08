import { NextFunction, Response } from "express";
import Sequence from "../../../database/models/Sequence";
import { CustomRequest } from "../../types/CustomRequest";
import { getSequencesOwner } from "./sequencesControllerGetOwner";

describe("Given a sequence controller getOwner", () => {
  let req: Partial<CustomRequest> = {};
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn() as Partial<NextFunction>;

  describe("When getSequenceOwner it's called and it receives a response ", () => {
    test("Then it should call the response method status with 200", async () => {
      const status = 200;
      const expectReturn = "sequence";
      req = {
        payload: { id: "2345" },
      } as Partial<CustomRequest>;

      Sequence.find = jest.fn().mockReturnThis();
      Sequence.populate = jest.fn().mockReturnValue({ expectReturn });

      await getSequencesOwner(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });
  });
  describe("When database getting throw an error", () => {
    test("Then call next function and reject error", async () => {
      Sequence.find = jest.fn().mockRejectedValue("");
      await getSequencesOwner(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalled();
    });
  });
});
