import { NextFunction, Response } from "express";
import Sequence from "../../../database/models/Sequence";
import User from "../../../database/models/User";
import CustomError from "../../../utils/CustomError";
import { CustomRequest } from "../../types/CustomRequest";
import { createSequence } from "./sequencesController";

describe("Given a function createSequence", () => {
  const bodyRequest = {
    pictograms: [11737, 8975, 35729, 2443, 11739],
    name: "Rentar mans",
    private: false,
    owner: "",
  };

  const payloadRequest = {
    userName: "Maria",
    id: "6318af764f5225384b4feac9",
  };

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const req = {
    body: bodyRequest,
    payload: payloadRequest,
  } as Partial<CustomRequest>;

  const next = jest.fn() as Partial<NextFunction>;

  const sequenceId = "63170593d41384063b90467a";

  const userFind = "6318af764f5225384b4feac9";

  Sequence.create = jest.fn().mockResolvedValue({
    ...bodyRequest,
    id: sequenceId,
    owner: payloadRequest,
  });

  User.findById = jest.fn().mockResolvedValue({
    id: userFind,
    sequence: [],
    save: jest.fn(),
  });

  describe("When it receives a response with a sequence", () => {
    test("Then call the response method status with 201", async () => {
      const expectedStatus = 201;

      await createSequence(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("And it receives a response with a game existent", () => {
    test("Then it should call next function with an error", async () => {
      Sequence.create = jest.fn().mockRejectedValue({
        ...bodyRequest,
        id: sequenceId,
        owner: payloadRequest,
      });

      await createSequence(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalled();
    });
  });
});
