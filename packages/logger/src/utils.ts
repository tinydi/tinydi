import { Level } from './interface';

export function isPlainObject(value) {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}

export function debounce(func: () => void, wait: number, immediate?) {
  let timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    const last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  }

  const debounced: any = (...args) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    context = this;
    timestamp = Date.now();
    const callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  debounced.flush = () => {
    if (timeout) {
      result = func.apply(context, args);
      context = args = null;

      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
}

export function formatLevel(level: string): Level {
  return level.toLowerCase() as Level;
}

export function formatJsonLogName(name: string): string {
  if (name === null || name === undefined) {
    return name;
  }
  if (/\.log$/.test(name)) {
    return name.replace('.log', '.json.log');
  } else if (/\.$/.test(name)) {
    return name + 'json.log';
  } else {
    return name + '.json.log';
  }
}

export function assertEmptyAndThrow(name: string, message) {
  if (name === null || name === undefined) {
    throw new Error(message);
  }
}

/**
 * 只要有一个 false 就返回 true
 * 默认为 undefined, null, false 时返回 true
 * @param args
 */
export function assertConditionTruthy(...args): boolean {
  if (args && args.length) {
    for (const param of args) {
      if (param !== true) {
        continue;
      } else {
        return false;
      }
    }
  }
  return true;
}

export class template {
  static render(str: string, data: Record<string, any>) {
    return str.replace(/\${(.*?)}/g, (match, key) => {
      return data[key];
    });
  }
}
