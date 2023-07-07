import { IMethodDefinition } from '../interface/definitions/method.definition.interface';
import { IMethodsDefinition } from '../interface/definitions/methods.definition.interface';
import { Identifier } from '../interface/common/identifier';

export class MethodsDefinition<T extends IMethodDefinition> extends Map implements IMethodsDefinition<T> {
  getMethod(properKey: string | symbol, defaultValue?: T): T {
    return undefined;
  }

  getMethodKeys(): Identifier[] {
    return [];
  }

  setMethod(properKey: string | symbol, value: T): void {}
}
