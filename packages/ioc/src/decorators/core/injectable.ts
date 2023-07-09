import { createDecorator } from '../factory';
import { Identifier } from '../../interface/common/identifier';
import { Scope } from '../../enums/scope.enum';
import { ClassDecoratorFunction } from '../../interface/decorators/decorator';
import { Store } from '../store';
import { Types } from '../../utils/types.utils';
import isMetadataObject = Types.isMetadataObject;
import { ProviderMetadata } from '../../interface/decorators/metadata/provide.metadata';

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
  let metadata: ProviderMetadata;
  if (isMetadataObject(identifier)) {
    metadata = identifier as ProviderMetadata;
  } else {
    metadata = { identifier, scope };
  }
  Store.saveProviderMetadata(metadata, context);
}) as InjectableDecorator;
