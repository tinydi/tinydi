import { ClassDecoratorFunction } from '../../interface/decorators/decorator';
import { ClassMetadata } from '../../interface/decorators/metadata/class-metadata.interface';
import { Scope } from '../../enums/scope.enum';
import { Identifier } from '../../interface/common/identifier';
import { ClassType } from '../../interface/common/type';
import { createDecorator } from '../factory';
import { PROVIDE_DECORATOR } from '../constant';
import { Store } from '../store';
import { generateUUID } from '../../utils/uui.utils';

export interface ProvideDecorator {
  /**
   * Provide decorator
   * @example
   * ```typescript
   * @Provide("myService")
   * class MyService {}
   * @param provider
   */
  (provider?: Identifier): ClassDecoratorFunction<any, any, any>;

  /**
   * Provide decorator
   * @param provider
   * @param scope
   * @example
   * ```typescript
   * @Provide("myService", Scope.Singleton)
   * class MyService {}
   */
  (provider: Identifier, scope?: Scope): ClassDecoratorFunction<any, any, any>;

  /**
   * Provide decorator
   * @param metadata
   * @example
   * ```typescript
   * @Provide({
   *   identifier: "myService"
   * })
   * class MyService {}
   */
  (metadata?: Pick<ClassMetadata, 'provider' | 'scope'>): ClassDecoratorFunction<any, any, any>;
  /**
   * Provide decorator
   * @param target
   * @param _context
   * @example
   * ```typescript
   * @Provide
   * class MyService {}
   */
  (target?: ClassType, _context?: ClassDecoratorContext): void;
}
export const Provide: ProvideDecorator = createDecorator(PROVIDE_DECORATOR, (target, context, args) => {
  // If there is an uuid, it indicates that the class has been marked by a class decorator
  const classMetadata: ClassMetadata = {};
  // if (context.metadata?.uuid) {
  //   console.log(context.metadata?.uuid);
  // } else {
  //   context.metadata.uuid = uuid;
  // }
  Store.saveClassMetadata(PROVIDE_DECORATOR, classMetadata, context);
  console.log(context.metadata.uuid);
  // if (context.metadata?.uuid) {
  //   if (args[0]) {
  //     const metadata: ClassMetadata = {};
  //     if (Types.isObject(args[0])) {
  //       metadata.provider = args[0].provider;
  //       metadata.scope = args[0].scope;
  //     } else {
  //       if (args[0]) {
  //         metadata.provider = args[0];
  //       } else if (args[1]) {
  //         metadata.scope = args[1];
  //       }
  //     }
  //     saveClassMetadata(PROVIDE_DECORATOR, metadata, context);
  //   }
  // } else {
  //   console.log('进来了', context.metadata);
  // }
  return target;
});
