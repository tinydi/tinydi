import { ClassType } from './type';
import { Types } from '../../utils/types.utils';

/**
 * define a type of identifier
 */
export type Identifier<T = any> = string | symbol | ClassType<T>;

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
