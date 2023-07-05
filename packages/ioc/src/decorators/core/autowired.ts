import { AutowiredMetadata } from '../../interface/decorators/metadata/autowired-metadata.interface';
import { ClassFieldDecoratorFunction, ClassMethodDecoratorFunction } from '../../interface/decorators/decorator';
import { createDecorator } from '../factory';
import { AUTOWIRED_DECORATOR } from '../constant';
import { PropertyMetadata } from '../../interface/decorators/metadata/property-metadata.interface';
import { Identifier } from '../../interface/common/identifier';
import { Store } from '../store';
import { Types } from '../../utils/types.utils';
import { InjectMode } from '../../enums/inject-mode.enum';
import saveFieldMetadata = Store.saveFieldMetadata;
import isClass = Types.isClass;

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

export const Autowired: AutowiredDecorator = createDecorator(AUTOWIRED_DECORATOR, (target, context, args) => {
  if (context.kind === 'field') {
    const metadata: PropertyMetadata = {};
    metadata.propertyKey = context.name;
    metadata.decorator = AUTOWIRED_DECORATOR;
    metadata.access = context.access;
    if (args.length > 0) {
      if (Types.isObject(args[0])) {
        metadata.provider = args[0].provider;
      } else {
        metadata.provider = args[0];
      }
    }
    if (metadata.provider) {
      if (isClass(metadata.provider)) {
        metadata.injectMode = InjectMode.Class;
      } else {
        metadata.injectMode = InjectMode.Identifier;
      }
    } else {
      metadata.injectMode = InjectMode.PropertyKey;
    }
    return saveFieldMetadata(AUTOWIRED_DECORATOR, metadata, context);
  }
});
