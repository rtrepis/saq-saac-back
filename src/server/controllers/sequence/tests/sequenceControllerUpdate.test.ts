import { NextFunction, Response } from "express";
import Sequence from "../../../../database/models/Sequence";
import CustomError from "../../../../utils/CustomError";
import { CustomRequest } from "../../../types/CustomRequest";
import SequenceI from "../../../types/interfaces";
import updateId from "../sequenceControllerUpdate";

describe("Given a sequence controller update id", () => {
  let req: Partial<CustomRequest> = {};

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: Partial<NextFunction> = jest.fn();
  const sequenceReturnMock: SequenceI = {
    id: "idSequenceReturnMock",
    name: "",
    pictograms: [0, 0],
    owner: { id: "idOwnerMock" },
    privately: false,
  };

  describe("When it's called with correctly request owner, body sequence and param id", () => {
    test("Then it should call the response with status 200", async () => {
      req = {
        params: { id: "idSequenceMock" },
        payload: { id: "idOwnerMock" },
        body: { name: "", pictogram: [0, 0], privately: true },
      };
      const expectStatus = 200;

      Sequence.findById = jest.fn().mockReturnThis();
      Sequence.populate = jest.fn().mockReturnValue(sequenceReturnMock);

      Sequence.replaceOne = jest.fn();

      await updateId(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectStatus);
    });
  });

  describe("When it's call request unOwner, body sequence and param Id", () => {
    test("Then should response with 401", async () => {
      req = {
        params: { id: "idSequenceMock" },
        payload: { id: "idUnOwnerMock" },
        body: { name: "", pictogram: [0, 0], privately: true },
      };
      const expectStatus = 401;

      Sequence.findById = jest.fn().mockReturnThis();
      Sequence.populate = jest.fn().mockReturnValue(sequenceReturnMock);

      Sequence.replaceOne = jest.fn();

      await updateId(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectStatus);
    });
  });

  describe("When it's call request owner, body sequence and param error Id", () => {
    test("Then should response with 404", async () => {
      const updateIdError = new CustomError(
        404,
        "",
        "Error update sequence to Data Base"
      );

      req = {
        params: { id: "otherIdSequenceMock" },
        payload: { id: "idOwnerMock" },
        body: { name: "", pictogram: [0, 0], privately: true },
      };

      Sequence.findById = jest.fn().mockReturnThis();
      Sequence.populate = jest.fn().mockReturnValue(sequenceReturnMock);

      Sequence.replaceOne = jest.fn().mockRejectedValue(updateIdError);

      await updateId(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(updateIdError);
    });
  });
});
