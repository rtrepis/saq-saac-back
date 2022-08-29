import CustomError from "./CustomError";

describe("Given the ErrorCustom class", () => {
  describe("When is invocate with 500 code, private and public message", () => {
    test("Then should return an object with code 500, 'Private message' & 'Public message'", () => {
      const expectedStatus = 500;
      const expectedPrivateMessage = "Private message";
      const expectedPublicMessage = "Public message";

      const result = new CustomError(
        expectedStatus,
        expectedPrivateMessage,
        expectedPublicMessage
      );

      expect(result.statusCode).toBe(expectedStatus);
      expect(result.message).toBe(expectedPrivateMessage);
      expect(result.publicMessage).toBe(expectedPublicMessage);
    });
  });
});
