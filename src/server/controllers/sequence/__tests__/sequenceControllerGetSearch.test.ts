import { NextFunction, Request, Response } from "express";
import Sequence from "../../../../database/models/Sequence";
import getSearch from "../sequencesControllerSearch";

describe("Give a sequence controller getSearch", () => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn() as Partial<NextFunction>;

  describe("When called with 'Word' params", () => {
    test("Then it should response code 200", async () => {
      const searchWord = "Word";
      const req: Partial<Request> = {
        params: { word: searchWord },
      };
      const expectStatus = 200;

      Sequence.find = jest.fn().mockReturnValue({});
      await getSearch(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectStatus);
    });
  });

  describe("When called with '%' error params", () => {
    test("Then it should response cade 400", async () => {
      const searchWord = "%";
      const req: Partial<Request> = {
        params: { word: searchWord },
      };

      Sequence.find = jest.fn().mockRejectedValue("");

      await getSearch(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });
});
