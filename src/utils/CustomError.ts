export interface ErrorWithCode {
  code: string;
}

class CustomError extends Error implements ErrorWithCode {
  code: string;

  constructor(
    public statusCode: number,
    public message: string,
    public publicMessage: string
  ) {
    super(message);
  }
}

export default CustomError;
