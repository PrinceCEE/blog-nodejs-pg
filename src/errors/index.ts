export class HttpError extends Error {
  public statusCode: number;
  constructor(message: string, code: number) {
    super(message);
    this.statusCode = code;
  }
}

export class BadRequestError extends HttpError {
  constructor(message = "Bad Request Exception") {
    super(message, 400);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = "Not Found Exception") {
    super(message, 404);
  }
}

export class InternalServerError extends HttpError {
  constructor(message = "Internal Server Exception") {
    super(message, 500);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = "Unauthorized Exception") {
    super(message, 401);
  }
}
