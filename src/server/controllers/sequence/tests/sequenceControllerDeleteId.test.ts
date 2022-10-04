import { Response, NextFunction } from "express";
import Sequence from "../../../../database/models/Sequence";
import User from "../../../../database/models/User";
import CustomError from "../../../../utils/CustomError";
import { CustomRequest } from "../../../types/CustomRequest";
import SequenceI from "../../../types/interfaces";
import deleteId from "../sequencesControllerDeleteId";

describe("Given a sequence controller delete id", () => {
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
    owner: { id: "ownerMock" },
    privately: false,
  };
  const userIdMockReturn = {
    sequencesCreate: ["idOtherSequence"],
    save: jest.fn(),
  };
  describe("When deleteId it's called with request owner and param id", () => {
    test("Then it should call the response with status 200", async () => {
      req = {
        params: { id: "idSequenceReturnMock" },
        payload: { id: "ownerMock" },
      };

      const expectStatus = 200;

      Sequence.findById = jest.fn().mockReturnThis();
      Sequence.populate = jest.fn().mockReturnValue(sequenceReturnMock);

      Sequence.findByIdAndDelete = jest.fn();

      User.findById = jest.fn().mockReturnValue(userIdMockReturn);

      await deleteId(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectStatus);
    });
  });

  describe("When deleteId it's called request unOwner and param id", () => {
    test("Then it should called response with 401", async () => {
      req = {
        params: { id: "idSequenceReturnMock" },
        payload: { id: "unOwnerMock" },
      };
      const expectStatus = 401;

      Sequence.findById = jest.fn().mockReturnThis();
      Sequence.populate = jest.fn().mockReturnValue(sequenceReturnMock);

      await deleteId(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectStatus);
    });
  });

  describe("When deleteId it's called request owner and param error id", () => {
    test("Then it should called reject next function with status 404", async () => {
      const deleteIdError = new CustomError(
        404,
        "",
        "Error deleting sequences to Data Base"
      );
      req = {
        params: { id: "otherSequence" },
        payload: { id: "ownerMock" },
      };

      Sequence.findById = jest.fn().mockReturnThis();
      Sequence.populate = jest.fn().mockReturnValue(sequenceReturnMock);

      Sequence.findByIdAndDelete = jest.fn().mockRejectedValue(deleteIdError);

      User.findById = jest.fn().mockReturnValue(userIdMockReturn);

      await deleteId(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(deleteIdError);
    });
  });
});
