import { BaseException } from './base.exception';

export class DecoratorNotValidException extends BaseException {
  constructor(message?: string) {
    super(`Decorators "${message}" are not valid here.`);
  }
}
