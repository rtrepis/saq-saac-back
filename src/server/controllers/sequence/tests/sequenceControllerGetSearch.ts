import { NextFunction, Request, Response } from "express";
import Sequence from "../../../../database/models/Sequence";
import getSearch from "../sequencesControllerSearch";

describe("Give a sequence controller getSearch", () => {
  describe("When called with word params", () => {
    test("Then it should response code 200", async () => {
      const searchWord = "word";
      const req: Partial<Request> = {
        params: { word: searchWord },
        get: jest.fn().mockRejectedValue("TestWord"),
      };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn() as Partial<NextFunction>;

      Sequence.find = jest.fn().mockReturnValue(searchWord);

      await getSearch(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalled();
    });
  });
});
