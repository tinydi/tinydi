import { createDecorator } from '../factory';
import { Identifier } from '../../interface/common/identifier';
import { Scope } from '../../enums/scope.enum';
import { ClassDecoratorFunction } from '../../interface/decorators/decorator';
import { Store } from '../store';

export interface InjectableOptions {
  /**
   * identifier
   */
  identifier?: Identifier;
  /**
   * scope
   */
  scope?: Scope;
}
export interface InjectableDecorator {
  /**
   * injectable decorator
   * @param injectableOption injectable options
   * @example
   * ```typescript
   * @Injectable({ identifier: 'A', scope: Scope.Singleton })
   * @param injectableOption
   */
  (injectableOption?: InjectableOptions): ClassDecoratorFunction<any, any, any>;
  /**
   * injectable decorator
   * @param identifier identifier
   * @example
   * ```typescript
   * @Injectable('A')
   * class A {}
   * ```
   */
  (identifier?: Identifier): ClassDecoratorFunction<any, any, any>;
  /**
   * injectable decorator
   * @param identifier identifier
   * @param scope scope
   * @example
   * ```typescript
   * @Injectable('A', Scope.Singleton)
   * class A {}
   * ```
   */
  (identifier?: Identifier, scope?: Scope): ClassDecoratorFunction<any, any, any>;
  /**
   * injectable decorator
   * @param target current class
   * @param context current class context
   * @example
   * ```typescript
   * @Injectable
   * class A {}
   */
  (target: any, context: ClassDecoratorContext): void;
}
export const Injectable = createDecorator((target, context, identifier: Identifier, scope: Scope) => {
  if (scope) {
    Store.saveProvide({ identifier, scope }, context);
  }
}) as InjectableDecorator;
