import { ClassDecoratorFunction } from '../../interface/decorators/decorator';
import { Identifier } from '../../interface/common/identifier';
import { ClassType } from '../../interface/common/type';
import { createClassDecorator } from '../factory';
import { ProvideMetadata } from '../../interface/decorators/metadata/provide-metadata.interface';
import { SINGLETON_DECORATOR } from '../constant';
import { Scope } from '../../enums/scope.enum';

export interface ProvideDecorator {
  /**
   * Provide decorator
   * @param identifier
   * @example
   * ```typescript
   * @Provide("myService")
   * class MyService {}
   */
  (identifier?: Identifier): ClassDecoratorFunction<any, any, any>;
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
  (metadata?: Pick<ProvideMetadata, 'identifier'>): ClassDecoratorFunction<any, any, any>;
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
export const Singleton: ProvideDecorator = createClassDecorator(SINGLETON_DECORATOR, null, metadata => {
  metadata.scope = Scope.Singleton;
});
