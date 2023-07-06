import { AutowiredMetadata } from '../../interface/decorators/metadata/autowired-metadata.interface';
import { ClassFieldDecoratorFunction, ClassMethodDecoratorFunction } from '../../interface/decorators/decorator';
import { ProviderIdentifier } from '../../interface/common/identifier';
import { createMethodPropParamDecorator } from '../factory';
import { AUTOWIRED_DECORATOR } from '../constant';

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
  (metadata?: Pick<AutowiredMetadata, 'provider'>): ClassFieldDecoratorFunction<any, any, any>;
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
