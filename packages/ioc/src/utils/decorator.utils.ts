import { Types } from './types.utils';

export namespace DecoratorUtils {
  /**
   *  action handle.
   */
  export type Handler<T = any, TR = void> = (ctx: T, next?: () => TR) => TR;
  /**
   * is metadata object or not.
   *
   * @export
   * @param {*} target
   * @param {...(string|string[])[]} props
   * @returns {boolean}
   */
  export function isMetadataObject(target: any, ...props: (string | string[])[]): boolean {
    if (!Types.isPlainObject(target)) {
      return false;
    }
    if (props.length) {
      return Object.keys(target).some(n => props.some(ps => (Types.isString(ps) ? ps === n : ps.indexOf(n) > 0)));
    }

    return true;
  }

  /**
   * execute action in chain.
   *
   * @export
   * @template T
   * @template TR
   * @param {ActionHandle<T>[]} handlers
   * @param {T} ctx
   * @param {() => TR} [next]
   */
  export function chain<T, TR = void>(handlers: Handler<T, TR>[], ctx: T, next?: () => TR) {
    let index = -1;
    function dispatch(idx: number): TR {
      if (idx <= index) {
        throw new Error('next called mutiple times.');
      }
      index = idx;
      let handle = idx < handlers.length ? handlers[idx] : null;
      if (idx === handlers.length) {
        handle = next;
      }
      if (!handle) {
        return null;
      }
      return handle(ctx, dispatch.bind(null, idx + 1));
    }
    return dispatch(0);
  }
}
