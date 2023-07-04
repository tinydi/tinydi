import { createClassDecorator } from '../factory';
import { ClassDecoratorFunction } from '../../interface/decorators/decorator';
import { ClassMetadata } from '../../interface/decorators/metadata/class-metadata.interface';
import { Scope } from '../../enums/scope.enum';
import { Identifier } from '../../interface/common/identifier';
import { ClassType } from '../../interface/common/type';

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
export const Provide: ProvideDecorator = createClassDecorator<ClassMetadata>('Provide', true);
