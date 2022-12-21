export class MyError extends Error {
  statusCode: number;
  constructor(description: string, statusCode: number) {
    super(description);
    this.statusCode = statusCode;
  }
}
