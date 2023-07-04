import * as util from 'util';
import { SymbolMetadata } from './symbol.utils';

const ToString = Function.prototype.toString;
const hasOwn = Object.prototype.hasOwnProperty;
const toStr = Object.prototype.toString;
const symbolTag = '[object Symbol]';
function isString(value) {
  return typeof value === 'string';
}
const anon = /^function\s+\(|^function\s+anonymous\(|^\(?(\w+,)*\w+\)?\s*\=\>|^\(\s*\)\s*\=\>/;

const clify = /^class\s+\{/;
function isClass(target, exclude?: (target: any) => boolean) {
  if (!isFunction(target)) return false;
  if (!target.name || !target.prototype) return false;
  if (target.prototype.constructor !== target) return false;
  if (exclude && exclude(target)) {
    return false;
  }
  if (target[SymbolMetadata]) return true;
  if (isPrimitiveType(target)) return false;
  const str = target.toString();
  if (clify.test(str)) return true;
  if (anon.test(str)) return false;
  return Object.getOwnPropertyNames(target).indexOf('caller') < 0;
}

function isBoolean(target: any): target is boolean {
  return typeof target === 'boolean';
}

/**
 * check target is primitive type or not.
 *
 * @export
 * @param {*} target
 * @returns {boolean}
 */
function isPrimitiveType(target): boolean {
  return target === Function || target === Object || target === String || target === Number || target === Boolean || target === Symbol;
}

function isAsyncFunction(value) {
  return util.types.isAsyncFunction(value);
}

function isGeneratorFunction(value) {
  return util.types.isGeneratorFunction(value);
}

function isPromise(value) {
  return util.types.isPromise(value);
}

function isFunction(value) {
  return typeof value === 'function';
}

function isObject(value) {
  return value !== null && typeof value === 'object';
}

function isPlainObject(obj) {
  if (!obj || toStr.call(obj) !== '[object Object]') {
    return false;
  }

  const hasOwnConstructor = hasOwn.call(obj, 'constructor');
  const hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
  // Not own constructor property must be Object
  if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
    return false;
  }

  // Own properties are enumerated firstly, so to speed up,
  // if last one is own, then all properties are own.
  let key;
  for (key in obj) {
    /**/
  }

  return typeof key === 'undefined' || hasOwn.call(obj, key);
}

function isNumber(value) {
  return typeof value === 'number';
}

function isProxy(value) {
  return util.types.isProxy(value);
}

function isMap(value) {
  return util.types.isMap(value);
}

function isArray(target: any): target is Array<any> {
  return Array.isArray(target);
}

function isSet(value) {
  return util.types.isSet(value);
}

function isRegExp(value) {
  return util.types.isRegExp(value);
}

function isUndefined(value) {
  return value === undefined;
}

function isNull(value) {
  return value === null;
}

function isNullOrUndefined(value) {
  return isUndefined(value) || isNull(value);
}

function isSymbol(value) {
  return typeof value === 'symbol' || (isObject(value) && Object.prototype.toString.call(value) === symbolTag);
}

export const Types = {
  isClass,
  isAsyncFunction,
  isGeneratorFunction,
  isSymbol,
  isString,
  isPromise,
  isFunction,
  isObject,
  isArray,
  isPlainObject,
  isNumber,
  isProxy,
  isMap,
  isSet,
  isRegExp,
  isUndefined,
  isNull,
  isNullOrUndefined,
  isBoolean,
};
