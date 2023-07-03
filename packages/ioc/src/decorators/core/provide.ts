import { createClassDecorator } from '../factory';
import { ClassDecoratorFunction, ClassType, Identifier } from '../../interface/decorators/decorator';
import { ClassMetadata } from '../../interface/decorators/metadata/class-metadata.interface';

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
   * @param identifier
   * @param alias
   * @example
   * ```typescript
   * @Provide("myService", "myAlias")
   * class MyService {}
   */
  (identifier: Identifier, alias?: string): ClassDecoratorFunction<any, any, any>;

  /**
   * Provide decorator
   * @param metadata
   * @example
   * ```typescript
   * @Provide({
   *   identifier: "myService",
   *   alias: "myAlias"
   * })
   * class MyService {}
   */
  (metadata?: Pick<ClassMetadata, 'identifier' | 'alias' | 'namespace'>): ClassDecoratorFunction<any, any, any>;
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
