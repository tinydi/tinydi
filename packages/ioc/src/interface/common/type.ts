/**
 * abstract class type
 * @export
 * @extends {Function}
 * @interface AbstractType
 * @template T
 */
export interface AbstractType<T = any> extends Function {
  new?(...args: any[]): T;
}
/**
 * class type
 * @export
 * @extends {Function}
 * @interface Type
 * @template T
 */
export interface Type<T = any> extends AbstractType {
  new (...args: any[]): T;
}
/**
 * class type.
 * @export
 * @type {ClassType}
 * @interface ClassType
 * @template  T
 */
export type Class<T = any> = Type<T> | AbstractType<T>;
/**
 * class type.
 * @export
 * @type {ClassType}
 */
export type ClassType<T = any> = Type<T> | AbstractType<T>;
/**
 * object map.
 *
 * @export
 * @interface ObjectMap
 * @template T
 */
export interface ObjectMap<T = any> {
  [index: string]: T;
}
/**
 * Pick interface filed
 * @example
 * ```typescript
 * interface A {
 *   a: string;
 *   b: number;
 *   c: boolean;
 * }
 * Pick<A, 'a' | 'b'>; // { a: string; b: number; }
 */
export type Pick<T, K extends keyof T> = {
  [key in K]: T[key];
};
