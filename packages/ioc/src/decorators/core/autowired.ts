import { ClassFieldDecoratorFunction, ClassMethodDecoratorFunction } from '../../interface/decorators/decorator';
import { ProviderIdentifier } from '../../interface/common/identifier';
import { createMethodPropParamDecorator } from '../factory';
import { AUTOWIRED_DECORATOR } from '../constant';

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
  /**
   * The name of the property to Autowired.
   * @type {string}
   * @memberof AutowiredMetadata
   */
  propertyName?: string;
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
  (metadata?: Pick<AutowiredOptions, 'provider'>): ClassFieldDecoratorFunction<any, any, any>;
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
export const Autowired: AutowiredDecorator = createMethodPropParamDecorator(AUTOWIRED_DECORATOR, null);
