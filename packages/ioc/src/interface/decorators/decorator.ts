import { ClassType } from '../common/type';

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

/**
 * typescript new class field decorator
 */
export type ClassMethodDecoratorFunction<BaseClassType extends ClassType<unknown>, ReturnsModified extends boolean, Arguments extends any[] | false> = Arguments extends any[]
  ? (...args: Arguments) => ClassFieldDecoratorFunction<BaseClassType, ReturnsModified, false>
  : (baseClass: BaseClassType, context?: ClassMethodDecoratorContext) => ReturnsModified extends true ? BaseClassType : void;
