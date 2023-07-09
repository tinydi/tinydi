import { ClassFieldDecoratorFunction, ClassMethodDecoratorFunction } from '../../interface/decorators/decorator';
import { ProviderIdentifier } from '../../interface/common/identifier';
import { createDecorator } from '../factory';
import { DecoratorNotValidException } from '../../exceptions/decorator-not-valid.exception';
import { Store } from '../store';

export interface AutowiredOptions {
  /**
   * The provider of the provider to Autowired.
   * @type {ProviderIdentifier}
   * @memberof AutowiredMetadata
   */
  provider: ProviderIdentifier;
  /**
   * The identifiers of the providers to Autowired.
   * @type {ProviderIdentifier[]}
   */
  providers: ProviderIdentifier[];
}
export interface AutowiredDecorator {
  /**
   * autowired decorator
   * @export
   * @example
   * ```typescript
   * @Autowired()
   * userService: UserService;
   * @param provider
   */
  (provider: ProviderIdentifier): ClassFieldDecoratorFunction<any, any, any>;

  /**
   * autowired decorator
   * @param providers
   * @example
   * ```typescript
   * export class Animal {
   *    @Autowired([DogService, CatService])
   *    say(dogService: DogService, catService: CatService){
   *      dogService.say();
   *      catService.say();
   *    }
   * }
   */
  (providers: ProviderIdentifier[]): ClassMethodDecoratorFunction<any, any, any>;
  /**
   * autowired decorator
   * @param metadata
   * @example
   * ```typescript
   * @Autowired({
   *   identifier: UserService
   * })
   * userService: UserService;
   */
  (metadata?: Pick<AutowiredOptions, 'providers'>): ClassFieldDecoratorFunction<any, any, any>;
  /**
   * autowired decorator
   * @param target
   * @param context
   * @example
   * ```typescript
   * @Autowired
   * userService: UserService;
   */
  (target: any, context: ClassFieldDecoratorContext): void;
}

export function A(): any {
  return;
}
export const Autowired: AutowiredDecorator = createDecorator((target, context, provider) => {
  switch (context.kind) {
    case 'field':
      Store.saveInjectFieldMetadata(context, provider);
      break;
    case 'method':
      Store.saveInjectMethodMetadata(context, provider);
      break;
    default:
      throw new DecoratorNotValidException('Autowired');
  }
});
