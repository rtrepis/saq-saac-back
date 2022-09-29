import CustomError from "./CustomError";

describe("Given the ErrorCustom class", () => {
  describe("When is invocate with 500 code, privately and public message", () => {
    test("Then should return an object with code 500, 'privately message' & 'Public message'", () => {
      const expectedStatus = 500;
      const expectedprivatelyMessage = "privately message";
      const expectedPublicMessage = "Public message";

      const result = new CustomError(
        expectedStatus,
        expectedprivatelyMessage,
        expectedPublicMessage
      );

      expect(result.statusCode).toBe(expectedStatus);
      expect(result.message).toBe(expectedprivatelyMessage);
      expect(result.publicMessage).toBe(expectedPublicMessage);
    });
  });
  describe("When is invocate with 400 code, privately and public message", () => {
    test("Then should return an object with code 400, 'privately message' & 'Public message'", () => {
      const expectedStatus = 400;
      const expectedprivatelyMessage = "privately message";
      const expectedPublicMessage = "Public message";

      const result = new CustomError(
        expectedStatus,
        expectedprivatelyMessage,
        expectedPublicMessage
      );

      expect(result.statusCode).toBe(expectedStatus);
      expect(result.message).toBe(expectedprivatelyMessage);
      expect(result.publicMessage).toBe(expectedPublicMessage);
    });
  });
});
