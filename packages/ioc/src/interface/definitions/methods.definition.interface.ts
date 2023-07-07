import { Identifier } from '../common/identifier';
import { IMethodDefinition } from './method.definition.interface';

export interface IMethodsDefinition<T extends IMethodDefinition> {
  getMethodKeys(): Identifier[];
  getMethod(properKey: string | symbol, defaultValue?: T): T;
  setMethod(properKey: string | symbol, value: T): void;
}
