import { SymbolMetadata } from './symbol.utils';

export namespace Types {
  const anon = /^function\s+\(|^function\s+anonymous\(|^\(?(\w+,)*\w+\)?\s*\=\>|^\(\s*\)\s*\=\>/;
  const clify = /^class\s+\{/;
  const hasOwn = Object.prototype.hasOwnProperty;
  const toStr = Object.prototype.toString;
  export function isString(value) {
    return typeof value === 'string';
  }
  export function isBoolean(target: any): target is boolean {
    return typeof target === 'boolean';
  }

  export function isArray(target: any): target is Array<any> {
    return Array.isArray(target);
  }
  export function isObject(value) {
    return value !== null && typeof value === 'object';
  }
  export function isSymbol(value) {
    return typeof value === 'symbol' || (isObject(value) && Object.prototype.toString.call(value) === '[object Symbol]');
  }

  export function isPlainObject(obj) {
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

  export function isClass(target, exclude?: (target: any) => boolean) {
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
  /**
   * check target is primitive type or not.
   *
   * @export
   * @param {*} target
   * @returns {boolean}
   */
  export function isPrimitiveType(target): boolean {
    return target === Function || target === Object || target === String || target === Number || target === Boolean || target === Symbol;
  }
  export function isFunction(value) {
    return typeof value === 'function';
  }
  /**
   * is metadata object or not.
   *
   * @export
   * @param {*} target
   * @param {...(string|string[])[]} props
   * @returns {boolean}
   */
  export function isMetadataObject(target: any, ...props: (string | string[])[]): boolean {
    if (!isPlainObject(target)) {
      return false;
    }
    if (props.length) {
      return Object.keys(target).some(n => props.some(ps => (isString(ps) ? ps === n : ps.indexOf(n) > 0)));
    }

    return true;
  }
}

// import { SymbolMetadata } from './symbol.utils';
// import * as util from 'util';
//
// const ToString = Function.prototype.toString;
// const hasOwn = Object.prototype.hasOwnProperty;
// const toStr = Object.prototype.toString;
// const symbolTag = '[object Symbol]';
// function isString(value) {
//   return typeof value === 'string';
// }
// const anon = /^function\s+\(|^function\s+anonymous\(|^\(?(\w+,)*\w+\)?\s*\=\>|^\(\s*\)\s*\=\>/;
//
// const clify = /^class\s+\{/;
// function isClass(target, exclude?: (target: any) => boolean) {
//   if (!isFunction(target)) return false;
//   if (!target.name || !target.prototype) return false;
//   if (target.prototype.constructor !== target) return false;
//   if (exclude && exclude(target)) {
//     return false;
//   }
//   if (target[SymbolMetadata]) return true;
//   if (isPrimitiveType(target)) return false;
//   const str = target.toString();
//   if (clify.test(str)) return true;
//   if (anon.test(str)) return false;
//   return Object.getOwnPropertyNames(target).indexOf('caller') < 0;
// }
//
// function isBoolean(target: any): target is boolean {
//   return typeof target === 'boolean';
// }
//
// /**
//  * check target is primitive type or not.
//  *
//  * @export
//  * @param {*} target
//  * @returns {boolean}
//  */
// function isPrimitiveType(target): boolean {
//   return target === Function || target === Object || target === String || target === Number || target === Boolean || target === Symbol;
// }
//
// function isAsyncFunction(value) {
//   return toStr.call(value) === '[object AsyncFunction]';
// }
//
// function isGeneratorFunction(value) {
//   return util.types.isGeneratorFunction(value);
// }
//
// function isPromise(value) {
//   return !!value && (typeof value === 'object' || typeof value === 'function') && typeof value.then === 'function';
// }
//
// function isFunction(value) {
//   return typeof value === 'function';
// }
//
// function isObject(value) {
//   return value !== null && typeof value === 'object';
// }
//
// function isPlainObject(obj) {
//   if (!obj || toStr.call(obj) !== '[object Object]') {
//     return false;
//   }
//
//   const hasOwnConstructor = hasOwn.call(obj, 'constructor');
//   const hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
//   // Not own constructor property must be Object
//   if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
//     return false;
//   }
//
//   // Own properties are enumerated firstly, so to speed up,
//   // if last one is own, then all properties are own.
//   let key;
//   for (key in obj) {
//     /**/
//   }
//
//   return typeof key === 'undefined' || hasOwn.call(obj, key);
// }
//
// function isNumber(value) {
//   return typeof value === 'number';
// }
//
// function isProxy(value) {
//   return util.types.isProxy(value);
// }
//
// function isMap(value) {
//   return toStr.call(value) === '[object Map]';
// }
//
// function isArray(target: any): target is Array<any> {
//   return Array.isArray(target);
// }
//
// function isRegExp(value) {
//   return toStr.call(value) === '[object RegExp]';
// }
//
// function isUndefined(value) {
//   return value === undefined;
// }
//
// function isNull(value) {
//   return value === null;
// }
//
// function isNullOrUndefined(value) {
//   return isUndefined(value) || isNull(value);
// }
//
// function isSymbol(value) {
//   return typeof value === 'symbol' || (isObject(value) && Object.prototype.toString.call(value) === symbolTag);
// }
//
// export const Types = {
//   isClass,
//   isAsyncFunction,
//   isGeneratorFunction,
//   isSymbol,
//   isString,
//   isPromise,
//   isFunction,
//   isObject,
//   isArray,
//   isPlainObject,
//   isNumber,
//   isProxy,
//   isMap,
//   isRegExp,
//   isUndefined,
//   isNull,
//   isNullOrUndefined,
//   isBoolean,
// };
