// import { ClassDecoratorFunction } from '../../interface/decorators/decorator';
// import { Scope } from '../../enums/scope.enum';
// import { Identifier } from '../../interface/common/identifier';
// import { ClassType } from '../../interface/common/type';
// import { PROVIDE_DECORATOR } from '../constant';
//
// export interface ProvideDecorator {
//   /**
//    * Provide decorator
//    * @example
//    * ```typescript
//    * @Provide("myService")
//    * class MyService {}
//    * @param identifier
//    */
//   (identifier?: Identifier): ClassDecoratorFunction<any, any, any>;
//   /**
//    * Provide decorator
//    * @param identifier
//    * @param scope
//    * @example
//    * ```typescript
//    * @Provide("myService", Scope.Singleton)
//    * class MyService {}
//    */
//   (identifier: Identifier, scope?: Scope): ClassDecoratorFunction<any, any, any>;
//
//   /**
//    * Provide decorator
//    * @param metadata
//    * @example
//    * ```typescript
//    * @Provide({
//    *   identifier: "myService",
//    *   scope: Scope.Singleton,
//    * })
//    * class MyService {}
//    */
//   (metadata?: ProvideMetadata): ClassDecoratorFunction<any, any, any>;
//   /**
//    * Provide decorator
//    * @param target
//    * @param _context
//    * @example
//    * ```typescript
//    * @Provide
//    * class MyService {}
//    */
//   (target?: ClassType, _context?: ClassDecoratorContext): void;
// }
// export const Provide: ProvideDecorator = createClassDecorator(PROVIDE_DECORATOR, true);
