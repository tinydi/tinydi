import { createDecorator, createMethodPropParamDecorator } from '../factory';
import { AutowiredMetadata } from '../../interface/decorators/metadata/autowired-metadata.interface';
import { ClassFieldDecoratorFunction, ClassMethodDecoratorFunction } from '../../interface/decorators/decorator';
import { Identifier, isIdentifier } from '../../interface/common/identifier';
import { Types } from '../../utils/types.utils';

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
  (provider: Identifier): ClassFieldDecoratorFunction<any, any, any>;

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
  (providers: Identifier[]): ClassMethodDecoratorFunction<any, any, any>;
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
  (metadata?: AutowiredMetadata): ClassFieldDecoratorFunction<any, any, any>;
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

export const Autowired: AutowiredDecorator = createMethodPropParamDecorator<AutowiredMetadata>('Autowired', []);
