import { Types } from './types.utils';

export const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
export const ARGUMENT_NAMES = /([^\s,]+)/g;

export namespace Runtime {
  export function getParamNames(func) {
    if (!Types.isFunction(func)) {
      return [];
    }
    const fnStr = func.toString().replace(STRIP_COMMENTS, '');
    let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if (result === null) {
      result = [];
    }
    return result;
  }
}
