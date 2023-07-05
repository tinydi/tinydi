import { Identifier } from '../interface/common/identifier';
import { Types } from '../utils/types.utils';

/**
 * extend metadata.
 *
 * @export
 * @interface MetadataExtends
 * @template T
 */
export interface MetadataExtends<T = any> {
  (metadata: T): void;
}

export type createDecoratorCallBack = (target: any, context: DecoratorContext, ...args) => void;

export function createDecorator(decorator: string, callBack: createDecoratorCallBack): any {
  const metaName = `@${decorator}`;
  const factory = (...args: any[]) => {
    /**
     * @example @Injectable
     */
    if (args.length === 2 && args[1].kind === 'class') {
      return callBack(metaName, args[0], args[1]);
    }
    /**
     * @example @Injectable(...)
     */
    const params = args;
    return (...args) => {
      return callBack(args[0], args[1], params);
    };
  };
  factory.toString = () => metaName;
  return factory;
}

/**
 * check if the target is a identifier
 *
 *
 * @export isToken
 * @param {*} target
 * @returns {target is Identifier}
 */
export function isIdentifier(target: any): target is Identifier {
  if (!target) {
    return false;
  }
  if (isProvideIdentifier(target)) {
    return true;
  }
  return Types.isClass(target);
}

/**
 * check target is provide token or not.
 *
 * @export
 * @param {*} target
 * @returns {target is ProvideToken}
 */
export function isProvideIdentifier(target: any): target is Identifier {
  if (Types.isFunction(target)) return false;
  return Types.isString(target) || Types.isSymbol(target);
}
