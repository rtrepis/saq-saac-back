import CustomError from "./CustomError";

describe("Given the ErrorCustom class", () => {
  describe("When is invocate with 500 code, private and public message", () => {
    test("Then should return an object with code 500, 'Private message' & 'Public message'", () => {
      const expectedStatus = 500;
      const expectedPrivateMessage = "Private message";
      const expectedPublicMessage = "Public message";

      const resultError = new CustomError(
        expectedStatus,
        expectedPrivateMessage,
        expectedPublicMessage
      );

      expect(resultError.statusCode).toBe(expectedStatus);
      expect(resultError.message).toBe(expectedPrivateMessage);
      expect(resultError.publicMessage).toBe(expectedPublicMessage);
    });
  });
});
