interface ErrorOption {
  cause?: Error;
  status?: number;
}
export class BaseException extends Error {
  code: number | string;
  cause: Error;
  constructor(message: string, options?: ErrorOption);
  constructor(message: string, code: string, options?: ErrorOption);
  constructor(message: string, code: any, options?: ErrorOption) {
    super(message);
    if (!code || typeof code === 'object') {
      options = code;
      code = 'MIDWAY_10000';
    }
    this.name = this.constructor.name;
    this.code = code;
    this.cause = options?.cause;
  }
  toJson(): string {
    return JSON.stringify({
      name: this.name,
      code: this.code,
      cause: this.cause,
    });
  }
}
