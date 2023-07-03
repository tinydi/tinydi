/**
 * Identifies a service of type `T`.
 */
export interface ProvideIdentifier<T> {
  (...args: any[]): void;
  type: T;
}
/**
 * object identifier
 */
export type Identifier = string | symbol | ProvideIdentifier<any>;

/**
 * check target is token or not.
 * @param target
 */
export function isIdentifier(target: any): boolean {
  return typeof target === 'string' || typeof target === 'symbol' || target?.['provideId'];
}
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
 * class type.
 */
export type ClassType<T = any> = Type<T> | AbstractType<T>;

/**
 * typescript new class decorator
 */
export type ClassDecoratorFunction<BaseClassType extends ClassType<unknown>, ReturnsModified extends boolean, Arguments extends any[] | false> = Arguments extends any[]
  ? (...args: Arguments) => ClassDecoratorFunction<BaseClassType, ReturnsModified, false>
  : (baseClass: BaseClassType, context?: ClassDecoratorContext) => ReturnsModified extends true ? BaseClassType : void;

/**
 * typescript new class member decorator
 */
export type ClassMemberDecoratorFunction<BaseClassType extends ClassType<unknown>, ReturnsModified extends boolean, Arguments extends any[] | false> = Arguments extends any[]
  ? (...args: Arguments) => ClassMemberDecoratorFunction<BaseClassType, ReturnsModified, false>
  : (baseClass: BaseClassType, context?: ClassMemberDecoratorContext) => ReturnsModified extends true ? BaseClassType : void;

/**
 * typescript new class field decorator
 */
export type ClassFieldDecoratorFunction<BaseClassType extends ClassType<unknown>, ReturnsModified extends boolean, Arguments extends any[] | false> = Arguments extends any[]
  ? (...args: Arguments) => ClassFieldDecoratorFunction<BaseClassType, ReturnsModified, false>
  : (baseClass: BaseClassType, context?: ClassFieldDecoratorContext) => ReturnsModified extends true ? BaseClassType : void;
